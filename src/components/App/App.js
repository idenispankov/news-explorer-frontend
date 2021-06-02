/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import About from '../About/About';
import Footer from '../Footer/Footer';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Tooltip from '../Tooltip/Tooltip';
import Navbar from '../Navbar/Navbar';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import * as auth from '../utils/auth';
import NewsApi from '../utils/NewsApi';
import MainApi from '../utils/MainApi';
import SavedNews from '../SavedNews/SavedNews';
// import Card from '../Card/Card';

function App() {
  const [token, setToken] = useState(localStorage.getItem('jwt'));

  const mainApi = new MainApi({
    baseUrl: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });

  const [loggedin, setLoggedin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const [inputEmpty, setInputEmpty] = useState(false); // Search Form Component
  const [notFound, setNotFound] = useState(false);
  const [found, setFound] = useState(false);
  const [index, setIndex] = useState(0); // for show more button
  const [searchedArticles, setSearchedArticles] = useState([]);
  const [keyword, setKeyword] = useState();

  const [savedArticles, setSavedArticles] = useState([]);

  const [currentUser, setCurrentUser] = useState({ id: '', email: '' });

  const location = useLocation();

  useEffect(() => {
    checkIfArticleSaved();
  }, [location, savedArticles, loggedin]);

  //////////////////////////////// POPUPS
  const closeAllPopups = () => {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsTooltipOpen(false);
    setEventListener(false);
  };

  const setEventListener = (listen) => {
    listen
      ? document.addEventListener('keyup', closeOnEsc)
      : document.removeEventListener('keyup', closeOnEsc);
    listen
      ? document.addEventListener('click', closeOutSide)
      : document.removeEventListener('click', closeOutSide);
  };

  const closeOnEsc = (e) => {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  };

  const closeOutSide = (e) => {
    if (e.target.classList.contains('modal')) {
      closeAllPopups();
    }
  };

  //////////////////////////// AUTHENTICATION

  const handleSigninClick = () => {
    setIsLoginPopupOpen(true);
    setEventListener(true);
  };

  const handleRegister = (email, password, name) => {
    auth
      .register(email, password, name)
      .then((res) => {
        if (res.email) {
          setIsRegisterPopupOpen(false);
          setIsTooltipOpen(true);
        } else if (!res.email) {
          return;
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = (email, password) => {
    auth
      .login(email, password)
      .then((data) => {
        if (data.email) {
          setLoggedin(true);
          setToken(localStorage.getItem('jwt'));
          setIsLoginPopupOpen(false);
        } else if (!data.email) {
          setLoggedin(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('searchedArticles');
    localStorage.removeItem('keyword');
    setToken('');
    setLoggedin(false);
    setCurrentUser({});
  };

  // ARTICLES SEARCHING

  const checkIfArticleSaved = () => {
    const newSearchedArticles = [...searchedArticles];
    newSearchedArticles.forEach((item) => (item.isCardSaved = false));
    console.log(newSearchedArticles, 'NEWSEARCHED START');
    if (savedArticles.length > 0) {
      newSearchedArticles.forEach((item) => {
        savedArticles.forEach((savedArticle) => {
          if (savedArticle.link === item.url) {
            console.log(savedArticle.link === item.url, savedArticle.link);
            item._id = savedArticle._id;
            item.isCardSaved = true;
          }
        });
      });
      setSearchedArticles(newSearchedArticles);
    } else {
      newSearchedArticles.forEach((item) => {
        item.isCardSaved = false;
        item._id = null;
      });
    }
  };

  const searchForArticles = (keyword) => {
    setSearchInput('');
    setNotFound(false);
    setFound(false);
    setSearchedArticles([]);
    if (keyword) {
      setIsLoading(true);
      setKeyword(keyword);
      NewsApi.searchArticles(keyword)
        .then((res) => {
          console.log(res, 'RES');
          if (res && res.totalResults > 0) {
            localStorage.setItem(
              'searchedArticles',
              JSON.stringify(res.articles)
            );
            localStorage.setItem('keyword', keyword);
            setIsLoading(false);
            console.log(res.articles, 'RES ARTICLES');
            setSearchedArticles(res.articles);
            setFound(true);
            checkIfArticleSaved();
            setIndex(1);
          } else if (res && res.totalResults === 0) {
            setIsLoading(false);
            setNotFound(true);
            setFound(false);
            localStorage.removeItem('searchedArticles');
            localStorage.removeItem('keyword');
          }
        })
        .catch((err) => console.log(err));
    } else {
      setIsLoading(false);
      setNotFound(true);
      localStorage.removeItem('searchedArticles');
      localStorage.removeItem('keyword');
    }
  };

  // Save Article
  const saveArticle = (article) => {
    mainApi
      .saveArticle({
        keyword: keyword,
        title: article.title,
        text: article.description,
        date: article.publishedAt,
        source: article.source.name,
        link: article.url,
        image: article.urlToImage,
        owner: currentUser._id,
      })
      .then((res) => {
        setSavedArticles([...savedArticles, res]);
      })
      .catch((err) => console.log(err));
  };

  // TOGGLE ARTCILE
  const toggleArticle = (card) => {
    if (loggedin) {
      if (!card.isCardSaved) {
        saveArticle(card);
      } else {
        card.isCardSaved = false;
        deleteArticleFromSavedNews(card._id);
      }
    }
  };

  // DELETE WORKING
  const deleteArticleFromSavedNews = (articleId) => {
    if (token) {
      mainApi.removeArticle(articleId).then(() => {
        const newSavedArticles = savedArticles.filter((item) =>
          item._id !== articleId ? item : null
        );
        setSavedArticles(newSavedArticles);
      });
    }
  };

  // Get token, currentUser, setLoggedin,  savedArticles, setSavedArticles array
  useEffect(() => {
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedin(true);
            setCurrentUser(res);
            getSavedArticles();
          }
        })
        .catch((err) => console.log(err));
    }
  }, [token]);

  const getSavedArticles = () => {
    mainApi
      .getSavedArticles()
      .then((res) => {
        setSavedArticles(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Switch>
          <Route exact path='/'>
            <Navbar
              loggedin={loggedin}
              handleLogout={handleLogout}
              onSigninClick={handleSigninClick}
            />
            <Header
              searchForArticles={searchForArticles}
              inputEmpty={inputEmpty}
              setInputEmpty={setInputEmpty}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
            <Main
              loggedin={loggedin}
              isLoading={isLoading}
              handleSigninClick={handleSigninClick}
              searchedArticles={searchedArticles}
              notFound={notFound}
              index={index}
              setIndex={setIndex}
              toggleArticle={toggleArticle}
              keyword={keyword}
              found={found}
            />
            <About />
          </Route>

          <Route exact path='/saved-news' loggedin={loggedin}>
            <Navbar loggedin={loggedin} handleLogout={handleLogout} />
            <SavedNews
              savedArticles={savedArticles}
              loggedin={loggedin}
              deleteArticleFromSavedNews={deleteArticleFromSavedNews}
              getSavedArticles={getSavedArticles}
            />
          </Route>

          <Route>
            <Redirect to='/' />
          </Route>
        </Switch>
        <Footer />
      </div>
      <Login
        isPopupOpen={isLoginPopupOpen}
        setIsLoginPopupOpen={setIsLoginPopupOpen}
        setIsRegisterPopupOpen={setIsRegisterPopupOpen}
        handleLogin={handleLogin}
        onClose={closeAllPopups}
      />
      <Register
        isPopupOpen={isRegisterPopupOpen}
        onClose={closeAllPopups}
        setIsRegisterPopupOpen={setIsRegisterPopupOpen}
        setIsLoginPopupOpen={setIsLoginPopupOpen}
        handleRegister={handleRegister}
      />
      <Tooltip
        isPopupOpen={isTooltipOpen}
        onClose={closeAllPopups}
        setIsLoginPopupOpen={setIsLoginPopupOpen}
        setIsTooltipOpen={setIsTooltipOpen}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;

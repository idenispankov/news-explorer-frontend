/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { useState, useEffect, useCallback } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import * as auth from '../utils/auth';
import NewsApi from '../utils/NewsApi';
import MainApi from '../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Tooltip from '../Tooltip/Tooltip';

function App() {
  const [token, setToken] = useState(localStorage.getItem('jwt'));

  const mainApi = new MainApi({
    baseUrl: 'https://enigmatic-citadel-92534.herokuapp.com',
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

  const [notFound, setNotFound] = useState(false);
  const [found, setFound] = useState(false);
  const [index, setIndex] = useState(0);
  const [searchedArticles, setSearchedArticles] = useState([]);
  const [keyword, setKeyword] = useState();
  const [savedArticles, setSavedArticles] = useState([]);
  const [currentUser, setCurrentUser] = useState({ id: '', email: '' });
  const location = useLocation();

  // Validation states
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // FORM VALIDATION
  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
    setSubmitError('');
  };

  const resetForm = useCallback(
    (
      newValues = { email: '', password: '', username: '' },
      newErrors = {},
      newIsValid = false
    ) => {
      setSubmitError('');
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  useEffect(() => {
    checkIfArticleSaved();
  }, [location, savedArticles, found, loggedin]);

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
    setIsRegisterPopupOpen(false);
    setIsLoginPopupOpen(true);
    setEventListener(true);
    resetForm();
  };

  const onSignupLinkClick = () => {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(true);
    setEventListener(true);
    resetForm();
  };

  const handleRegister = (email, password, name) => {
    auth
      .register(email, password, name)
      .then((res) => {
        if (res.email) {
          setIsRegisterPopupOpen(false);
          setIsTooltipOpen(true);
        } else if (res.message) {
          setSubmitError('This email is not available');
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
        } else if (data.message) {
          setLoggedin(false);
          setSubmitError('Wrong Email or Password');
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
    if (savedArticles.length > 0) {
      newSearchedArticles.forEach((item) => {
        savedArticles.forEach((savedArticle) => {
          if (savedArticle.link === item.url) {
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
          if (res && res.totalResults > 0) {
            localStorage.setItem(
              'searchedArticles',
              JSON.stringify(res.articles)
            );
            localStorage.setItem('keyword', keyword);
            setIsLoading(false);
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

  // Get token, currentUser, setLoggedin,  savedArticles, setSavedArticles array
  useEffect(() => {
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res._id) {
            setLoggedin(true);
            setCurrentUser(res);
            getSavedArticles();
          } else {
            setLoggedin(false);
            setCurrentUser({ id: '', email: '' });
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
              // props for Navbar
              handleLogout={handleLogout}
              onSigninClick={handleSigninClick}
              // props for Header
              searchForArticles={searchForArticles}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
          </Route>

          <ProtectedRoute exact path='/saved-news' loggedin={loggedin}>
            <SavedNews
              savedArticles={savedArticles}
              loggedin={loggedin}
              deleteArticleFromSavedNews={deleteArticleFromSavedNews}
              getSavedArticles={getSavedArticles}
              handleLogout={handleLogout}
            />
          </ProtectedRoute>

          <Route>
            <Redirect to='/' />
          </Route>
        </Switch>
        <Footer />
      </div>
      <Login
        isPopupOpen={isLoginPopupOpen}
        handleLogin={handleLogin}
        onClose={closeAllPopups}
        values={values}
        errors={errors}
        submitError={submitError}
        onInputChange={handleInputChange}
        onSignupLinkClick={onSignupLinkClick}
      />
      <Register
        isPopupOpen={isRegisterPopupOpen}
        onClose={closeAllPopups}
        setIsRegisterPopupOpen={setIsRegisterPopupOpen}
        setIsLoginPopupOpen={setIsLoginPopupOpen}
        handleRegister={handleRegister}
        values={values}
        errors={errors}
        submitError={submitError}
        onInputChange={handleInputChange}
        handleSigninClick={handleSigninClick}
      />
      <Tooltip
        isPopupOpen={isTooltipOpen}
        onClose={closeAllPopups}
        setIsLoginPopupOpen={setIsLoginPopupOpen}
        setIsTooltipOpen={setIsTooltipOpen}
        handleSigninClick={handleSigninClick}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;

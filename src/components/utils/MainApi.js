export default class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  saveArticle(data) {
    return fetch(this._baseUrl + '/articles', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject('Error! ' + res.statusText);
      }
    });
  }

  getSavedArticles() {
    return fetch(this._baseUrl + '/articles', {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject('Error! ' + res.statusText);
      }
    });
  }

  removeArticle(articleId) {
    return fetch(this._baseUrl + '/articles' + articleId, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject('Error! ' + res.statusText);
      }
    });
  }
}

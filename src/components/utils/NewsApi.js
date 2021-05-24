class NewsApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  date() {
    return new Date(Date.now() - 604800000).toISOString().slice(0, 10);
  }

  getArticles(query) {
    return fetch(
      this._baseUrl +
        `q=${query}&from${this.date()}&sortBypopularity&apiKey=eab01bb5989c40c7bd3efb7728a944be`,
      {
        headers: this._headers,
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject('Error! ' + res.statusText);
      }
    });
  }
}

export default new NewsApi({
  baseUrl: 'https://nomoreparties.co/news/v2/everything?',
});

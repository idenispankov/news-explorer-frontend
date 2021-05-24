class NewsApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  dateFrom() {
    return Date.now() - 7 * 24 * 3600 * 1000;
  }

  dateTo() {
    return Date.now();
  }

  getArticles(keyword) {
    return fetch(
      this._baseUrl +
        `q=${keyword}&from${this.dateFrom()}&to=${
          this.dateTo
        }&sortBypopularity&apiKey=eab01bb5989c40c7bd3efb7728a944be`,
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

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

  searchArticles(keyword) {
    return fetch(
      this._baseUrl +
        `q=${keyword}&from${this.dateFrom()}&to=${
          this.dateTo
        }&sortBypopularity&apiKey=53c68f38f9c242baacd37c44cb2d76eb`,
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

// 53c68f38f9c242baacd37c44cb2d76eb

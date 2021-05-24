export default class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
}

// https://newsapi.org/v2/everything?q=tesla&from=2021-04-24&sortBy=publishedAt&apiKey=eab01bb5989c40c7bd3efb7728a944be

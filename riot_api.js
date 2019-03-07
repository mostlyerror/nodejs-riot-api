const axios = require('axios')

class RiotAPI {
  constructor(key) {
    if (typeof key !== 'string') {
      throw new Error('Bad API Key')
    }

    if (key.length === 0) {
      throw new Error('Bad API Key')
    }

    this.apiKey = key
  }

  get api_key() { return this.apiKey }

  set api_key(newKey) { 
    if (newKey) {
      this._apiKey = newKey
    }
  }

  getLolStatus() {
    const req = this.buildRequest()
    const url = this.urlFor('lolStatus')
    return req.get(url)
      .then(res => res.data) 
      .catch(err => err)
  }

  buildRequest() {
    return axios.create({
      headers: this.requestHeaders(),
      responseType: 'json'
    })
  }

  urlFor(resource) {
    const urlMap = {
      lolStatus: 'https://na1.api.riotgames.com/lol/status/v3/shard-data'
    }

    return 'https://na1.api.riotgames.com/lol/status/v3/shard-data'
  }

  requestHeaders() {
    return { 'X-Riot-Token': this.apiKey }
  }
}

module.exports = RiotAPI

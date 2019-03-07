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

  getSummonerByName(name) {
    const req = this.buildRequest()
    const url = this.urlFor('getSummonerByName', name)
    return req.get(url)
      .then(res => res.data) 
      .catch(err => err)
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

  urlFor(api, resource) {
    const urlMap = {
      lolStatus: 'https://na1.api.riotgames.com/lol/status/v3/shard-data',
      getSummonerByName: `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${resource}`
    }

    return urlMap[api]
  }

  requestHeaders() {
    return { 'X-Riot-Token': this.apiKey }
  }
}

module.exports = RiotAPI

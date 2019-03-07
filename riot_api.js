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
    return this.makeApiCall('getlolStatus')
  }

  getSummonerBySummonerId(id) {
    return this.makeApiCall('getSummonerBySummonerId', id)
  }

  getSummonerByName(name) {
    return this.makeApiCall('getSummonerByName', name)
  }

  getSummonerByAccountId(id) {
    return this.makeApiCall('getSummonerByAccountId', id)
  }

  getSummonerByPuuid(puuid) {
    return this.makeApiCall('getSummonerByPuuid', puuid)
  }

  urlFor(api, resource) {
    const urlMap = {
      getlolStatus: 'https://na1.api.riotgames.com/lol/status/v3/shard-data',
      getSummonerBySummonerId: `https://na1.api.riotgames.com/lol/summoner/v4/summoners/${resource}`,
      getSummonerByName: `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${resource}`,
      getSummonerByAccountId: `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-account/${resource}`
    }

    if (!urlMap.hasOwnProperty(api)) { throw new Error(`Unrecognized API: ${api}`) }
    return urlMap[api]
  }

  makeApiCall(api, resource) {
    const req = axios.create({
      headers: { 'X-Riot-Token': this.apiKey },
      responseType: 'json'
    })
    const url = this.urlFor(api, resource)

    return req.get(url)
      .then(res => res)
      .catch(err => err.response)
  }

}

module.exports = RiotAPI

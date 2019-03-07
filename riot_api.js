class RiotAPI {
  constructor(key) {
    this.apiKey = key
  }

  get api_key() { return this.apiKey }

  set api_key(newKey) { 
    if (newKey) {
      this._apiKey = newKey
    }
  }
}

module.exports = RiotAPI

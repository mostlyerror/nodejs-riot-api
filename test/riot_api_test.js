
require('../index.js')
const RiotAPI = require('../riot_api.js')
const assert = require('chai').assert

describe ('RiotAPI:', () => {
  var client;

  before(() => {
    const apiKey = process.env.RIOT_API_KEY
    client = new RiotAPI(apiKey)
  })

  describe('constructor', () => {
    it('can be initialized', async () => {
      const badClient = new RiotAPI('asdfasdf')
      assert.instanceOf(client, RiotAPI)
    })

    it('must be provided a valid format api key', async () => {
      assert.throws(() => {
        const badClient = new RiotAPI()
      }, 'Bad API Key')

      assert.throws(() => {
        const badClient = new RiotAPI('')
      }, 'Bad API Key')


      const badClient = new RiotAPI('bad api key')
      const res = await badClient.getLolStatus()
      assert.equal(res.response.status, 403)
    })
  })

  describe('urlFor', () => {
    it('returns the full URL for the resource', async () => {
      const url = client.urlFor('lolStatus')
      assert.isString(url)
    })
  })

  describe('getLolStatus', () => {
    it('returns status of LOL apis', async () => {
      const res = await client.getLolStatus()
      assert.isDefined(res.services)
    })
  })

  describe('getSummonerByName', () => {
    it('returns summoner data', async () => {
      const res = await client.getSummonerByName('jasonwaterfallz')
      assert.isDefined(res.id)
      assert.isDefined(res.accountId)
      assert.isDefined(res.puuid)
      assert.isDefined(res.name)
      assert.isDefined(res.profileIconId)
      assert.isDefined(res.revisionDate)
      assert.isDefined(res.summonerLevel)
      assert.equal('jasonwaterfallz', res.name.toLowerCase())
    })
  })

})

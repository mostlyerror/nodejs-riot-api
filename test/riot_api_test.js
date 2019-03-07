
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
      assert.equal(res.status, 403)
    })
  })

  describe('urlFor', () => {
    it('returns the full URL for the resource', async () => {
      const url = client.urlFor('getlolStatus')
      assert.isString(url)
    })

    it('throws if API unrecognized', async () => {
      assert.throws(() => {
        const url = client.urlFor('getPewp')
      })
    })
  })

  describe('getLolStatus', () => {
    it('returns status of LOL apis', async () => {
      const res = await client.getLolStatus()
      assert.equal(res.status, 200)
      assert.isDefined(res.data)
      assert.isDefined(res.data.services)
    })
  })

  describe('getSummonerBySummonerId', () => {
    it('returns summoner data', async () => {
      const res = await client.getSummonerBySummonerId('QWOrTlVv1NiC4_WedkcunqJ8ypoCz7XBmbIqoezACrrHUKM')
      assert.equal(res.status, 200)
      assert.isDefined(res.data)
      assert.isDefined(res.data.id)
      assert.isDefined(res.data.accountId)
      assert.isDefined(res.data.puuid)
      assert.isDefined(res.data.name)
      assert.isDefined(res.data.profileIconId)
      assert.isDefined(res.data.revisionDate)
      assert.isDefined(res.data.summonerLevel)
      assert.equal('jasonwaterfallz', res.data.name.toLowerCase())
    })

    it('returns an error not found when ID not found', async () => {
      const res = await client.getSummonerBySummonerId('123132qwerqewrqwer')
      assert.equal(res.status, 400)
    })

    it('returns an error forbidden when ID bad', async () => {
      const res = await client.getSummonerBySummonerId('')
      assert.equal(res.status, 403)
    })

  })

  describe('getSummonerByName', () => {
    it('returns summoner data', async () => {
      const res = await client.getSummonerByName('jasonwaterfallz')
      assert.equal(res.status, 200)
      assert.isDefined(res.data)
      assert.isDefined(res.data.id)
      assert.isDefined(res.data.accountId)
      assert.isDefined(res.data.puuid)
      assert.isDefined(res.data.name)
      assert.isDefined(res.data.profileIconId)
      assert.isDefined(res.data.revisionDate)
      assert.isDefined(res.data.summonerLevel)
      assert.equal('jasonwaterfallz', res.data.name.toLowerCase())
    })

    it('returns an error response when summoner name not found', async () => {
      const res = await client.getSummonerByName('')
      assert.equal(res.status, 400)
      assert.isDefined(res.data)
      assert.isDefined(res.data.status)
      assert.isDefined(res.data.status.message)
      assert.isDefined(res.data.status.status_code)
    })
  })

})

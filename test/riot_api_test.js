
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
      const url = client.urlFor('lolStatus')
      assert.isString(url)
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

  describe('getSummonerByName', () => {
    it('returns summoner data', async () => {
      const res = await client.getSummonerByName('jasonwaterfallz')
      assert.equal(res.status, 200)

      const data = res.data
      assert.isDefined(data.id)
      assert.isDefined(data.accountId)
      assert.isDefined(data.puuid)
      assert.isDefined(data.name)
      assert.isDefined(data.profileIconId)
      assert.isDefined(data.revisionDate)
      assert.isDefined(data.summonerLevel)
      assert.equal('jasonwaterfallz', data.name.toLowerCase())
    })

    it("returns an error response when summoner doesn't exist", async () => {
      const res = await client.getSummonerByName('')
      assert.equal(res.status, 400)
      assert.isDefined(res.data)
      assert.isDefined(res.data.status)
      assert.isDefined(res.data.status.message)
      assert.isDefined(res.data.status.status_code)
    })
  })

})

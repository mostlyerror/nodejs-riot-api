
require('../index.js')
const RiotAPI = require('../riot_api.js')
const Chai = require('chai')
const assert = Chai.assert


describe ('RiotAPI:', () => {

  describe('constructor', () => {
    it('can be initialized', async () => {
      const client = new RiotAPI('asdfasdf')
      assert.instanceOf(client, RiotAPI)
    })

    it('must be provided a valid format api key', async () => {
      assert.throws(() => {
        const client = new RiotAPI()
      }, 'Bad API Key')

      assert.throws(() => {
        const client = new RiotAPI('')
      }, 'Bad API Key')


      const client = new RiotAPI('bad api key')
      const res = await client.getLolStatus()
      assert.equal(res.response.status, 403)
    })
  })

  describe('urlFor', () => {
    it('returns the full URL for the resource', async () => {
      const client = new RiotAPI('some key')
      const url = client.urlFor('lolStatus')
      assert.isString(url)
    })
  })

  describe('getLolStatus', () => {
    it('returns status of LOL apis', async () => {
      const apiKey = process.env.RIOT_API_KEY
      const client = new RiotAPI(apiKey)
      const res = await client.getLolStatus()
      assert.isDefined(res.services)
    })
  })

})

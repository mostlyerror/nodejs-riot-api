// use 'strict'

const RiotAPI = require('../riot_api.js')
const Chai = require('chai')
const assert = Chai.assert


describe ('RiotAPI Client:', () => {
  describe('constructor()', () => {
    it('can be initialized', async () => {
      const client = new RiotAPI()
      assert.instanceOf(client, RiotAPI)
    })

    it('is configured with an API key', async () => {
      const client = new RiotAPI()
      someKey = 'some_api_key'
      client.apiKey = someKey
      assert.isDefined(client.apiKey)
      assert.equal(client.apiKey, someKey)

      const client2 = new RiotAPI(someKey)
      assert.isDefined(client2.apiKey)
      assert.equal(client2.apiKey, someKey)
    })
  })

  describe('getLolStatus()', () => {
    it('something something death star...', async () => {
      assert.equal(true, true)
    })
  })
})



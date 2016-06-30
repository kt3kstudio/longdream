const LevelKeyFactory = require('../../src/domain/level-key-factory')
const LevelKey = require('../../src/domain/level-key')

const factory = new LevelKeyFactory()

describe('LevelKeyFactory', () => {
  describe('createFromArray', () => {
    it('creates an array of LevelKeys from the given array', () => {
      const keys = factory.createFromArray([{
        levelId: '701'
      }, {
        levelId: '702'
      }])

      expect(keys).to.be.an('array')

      keys.forEach(key => {
        expect(key).to.be.instanceof(LevelKey)
      })
    })
  })

  describe('createFromObject', () => {
    it('returns null if null is given', () => {
      const key = factory.createFromObject()

      expect(key).to.be.null
    })
  })
})
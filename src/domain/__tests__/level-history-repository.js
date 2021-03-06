const LevelHistoryRepository = require('../level-history-repository')
const LevelHistoryCollection = require('../level-history-collection')
const LevelHistory = require('../level-history')

const repository = new LevelHistoryRepository('ma')

describe('LevelHistoryRepository', () => {
  describe('saveForFloorId', () => {
    it('saves the histories for the given floor id', () => {
      const histories = new LevelHistoryCollection([{levelId: '701', score: 7000}])

      repository.saveForFloorId('7', histories)

      return repository.getByFloorId('7').then(histories => {
        expect(histories).to.be.instanceof(LevelHistoryCollection)
        expect(histories.getById('701')).to.be.instanceof(LevelHistory)
        expect(histories.getById('701').score).to.equal(7000)
      })
    })
  })
})

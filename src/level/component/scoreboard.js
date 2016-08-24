const {animation, Body, ratio} = require('spn')
const {commaNumber} = require('../../util/util')

const {component} = $.cc

/**
 * Scoreboard handles the behaviour of the score board of the level view.
 */
@component
@animation
  .show('bom-appear', 400)
  .hide('bom-disappear', 400)
@ratio.x(0).y(0)
class Scoreboard extends Body {
  marginX () { return 6 }
  marginY () { return 6 }

  /**
   * @constructor
   */
  constructor () {
    super()

    this.score = 0
  }

  /**
   * Hooks the score retrieving process to the fusion pair stream.
   *
   * @param {Rx.Observable<FusionPair>} fusionPairStream
   * @return {Rx.Observable<FusionPair>}
   */
  hookToFusionPairStream (fusionPairStream) {
    return fusionPairStream.map(fusionPair => {
      this.addScore(fusionPair.score())

      return fusionPair
    })
  }

  /**
   * Set up the initial dom state.
   */
  willShow () {
    super.willShow()

    this.update()
  }

  /**
   * Updates the scoreboard's number.
   */
  update () {
    this.elem.text(commaNumber(this.score))
  }

  /**
   * Add the score to the total score.
   * @param {Number} score The score to add
   */
  addScore (score) {
    this.score += score

    this.update()
  }

  /**
   * Gets the current score.
   * @return {Number}
   */
  getScore () {
    return this.score
  }
}

module.exports = Scoreboard

const Sprite = require('./sprite')
const {traits} = require('traits-decorator')
const {wait, Image, DirStateImageMap} = require('spn')

/**
 * The sprite class for stay-run creatures.
 *
 * Trait.
 */
@traits(Sprite)
class StayRunSprite {
  /**
   * Returns the default direction.
   */
  defaultDir () { return 'left' }
  defaultState () { return 'stay' }

  initSprite () {
    this.dirStateImage = new DirStateImageMap()

    this.dirStateImage.addImageByDirState(new Image(this.leftStayImage()), 'left', 'stay')
    this.dirStateImage.addImageByDirState(new Image(this.leftRunImage()), 'left', 'run')
    this.dirStateImage.addImageByDirState(new Image(this.leftStayImage(), true), 'right', 'stay')
    this.dirStateImage.addImageByDirState(new Image(this.leftRunImage(), true), 'right', 'run')
  }

  /**
   * Runs away to the given direction
   * @param {string} dir The direction to run away
   * @return {Promise}
   */
  runAway (dir) {
    this.setDirState(dir, 'run')

    const isRight = dir === 'right'

    this.elem.css('transition-property', 'left, opacity')

    this.setTransitionDuration(this.awayDur())

    const awayDistance = 170

    this.moveToX(this.x - awayDistance + isRight * awayDistance * 2)

    return wait(this.awayDur())

    .then(() => this.awayAnim().apply(this.elem))

    .then(() => this.elem.remove())
  }

  runAwayRight () {
    return this.runAway('right')
  }

  runAwayLeft () {
    return this.runAway('left')
  }
}

module.exports = StayRunSprite

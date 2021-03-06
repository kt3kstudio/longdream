const { wait } = require('spn')

const { component, on, wire } = capsid

/**
 * Camera handles the screen position.
 */
@component
class Camera {
  /**
   * Gets the window width.
   * @return {number}
   */
  getWindowWidth () {
    return $(window).width()
  }

  /**
   * @return {FloorAssetCollection}
   */
  @wire('floor-asset-collection') get floorAssets () {}

  /**
   * Sets up the initial position.
   */
  setUp () {
    this.scrollSet(this.floorAssets.findById(this.floorAssets.walker.assetId).centerX())
  }

  /**
   * Moves the camera to the given position if the position isn't visible.
   * @param {object} e The event object
   * @param {number} x The horizontal position
   */
  @on('camera-focus')
  focusToX (e) {
    const x = e.detail.x

    if (!this.visible(x)) {
      this.scrollSet(x)
    }
  }

  /**
   * Sets the horizontal scroll position.
   */
  scrollSet (x) {
    this.$el.scrollLeft(x - this.getWindowWidth() / 2)
  }

  /**
   * Scrolls the camera focus to the given x in given duration.
   * @param {Event} e The event object (unused)
   * @param {Number} x The x coordinate
   * @param {Number} dur The duration
   * @return {Promise}
   */
  @on('camera-move')
  scrollTo (e) {
    const x = e.detail.x
    const dur = e.detail.dur

    this.$el.animate({scrollLeft: x - this.getWindowWidth() / 2}, dur)

    return wait(dur)
  }

  /**
   * Check if the character is visible on the screen.
   * @param {Number} x The focus position
   * @returns {Boolean}
   */
  visible (x) {
    return x > this.$el.scrollLeft() && x < this.$el.scrollLeft() + this.getWindowWidth()
  }
}

module.exports = Camera

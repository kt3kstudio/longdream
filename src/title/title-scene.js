import SceneContext from '../ui/scene-context'
import BackgroundService from '../ui/common/background-service'
import {loadImage} from '../util/util'

import {wait} from 'spn'
const {p} = require('dom-gen')

const {component, on} = $.cc

/**
 * TitleScene class handles the motions sequences of the title scene.
 */
@component('title-scene')
class TitleScene extends SceneContext {
  /**
   * Entry point of the title scene.
   */
  @on('scene-start')
  start () {
    loadImage('img/title-logo.svg', 'title-logo elem', this.elem)

    .then(elem => elem.anim('title-appear', 2000))
    .then(elem => elem.animation('float 6000ms infinite'))

    wait(500).then(() => {
      this.getMenuButton().show()

      p('GET UP')
      .addClass('touch-here elem')
      .appendTo(this.elem)
      .click(() => this.goToMap())
      .anim('title-appear', 1000)
      .then(p => p.animation('float 1000ms infinite'))
    })
  }

  /**
   * Fades out the scene.
   */
  fadeOut () {
    return Promise.all([this.getMenuButton().hide(), $('.elem').css('opacity', 0).anim('disappear', 500).then(() => {
      $('.elem').remove()

      return wait(100)
    })])
  }

  /**
   * Transions to the map scene.
   */
  goToMap () {
    this.fadeOut()

    .then(() => BackgroundService.turnBlack())

    .then(() => {
      location.href = 'floor.html'
    })
  }
}

module.exports = TitleScene

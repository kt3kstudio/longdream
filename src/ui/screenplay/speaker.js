import './message-balloon'
require('../screenplay/punch-emoji')

import {div} from 'dom-gen'

const DEFAULT_SPEECH_TIMEOUT = 5000

/**
 * Speaker is a trait of the component which is able to "speak".
 *
 * Trait.
 */
export default class Speaker {

  /**
   * Sets the speaker data.
   * @param {jQuery} elem
   */
  setSpeaker(elem) {
    elem.data('speaker', this)
  }

  /**
   * Speaks the phrase
   *
   * @param {string} message The contents of the speech
   * @fires 'speech.started' when the speech started
   * @fires 'speech.ended' when the speech ended
   */
  speak(message) {
    this.elem.trigger('speech.started')

    const timeout = +this.elem.data('speech-timeout') || DEFAULT_SPEECH_TIMEOUT

    return div({data: {
      message,
      timeout,
      target: this.elem,
      'skip-target': this.elem
    }}).cc('message-balloon').trigger('message-balloon.start').once('message-balloon.ended')
    .then(() => this.elem.trigger('speech.ended'))
  }
}

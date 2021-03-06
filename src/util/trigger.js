/**
 * Triggers the custom event on the given dom.
 * @param {HTMLElement} dom The element
 * @param {string} type The type of event
 * @param {Object} params The detail option
 */
const trigger = (dom, type, params, bubbles = true) => {
  const el = $(dom)[0]

  el.dispatchEvent(new CustomEvent(type, {
    detail: params || {},
    bubbles
  }))
}

/**
 * No bubble shorthand of bubble
 */
const triggerNoBubble = (dom, type, params) => {
  trigger(dom, type, params, false)
}

module.exports = trigger
module.exports.triggerNoBubble = triggerNoBubble

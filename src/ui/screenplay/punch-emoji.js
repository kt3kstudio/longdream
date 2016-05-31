const {wait} = require('spn')
const {component, event} = $.cc

/**
 * Emoji character component.
 */
@component('punch-emoji')
export default class PunchEmoji {

    constructor(elem) {
        elem.css('opacity', 0)
    }

    @event('puncher.appended')
    onAppended() {
        wait(100).then(() => this.elem.css('opacity', 1))
    }
}

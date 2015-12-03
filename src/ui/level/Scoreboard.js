/**
 * Scoreboard handles the behaviour of the score board of the level view.
 *
 * @class
 * @extends domain.common.DimensionalBeing
 */
ui.level.Scoreboard = subclass(domain.common.DimensionalBeing, function (pt, parent) {
    'use strict'

    pt.ratioX = 0
    pt.ratioY = 0

    pt.marginX = 6
    pt.marginY = 6

    /**
     * @constructor
     */
    pt.constructor = function () {

        parent.constructor.apply(this, arguments)

        this.score = 0

    }

    pt.showAnim = new domain.common.Animation('bom-appear', 400)
    pt.hideAnim = new domain.common.Animation('bom-disappear', 400)

    /**
     * Set up the initial dom state.
     */
    pt.willShow = function () {

        parent.willShow.call(this)

        this.elem.css('line-height', this.dimension.actualHeight() + 'px')

        this.update()

    }

    /**
     * Updates the scoreboard's number.
     */
    pt.update = function () {

        this.elem.text(window.commaNumber(this.score))

    }

    /**
     * Add the score to the total score.
     *
     * @param {Number} score The score to add
     */
    pt.addScore = function (score) {

        this.score += score

        this.update()

    }

    /**
     * Gets the current score.
     *
     * @return {Number}
     */
    pt.getScore = function () {

        return this.score

    }

})

$.cc.assign('scoreboard', ui.level.Scoreboard)

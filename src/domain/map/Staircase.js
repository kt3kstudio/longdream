

/**
 * Staircase class represents the staircases in the map view.
 */
domain.map.Staircase = subclass(domain.map.WallObject, function (pt, parent) {
    'use strict';

    var STAIRCASE_ANIMATION_DUR = 400;

    pt.appearAnim = 'door-appear';
    pt.appearDur = STAIRCASE_ANIMATION_DUR;

    pt.disappearAnim = 'door-disappear';
    pt.disappearDur = STAIRCASE_ANIMATION_DUR;


    pt.constructor = function (elem) {
        parent.constructor.call(this, elem);

        this.nextPosition = elem.data('goto'); // must be parsed position object, not string

    };


    /**
     * Sets up the dom.
     */
    pt.setupDom = function () {

        parent.setupDom.call(this);

        var that = this;

        this.elem.one('click', function () {

            that.doorKnock();

        });

    };


    /**
     */
    pt.onGetWalker = function () {

        this.elem.trigger('reload');

    };

});

$.assignClass('staircase', domain.map.Staircase);

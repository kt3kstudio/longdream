/**
 * @class
 * WallObject is an abstract class which represents the something on the wall in the map view.
 */
domain.map.WallObject = (function ($) {
    'use strict';

    var exports = function () {
    };

    var woPt = exports.prototype;

    woPt.setParent = function (parent) {
        this.parent = parent;

        return this;
    };

    woPt.setPos = function (pos) {
        this.x = pos[0];
        this.y = pos[1];

        return this;
    };

    woPt.rightLimit = function () {
        return this.x + this.w;
    };

    woPt.centerX = function () {
        return this.x + this.w / 2;
    };

    woPt.centerY = function () {
        return this.y + this.h;
    };

    woPt.setSize = function (size) {
        this.w = size[0];
        this.h = size[1];

        return this;
    };

    woPt.setCharLocateService = function (cls) {
        this.cls = cls;

        return this;
    };

    woPt.createDom = function () {
        return $('<div />').css({
            backgroundColor: 'black',
            opcaity: 0,
        });
    };

    woPt.appear = function () {
        this.$dom = this.$dom || this.createDom().width(this.w).height(this.h).offset({left: this.x, top: this.y}).appendTo(this.parent);

        return this.$dom.anim(this.appearAnim, this.appearDur);
    };

    woPt.disappear = function () {
        var that = this;

        return this.$dom.anim(this.disappearAnim, this.disappearDur).then(function () {
            that.$dom.remove();
        });
    };

    woPt.open = function () {
    };

    woPt.close = function () {
    };

    return exports;
}(window.jQuery));

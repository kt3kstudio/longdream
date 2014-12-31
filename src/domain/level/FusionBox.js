/**
 * @class
 *
 * FusionService performs the fusion of the pair of cells.
 */
domain.level.FusionService = (function () {
    'use strict';

    var exports = function (metrics) {
        this.metrics = metrics;
    };

    var fusionPt = exports.prototype;


    /**
     * Performs fusion.
     *
     * @param {domain.level.FusionPair} pair The pair
     * @return {Promise<domain.level.Wanderer>} The new cell
     */
    fusionPt.performFusion = function (pair) {

        var that = this;

        return this.getToReactor(pair).then(function () {

            return that.fusion(pair);

        });
    };


    /**
     * Makes the pair go to the reactor.
     *
     * @private
     * @param {domain.level.FusionPair} pair The pair going to fusion reactor.
     * @return {Promise}
     */
    fusionPt.getToReactor = function (pair) {
        var dur = 1000;

        if (pair.right) {

            pair.right.$dom.anim('get-to-reactor-right', dur).then(function () {

                return pair.right.remove();

            });

        }

        return pair.left.$dom.anim('get-to-reactor-left', dur).then(function () {

            pair.left.remove();

        });

    };


    /**
     * Perform cell fusion.
     *
     * @private
     * @param {domain.level.FusionPair} pair The pair
     * @return {Promise<domain.level.Wanderer>} The new cell
     */
    fusionPt.fusion = function (pair) {
        var dur = 600;

        var bom = new domain.level.Wanderer(0, 0, pair.newGene(), this.metrics.left, this.metrics.top, this.metrics.unit);

        bom.locate();

        bom.$dom.prependTo('#main');

        bom.isLastOne = pair.isLastOne();

        return bom.$dom.anim('bom-born', dur).then(function () {

            return bom;

        });
    };

    return exports;

}());

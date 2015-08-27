/**
 * FieldCells class represents the grid positioned queues of cells around the field.
 *
 * @class
 * @extends $.CC.Role
 */
domain.level.CellCollection = subclass($.CC.Role, function (pt, parent) {
    'use strict';

    /**
     * @constructor
     * @param {Object} dimension The cell dimension
     * @param {String|HTMLElement} dom The dom to put Cell's dom
     */
    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        this.cells = [];

    };

    /**
     * @param {domain.level.Dimension} dimension
     */
    pt.setDimension = function (dimension) {

        this.dimension = dimension;

        return this;

    };

    /**
     * Create a cell from a bom object.
     *
     * @param {Object} bom The bom object
     * @return {domain.level.Cell}
     */
    pt.createCellFromObject = function (bom) {

        return new domain.level.Cell(

            bom.gene,
            this.elem

        );

    };

    /**
     * Checks if the field is empty.
     *
     * @return {Boolean}
     */
    pt.isEmpty = function () {

        return this.cells.length === 0;

    };


    /**
     * Loads field cells from object list.
     *
     * @param {Array} list The list of cells (Object)
     * @return {domain.level.FieldCells}
     */
    pt.loadFromObjectList = function (list) {

        return this.loadList(list.map(function (obj) {

            return this.createCellFromObject(obj);

        }, this));

    };

    /**
     * Loads field cells from cell list.
     *
     * @param {Array} list The list of cells (domain.level.Cell)
     * @return {domain.level.FieldCells}
     */
    pt.loadList = function (list) {

        var indices = new util.FieldIndexGenerator().generate(list.length, this.usedIndices());

        list.forEach(function (cell, i) {

            cell
            .setXY(indices[i])
            .setDimension(this.dimension)
            .unsetLastOne();

            this.cells.push(cell);

        }, this);

        return this;
    };


    /**
     * Appears all the cells
     *
     * @return {Promise} The promise which resolves with the last cell when it resolved
     */
    pt.appear = function () {

        return this.cells.map(function (cell, i) {

            return wait(i * 56).then(function () {

                cell.appear();

            });

        }).pop();

    };


    /**
     * Reset the shapes of the cells and locate them.
     */
    pt.resetShapeAndLocate = function () {

        return this.cells.map(function (cell, i) {

            return wait(i * 56).then(function () {

                return cell.resetShapeAndLocate();

            });

        }).pop();

    };


    /**
     * Selects all the cells at the position.
     *
     * @param {Object} pos The position
     * @return {Array}
     */
    pt.select = function (pos) {

        return this.cells.filter(function (cell) {

            return cell.x === pos.x && cell.y === pos.y;

        });

    };


    /**
     * Finds a cell at the position.
     *
     * @param {Object} pos The position.
     * @return {domain.level.Cell}
     */
    pt.find = function (pos) {

        var candidates = this.select(pos);

        if (candidates.length === 0) {
            return null;
        }

        return candidates[0];

    };


    /**
     * Selects the cells below the given postion.
     *
     * @param {Object} pos The position
     * @return {Array}
     */
    pt.selectRange = function (pos) {
        return this.cells.filter(function (cell) {
            return cell.x === pos.x && cell.y > pos.y;
        });
    };

    /**
     * Removes the given cells.
     *
     * @param {Array} cells The cells
     */
    pt.remove = function (cells) {
        this.cells = this.cells.filter(function (cell) {
            return cells.indexOf(cell) < 0;
        });
    };

    /**
     * Returns the list of used position indices.
     *
     * @return {Array}
     */
    pt.usedIndices = function () {

        return this.cells.map(function (cell) {
            return [cell.x, cell.y];
        });

    };

});

$.CC.assign('cell-collection', domain.level.CellCollection);
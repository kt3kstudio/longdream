/**
 * PlayScene controlls the main playing scene of the level page.
 *
 * @class
 * @extends domain.common.Role
 */
scene.level.PlayScene = subclass(scene.level.Context, function (pt) {
    'use strict'

    /**
     * Initializes the scene.
     */
    pt.init = function () {

        this.character = this.getCharacter().character
        this.level = this.elem.cc.get('intro-scene').level

        // models
        this.cells = this.elem.cc.get('cell-collection')
        this.cells.setGrid(this.getDimensionFactory().playGrid())
        this.cells.loadFromObjectList(this.level.cells.cells)

        this.getField().setRect(this.getDimensionFactory().fieldRect())

        // services
        this.fps = new domain.level.FusionPreparationService(this.getDimensionFactory().evalRoomGrid())
        this.fusionService = this.elem.cc.get('fusion-service').setGrid(this.getDimensionFactory().fusionBoxGrid())
        this.exitQueue = new domain.level.ExitQueue(this.getDimensionFactory().queueGrid())

        // services
        this.bms = new domain.level.BallMoveMobLeaveService(this.getBall(), this.cells)

        // init scoreboard dimension
        this.getScoreboard().setRect(this.getDimensionFactory().scoreboardRect())

        var that = this

        this.start().then(function (playerWon) {

            that.end(playerWon)

        })

    }.event('play-scene-start')

    /**
     * Records the stream of the directions.
     *
     * @param {Rx.Observable<String>} dirs
     */
    pt.recordDirStream = function (dirStream) {

        var self = this

        dirStream.forEach(function (dir) {

            self.character.playingState.add(dir)

            self.character.savePlayingState()

        })

    }

    /**
     * Binds event handlers to the stream.
     *
     * @param {Rx.Observable} dirStream The stream of directions
     * @return {Promise}
     */
    pt.playLoop = function (dirStream) {

        var that = this

        var cellStream = this.bms.processDirStream(dirStream)

        var fusionPairStream = this.fps.processCellStream(cellStream)

        fusionPairStream = this.getScoreboard().hookToFusionPairStream(fusionPairStream)

        var newCellStream = this.fusionService.processFusionPairStream(fusionPairStream)

        var releasedCellListStream = this.exitQueue.processNewCellStream(newCellStream)

        return releasedCellListStream.pipe(function (cells) {

            that.character.playingState.bump()

            return that.cells.loadList(cells).resetShapeAndLocate()

        }).getPromise()

    }

    /**
     * Starts the scene.
     *
     * @return {Promise}
     */
    pt.start = function () {

        var that = this

        this.getScoreboard().show()
        this.getMenuButton().show()

        return this.getField().show().then(function () {

            return that.getCharacter().speechEndPromise

        }).then(function () {

            return that.character.reloadPlayingState()

        }).then(function () {

            return that.cells.appear()

        }).then(function () {

            return that.character.playingState.release().reduce(function (promise, round) {

                return promise.then(function () {

                    var dirs = round.map(function (dir, i) { return wait(i * 180, dir) })

                    return that.playLoop(dirs.toFlatStream())

                })

            }, Promise.resolve())

        }).then(function () {

            console.log('user swipe start!')

            var userDirStream = that.getUserSwipeStream()

            that.recordDirStream(userDirStream)

            return that.playLoop(userDirStream)

        }).then(function () {

            console.log('swipe stream finished!')

            that.removeSwipeField()

        })

    }

    /**
     * Gets the stream of direction symbols from the user's swipe operation.
     *
     * @return {Rx.Observable}
     */
    pt.getUserSwipeStream = function () {

        var field = $('.swipe-field')

        return Rx.Observable.merge(
            field.streamOf('swipeup').map('up'),
            field.streamOf('swipedown').map('down'),
            field.streamOf('swipeleft').map('left'),
            field.streamOf('swiperight').map('right')
        )

    }

    /**
     * Removes the swipe field.
     */
    pt.removeSwipeField = function () {

        $('.swipe-field').remove()

    }

    /**
     * Ends the playing scene, clear playing data, and kicks the next scene.
     *
     * @param {Boolean} playerWon True if the player won the game
     */
    pt.end = function (playerWon) {

        this.character.clearPlayingState()

        if (playerWon) {

            this.elem.trigger('play-scene-success')

        } else {

            this.elem.trigger('play-scene-failure')

        }

    }

})

$.cc.assign('play-scene', scene.level.PlayScene)

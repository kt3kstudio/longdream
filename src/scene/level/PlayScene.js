import Context from './Context'

const event = $.cc.event

/**
 * PlayScene controlls the main playing scene of the level page.
 *
 * @class
 * @extends domain.common.Role
 */
class PlayScene extends Context {

    /**
     * The entry point
     */
    @event('main.play-scene')
    main() {

        super.main()

    }

    /**
     * Sets up the components.
     */
    setUp() {

        var layout = new scene.level.PlaySceneLayout()

        this.character = this.getCharacter().character
        this.level = this.elem.cc.get('intro-scene').level

        // models
        this.cells = this.elem.cc.get('cell-collection')
        this.cells.setGrid(layout.playGrid())
        this.cells.loadFromObjectList(this.level.cells.cells)

        this.getField().setRect(layout.fieldRect())

        // services
        this.fps = new domain.level.FusionPreparationService(layout.evalRoomGrid())
        this.fusionService = this.elem.cc.get('fusion-service').setGrid(layout.fusionBoxGrid())
        this.exitQueue = new domain.level.ExitQueue(layout.queueGrid())

        // ball move service
        this.bms = new domain.level.BallMoveMobLeaveService(this.getBall(), this.cells)

        // init scoreboard dimension
        this.getScoreboard().setRect(layout.scoreboardRect())

    }

    /**
     * Records the stream of the directions.
     *
     * @param {Rx.Observable<String>} dirs
     */
    recordDirStream(dirStream) {

        dirStream.forEach(function (dir) {

            this.character.playingState.add(dir)

            this.character.savePlayingState()

        })

    }

    /**
     * Hooks the playing state bump to the stream
     *
     * @param {Rx.Observable} stream The stream
     * @return {Rx.Observable}
     */
    hookPlayingStateBumping(stream) {

        return stream.filter(function () {

            this.character.playingState.bump()

            return true

        })

    }

    /**
     * Binds event handlers to the stream.
     *
     * @param {Rx.Observable} dirStream The stream of directions
     * @return {Promise}
     */
    playLoop(dirStream) {

        var cellStream = this.bms.processDirStream(dirStream)

        var fusionPairStream = this.fps.processCellStream(cellStream)

        fusionPairStream = this.getScoreboard().hookToFusionPairStream(fusionPairStream)

        var newCellStream = this.fusionService.processFusionPairStream(fusionPairStream)

        var releasedCellStream = this.exitQueue.processNewCellStream(newCellStream)

        releasedCellStream = this.hookPlayingStateBumping(releasedCellStream)

        return this.cells.processCellStream(releasedCellStream).getPromise()

    }

    /**
     * Replays the saved playing state.
     *
     * @return {Promise}
     */
    replayRounds() {

        return this.character.playingState.rounds.reduce((promise, round) =>

            promise.then(() =>

                this.playLoop(round.map((dir, i) => wait(i * 180, dir)).toFlatStream())

            ), Promise.resolve()

        )

    }

    /**
     * @return {Promise}
     */
    userPlay() {

        var userDirStream = this.getUserSwipeStream()

        this.recordDirStream(userDirStream)

        return this.playLoop(userDirStream)

    }

    /**
     * Starts the scene.
     *
     * @return {Promise}
     */
    start() {

        this.getScoreboard().show()
        this.getMenuButton().show()

        return this.getField().show()

        .then(() => this.getCharacter().speechEndPromise)

        .then(() => this.character.reloadPlayingState())

        .then(() => this.cells.appear())

        .then(() => this.replayRounds())

        .then(() => this.userPlay())

        .then(() => this.removeSwipeField())

        .then(() => this.elem.trigger('finish.play-scene'))

    }

    /**
     * Gets the stream of direction symbols from the user's swipe operation.
     *
     * @return {Rx.Observable}
     */
    getUserSwipeStream() {

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
    removeSwipeField() {

        $('.swipe-field').remove()

    }

    /**
     * Ends the playing scene, clear playing data, and kicks the next scene.
     *
     * @param {Event} e The event object (unused)
     * @param {Boolean} playerWon True if the player won the game
     */
    @event('finish.play-scene')
    finish(e, playerWon) {

        this.character.clearPlayingState()

        this.elem.trigger(playerWon ? 'play-scene-success' : 'play-scene-failure')

    }

}

$.cc.assign('play-scene', PlayScene)

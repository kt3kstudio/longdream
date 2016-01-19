/**
 * The common context for level scenes.
 *
 * @class
 * @extends domain.common.Role
 */
export default class Context extends domain.common.SceneContext {

    /**
     * Gets the menu button.
     *
     * @return {ui.common.MenuButton}
     */
    getMenuButton() {

        return this.getGlobal('.menu-button-root', 'menu-button')

    }

    /**
     * Gets the field grid.
     *
     * @return {domain.level.Field}
     */
    getField() {

        return this.get('field-grid')

    }

    /**
     * Gets the character.
     *
     * @return {domain.level.Character}
     */
    getCharacter() {

        return this.get('character-on-level')

    }

    /**
     * Gets the ball
     *
     * @return {domain.level.Ball}
     */
    getBall() {

        return this.get('ball')

    }

    /**
     * Gets the paper.
     *
     * @return {domain.level.Paper}
     */
    getPaper() {

        return this.get('paper')

    }

    /**
     * Gets the scoreboard.
     *
     * @return {ui.level.Scoreboard}
     */
    getScoreboard() {

        return this.get('scoreboard')

    }

    /**
     * Gets the result pane.
     *
     * @return {ui.level.ResultPane}
     */
    getResultPane() {

        return this.get('result-pane')

    }

}

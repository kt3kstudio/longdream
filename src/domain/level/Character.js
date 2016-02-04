import CharSprite from '../common/CharSprite'
import Speaker from '../common/Speaker'
import {traits} from 'traits-decorator'

/**
 * The main character on the level scene.
 */
@traits(Speaker)
@$.cc.Component('character-on-level')
export default class Character extends CharSprite {

    /**
     * @param {number} dur The duration
     */
    willShow(dur) {

        super.willShow(dur)

        this.elem.css('display', 'inline')

    }

    /**
     * @param {number} dur The duration
     */
    didHide(dur) {

        super.didHide(dur)

        this.elem.css('display', 'none')

    }

}

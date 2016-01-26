import './menu-item'

const TRANS_DUR = 800
const R = 60 // radius of menu item arrangment


/**
 * Culculates item offsets of the given number
 *
 * @param {Object} offset The root position
 * @param {number} num The number of items
 * @return {Object[]}
 */
function itemOffsets(offset, num) {

    var result = []

    var gutter = Math.PI / 4 / num / num

    var urad = num > 1 ? (Math.PI / 2 - gutter * 2) / (num - 1) : 0

    var r = R * Math.sqrt(num)

    for (var i = 0; i < num; i++) {

        var rad = urad * i
        var cos = r * Math.cos(rad + gutter)
        var sin = r * Math.sin(rad + gutter)

        var res = {left: offset.left + cos, top: offset.top - sin}

        result.push(res)

    }

    return result

}

/**
 * MenuButton handles the behaviour of the menu button.
 */
class MenuButton extends $.cc.Coelement {

    constructor(elem) {

        super(elem)

        this.closed = true

        this.menus = this.getMenuItemSource().map(menu => this.createMenuItem(menu))

    }

    /**
     * Gets item source doms.
     *
     * @return {jQuery[]}
     */
    getMenuItemSource() {

        if (this.elem.data('menu')) {

            return this.elem.data('menu')

        }

        if (this.elem.attr('menu')) {

            return $('#' + this.elem.attr('menu')).children().toArray()

        }

        throw new Error('no menu')

    }

    /**
     * Sets the offset.
     *
     * @param {Number} offset.left The left offset
     * @param {Number} offset.top The top offset
     */
    setOffset(offset) {

        this.menus.forEach(menu => menu.setOffset(offset))

    }

    /**
     * Shows the menu button.
     *
     * @return {Promise}
     */
    show() {

        this.elem.removeClass('hidden')

        return wait(TRANS_DUR).then(() => this.setOffset(this.elem.offset()))

    }

    /**
     * Hides the menu button.
     *
     * @return {Promise}
     */
    hide() {

        return this.closeMenu()

        .then(() => wait(300))

        .then(() => {

            this.elem.addClass('hidden')

            return wait(TRANS_DUR)

        })

    }

    /**
     * Opens the menu.
     *
     * @return {Promise}
     */
    openMenu() {

        this.closed = false

        var toOffsets = itemOffsets(this.elem.offset(), this.menus.length)

        return Promise.all(this.menus.map((menu, i) => wait(50 * i).then(() => menu.show(toOffsets[i]))))

    }

    /**
     * Closes the menu.
     *
     * @return {Promise}
     */
    closeMenu(offset) {

        if (this.closed) {

            return Promise.resolve()

        }

        this.closed = true

        offset = offset || this.elem.offset()

        return Promise.all(this.menus.map(menu => menu.hide(offset)))

    }

    /**
     * Toggles the menu's open/close state.
     */
    @$.cc.event('click')
    toggleMenu() {

        return this.closed ? this.openMenu() : this.closeMenu()

    }

    /**
     * Creates a menu item from menu source item.
     *
     * @private
     * @param {jQuery} menu
     */
    createMenuItem(menu) {

        menu = $(menu)

        return $('<img />', {

            attr: {
                src: menu.attr('src')
            },
            addClass: 'hidden',
            insertBefore: this.elem,
            data: {
                menu: menu.children().toArray(),
                onclick: menu.attr('onclick')
            }

        }).cc.init('menu-item')

    }

}

$.cc.assign('menu-button', MenuButton)
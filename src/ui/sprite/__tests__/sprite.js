const { Image, DirStateImageMap } = require('spn')
const Sprite = require('../sprite')
const { traits } = require('traits-decorator')
const { img } = require('dom-gen')

describe('Sprite', () => {
  let sprite, elem

  @traits(Sprite)
  class MySprite {
    constructor () {
      this.dirStateImage = new DirStateImageMap()
      this.dirStateImage.addImageByDirState(new Image('up-run.svg'), 'up', 'run')
      this.dirStateImage.addImageByDirState(new Image('up-stay.svg'), 'up', 'stay')
      this.dirStateImage.addImageByDirState(new Image('down-run.svg'), 'down', 'run')
      this.dirStateImage.addImageByDirState(new Image('down-stay.svg'), 'down', 'stay')
    }

    defaultDir () { return 'up' }

    defaultState () { return 'stay' }

    dirStateImage () {
      return {}
    }
  }

  capsid.def('my-sprite', MySprite)

  beforeEach(() => {
    elem = img()

    sprite = elem.cc.init('my-sprite')
  })

  describe('willShow', () => {
    it("sets the default state & dir image to the elem's src attr", () => {
      sprite.updateElemByDirState()

      expect(sprite.elem.attr('src')).to.equal('up-stay.svg')
    })
  })

  describe('setDirState', () => {
    it('changes the image of elem according to the given dir and state', () => {
      sprite.setDirState('up', 'run')
      expect(sprite.elem.attr('src')).to.equal('up-run.svg')

      sprite.setDirState('up', 'stay')
      expect(sprite.elem.attr('src')).to.equal('up-stay.svg')

      sprite.setDirState('down', 'run')
      expect(sprite.elem.attr('src')).to.equal('down-run.svg')

      sprite.setDirState('down', 'stay')
      expect(sprite.elem.attr('src')).to.equal('down-stay.svg')
    })

    it('throws error when the image unavailable', () => {
      expect(() => {
        sprite.setDirState('foo', 'bar')
      }).to.throw(Error)
    })

    it('throws error when the dir state image is not set at all', () => {
      sprite.dirStateImage = new DirStateImageMap([])

      expect(() => {
        sprite.setDirState('up', 'run')
      }).to.throw(Error)
    })
  })
})

/**
 * SplashScene controls the splash screen.
 */
domain.splash.SplashScene = subclass($.cc.Coelement, function (pt) {
    'use strict'

    pt.main = function () {
        var self = this

        return this.performSplash('studio').then(function () {
            return self.performSplash('straw')
        }).then(function () {
            return self.goToTitle()
        })
    }.event('scene-start')

    /**
     * Performs splash scene animation for the give class name element.
     */
    pt.performSplash = function (className) {
        return this.elem.find('.splash-logo.' + className).cc.get('splash-logo').perform()
    }

    /**
     * The scene goes to the title.
     */
    pt.goToTitle = function () {
        location.replace('title.html')
    }.event('click', '.splash-logo')
})

$.cc.assign('splash-scene', domain.splash.SplashScene)

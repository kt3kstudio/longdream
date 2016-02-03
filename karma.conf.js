'use strict'

module.exports = function (config) {
    config.set({
        frameworks: ['mocha', 'chai', 'jsmockito-jshamcrest', 'browserify'],
        files: [
            'site/js/common.js',
            'site/js/splash.js',
            'site/js/title.js',
            'site/js/map.js',
            'site/js/level.js',
            'spec/helper/polyfill.js',
            'spec/helper/reset.js',
            'spec/**/*.js'
        ],
        preprocessors: {
            'site/**/*.js': ['browserify'],
            'spec/**/*.js': ['browserify']
        },
        browserify: {
            debug: true,
            transform: [require('browserify-istanbul')({
                instrumenter: require('isparta'),
                ignore: ['**/spec/**']
            }), 'babelify']
        },
        coverageReporter: {type: 'lcov'},
        reporters: ['spec', 'coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
        singleRun: true
    })
}

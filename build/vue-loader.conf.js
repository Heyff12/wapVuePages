'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction ?
    config.build.productionSourceMap :
    config.dev.cssSourceMap

module.exports = {
    loaders: utils.cssLoaders({
        sourceMap: sourceMapEnabled,
        extract: isProduction
    }),
    cssSourceMap: sourceMapEnabled,
    cacheBusting: config.dev.cacheBusting,
    postcss: [
        require("postcss-px2rem")({
            baseDpr: 2, // base device pixel ratio (default: 2)
            threeVersion: false, // whether to generate @1x, @2x and @3x version (default: false)
            remVersion: true, // whether to generate rem version (default: true)
            remUnit: 75, // rem unit value (default: 75)
            remPrecision: 6 // rem precision (default: 6)
        })
    ],
    transformToRequire: {
        video: ["src", "poster"],
        source: "src",
        img: "src",
        image: "xlink:href"
    }
};
'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
    // const ExtractTextPlugin = require("extract-text-webpack-plugin");
    // var cssLoader = [
    //     // 'style-loader',
    //     {
    //         loader: "css-loader",
    //         options: {
    //             // modules: true, // 为true会将类名打包成hash值
    //             importLoaders: 1 // 前面有几个loader 值就是多少
    //         }
    //     },
    //     {
    //         // 使用postcss时候必须要有选项，并且选项中必须有内容
    //         // 否则会报错：No Postcss config found.
    //         // 具体配置和选项参考：https://github.com/michael-ciniawsky/postcss-load-config
    //         loader: "postcss-loader",
    //         // 配置也可以通过 postcss.config.js 指定
    //         options: {
    //             plugins: loader => [require("autoprefixer")()]
    //         }
    //     }
    // ];

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
})

module.exports = {
    context: path.resolve(__dirname, "../"),
    entry: utils.entry,
    output: {
        path: config.build.assetsRoot,
        filename: "[name].js",
        publicPath: process.env.NODE_ENV === "production" ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: [".js", ".vue", ".json"],
        alias: {
            vue$: "vue/dist/vue.esm.js",
            "@": resolve("src"),
            images: resolve("src/img"),
            css: resolve("src/css")
        }
    },
    module: {
        rules: [
            ...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: [
                    resolve("src"),
                    resolve("test"),
                    resolve("node_modules/webpack-dev-server/client")
                ]
            },
            {
                test: /\.ejs$/,
                loader: "ejs-loader",
                include: [resolve("src")]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: utils.assetsPath("img/[name].[hash:7].[ext]")
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: utils.assetsPath("media/[name].[hash:7].[ext]")
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
                }
            }
            // {
            //     test: /\.css$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: "style-loader",
            //         use: cssLoader
            //     }),
            //     // use: [
            //     //     "style-loader",
            //     //     { loader: "css-loader", options: { importLoaders: 1 } },
            //     //     {
            //     //         loader: "postcss-loader",
            //     //         options: {
            //     //             plugins: [
            //     //                 require("postcss-px2rem")({
            //     //                     baseDpr: 2, // base device pixel ratio (default: 2)
            //     //                     threeVersion: false, // whether to generate @1x, @2x and @3x version (default: false)
            //     //                     remVersion: true, // whether to generate rem version (default: true)
            //     //                     remUnit: 75, // rem unit value (default: 75)
            //     //                     remPrecision: 6 // rem precision (default: 6)
            //     //                 })
            //     //             ]
            //     //         }
            //     //     }
            //     // ],
            //     include: [resolve("src"), resolve("node_modules/mint-ui/lib")]
            // }
        ]
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: "empty",
        fs: "empty",
        net: "empty",
        tls: "empty",
        child_process: "empty"
    }
};
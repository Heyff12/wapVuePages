'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

// const devWebpackConfig = merge(baseWebpackConfig, {
//     module: {
//         rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
//     },
//     // cheap-module-eval-source-map is faster for development
//     devtool: config.dev.devtool,

//     // these devServer options should be customized in /config/index.js
//     devServer: {
//         clientLogLevel: 'warning',
//         historyApiFallback: {
//             rewrites: [
//                 { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
//             ],
//         },
//         hot: true,
//         contentBase: false, // since we use CopyWebpackPlugin.
//         compress: true,
//         host: HOST || config.dev.host,
//         port: PORT || config.dev.port,
//         open: config.dev.autoOpenBrowser,
//         overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
//         publicPath: config.dev.assetsPublicPath,
//         proxy: config.dev.proxyTable,
//         quiet: true, // necessary for FriendlyErrorsPlugin
//         watchOptions: {
//             poll: config.dev.poll,
//         }
//     },
//     plugins: [
//         new webpack.DefinePlugin({
//             'process.env': require('../config/dev.env')
//         }),
//         new webpack.HotModuleReplacementPlugin(),
//         new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
//         new webpack.NoEmitOnErrorsPlugin(),
//         // https://github.com/ampedandwired/html-webpack-plugin
//         // new HtmlWebpackPlugin({
//         //     filename: 'index.html',
//         //     template: 'index.html',
//         //     inject: true
//         // }),
//         // copy custom static assets
//         new CopyWebpackPlugin([{
//             from: path.resolve(__dirname, '../static'),
//             to: config.dev.assetsSubDirectory,
//             ignore: ['.*']
//         }])
//     ]
// })

const devWebpackConfigBase = {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.dev.cssSourceMap,
            usePostCSS: true
        })
    },
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,

    // these devServer options should be customized in /config/index.js
    devServer: {
        clientLogLevel: "warning",
        historyApiFallback: {
            rewrites: [{
                from: /.*/,
                to: path.posix.join(config.dev.assetsPublicPath, "index.html")
            }]
        },
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: false, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": require("../config/dev.env")
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: 'index.html',
        //     inject: true
        // }),
        // copy custom static assets
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, "../static"),
            to: config.dev.assetsSubDirectory,
            ignore: [".*"]
        }])
    ]
};

// var pages = [];
// for (let key in utils.entry) {
//     pages.push(key);
// }
// console.log(pages)//[ 'home', 'login', 'partner' ]

var appConfig = require("../appConfig");
appConfig.pages.forEach(function(page) {
    var conf = {
        template: page.template || "src/templates/vue.ejs", // html模板路径
        title: page.title || "钱方分期",
        filename: page.filename + ".html", // 生成的html存放路径,文件名，相对于path
        chunks: [page.filename],
        inject: true, // //js插入的位置
        // hash: true,
        minify: {
            // 压缩HTML文件
            removeComments: false, // 移除HTML中的注释
            collapseWhitespace: false // 删除空白符与换行符
        },
        RUN_ENV: utils.env
    };
    devWebpackConfigBase.plugins.push(new HtmlWebpackPlugin(conf));
});
const devWebpackConfig = merge(baseWebpackConfig, devWebpackConfigBase);


module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
                // add port to devServer config
            devWebpackConfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
                },
                onErrors: config.dev.notifyOnErrors ?
                    utils.createNotifierCallback() : undefined
            }))

            resolve(devWebpackConfig)
        }
    })
})
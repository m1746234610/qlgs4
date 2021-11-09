const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const portfinder = require('portfinder'); //用于检索端口号
const baseConfig = require('./base.config');
const webpackMerge = require('webpack-merge');//允许连接数组并合并对象，而不是覆盖组合
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const os = require('os');
const TEMPLATE_DIR = process.env.npm_config_dir;
process.env.TEMPLATE_DIR = TEMPLATE_DIR;
console.log(TEMPLATE_DIR,"TEMPLATE_DIR ");
let response = null;
let responseData = null;
function resolve(p) {
    return path.resolve(__dirname, '../', p);
}
// 获得网络接口列表
function getNetworkIp() {
    let needHost = '';
    try {
        let network = os.networkInterfaces();
        for (let dev in network) {
            let iface = network[dev];
            for (let i = 0; i < iface.length; i++) {
                let alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    needHost = alias.address;
                }
            }
        }
    } catch (e) {
        needHost = 'localhost';
    }
    return needHost;
}
portfinder.basePort = 8081;
module.exports = function (env, arg) {
    return portfinder.getPortPromise()
        .then(port => {
            let vconsole = null;
            if (env && env.vconsole) {
                vconsole = env.vconsole;
            }
            return webpackMerge(baseConfig(vconsole, resolve(path.join('dist/'+TEMPLATE_DIR+'/resources'))), {
                mode: "development",
                devtool: 'inline-source-map',
                target: 'web',
                output: {
                    crossOriginLoading: 'anonymous',
                    path: resolve(path.join('dist/'+TEMPLATE_DIR)),
                    filename: 'index.js'
                },
                watchOptions: {
                    ignored: /node_modules/
                },
                devServer: {
                    contentBase:path.join(__dirname,'../',path.join('public/'+TEMPLATE_DIR)),
                    port: port,
                    hot:true,
                    host:getNetworkIp(),
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    },
                    open: true,
                    allowedHosts: [
                        'localhost',
                    ]

                },
                plugins: [
                    new HtmlWebpackPlugin({
                        template: resolve(path.join('public/index.html')),
                        templateParameters: {//允许覆盖模板中使用的参数
                            vconsole,
                            title:TEMPLATE_DIR,//动态写入title
                            timestamp: new Date(),//模板中显示编译时间
                        },
                        // filename:'../../index.html',
                        hash : true
                    }),
                    new CopyWebpackPlugin([
                    {
                        from: resolve(path.join('public/common')),
                        to: resolve(`dist/${TEMPLATE_DIR}/common`)
                    },{
                        from: resolve(path.join('public/'+TEMPLATE_DIR)),
                        to: resolve(`dist/${TEMPLATE_DIR}`)
                    },
                    {
                        from: resolve(`public/signal.js`),
                        to: resolve(`dist/${TEMPLATE_DIR}`)
                    }]),
                    //ProgressPlugin:显示构建速度
                    // new webpack.ProgressPlugin((percentage, message, ...args) => {
                    //     if (percentage === 1) {
                    //         //编译完成之后回复请求
                    //         if (response) {
                    //             response.set({"Access-Control-Allow-Origin": "*"})
                    //             response.send(responseData);
                    //             response.end();
                    //             response = null;
                    //         }
                    //     }
                    // })
                ],
            })
        })
}
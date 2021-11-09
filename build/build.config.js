const path = require('path');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseConfig = require('./base.config');
const TEMPLATE_DIR = process.env.npm_config_dir;
function resolve(p) {
    return path.resolve(__dirname, '../', p);
}
module.exports = function (env, arg) {
    let vconsole = null;
    if (env && env.vconsole) {
        vconsole = env.vconsole;
    }
    return webpackMerge(baseConfig(vconsole,resolve(path.join('dist/'+TEMPLATE_DIR+'/resources'))), {
        mode: "production",
        target: 'web',
        output: {
            filename: 'index.[chunkhash].js',
            path: path.resolve(__dirname, '../', path.join('dist/'+TEMPLATE_DIR+'/code/js'))
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: resolve(path.join('public/index.html')),
                templateParameters: {//允许覆盖模板中使用的参数
                    vconsole,
                    title:TEMPLATE_DIR,//动态写入title
                    timestamp: new Date(),//模板中显示编译时间
                },
                filename:'../../index.html',
                hash : true
            }),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [resolve(`dist/${TEMPLATE_DIR}`)]
            }),
            new CopyWebpackPlugin([
                {
                    from: resolve(`public/${TEMPLATE_DIR}/resources`),
                    to: resolve(`dist/${TEMPLATE_DIR}/resources`)
                },
                {
                    from: resolve(`public/common`),
                    to: resolve(`dist/${TEMPLATE_DIR}/common`)
                },
                {
                    from: resolve(`public/signal.js`),
                    to: resolve(`dist/${TEMPLATE_DIR}`)
                }])
        ]
    });
}
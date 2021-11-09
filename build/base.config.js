const fs = require('fs');
const babel = require('babel-core');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;//对包体积进行可视化分析
const path = require('path');
const TEMPLATE_DIR = process.env.npm_config_dir;
const NODE_ENV = process.env.NODE_ENV;
function resolve(p) {
    return path.resolve(__dirname, '../', p);
}
module.exports = function (vconsole,jsonPath) {
    return {
        entry:['babel-polyfill',`./src/template/${TEMPLATE_DIR}/index.js`],
        module: {
            rules: [
                {
                    test: /\.js?$/,
                    loader: "babel-loader",
                    exclude: /(node_modules|bower_components)/,
                    options: {
                        presets: ["@babel/preset-env"]
                    },
                }]
        },
        resolve:{
            alias: {
                '@': resolve(__dirname, "src"),
            }
         },
        plugins: [
            //new BundleAnalyzerPlugin(),//build模式查看
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin([{
                from: resolve(path.join('public/'+TEMPLATE_DIR+'/resources/resource.json')),
                to: jsonPath,
            },
            {
                from: resolve(path.join('public/'+TEMPLATE_DIR+'/resources/content.json')),
                to: jsonPath,
            }
            ]),
            new webpack.DefinePlugin({
                "process.env": {
                    TEMPLATE_DIR:JSON.stringify(TEMPLATE_DIR),
                    NODE_ENV:JSON.stringify(NODE_ENV)
                }
            })
        ],
        //外部引入的，不要打包
        externals: {
            answer: "AnswerInfo"
        },
        optimization: {
            splitChunks: {
              chunks: 'all',
              name: true,
              cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    filename: '[name].[chunkhash].js',
                }
              }
            }
          }
    }
}

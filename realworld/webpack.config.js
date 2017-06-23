var path = require('path')
var webpack = require('webpack')
// var ExtractTextPlugin = require('extract-text-webpack-plugin')
//把css样式从js文件中分离出来,需要通过命令行安装 extract-text-webpack-plugin 依赖包

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
    ,new webpack.HotModuleReplacementPlugin()
    ,new webpack.NoErrorsPlugin()
    ,new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
        },
        output: {
            comments: false,
        },
    })
    // ,new ExtractTextPlugin("style.css") //提取出来的样式放在style.css文件中
  ],
  module: {
    loaders: [
        {
            test: /\.js$/, // 解析.js文件
            loaders: [ 'babel' ],
            exclude: /node_modules/,
            include: __dirname
        }
        ,{ 
            test: /\.(png|jpg|gif)$/,  //解析图片
            loader: 'url-loader?limit=8192&name=./images/[name].[ext]' //这样在小于8K的图片将直接以base64的形式内联在代码中，可以减少一次http请求。
            // loader: 'file-loader?name=./images/[name].[ext]' // 用于打包文件和图片
        }
        ,{
            test: /\.css$/, // 解析.css文件
            loader:'style!css'
            // loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            // loader: ExtractTextPlugin.extract("style", 'css')
        }
        ,{
            test: /\.scss$/, 
            loader:'style!css!sass'
        //     exclude: /node_modules/,
        //     loader: ExtractTextPlugin.extract('style-loader', 'css!sass?indentedSyntax=true&sourceMap=true')
            // loader: ExtractTextPlugin.extract('style-loader!css-loader')
            // loader: ExtractTextPlugin.extract('style', 'css!sass')
            // 解析.scss文件，对于用 import 或 require 引入的sass文件进行加载，以及<style lang="sass">...</style>声明的内部样式进行加载
            //这里用了样式分离出来的插件，如果不想分离出来，可以直接这样写 loader:'style!css!sass'
        }
    ]

  }
}
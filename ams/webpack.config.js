path=require('path')
webpack=require('webpack')
CleanPlugin=require('clean-webpack-plugin') 
ExtractTextPlugin=require('extract-text-webpack-plugin') // 提取、合并CSS，不压缩
HtmlWebpackPlugin=require('html-webpack-plugin')
path_output=path.join(__dirname,'dist')
is_production=process.env.NODE_ENV === 'production'
// is_production=!is_production
entry=[
    './src/index'
]
output={
    path: path_output
    ,publicPath: '/static/'
    ,chunkFilename: '[name].asyncchunk.[chunkhash].js'
    ,filename: 'bundle'+(is_production?'.[hash]':'')+'.js'
}
plugins=[
    new webpack.HotModuleReplacementPlugin()
    ,new ExtractTextPlugin({ filename: 'bundle'+(is_production?'.[hash]':'')+'.css', disable: false, allChunks: true }) //提取出来的样式放在bundle.css文件中
    ,new CleanPlugin(path_output) // 构建生产环境的时候，清空已存在的dist目录里的文件
    ,new HtmlWebpackPlugin({ // 在dist目录下自动生成index.html
        template: 'src/bundle.html' // 选择一个模板，自动生成的没有viewport description等，更多请参考配置文档
    }) 
]
if(is_production){
    plugins=plugins.concat([ // 补充生产环境要使用的插件
        new webpack.optimize.UglifyJsPlugin({ // 丑化js
            mangle: true,
            compress: {
                warnings: false // Suppress uglification warnings 阻止难看的警告
            },
            output: {
                comments: false
            }
        })
        ,new webpack.LoaderOptionsPlugin({ // css怎么进行压缩呢？就用插件cssnano加这个配置
            minimize: true
        })
    ])
}
rules=[
    {
        test: /\.js$/,
        use: [ 'babel-loader' ],
        exclude: /node_modules/,
        include: __dirname
    }
    ,{
        test: /\.css$/, 
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!postcss-loader' })
    }
    ,{
        test: /\.scss/,
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader!postcss-loader' }) //必须css、sass loader都有，缺一不可，缺sass没法处理sass语法，缺sass没办法转成css

    }
    ,{ 
        test: /\.(png|gif|jpe?g|eot|ttf|woff|woff2|svg)$/i, //解析图片
        use: 'url-loader?limit='+(8*1024)+'&name=./images/[name].[hash].[ext]' //这样在小于8K的图片将直接以base64的形式内联在代码中，可以减少一次http请求。
    }

]
module.exports={
    devtool: 'eval'
    ,module:{
        rules
    }
    ,entry
    ,output
    ,plugins
}
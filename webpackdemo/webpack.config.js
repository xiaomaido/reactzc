"use strict"
const path=require('path')
const path_output=path.join(__dirname,'dist')
const webpack=require('webpack')
const CleanPlugin=require('clean-webpack-plugin') // 构建生产环境的时候，清空dist目录生成的plugin插件
const ExtractTextPlugin=require('extract-text-webpack-plugin') // 提取合并的CSS，但是没有被压缩
const is_production=process.env.NODE_ENV === 'production'
const entry=[
    './src/index'
]
const output={
	path: path_output
	,publicPath: path_output+'/'
	,chunkFilename: '[name].asyncchunk.[chunkhash].js'
	,filename: 'bundle'+(is_production?'.[hash]':'')+'.js'
}
const loaders=[
	{
        test: /\.js/,
        loaders: [ 'babel-loader' ],
        exclude: /node_modules/,
        include: __dirname
    }
    ,{
        test: /\.css$/, 
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
    }
    ,{
        test: /\.scss/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' }) //必须css、sass loader都有，缺一不可，缺sass没法处理sass语法，缺sass没办法转成css
        // loaders: [ 'style-loader','css-loader','sass-loader' ]
    }
    ,{
    	test: /\.html/,
        loaders: [ 'html-loader' ]
    }
    ,{ 
    	test: /\.(png|gif|jpe?g|svg)$/i, //解析图片
        loader: 'url-loader?limit='+(8*1024)+'&name=./images/[name].[ext]' //这样在小于8K的图片将直接以base64的形式内联在代码中，可以减少一次http请求。
    }
]
let plugins=[]
if(!is_production){
    // 补充生产环境要使用的插件
    plugins=plugins.concat([ 
	    new CleanPlugin(path_output) // Cleanup the plugins in dist folder builds before
    	,new webpack.LoaderOptionsPlugin({ // 可以用UglifyJSPlugin可以对js进行压缩，那么css怎么进行压缩呢？就用插件cssnano加这个配置
	      	minimize: true
	    })
	    ,new webpack.optimize.UglifyJsPlugin({ // 丑化
	        mangle: true,
	        compress: {
	            warnings: false // Suppress uglification warnings 阻止难看的警告
	        },
	        output: {
	            comments: false
	        }
	    })
	    ,new webpack.optimize.MinChunkSizePlugin({ // This plugin prevents Webpack from creating chunks that would be too small to be worth loading separately
	        minChunkSize: 20*1024 // 大于20kb的异步chunk才需要单独异步加载
	    })
    	,new webpack.optimize.OccurrenceOrderPlugin() // 出现次数最多的orderID最靠前
	    ,new webpack.DefinePlugin({ // This plugins defines various variables that we can set to false in production to avoid code related to them from being compiledin our final bundle
	        __SERVER__: !is_production,
	        __DEVELOPMENT__: !is_production,
	        __DEVTOOLS__: !is_production,
	        'process.env': {
	            BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
	        },
	    })
    	// ,new webpack.optimize.DedupePlugin() // webpack已经移除DedupePlugin，这个插件本身是因为有些JS库有自己的依赖树，并且这些库可能有交叉的依赖，DedupePlugin可以找出他们并删除重复的依赖
    ])
}
plugins=plugins.concat([
	new webpack.optimize.CommonsChunkPlugin({ // 提取公共代码块
        name: 'asyncchunk', // Move dependencies to our asyncchunk file
        children: true, // Look for common dependencies in all children,
        minChunks: 2, // How many times a dependency must come up before being extracted
	})
	,new ExtractTextPlugin({ filename: 'bundle'+(is_production?'.[hash]':'')+'.css', disable: false, allChunks: true }) //提取出来的样式放在bundle.css文件中
])
module.exports={
	// debug:!is_production
	devtool:'eval'
	,module:{
		loaders
		// ,preLoaders:[{
	 //        test: /\.js/,
	 //        loader: 'eslint',
	 //    }]
	}
	,entry
	,output
	,plugins
	,devServer: {
	    hot: true
	}
}
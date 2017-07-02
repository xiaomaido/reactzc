"use strict"
const path=require('path')
const path_output=path.join(__dirname,'dist')
const webpack=require('webpack')
const CleanPlugin=require('clean-webpack-plugin') // 构建生产环境的时候，清空dist目录生成的plugin插件
const ExtractTextPlugin=require('extract-text-webpack-plugin') // 提取合并的CSS，但是没有被压缩
const HtmlWebpackPlugin=require('html-webpack-plugin')
const CopyWebpackPlugin=require('copy-webpack-plugin')
const autoprefixer=require('autoprefixer') // 补充前缀
const precss=require('precss') // 补充前缀
const is_production=process.env.NODE_ENV === 'production'
// var is_production=process.env.NODE_ENV === 'production'
// is_production=!is_production
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
    	test: /\.html/,
        loaders: [ 'html-loader' ]
    }
    ,{
        test: /\.css$/, 
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!postcss-loader' })
        // loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
    }
    ,{
        test: /\.scss/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' }) //必须css、sass loader都有，缺一不可，缺sass没法处理sass语法，缺sass没办法转成css
        // loaders: [ 'style-loader','css-loader','sass-loader' ]
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
	      	options:{
				// postcss:()=>[autoprefixer({browsers:['last 2 versions']})]
				// postcss:()=>[precss,autoprefixer]
			    // ,devServer: {
			    //     contentBase: "./dist", //本地服务器所加载的页面所在的目录
			    //     colors: true, //终端中输出结果为彩色
			    //     historyApiFallback: true, //不跳转
			    //     inline: true //实时刷新
			    // }
	      	}
	      	,minimize: true
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
	// ,new HtmlWebpackPlugin() // Generates default index.html in dist folder
	// ,new HtmlWebpackPlugin({  // Also generate a test.html 
	// 	filename: 'test.html',
	// 	template: 'src/assets/test.html'
 //    })
	// ,new CopyWebpackPlugin([{
	//     from: __dirname + '/src'
	// }])
])
// Webpack 2 之后的config里不能直接包含自定义配置项
module.exports={
	// debug:!is_production
	devtool:'eval'
	// devtool:'source-map'
	// devtool:'hidden-source-map'
	// devtool:'inline-source-map'
	// devtool:'eval-source-map'
	// devtool:'cheap-source-map'
	// devtool:'cheap-module-source-map' //绝大多数情况下都会是最好的选择，这也是下版本 webpack 的默认选项。
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
	// ,devServer: {
	//     hot: true
	// }
	// ,postcss:()=>[AutoPrefixer({browsers:['last 2 versions']})]
}
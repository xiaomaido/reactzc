"use strict"
const path=require('path')
const path_output=path.join(__dirname,'dist')
const webpack=require('webpack')
const CleanPlugin=require('clean-webpack-plugin') // 构建生产环境的时候，清空dist目录生成的plugin插件
const ExtractTextPlugin=require('extract-text-webpack-plugin') // 提取合并的CSS，但是没有被压缩
const HtmlWebpackPlugin=require('html-webpack-plugin')
const OpenBrowserPlugin=require('open-browser-webpack-plugin')
const autoprefixer=require('autoprefixer') // 补充前缀
const precss=require('precss') // 补充前缀
const port=3713
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
const rules=[
	{
        test: /\.js/,
        use: [ 'babel-loader' ],
        exclude: /node_modules/,
        include: __dirname
    }
    ,{
    	test: /\.html/,
        use: [ 'html-loader' ]
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
    	test: /\.(png|gif|jpe?g|svg)$/i, //解析图片
        use: 'url-loader?limit='+(8*1024)+'&name=./images/[name].[ext]' //这样在小于8K的图片将直接以base64的形式内联在代码中，可以减少一次http请求。
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
    ])
}
plugins=plugins.concat([
	new webpack.optimize.CommonsChunkPlugin({ // 提取公共代码块
        name: 'asyncchunk', // Move dependencies to our asyncchunk file
        children: true, // Look for common dependencies in all children,
        minChunks: 2, // How many times a dependency must come up before being extracted
	})
	,new ExtractTextPlugin({ filename: 'bundle'+(is_production?'.[hash]':'')+'.css', disable: false, allChunks: true }) //提取出来的样式放在bundle.css文件中
	,new HtmlWebpackPlugin() // Generates default index.html in dist folder
	,new OpenBrowserPlugin({
      url: 'http://localhost:'+port+'/'
    })
    ,new webpack.HotModuleReplacementPlugin()

])
// Webpack 2 之后的config里不能直接包含自定义配置项
module.exports={
	devtool:'eval' // 7种sourcemap
	// devtool:'source-map'
	// devtool:'hidden-source-map'
	// devtool:'inline-source-map'
	// devtool:'eval-source-map'
	// devtool:'cheap-source-map'
	// devtool:'cheap-module-source-map' //绝大多数情况下都会是最好的选择，这也是下版本 webpack 的默认选项。
	,module:{
		rules
	}
	,resolve: {
		extensions: [".js", ".json"],
		modules: ['node_modules']
	}
	,entry
	,output
	,plugins
	,devServer: {
		historyApiFallback: true, //不跳转
		contentBase: "./src/", //本地服务器所加载的页面所在的目录
		quiet: false, //控制台中不输出打包的信息
		noInfo: false,
		hot: true, //开启热点
		inline: true, //开启页面自动刷新
		lazy: false, //不启动懒加载
		watchOptions: {
		aggregateTimeout: 300
		},
		host: 'localhost',
		port: port, //设置端口号
		//代理其实很简单的，只要配置这个参数就可以了
		proxy: {

		}
	}
}
"use strict"
const path = require('path')
const webpack = require('webpack')
const is_production = process.env.NODE_ENV === 'production'
const entry=[
    './src/index'
]
const output={
	path: path.join(__dirname, 'dist')
	,publicPath: path.join(__dirname, 'dist')+'/'
	,chunkFilename: '[name].asyncchunk.js'
	,filename: 'bundle.js'
}
const loaders=[
	{
        test: /\.js/,
        loaders: [ 'babel-loader' ],
        exclude: /node_modules/,
        include: __dirname
    }
    ,{
        test: /\.scss/,
        loaders: [ 'style-loader','css-loader','sass-loader' ]
    }
    ,{
    	test: /\.html/,
        loaders: [ 'html-loader' ]
    }
]
let plugins=[]
if(is_production){
    plugins = plugins.concat([
    	// 补充生产环境要使用的插件
    ])
}
plugins=plugins.concat([
	new webpack.optimize.CommonsChunkPlugin({ // 提取公共代码块
        name: 'asyncchunk', // Move dependencies to our asyncchunk file
        children: true, // Look for common dependencies in all children,
        minChunks: 2, // How many times a dependency must come up before being extracted
	})
])
module.exports={
	// debug:!is_production
	devtool:'eval'
	,module:{
		loaders
	}
	,entry
	,output
	,plugins
}
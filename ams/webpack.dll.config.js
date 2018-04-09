webpack = require('webpack')
path = require('path')
vendors = [
    'react',
    'react-dom',
    'react-router',
    "react-fastclick",
    "react-lazyload",
    "react-redux",
    "react-router-redux",
    "redux-immutable",
    "redux-thunk",
    "redux",
]
module.exports = {
  entry: {
    vendors
  },
  output: {
    path: path.join(__dirname,'dll'),
    filename: '[name].[hash].js',
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'manifest.json',
      name: '[name]',
      context: __dirname,
    }),
  ],
}
// path 是 manifest.json 文件的输出路径，这个文件会用于后续的业务代码打包；
// name 是 dll 暴露的对象名，要跟 output.library 保持一致；
// context 是解析包路径的上下文，这个要跟接下来配置的 webpack.config.js 一致。
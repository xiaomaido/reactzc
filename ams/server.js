webpack=require('webpack')
webpackDevMiddleware=require('webpack-dev-middleware')
webpackHotMiddleware=require('webpack-hot-middleware')
config=require('./webpack.config')
app=new (require('express'))()
// proxy = require('express-http-proxy');
// app.use('/peanut/fileUpload', proxy('http://qyadmin.weichongming.com'));
port=1718
compiler=webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))
app.use((req,res)=>{
  	res.sendFile(__dirname + '/src/index.html')
})
app.listen(port, (error)=>{
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})


// proxy = require('http-proxy-middleware')

// //context可以是单个字符串，也可以是多个字符串数组，分别对应你需要代理的api,星号（*）表示匹配当前路径下面的所有api
// const context = [`/fileUpload`]

// //options可选的配置参数请自行看readme.md文档，通常只需要配置target，也就是你的api所属的域名。
// const options = {
//     target: 'http://qyadmin.weichongming.com/',
//     changeOrigin: true
// }

// //将options对象用proxy封装起来，作为参数传递
// const apiProxy = proxy(options)

// //现在你只需要执行这一行代码，当你访问需要跨域的api资源时，就可以成功访问到了。
// app.use(context, apiProxy)
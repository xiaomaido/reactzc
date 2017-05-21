// 我们使用开源web框架搭建一个webserver，便于本地开发和调试，以及灵活地处理前端路由，以koa为例，主要代码如下：

var http = require('http');
var koa = require('koa');
var serve = require('koa-static');

var app = koa();
var debug = process.env.NODE_ENV !== 'production';
// 开发环境和生产环境对应不同的目录
var viewDir = debug ? 'src' : 'assets';
console.log(__dirname);
// 处理静态资源和入口文件
app.use(serve(path.resolve(__dirname, viewDir), {
    maxage: 0
}));

app = http.createServer(app.callback());

app.listen(2017, '0.0.0.0', function() {
    console.log('app listen success.');
});

// 我们的local server是localhost域，在ajax请求时为了突破前端同源策略的限制，本地server需支持代理其他域下的api的功能，即proxy。同时还要支持对未完成的api进行mock的功能。

var router = require('koa-router')();
var routes = require('./routes');
routes(router, app);
app.use(router.routes());
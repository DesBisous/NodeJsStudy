// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const bodyParser = require('koa-bodyparser');
const routes = require('./router/router');
const nunjucks = require("./router/nunjucks");
const path = require("path");
const staticFiles = require('./static-files');

// 创建一个Koa对象表示web app本身:
const app = new Koa();
const isProduction = true;

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// 处理静态文件
if (! isProduction) {
  app.use(staticFiles('/static/', __dirname + '../static'));
}

// koa-bodyparser
app.use(bodyParser());

// 服务端渲染
app.use(nunjucks(path.resolve(__dirname, 'router/views'), {
    noCache: !isProduction,
    watch: !isProduction
}));

// add router middleware:
app.use(routes());

app.listen(3000);
console.log('app started at port 3000...');

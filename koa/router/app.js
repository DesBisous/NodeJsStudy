const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const routes = require('./router');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// koa-bodyparser
app.use(bodyParser());
// add router middleware:
app.use(routes());

app.listen(3000);
console.log('app started at port 3000...');

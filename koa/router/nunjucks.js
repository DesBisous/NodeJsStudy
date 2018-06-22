const nunjucks = require('nunjucks');

function createEnv(path, opts) {
  console.log(path);
    var
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,// 控制输出是否被转义
        noCache = opts.noCache || false,// 使不使用缓存，每次都重新编译
        watch = opts.watch || false,// 当模板变化时重新加载。使用前请确保已安装可选依赖 chokidar。
        throwOnUndefined = opts.throwOnUndefined || false,// 当输出为 null 或 undefined 会抛出异常
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path, {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

function templating(path, opts) {
    // 创建Nunjucks的env对象:
    var env = createEnv(path, opts);
    return async (ctx, next) => {
        // 给ctx绑定render函数:
        ctx.render = function (view, model) {
            // 把render后的内容赋值给response.body:
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            // 设置Content-Type:
            ctx.response.type = 'text/html';
        };
        // 继续处理请求:
        await next();
    };
}
module.exports = templating;

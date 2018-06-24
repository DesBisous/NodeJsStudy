const fs = require('fs')
const router = require('koa-router')();

function addMapping(router, mapping) {
  mapping.forEach(item => {
    let method = (item.method === 'DELETE') ? 'del' : item.method.toLowerCase()
    router[method](item.path, item.func)
  })
}

function addControllers(router, dir) {
  var files = fs.readdirSync(__dirname + '/' + dir);
  console.log(files);
  var js_files = files.filter((f) => {
    return f.endsWith('.js');
  });

  for (var f of js_files) {
    let mapping = require(__dirname + '/' + dir + '/' + f);
    addMapping(router, mapping);
  }
}

module.exports = function (dir) {
    let _dir = dir || 'http'; // 如果不传参数，扫描目录默认为'module'
    addControllers(router, _dir);
    return router.routes();
};

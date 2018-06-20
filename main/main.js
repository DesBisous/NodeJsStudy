'use strict';

// 根据浏览器和Node环境提供的全局变量来判断是什么环境
if (typeof(window) === 'undefined') {
    console.log('node.js');
} else {
    console.log('browser');
}

// 引入模块
var greet = require('./hello');
var s = 'Michael';
greet(s);

// process.nextTick()将在下一轮事件循环中调用:
process.nextTick(function () {
  console.log('nextTick callback!');
});

// 程序即将退出时的回调函数:
process.on('exit', function (code) {
    console.log('about to exit with code: ' + code);
});
console.log('nextTick was set!');

// 异步读取文件
var fs = require('fs');
fs.readFile('1.txt', 'utf-8', function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log('--------异步读取--------');
    console.log(data);
  }
})
// 同步读取文件
try {
    var readData = fs.readFileSync('1.txt', 'utf-8');
    console.log('--------同步读取--------');
    console.log(readData);
} catch (err) {
    // 出错了
}
// 异步写文件
var dataAsnyc = 'Hello, Node.js'
fs.writeFile('1.txt', dataAsnyc, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('--------异步写入--------');
    console.log('ok.');
  }
})
// 同步写文件
var dataSync = 'Hello, Node.js, TONGBU'
try {
  data1 = fs.writeFileSync('1.txt', dataSync)
  console.log('--------同步写入--------');
} catch (err) {
    // 出错了
}
// 读取文件的详细信息，比如：大小、创建时间、目录 等
fs.stat('1.txt', function (err, stat) {
    if (err) {
      console.log(err);
    } else {
      console.log('--------读取文件的详细信息，比如：大小、创建时间、目录 等--------');
      // 是否是文件:
      console.log('isFile: ' + stat.isFile());
      // 是否是目录:
      console.log('isDirectory: ' + stat.isDirectory());
      if (stat.isFile()) {
        // 文件大小:
        console.log('size: ' + stat.size);
        // 创建时间, Date对象:
        console.log('birth time: ' + stat.birthtime);
        // 修改时间, Date对象:
        console.log('modified time: ' + stat.mtime);
        }
    }
});
// 从文件流读取文本内容-使用的是stream
// 打开一个流:
var rsStream = fs.createReadStream('1.txt', 'utf-8');

rsStream.on('data', function (chunk) {
    console.log('--------流读取数据DATA1:--------')
    console.log(chunk);
});

rsStream.on('end', function () {
    console.log('END');
});

rsStream.on('error', function (err) {
    console.log('ERROR: ' + err);
});

// 使用 pipe 管道 ，将输出流和输入流拼接到一起，从而实现了 文件复制功能
var rs = fs.createReadStream('1.txt');
var ws = fs.createWriteStream('copied.txt');

rs.pipe(ws);

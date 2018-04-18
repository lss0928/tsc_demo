var cheerio = require('cheerio'); // same to jquery
var http = require('http');
// 重写爬虫 promise
/*
	首先拿到baseURl = http://www.imooc.com/u/3178879/courses
	通过promise爬去最近学习过的课程url.
	通过url爬去每个课程中的章节
*/
var baseUrl = 'http://www.imooc.com/u/3178879/courses';

var courses = [];
http.get(baseUrl, function (res) {
    console.log('开始爬取...')
    var html = '';
    res.on('data', function (data) {
        html += data;
    })
    res.on('end', function () {
        // resolve(html);
        var $ = cheerio.load(html);
        var _href = $('.study-hd a').attr('href');
        console.log(_href + '\n');
    })
}).on('error', function (e) {
    reject(e);
    console.log('爬去数据出错')
});
// new Promise(function(resolve, reject) {
//     console.log('开始爬取...');
// })

function eat() {
    var a = new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('eating...');
        }, 1000);
    });
    return a;
}

function wash() {
    var b = new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('washing...');
        }, 4000);
    });
    return b;
}
// Promise 的 all 方法提供了并行执行异步操作的能力，并且在所有异步操作执行完后才执行回调。
Promise.all([eat(), wash()])
    .then(function (res) {
        // 当eat wash 两个异步全部执行完成才执行then 
        console.log('ok', res); // ok ['eating...', 'washing...']
    });
// race 只要有一个异步操作执行完毕，就立刻执行 then 回调。 注意：其它没有执行完毕的异步操作仍然会继续执行，而不是停止。
function timeOut() {
    var c = new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject('时间到，上班要迟到了...');
        }, 3000);
    });
    return c;
}
// Promise.race([eat(), wash(), timeOut()])
//     .then(function(res) {
//         console.log('res', res);
//     }).catch(function (err) {
//         console.log('catch', err);
//     });
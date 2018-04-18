var fs = require('fs');
var url = require('url');
var path = require('path');
var http = require('http');
var css = require('stylus');
var str = fs.readFileSync('styl/index.styl', 'utf8');
// console.log(str);
css.render(str, { filename: "index.css" }, function(err, css) {
        if (err) throw err;
        http.createServer(function(req, res) {
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(css);
        }).listen(3000);
        console.log('listen : localhost:3000');
    })
    // 小爬虫
var cheerio = require('cheerio'); // same to jquery
var urlStr = 'http://www.baidu.com';
http.get(urlStr, function(res) {
    var html = '';
    // 监听数据片段加载时
    res.on('data', function(data) {
        html += data;
        // console.log(html);
    })
    res.on('end', function() {
        var $ = cheerio.load(html);
        console.log($('#su').val());
    })
}).on('error', function(err) {
    console.log('获取数据出错，error=>', err);
})

// event模块
var EventEmitter = require('events').EventEmitter;
var life = new EventEmitter();

// 绑定事件 addEventListener
function cooking(who) {
    console.log(who + ' cooking');
}
life.on('morning', cooking);
life.on('morning', function(who) {
    console.log(who + ' cleanning');
});

// 解绑事件
life.removeListener('morning', cooking);
life.removeAllListeners('morning');

// 调用时事件 返回 true/false;
var hasListener = life.emit('morning', 'husband');
console.log(hasListener);

// 监听次数
// var len = life.listeners('morning').length;
var len = EventEmitter.listenerCount(life, 'morning');
console.log(len);

// HTTP get/request
/**
 * http.request(options, callback)
 	options:
 		host  		hostname
 		port  		localAddress
 		socketPath  method
 		path 		headers
 		auth 		agent
 		keepAlive   keepAliveMsecs
 */
var querystring = require('querystring');

var postData = querystring.stringify({
    uin: 2509886327,
    hostUin: 2509886327,
    topicId: '2509886327_77d39995307ba359ea950c00',
    commentUin: 2509886327,
    content: 'test2',
    richval: '',
    richtype: '',
    inCharset: '',
    outCharset: '',
    ref: '',
    private: 0,
    with_fwd: 0,
    to_tweet: 0,
    hostuin: 2509886327,
    code_version: 1,
    format: 'fs',
    qzreferrer: 'https://qzs.qq.com/qzone/app/mood_v6/html/index.html#mood&uin=2509886327&pfid=2&qz_ver=8&appcanvas=0&qz_style=8&params=&entertime=1507877053778&canvastype=&cdn_use_https=1'
});
var options = {
        hostname: 'h5.qzone.qq.com',
        path: '/proxy/domain/taotao.qzone.qq.com/cgi-bin/emotion_cgi_addcomment_ugc?qzonetoken=d01cb60db380185cb517271bb06ae2846dcabf2f86f5de8f3d832391a0098e846b700e8906eeb3b2e9ed&g_tk=1133082602',
        port: 80,
        method: 'POST',
        headers: {
            ':authority': 'h5.qzone.qq.com',
            ':method': 'POST',
            ':path': '/proxy/domain/taotao.qzone.qq.com/cgi-bin/emotion_cgi_addcomment_ugc?qzonetoken=d01cb60db380185cb517271bb06ae2846dcabf2f86f5de8f3d832391a0098e846b700e8906eeb3b2e9ed&g_tk=1133082602',
            ':scheme': 'https',
            'accept': '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'zh-CN,zh;q=0.8',
            'cache-control': 'no-cache',
            'content-length': postData.length,
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'cookie': 'RK=Pbnrlqbq9z; pac_uid=1_2509886327; sd_userid=56081490771643575; sd_cookie_crttime=1490771643575; pgv_pvi=5366669312; _ga=GA1.2.593553002.1500022264; o_cookie=2509886327; pgv_pvid=5879602348; ptisp=cnc; ptcz=92d3b30c67a283fc1d87a46618e81043f5a8e2c506f7aac38074a5d6cf3c7961; pt2gguin=o2509886327; uin=o2509886327; skey=@M03Xtvaum; p_uin=o2509886327; p_skey=X7K86VfvVN5HpoPPxcLh3427IGuSGbMdNKj2PnlLmRQ_; pt4_token=eiQBEyImqSFiQekdP9xHW0rq1OsAPIFUsPCGgiLxTXQ_; Loading=Yes; qqmusic_uin=; qqmusic_key=; qqmusic_fromtag=; qzmusicplayer=qzone_player_2509886327_1507876984641; pgv_info=ssid=s7002094731; QZ_FE_WEBP_SUPPORT=1; cpu_performance_v8=4; rv2=80D63D176333AE1B8232A211B85A0C04B091E9F10C4F715517; property20=DC6F70560B5F85F5E06B982DD62FBFC3502A1D00CDAED7B8C997B7CC6418607EF2962CDA011643EF; welcomeflash=956284473_103841; pgv_si=s9373054976',
            'origin': 'https://user.qzone.qq.com',
            'pragma': 'no-cache',
            'referer': 'https://user.qzone.qq.com/2509886327/infocenter',
            'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
        }
    }
    // 建立请求链接
var req = http.request(options, function(res) {
    // 接受响应体res
    console.log('Status: ' + res.statusCode);
    console.log('headers: ' + JSON.stringify(res.headers));

    res.on('data', function(chunk) {
        console.log(Buffer.isBuffer(chunk));
        console.log(typeof chunk);
        console.log(chunk);
    })
    res.on('end', function() {
        console.log('评论完毕!');
    })

});
req.on('error', function(e) {
        console.log('Error' + e.message)
    })
    // 发送post数据
req.write(postData);
// 请求结束
req.end();

// Stream种类
/* readable writable pulex transform*/
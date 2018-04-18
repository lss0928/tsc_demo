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
var http = require('http');
var cheerio = require('cheerio');
var querystring = require('querystring');
var bluebird = require('bluebird');
// console.log(Promise);
var postData = querystring.stringify({
    targetChannel: '百度生活',
    targetMenu: '二手交易',
    displayValid: true,
    style: 'all',
    locations: '海淀,昌平',
    path: '/culture/saleHouseDetailWidget',
    requestType: 'ajax',
    maxPrice: 2000,
    type: 'all',
    city: '北京',
    pageNum: 1,
    minPrice: 1500
});
var options = {
    hostname: 'life.family.baidu.com',
    path: '/culture/culture/saleHouseDetailWidget.do',
    port: 80,
    method: 'POST',
    headers: {
        'Accept': 'text/html, */*',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Content-Length': postData.length,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': 'BAIDUID=AB5D19F61E3A93F0746DE4ACAAC97FD1:FG=1; BIDUPSID=AB5D19F61E3A93F0746DE4ACAAC97FD1; PSTM=1508125094; BDUSS=Y1MnV-YzJSRk4zRmd1U1Nvd0xOV29qTWdROGNRbE5iWEVMRjlMZDNrVVVMUkZhSUFBQUFBJCQAAAAAAAAAAAEAAAD5d7imZHVhbmppYW5jYW85MwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABSg6VkUoOlZYz; BDSFRCVID=9-PsJeCCxG396AJZgwBiHnHM0ediF4qfiQXN3J; H_BDCLCKID_SF=tbkD_C-MfIvhDRTvhCcjh-FSMgTBKI62aKDsV66x-hcqEpO9QT-Bjx_pWxJf3tc7aebuon5e2lLMqJQY0q7FDUTh-p52f6tHfRPH3J; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0; pgv_pvi=6689682432; pgv_si=s4321040384; PSINO=2; FP_UID=be8b4eb4febbf6818e6d063e40cbf47b; uc_login_unique=f0e67370d87ef668c995ea493a7ac2cb; H_PS_PSSID=1464_21083_18559_17001_24022_20929; JSESSIONID=0AE3D3A5F14B8EA35B90E50C045EB2E1.worker5; Hm_lvt_e5c8f30b30415b1fc94d820ba9d4d08c=1508318860,1508318868,1508748609; Hm_lpvt_e5c8f30b30415b1fc94d820ba9d4d08c=1508748630',
        'Host': 'life.family.baidu.com',
        'Origin': 'http://life.family.baidu.com',
        'Pragma': 'no-cache',
        'Referer': 'http://life.family.baidu.com/core/index.jsp?chc=614251237',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.62 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'
    }
};
// 建立请求链接

httpRequest(postData, options, getPageList);

function httpRequest(postData, options, callback) {
    var req = http.request(options, function (res) {
        console.log('开始爬去...', new Date());
        // 接受响应体res
        // console.log('Status: ' + res.statusCode);
        // console.log('headers: ' + JSON.stringify(res.headers));
        var html = '';
        res.on('data', function (chunk) {
            // console.log(Buffer.isBuffer(chunk));
            // console.log(typeof chunk);
            html += chunk;
        });
        res.on('end', function () {
            console.log('页面获取完毕!');
            callback && callback(html);
        });

    });
    req.on('error', function (e) {
        console.log('爬虫出错...' + e.message);
    });
    // 发送post数据
    req.write(postData);
    // 请求结束
    req.end();

}

function getPageList(chunk) {
    // console.log(chunk.toString('utf-8'));
    var $ = cheerio.load(chunk.toString('utf-8'));
    var list = $('.life_saleContent_houseDetail');
    var fetchArr = [];
    list.each(function (i, item) {
        var title = $(item).attr('title');
        var reg = /融泽嘉园|回龙观新村/g;
        if (reg.test(title)) {
            var price = $(item).parents('tr').find('td').eq(2).text();
            var time = $(item).parents('tr').find('td').eq(4).text();
            console.log(i + ':' + title + '    价钱：' + price + '  发布时间：' + time)
                //     var articleId = $(item).attr('articleid');
                //     var secondId = $(item).attr('secondid');
                //     var postData = querystring.stringify({
                //         context: {
                //             "path": "/culture/rentalhousingdetail",
                //             "targetChannel": "百度生活",
                //             "targetMenu": "二手市场/房屋租售",
                //             "requestType": "ajax",
                //             "articleId": articleId,
                //             "secondId": secondId
                //         }
                //     });
                //     var options = {
                //         hostname: 'life.family.baidu.com',
                //         path: '/core/platform/encodeContext.do',
                //         port: 80,
                //         method: 'POST',
                //         headers: {
                //             'Accept-Encoding': 'gzip, deflate',
                //             'Accept-Language': 'zh-CN,zh;q=0.9',
                //             'Cache-Control': 'no-cache',
                //             'Connection': 'keep-alive',
                //             'Content-Length': postData.length,
                //             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                //             'Cookie': 'BAIDUID=AB5D19F61E3A93F0746DE4ACAAC97FD1:FG=1; BIDUPSID=AB5D19F61E3A93F0746DE4ACAAC97FD1; PSTM=1508125094; BDUSS=Y1MnV-YzJSRk4zRmd1U1Nvd0xOV29qTWdROGNRbE5iWEVMRjlMZDNrVVVMUkZhSUFBQUFBJCQAAAAAAAAAAAEAAAD5d7imZHVhbmppYW5jYW85MwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABSg6VkUoOlZYz; BDSFRCVID=9-PsJeCCxG396AJZgwBiHnHM0ediF4qfiQXN3J; H_BDCLCKID_SF=tbkD_C-MfIvhDRTvhCcjh-FSMgTBKI62aKDsV66x-hcqEpO9QT-Bjx_pWxJf3tc7aebuon5e2lLMqJQY0q7FDUTh-p52f6tHfRPH3J; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0; pgv_pvi=6689682432; pgv_si=s4321040384; PSINO=2; FP_UID=be8b4eb4febbf6818e6d063e40cbf47b; uc_login_unique=f0e67370d87ef668c995ea493a7ac2cb; H_PS_PSSID=1464_21083_18559_17001_24022_20929; JSESSIONID=0AE3D3A5F14B8EA35B90E50C045EB2E1.worker5; Hm_lvt_e5c8f30b30415b1fc94d820ba9d4d08c=1508318860,1508318868,1508748609; Hm_lpvt_e5c8f30b30415b1fc94d820ba9d4d08c=1508750583',
                //             'Host': 'life.family.baidu.com',
                //             'Origin': 'http://life.family.baidu.com',
                //             'Pragma': 'no-cache',
                //             'Referer': 'http://life.family.baidu.com/core/index.jsp?chc=614251237',
                //             'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.62 Safari/537.36',
                //             'X-Requested-With': 'XMLHttpRequest'
                //         }
                //     };
                //     fetchArr.push(fetchPromise(postData, options));
        }
    });
    // promise.all请求详情页id
    // getPageDetailId(fetchArr);
}

function fetchPromise(postData, options) {
    console.log('执行promise');

    return new Promise(function (resolve, reject) {
        httpRequest(postData, options, function (chunk) {
            resolve(chunk);
        });
    });
}

function getPageDetailId(arr) {
    console.log('开始获取详情页id');
    Promise.all(arr).then(function (data) {
        console.log(data);
    });
}
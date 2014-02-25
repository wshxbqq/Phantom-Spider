/// <reference path="config.js" />
/// <reference path="loader.js" />


var fs = require('fs');
phantom.injectJs('config.js');
phantom.injectJs('loader.js');

var count = 0;
var threadPool = [];

function openWeb(page, url) {
    page.open(url, function(p) {
        var result = page.evaluate(function(sniper) {
            return sniper();
        }, Loader.sniper);

        if (result) {
            console.log("success: "+url)
            Loader.successCallBack(result);
            openWeb(page,Loader.tasks.pop());
        } else {
            console.log("fail: "+url)
            openWeb(page, job);
        }
    });
}



for (var i = 0; i < GLOBAL_CONFIG.threadCount; i++) {
    var page = require('webpage').create();
    threadPool.push(page);
}

for (var i = 0; i < threadPool.length; i++) {
    var page = threadPool[i];
    var job = Loader.tasks.pop();
    if (job) {
        openWeb(page, job);
    } else {
    }


}

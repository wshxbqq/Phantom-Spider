var Loader = {};





Loader.tasks = [
 	"http://www.baidu.com/s?wd=1",
 	"http://www.baidu.com/s?wd=2"
];


for (var j = 10; j < 200;j++){
    Loader.tasks.push("http://www.baidu.com/s?wd="+j);
}



Loader.sniper = function () {
	var result = {};
    result.title = $(".result a")[0].innerHTML;
    result.url = location.href;
    result.href=$(".result a")[0].getAttribute("href");
    return result;
}
 

Loader.successCallBack = function (result) {
 
    fs.write("download/"+result.url.split("?")[1]+".txt", result.title, 'w');
}
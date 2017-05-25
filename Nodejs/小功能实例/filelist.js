//静态资源本地开发到本地测试环境的自动更新
var fs = require("fs");

//path模块，可以生产相对和绝对路径
var path = require("path");

//测试环境的目标地址
var remotePath = "D:/wamp/www/EhangMeals/Public/sellernew/";
//var remotePath = "D:/wamp/www/testcopy/def/";

//开发环境等待处理目录
var devPath = "D:/wamp/www/vueMeals/public/";
//var devPath = "D:/wamp/www/testcopy/abc/"

//开发环境的vue编译js文件【这个是固定的】
var devPathVueJs = "D:/vueMeals/dist/index.js";
  
  
//读取文件存储数组
var fileArr = [];
var fileDirArr = [];


//要排除的文件后缀
var excludeSuffix = [".scss"];


//读取开发环境的目录
travel(devPath, function(filePaht){
	var suffix = filePaht.substring(filePaht.lastIndexOf('.'));
	//排除不需要复制的文件后缀
	if(excludeSuffix.indexOf(suffix) == -1){
		fileArr.push(filePaht);
	}
});


//创建目录
fileDirArr.reverse().forEach(function(file){
	var dst = replaceDstPath(file);
	if(!fsExistsSync(dst)){
		console.log("正在创建目录："+dst);
		fs.mkdirSync(dst,"077");
	}
});


//把文件写入到测试环境目录
fileArr.forEach(function(file){
	var dst = replaceDstPath(file);
	copy(file, dst);
});


//目录遍历
function travel(dir, callback) {
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = path.join(dir, file);

        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
            fileDirArr.push(pathname);
        } else {
            callback(pathname);
        }
    });
}


//复制文件
function copy(src, dst) {
		console.log("正在拷贝文件:\r\nfrom:" + src + "\r\nto:" + dst);
  	fs.writeFileSync(dst, fs.readFileSync(src));
}


//路径替换
function replaceDstPath(filepath) {
	filepath = filepath.replace(/\\/g, "/");
	var a = filepath.replace(devPath, remotePath);
	return a;
}


//检测文件或者文件夹存在 nodeJS
function fsExistsSync(path) {
    try{
        fs.accessSync(path,fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
}
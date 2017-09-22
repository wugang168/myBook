import _ from "./a.js"
import "./asset/style.css"
import data from './data.json'   //这里如果是纯粹的json文件,里面定义的json语法要注意
function component() {
    var element = document.createElement("div");
    element.innerText = "我是函数里面添加的";
    element.classList.add('hello');
    return element;
}
document.body.appendChild(component());
_();
console.log(data);
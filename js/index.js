var search = document.querySelector('.search_bar');
var input = document.querySelector("input");
var click = 0; // 0未点击 1点击

var root = document.querySelector(':root');
var maxWidth = getComputedStyle(root).getPropertyValue("--max-width");
// console.log(maxWidth);

var fixedHeight = document.body.clientHeight;
// console.log(fixedHeight);

var base = document.querySelector('#base');

// base.style.height = fixedHeight + 'px';

// window.onresize = function () {
//     var vw = window.innerWidth;
//     // console.log('目前宽度' + vw);
//     // console.log('最大宽度' + maxWidth);
//     base.style.height = hrt;
// }


var bg = document.querySelector('.bg');
// console.log(bg);

input.onclick = function () { //搜索被点击时
    input.setAttribute('placeholder', '');  // 清空提示词
    search.style.width = maxWidth;   // 搜索框被点击放大效果
    search.style.backgroundColor = 'rgba(255, 255, 255, .9)';
    bg.style = 'transform:scale(1.1);filter:blur(10px)';    // 背景放大模糊
    text.style.pointerEvents = 'none';  // 美文不可点击
    click = 1;
}
input.onblur = function () {  //搜索失去焦点时
    input.setAttribute('placeholder', 'Search');    // 还原提示词
    search.style.width = '230px';
    input.value = '';   // 失去焦点清空搜索内容
    search.style.backgroundColor = 'rgba(255, 255, 255, .25)';
    bg.style = 'transform:scale(1);filter:blur(0px)';
    text.style.pointerEvents = 'all';
    click = 0;

}
search.onmouseover = function () {  //鼠标经过搜索框时
    search.style.width = maxWidth;   // 鼠标经过放大效果
    search.style.backgroundColor = 'rgba(255, 255, 255, .6)';
}
search.onmouseout = function () {  //鼠标离开搜索框时
    if (click == 0) {
        search.style.width = '230px';   // 搜索未点击
        search.style.backgroundColor = 'rgba(255, 255, 255, .25)';
    } else {
        search.style.width = maxWidth;   // 搜索被点击
        search.style.backgroundColor = 'rgba(255, 255, 255, .9)';
    }
}

function getKey() {
    // input 回车跳转
    if (event.keyCode == 13) {
        url = 'https://wuzhuiso.com/s?q=' + input.value;
        window.open(url, '_blank').location;
        input.value = '';
    }
}

var timeText = document.querySelector('.timeText');


setInterval("showTime()", 1000);

showTime = function () {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();

    if (h < 10) {
        h = "0" + h;
    }

    if (m < 10) {
        m = "0" + m;
    }

    if (s < 10) {
        s = "0" + s;
    }

    timeText.innerText = h + ":" + m;
    // console.log(timeText.innerText);
}
// 美文部分
var str;
var getStr = str;
console.log(getStr);

var tip = document.querySelector('.tip').getElementsByTagName('span')[0];

if (Boolean(str) == false) {
    tip.innerHTML = '网络连接失败或api异常';
}



var text = document.querySelector('.text');
var textName = document.querySelector('.text-name');
var textP = document.querySelector('.text-p');
if (getStr[0].length <= 20 && getStr[1].length <= 20) {
    textP.innerText = '「 ' + getStr[0] + ' 」';
    textName.innerText = '——' + getStr[1];
}

text.ontouchstart = function () {
    textName.style.display = 'block';
}

text.onmousemove = function () {
    textName.style.display = 'block';
}

text.ontouchend = function () {
    textName.style.display = 'none';
}

text.onmouseout = function () {
    textName.style.display = 'none';
}






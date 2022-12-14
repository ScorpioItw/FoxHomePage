var search = document.querySelector('.search_bar');
var input = document.querySelector("input");
var click = 0; // 0未点击 1点击

var root = document.querySelector(':root');
var maxWidth = getComputedStyle(root).getPropertyValue("--max-width");
// console.log(maxWidth);

var fixedHeight = document.body.clientHeight;
// console.log(fixedHeight);

var base = document.querySelector('#base');
// 限制高度解决手机软键盘问题
base.style.height = fixedHeight + 'px';

// window.onresize = function () {
//     //测试用
//     var vw = window.innerWidth;
//     console.log('目前宽度' + vw);
//     console.log('最大宽度' + maxWidth);
//     base.style.height = vw;
// }

document.addEventListener('contextmenu', function (e) {
    // 禁选右键菜单
    e.preventDefault();
})


var bg = document.querySelector('.bg');
var searchLogo = document.querySelector('.search_logo');
// console.log(bg);

input.onclick = function () { //搜索被点击时
    input.setAttribute('placeholder', '');  // 清空提示词
    search.style.width = maxWidth;   // 搜索框被点击放大效果
    search.style.backgroundColor = 'rgba(255, 255, 255, .9)';
    bg.style = 'transform:scale(1.1);filter:blur(10px)';    // 背景放大模糊
    text.style.pointerEvents = 'none';  // 美文不可点击
    searchLogo.style.display = 'block'; // 显示搜索logo
    click = 1;
}
input.onblur = function () {  //搜索失去焦点时
    input.setAttribute('placeholder', 'Search');    // 还原提示词
    search.style.width = '230px';
    input.value = '';   // 失去焦点清空搜索内容
    search.style.backgroundColor = 'rgba(255, 255, 255, .25)';
    bg.style = 'transform:scale(1);filter:blur(0px)';
    text.style.pointerEvents = 'all';
    searchLogo.style.display = 'none';
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

// window.onload = function () {
//     // tip('您的起始页目前是最新版')
// }

var tip_end = 0;
function tip(self, stop) { // 小提示接口 说明：self为弹出的文字 stop为禁用的按钮等
    var tip = document.querySelector('.tip');
    tip.addEventListener('animationend', function () {
        tip_end = 0;    // tip_end 等于0时说明动画结束
        // console.log('动画结束')
    })
    tip.addEventListener('transitionend', function () {
        setTimeout(function () {
            tip_end = 0;
        }, 3000)
        // console.log('动画结束')
    })
    if (Boolean(stop) != false) {   // 判断stop值是否为空 空返回false
        // console.log('执行了')
        if (tip_end == 0) {
            tip_end = 1;
            tip.style.transform = 'translateY(120px) translateX(-50%)';
            var tipValue = document.querySelector('.tip').getElementsByTagName('span')[0];
            tipValue.innerHTML = self;
            stop.style.pointerEvents = 'none';
            setTimeout(function () {
                tip.style.transform = 'translateY(0px) translateX(-50%)';
                setTimeout(function () {
                    stop.style.pointerEvents = 'all';
                }, 1000)
            }, 2000);
        }
    } else {    // 当没有要禁用的按钮时触发
        if (tip_end == 0) {
            tip.style.transform = 'translateY(120px) translateX(-50%)';
            var tipValue = document.querySelector('.tip').getElementsByTagName('span')[0];
            tipValue.innerHTML = self;
            setTimeout(function () {
                tip.style.transform = 'translateY(0px) translateX(-50%)';
            }, 2000);
        }
    }
}


// 美文部分
var str;
var getStr = str;
// console.log(getStr);

var text = document.querySelector('.text');
var textName = document.querySelector('.text-name');
var textP = document.querySelector('.text-p');

var tipValue = document.querySelector('.tip').getElementsByTagName('span')[0];

setTimeout(function () {
    if (Boolean(str) == false) {
        // tipValue.innerHTML = '网络连接失败或api异常';
        tip('网络连接失败或api异常')
    } else {
        if (getStr[0].length <= 20 && getStr[1].length <= 20) {
            textP.innerText = '「 ' + getStr[0] + ' 」';
            textName.innerText = '——' + getStr[1];
        }
    }
}, 1000);


var textOptions = document.querySelector('.text-options');  // 获取美文选项按钮


text.onmousemove = function () {
    textName.style.display = 'block';
    text.style.backgroundColor = 'rgb(255 255 255 / 20%)';
    text.style.backdropFilter = 'blur(5px)';
    text.style.transform = 'rotateX(-1deg) translateX(-50%)';
    textOptions.style.display = 'block';
}

text.onmouseout = function () {     // 美文鼠标离开事件
    textName.style.display = 'none';
    text.style.backgroundColor = 'transparent';
    text.style.backdropFilter = 'blur(0px)';
    textOptions.style.display = 'none';
}

var textOptionsBox = document.querySelector('.text-options-box');


textOptions.addEventListener('click', function (e) {    // 美文功能按钮点击事件
    textOptionsBox.style.display = 'block';
    e.stopPropagation();    // 阻止事件冒泡

});

var textOptionsBoxLi = document.querySelector('.text-options-box').getElementsByTagName('li')[0];
textOptionsBoxLi.style.pointerEvents = 'none';


setTimeout(function () {        // 2秒后解除对复制的禁用
    textOptionsBoxLi.style.pointerEvents = 'all';
}, 2000)


textOptionsBox.addEventListener('click', function (e) {     // 美文功能盒子点击事件
    if (e.target.nodeName == 'LI') {
        if (e.target.className == 'copy') {
            var copyText = textP.innerText + textName.innerText;
            navigator.clipboard.writeText(copyText);
            tip('复制成功', e.target);
            textOptionsBox.style.display = 'none';
        } else if (e.target.className == 'sou') {
            console.log('sou');
        }
    }
})

textOptionsBox.addEventListener('mouseover', function (e) {     // 美文功能盒子鼠标移动事件
    if (e.target.nodeName == 'LI') {
        textOptionsBox.style.display = 'block';
    } else {
        textOptionsBox.style.display = 'block';
    }
});

textOptionsBox.addEventListener('mouseout', function () {
    textOptionsBox.style.display = 'none';
})

document.addEventListener('click', function () {    // 文档点击事件
    textOptionsBox.style.display = 'none';
})

var textStyle = document.querySelector('.text-style');
textStyle.addEventListener('click', function (e) {  // 美文水波纹动画

    console.log(e.target.offsetLeft);
    let x = e.clientX - e.target.getBoundingClientRect().left;
    let y = e.clientY - e.target.getBoundingClientRect().top;
    console.log(x);

    let ripples = this.getElementsByTagName('span')[0];
    ripples.style.display = 'block';
    console.log(ripples);
    ripples.style.left = x + 'px';
    ripples.style.top = y + 'px';

    this.appendChild(ripples);
})


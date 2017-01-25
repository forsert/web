// 仿jquery的ready函数,页面加载完成执行方法;
document.readys=function(fn){
    var timer=setInterval(function(){
        if(document.readyState==="complete"){
            clearInterval(timer);
            if(fn){fn()};
        }
    },100)
};
//数组去重
Array.prototype.wipearr=function(){var arr2=[]; for(i=0;i<this.length;i++){if(arr2.indexOf(this[i])===-1){ arr2[arr2.length]=this[i]; }}; return arr2};

//数组排序 arr.rank()
Array.prototype.rank=function(){return this.sort(function(a,b){return a-b})};

//去除字符串前后空格
String.prototype.trim=function(){return this.replace(/(^\s+)|(\s+$)/g,"")};

//去除字符串左边空格
String.prototype.ltrim=function(){return this.replace(/^(\s+)/,"")};
 
//去除字符串右边空格
String.prototype.rtrim=function(){return this.replace(/(\s+)$/,"")};

//浏览器页面获取兼容
function docEmt(){return document.documentElement?document.documentElement:document.body;};
//事件绑定兼容
function addEvent(obj,type,fn){return obj.addEventListener?obj.addEventListener(type,fn,false):obj.attachEvent("on"+type,fn)};

//事件移出兼容
function removeEvent(obj,type,fn){return obj.removeEventListener?obj.removeEventListener(type,fn,false):obj.detachEvent("on"+type,fn);}

//获取非行间样式 getstyle(id名,属性名)
function getStyle(obj, attr){return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr]};

//任意值之间区随机数
function rand(min,max){ return Math.floor(Math.random() * (max - min + 1) + min);};

//获取id
function getId(id){return document.getElementById(id)};
//获取class
function getClass(className){
    if(document.getElementsByClassName){
        return document.getElementsByClassName(className)
    }else{
        var a=document.getElementsByTagName("*");
        var arr=[];
        for(i=0;i<a.length;i++){
            if(a[i].className==className){
                arr[arr.length]=a[i];
            }
        }
        return arr;
    }
};
//获取name
function getName(name){
    if(name.parent){
        return document.getElementById(name.parent).getElementsByTagName(name.child)
    }else{
        return document.getElementsByTagName(name)
    }
};

//获取datatype
function getDa(da){
    var name=getName("*");
    for(i=0;i<name.length;i++){
        if(name[i].getAttribute("dataType")==da){
            return name[i];
        }
    }
};

//获取浏览器窗体各个属性
var winAttr={
    doc:docEmt(),
    wincliW:function(){return this.doc.clientWidth},
    wincliH:function(){return this.doc.clientHeight},
    winDocH:function(){return this.doc.scrollHeight},
    winscroT:function(){return this.doc.scrollTop || document.documentElement.scrollTop}
};
//设置rem,淘宝方式
;(function(win, lib) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var flexibleEl = doc.querySelector('meta[name="flexible"]');
    var dpr = 0;
    var scale = 0;
    var tid;
    var flexible = lib.flexible || (lib.flexible = {});
    
    if (metaEl) {
        // console.warn('将根据已有的meta标签来设置缩放比例');
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale);
        }
    } else if (flexibleEl) {
        var content = flexibleEl.getAttribute('content');
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));    
            }
            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));    
            }
        }
    }

    if (!dpr && !scale) {
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {                
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;
    }
    docEl.setAttribute('data-dpr', dpr);
    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }
    function refreshRem(){
        var width = docEl.getBoundingClientRect().width;
        if (width / dpr > 540) {
            width = 540 * dpr;
        }
        var rem = width / 10;
        docEl.style.fontSize = rem + 'px';
        flexible.rem = win.rem = rem;
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function(e) {
            doc.body.style.fontSize = 12 * dpr + 'px';
        }, false);
    }
    

    refreshRem();

    flexible.dpr = win.dpr = dpr;
    flexible.refreshRem = refreshRem;
    flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    }
    flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }
})(window, window['lib'] || (window['lib'] = {}));

document.readys(function(){
    // 移动端返回顶部
    (function backTop(a){
        var b=document.getElementById(a);
        if(!b){return};
        var c=document.documentElement.scrollTop || document.body.scrollTop;
        window.onscroll=function(){
            c=document.documentElement.scrollTop || document.body.scrollTop;
        };
        var e;
        b.onclick=function(){
            var d;
            e=setInterval(function(){
                d=c/4;
                if(c>0){
                    document.documentElement.scrollTop=c-d;
                    document.body.scrollTop=c-d;
                    }else{
                        clearInterval(e);
                        }
                    },3);
            };
           document.addEventListener("touchend",function(){
                    clearInterval(e);
                },false) 
    })("backtop");
    //数字输入框
     ;(function setTel(sclassName){
         document.oninput=function(event){
            var ev= event || window.event;
            var target=ev.target?ev.target:ev.srcElemetn;
            if(target.className===sclassName){
                target.value=target.value.replace(/\D/g,'');
            }
        };
    })("znamber");
    //手机号码
    ;(function(id){
        var text=/^1[34578]\d{9}$/g;
        var phone=getDa(id);
        if(!phone){return};
        phone.oninput=function(){
            this.value=this.value.replace(/\D/g,"");
        };
        phone.onblur=function(){
            if(!this.value.test(text)){
                alert("手机号码格式不正确");
            }
        }
        
    })("phone");
    //正则邮箱
    ;(function(email){
        var email=getDa(email);
        if(!email){return};
        email.onblur=function(){
            var text=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if(!text.test(this.value)){
                alert("邮箱格式不正确")
            }
        }
    })("email");
    //正则六位验证码
    ;(function code(num){
        if(!getDa(num)){return};
        getDa(num).onblur=function(){
            var text=/^\d{6}$/;
            if(!text.test(this.value)){
                alert("验证码格式不正确")
            }
        }
    })("code");
    //正则密码
    ;(function(password){
        if(!getDa(password)){return};
        getDa(password).onblue=function(){
            var text=/^[\w_-\!\@]{6,16}$/;
            if(!text.test(this.value)){
                alert("密码格式错误")
            }
        }
    })("password");
});
// 瀑布流
//var p=new sault("box","li");p.sau();
var sault=function(){
    var th=this
    th.parent=arguments[0];
    th.className=arguments[1];
    th.arr=[];
    th.min=null;
    th.index=null;
    th.p=document.getElementById(th.parent);
    th.sau=function(){
        var c=th.p.getElementsByTagName(th.className);
        var a1=c[0];
        var w=document.documentElement.clientWidth || document.body.clientWidth;
        var col=parseInt(w/a1.offsetWidth);
        th.p.style.width=a1.offsetWidth*col+"px";
        for(i=0,b=col;i<b;i++){
            th.arr[i]=c[i].offsetTop;
        }
        th.min=Math.min.apply({},th.arr);
        var index=th.index();
        for(i=0,b=c.length;i<b;i++){
            c[i].style.top=th.min+"px";
            c[i].style.left=a1.offsetWidth*index+"px";
            th.arr[index]+=c[i].offsetHeight;
            th.min=Math.min.apply({},th.arr);
            index=th.index();
        }
        th.pulldown();
        th.fiu();
    };
    th.index=function(){
        for(n=0,f=th.arr.length;n<f;n++){
            if(th.arr[n]===th.min){
                return n;
            }
        }
    };
    th.pulldown=function(){
        window.onscroll=function(){
            var r=document.documentElement.scrollHeight || document.body.scrollHeight;
            var f=document.documentElement.scrollTop || document.body.scrollTop;
            var b=document.documentElement.clientHeight || document.body.clientHeight;
            if(r-f-b<100){
                // data数据
                var data=[{src:"img/i/1.jpg"},{src:"img/i/2.jpg"},{src:"img/i/3.jpg"},{src:"img/i/4.jpg"},{src:"img/i/5.jpg"},{src:"img/i/6.jpg"},{src:"img/i/7.jpg"},{src:"img/i/8.jpg"}];
                for(i in data){
                    var l=document.createElement("li");
                    var d=document.createElement("div");
                    var m=document.createElement("img");
                    m.src=data[i].src;
                    d.appendChild(m);
                    l.appendChild(d);
                    th.p.appendChild(l);
                }
                th.sau();
                
            }
        }
    };
    th.fiu=function(){
        window.onresize=function(){
            th.sau()
        }
    }
}




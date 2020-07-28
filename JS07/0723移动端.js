let loadingIn=(function () {
    let $loadingBox=$(".loadingBox");
    let $grow=$loadingBox.find(".grow");
    //获取进度条
    //获取所有的图片并且会将所有的图片以数组的形式输出到一个result的txt中粘贴即可需要用到js文件readImgList.js
    let imgDate=["img/h1.jpg","img/h2.jpg","img/h3.jpg","img/L1.jpg","img/L2.jpg","img/L3.jpg","img/L4.jpg","img/L5.jpg","img/lh1.jpg","img/lh2.jpg","img/lh3.jpg"];
        //通过一个方法获取img文件夹中的所有的文件通过图片的加载来实现进度条加载的效果
    let n=0;
    let all=imgDate.length;
    let run=function (callback){
        imgDate.forEach(item=>{
            //预先加载图片
            let tempImg=new Image();
            tempImg.onload=()=>{
                tempImg=null;//此处赋空是为了界面中不会预先显示图片只是加载
                $grow.css('width',((++n)/all)*100+'%');
                if(n===all){
                    clearTimeout(delayTimer);
                    callback&&callback();//加载完毕：执行回调函数让当前loading界面消失
                }
            };
            tempImg.src=item;
            //还需要考虑加载的时间如果加载的时间超过10s则响应太慢此时用户需要一个反馈应该返回网络加载慢重新加载
        });
    };
    let delayTimer=null;
    let maxDelay=function maxDelay(callback) {
        /*
         *maxDelay：设置等待时间(假设10s，到达10秒后我们看加载了多少，如果已经达到90%以上，
         * 我们可以正常的访问内容了，如果不足这个比例，直接提示用户网络不佳)
         */
        delayTimer=setTimeout(()=>{
            if(n/all>=0.9){
                callback&&callback();//如果有回调函数执行回调函数所以此时应该是执行return中的内容
                return;
            }
            alert("当前网络状态不佳点击确定重试");
            window.location.reload();
        },10000);
    };
    let done=function () {
        let timer=setTimeout(()=>{
            $loadingBox.remove();
            callMain.init();
        },1000);

    };//加载完毕需要等待1s在跳转
    return {
        init:function (){
            $loadingBox.css("display","block");
            run();//执行预加载
            //为了让运动的更加顺利此时需要在进度条中的css设置transition有个过渡
            maxDelay();//判断是否加载超时
            done();
        }
    }
})();
let callMain=(function callMain() {
    let $callBox=$(".callBox");
    let $touch=$('.callBox>.touch');
    let $left=$('.callBox>.touch>.left');
    let $right=$('.right');
    // console.dir($right);
    //需要注意的是这zepto没有宽度高度等的设置
    // console.log($(".right").width());
    // var content = $(‘div’). width();//只是获取div宽度
    // var contentWithPadding = $(‘div’). innerWidth();//获取div+padding的宽度
    // var withoutMargin = $(‘div’). outerWidth();//获取div+padding+border的宽度
    // var full = $(‘div’). outerWidth(true);//获取div+padding+border+margin的宽度
    // let move=function (){
    //     let num=0;
    //     num=(num++)/100;
    //     num+=$right.innerWidth();
    //   $right.css('padding',num);
    // };
    let fn=function fn(){
        let href=window.location.href;
        let str=href.indexOf("#");
        if(str>-1){
            let src=href.replace(href.substr(str+1),"chat");
            console.log(src);
            window.location.href=src;
            // setTimeout(window.location.reload(),0)
        }
    };
    let callGO=function () {
        let href=window.location.href;
        let str=href.indexOf("#");
        if(str>-1){
            let src=href.replace(href.substr(str+1),"calling");
            console.log(src);
            window.location.href=src;
        }
    };
    let right=document.querySelector(".right");
    let left=document.querySelector(".left");
    return {
        init:function (){
            $callBox.css("display","block");
            right.onclick=function () {
                $callBox.remove();
                cube.init();
            };
            left.onclick=function () {
                fn();
            }
        }
    }
})();
let calling=(function () {
    let $callingBox=$('.callingBox');
    return{
        init:function () {
            $callingBox.css('display',"block");
        }
    }
})();
let chat=(function () {
    let $chat=$(".chat");
    return{
        init:function () {
            $chat.css("display","block");
        }
    }
})();
//一般的加载实际是通过加载图片来走的进度条
// loadingIn.init();
//不同的界面加载不同的href
let href=window.location.href;
let num=href.indexOf("#");
// console.log(num);
let str=null;
if(num>-1) {
    //必须存在才能判断#后边是啥
    str = href.substr(num + 1);
    console.log(str);
}
let cube=(function () {
    let sw=null;
    let SwiperM=function(){
        sw=new Swiper(".swiper-container",{
            loop:true,
            //形成环路
            effect: 'coverflow',
            grabCursor: true
        })
    };
    return {
        init:function () {
            $(".marginCube").css("display","block");
            SwiperM();
        }
    }
})();
switch (str) {
    case "loading":
        loadingIn.init();
        break;
    case "callMain":
        callMain.init();
        break;
    case "calling":
        calling.init();
        break;
    case "chat":
        chat.init();
        break;
    case "cube":
        cube.init();
        break;
    default:
        loadingIn.init();
        break;
}
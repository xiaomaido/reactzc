

window.qq=window.qq||{},qq.maps=qq.maps||{},window.soso||(window.soso=qq),soso.maps||(soso.maps=qq.maps),qq.maps.Geolocation=function(){"use strict";var t=null,e=null,o=null,n=null,l=null,i="_geoIframe_"+Math.ceil(1e7*Math.random()),a=document.createElement("iframe"),u=null,s=null,c=null,r=null,d=function(d,m){if(!d)return void alert("璇疯緭鍏ey锛�");if(!m)return void alert("璇疯緭鍏eferer锛�");var p=document.getElementById(i);if(!p){a.setAttribute("id",i);var g="https:";navigator.userAgent.match(/jdapp;iphone;/i)&&(g="http:"),a.setAttribute("src",g+"//apis.map.qq.com/tools/geolocation?key="+d+"&referer="+m),a.setAttribute("style","display: none; width: 100%; height: 30%"),document.body?document.body.appendChild(a):document.write(a.outerHTML),window.addEventListener("message",function(i){var a=i.data;if(a&&"geolocation"==a.module)clearTimeout(r),t&&t(a),t=null,e=null,o&&o(a),o=null,n=null,l&&l(a);else{s=(new Date).getTime();var d=s-u;d>=c&&(e&&e(),e=null,t=null,clearTimeout(r)),n&&n(),n=null,o=null}},!1)}};return d.prototype.getLocation=function(o,n,l){t=o,e=n,u=(new Date).getTime(),c=l&&l.timeout?+l.timeout:1e4,clearTimeout(r),r=setTimeout(function(){e&&e(),e=null},c),document.getElementById(i).contentWindow.postMessage("getLocation","*")},d.prototype.getIpLocation=function(t,e){o=t,n=e,document.getElementById(i).contentWindow.postMessage("getLocation.robust","*")},d.prototype.watchPosition=function(t){l=t,document.getElementById(i).contentWindow.postMessage("watchPosition","*")},d.prototype.clearWatch=function(){l=null,document.getElementById(i).contentWindow.postMessage("clearWatch","*")},d}();
var geolocation = new qq.maps.Geolocation("OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77", "myapp");


var positionNum = 0
var options = {timeout: 8000}
function showPosition(position) {
    positionNum ++;
    document.getElementById("demo").innerHTML += "序号：" + positionNum;
    document.getElementById("demo").appendChild(document.createElement('pre')).innerHTML = JSON.stringify(position, null, 4);
    document.getElementById("pos-area").scrollTop = document.getElementById("pos-area").scrollHeight;
}

function showErr() {
    positionNum ++;
    document.getElementById("demo").innerHTML += "序号：" + positionNum;
    document.getElementById("demo").appendChild(document.createElement('p')).innerHTML = "定位失败！";
    document.getElementById("pos-area").scrollTop = document.getElementById("pos-area").scrollHeight;
}

function showWatchPosition() {
    document.getElementById("demo").innerHTML += "开始监听位置！<br /><br />";
    geolocation.watchPosition(showPosition);
    document.getElementById("pos-area").scrollTop = document.getElementById("pos-area").scrollHeight;
}

function showClearWatch() {
    geolocation.clearWatch();
    document.getElementById("demo").innerHTML += "停止监听位置！<br /><br />";
    document.getElementById("pos-area").scrollTop = document.getElementById("pos-area").scrollHeight;
}
import '../../styles/quyou/tencentlocation.scss'
export default class TencentLocation extends Quyou{
    constructor(props){
        super(props)
    }
	render(){
        // document.title='商家信息'
		return (
			<div className="tencent-location"> 
                <div id="pos-area">
                    <p id="demo">点击下面的按钮，获得对应信息：<br /></p>
                </div>
                <div id="btn-area">
                    <button onClick={ ()=> geolocation.getLocation(showPosition, showErr, options) }>获取精确定位信息</button>
                    <button onClick={ ()=> geolocation.getIpLocation(showPosition, showErr) }>获取粗糙定位信息</button>
                    <button onClick={ ()=> showWatchPosition() }>开始监听位置</button>
                    <button onClick={ ()=> showClearWatch() }>停止监听位置</button>
                </div>
            </div>
		)
    }
    componentDidMount(){
        document.getElementById("pos-area").style.height = (document.body.clientHeight - 110) + 'px';
    }
}
var misc={
	getParamObj:(type)=>{ // 获取?后面的参数
		var type = type || 'search', str, arr, oRet = {};
		switch(type){
			case 'hash':
				str = location.hash.replace(/^#/, '');
				break;
			case 'search':
				str = location.search.replace(/^\?/, '');
				break;
		}
		if(str == ''){
			return oRet;
		}
		arr = str.split('&');
		for(var i = 0, l = arr.length, tmp; i < l; i ++){
			tmp = arr[i].split('=');
			oRet[tmp[0]] = tmp[1];
		}
		return oRet;
	},
	setCookie:(name,value,days=7)=>{ // 种cookie
	    let exp = new Date();
	    exp.setTime(exp.getTime() + days*24*60*60*1000);
	    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";
	},
	getCookie:(name)=>{ // 取cookie
	    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)")
	    if(arr=document.cookie.match(reg))
	        return unescape(arr[2])
	    else
	        return null
	},
	clearCookie:(name)=>{
	    misc.setCookie(name, "", -1)
	},
	validatePhone: (phone) => { // 验证中国地区手机号
		if (phone.indexOf('86')!==0) {
			phone = '86' + phone;
		}
		return /^(86)[1][3-8][0-9]{9}$/.test(phone);
	},
	//判断是否是整数
  	isInteger : function(num){
		var patrn=/^[0-9]*[1-9][0-9]*$/;
		if (!patrn.exec(num)){
			return false;
		}
		return true;
	},
	//返回格式化时间String（例如：yyyy-MM-dd）
	formatDateTime : function(date,fmt){
		var o = {
    		"M+": date.getMonth() + 1, //月份
    		"d+": date.getDate(), //日
    		"h+": date.getHours(), //小时
    		"m+": date.getMinutes(), //分
    		"s+": date.getSeconds(), //秒
   			"q+": Math.floor((date.getMonth() + 3) / 3), //季度
    		"S": date.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	},
	formatType: {
		'1': 'yyyy-MM-dd',
		'2': 'yyyy年MM月dd日 hh:mm',
		'3': 'yyyy.MM.dd',
		'4': 'yyyy-MM-dd hh:mm:ss'
	},
	formatTime: function (time, type, init) {//格式化时间函数  0元团复用
		var mGap = 60, hGap = 60 * 60, dGap = 24 * 3600, wGap = 7 * 24 * 3600, str;
		if (init) {
			str = ''
		} else {
			str = '还剩';
		}
		type = type || 1;
		if (type == 1) {//还剩下多少时间
			time = Math.ceil(time / 1000);
			do {
				if (time >= dGap) {
					str += (parseInt(time / dGap, 10) + '天');
					time = time % dGap;
				} else if (time >= hGap) {
					str += (parseInt(time / hGap, 10) + '时');
					time = time % hGap;
				} else if (time >= mGap) {
					str += (parseInt(time / mGap, 10) + '分');
					time = time % mGap;
					if (time == 0) {
						str += '0秒';
						break;
					};
				} else {
					str += (parseInt(time, 10) + '秒');
					break;
				}
				if (time == 0) {
					break;
				};
			} while (true);
		} else if (type == 2) {//发布多长时间
			var temp = time;
			time = new Date().getTime() - time;
			time = Math.ceil(time / 1000);
			if (time < mGap) {
				str = time + '秒前';
			} else if (time < hGap) {
				str = parseInt(time / mGap, 10) + '分钟前';
			} else if (time < dGap) {
				str = parseInt(time / hGap, 10) + '小时前';
			} else if (time < wGap) {
				str = parseInt(time / dGap, 10) + '天前';
			} else {
				str = misc.formatDateTime(new Date(temp), misc.formatType['4'])
				// str = parseInt(time/wGap, 10) + '周前';
			}
		} else if (type == 3) {//购物车，没有小时，只有分钟和秒数
			str = '';
			time = Math.ceil(time / 1000);
			do {
				if (time >= mGap) {
					t = parseInt(time / mGap, 10);
					if (t < 10) {
						t = '0' + t;
					};
					str += (t + ':');
					time = time % mGap;
					if (time == 0) {
						str += '00';
						break;
					};
				} else {
					t = parseInt(time, 10);
					if (t < 10) {
						t = '0' + t;
					};
					str += t;
					break;
				}
			} while (true);
			var arr = str.split(':');
			if (arr.length == 1) {
				arr.unshift('00');
			}
			str = arr.join(':');
		} else {//烦死了，返回json，自己拼吧
			var result = {};
			str = '';
			time = Math.ceil(time / 1000);
			do {
				if (time >= hGap) {
					t = parseInt(time / hGap, 10);
					if (t < 10) {
						t = '0' + t;
					};
					result.hour = t;
					time = time % hGap;
					if (time == 0) {
						result.minute = '00';
						result.second = '00';
						break;
					};
				} else if (time >= mGap) {
					t = parseInt(time / mGap, 10);
					if (t < 10) {
						t = '0' + t;
					};
					result.minute = t;
					time = time % mGap;
					if (time == 0) {
						result.second = '00';
						break;
					};
				} else {
					t = parseInt(time, 10);
					if (t < 10) {
						t = '0' + t;
					};
					result.second = t;
					break;
				}
			} while (true);
			!result.hour ? (result.hour = '00') : '';
			!result.minute ? (result.minute = '00') : '';
			!result.second ? (result.second = '00') : '';
			return result;
		}
		return str;
	},
}
export default misc
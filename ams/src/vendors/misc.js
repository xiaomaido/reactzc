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
	}
	,setCookie:(name,value,days=7)=>{ // 种cookie
	    let exp = new Date();
	    exp.setTime(exp.getTime() + days*24*60*60*1000);
	    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";
	}
	,getCookie:(name)=>{ // 取cookie
	    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)")
	    if(arr=document.cookie.match(reg))
	        return unescape(arr[2])
	    else
	        return null
	}
	,clearCookie:(name)=>{
	    misc.setCookie(name, "", -1)
	}
}
export default misc
var misc={
    setCookie:(name,value,days=7)=>{ // 种cookie
	    let exp = new Date();
	    exp.setTime(exp.getTime() + days*24*60*60*1000);
	    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";
	},
	getCookie:(name)=>{ // 取cookie
	    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)")
		return arr=document.cookie.match(reg)?unescape(arr[2]):null
	},
	clearCookie:(name)=>{
	    misc.setCookie(name, "", -1)
	},
}
export default misc
function getRequestParam() { 
	var curUrl = location.search; //获取url中"?"符后的字串 
	var requestParam = new Object(); 
	if (curUrl.indexOf("?") != -1) { 
		var str = curUrl.substr(1); 
		strs = str.split("&"); 
		for(var i = 0; i < strs.length; i ++) { 
			requestParam[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
		} 
	} 
	return requestParam; 
} 
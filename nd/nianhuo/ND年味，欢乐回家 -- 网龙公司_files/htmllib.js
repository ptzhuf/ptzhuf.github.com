//功能：取得地址栏传值
//责任人：柯培宗	QQ：813660	2006-06-28
//调用方法：比如地址为show.htm?id=2 取得id的值： QueryString("id")
function QueryString(qs) {
    //	s = location.href;
    //	var SharpIndex=s.indexOf("#");
    //	if (SharpIndex!=-1) {
    //		s=s.substring(0,SharpIndex);
    //	}
    //	s = s.replace("?","?&").split("&");
    //	re = "";
    //	for(i=1;i<s.length;i++)
    //	{
    //		if(s[i].indexOf(qs+"=")==0)
    //		{
    //			re = s[i].replace(qs+"=","");
    //		}
    //	}
    //	return re;
    var svalue = location.search.match(new RegExp("[\?\&]" + qs + "=([^\&]*)(\&?)", "i"));
    return svalue ? svalue[1] : "";

}

function getNewsList() {
    //获取分类
    var _RMxmlHttp1 = CreateXmlHttp();
    var url = "/News/UIAjaxLib.aspx?action=newsClsList";
    var param = "";
    if ($("category") && $("category").value != "") {
        param += "&type=" + $("category").value
    }
    else {
        param += "&type=" + (QueryString("type") == "" ? "news" : QueryString("type"));
    }
    function handler(vars) {
        $("newsList").innerHTML = vars;
    }
    SendPostUrl(handler, _RMxmlHttp1, url, param);
}

function getNewsComment(pagenow) {
    //获取文章评论
    var _RMxmlHttp = CreateXmlHttp();
    var url = "/News/comment.aspx?action=newsComment";
    var param = "lNewsCode=" + $("NDNewsCreateID").value.noharmcode();
    param += "&pagenow=" + pagenow;
    url += "&" + param;
    function handler(vars) {
        $("newsComment").innerHTML = vars;
    }
    SendPostUrl(handler, _RMxmlHttp, url, param);
}
function getPageBar() {
    //获取分页条
    var url = location.href;
    var pageHttp = CreateXmlHttp();
    var param = "&url=" + encodeURIComponent(url);
    param += "&lNewsCode=" + $("NDNewsCreateID").value.noharmcode();
    SendPostUrl(pagehanddle, pageHttp, "/news/uiajaxlib.aspx?action=getPageBar", param);
    function pagehanddle(result) {
        $("page").innerHTML = result;
    }
}
function createRndcode() {
    //提交文章评论界面
    var _RMxmlHttp = CreateXmlHttp();
    var url = "/News/comment.aspx?action=creatNewsComment";
    var param = "";
    function handler(vars) {
        $("creatNewsComment").innerHTML = vars;
        function stopPropagation() {
            if (event.stopPropagation) {
                // this code is for Mozilla and Opera
                event.stopPropagation();
            }
            else if (window.event) {
                // this code is for IE
                window.event.cancelBubble = true;
            }
        }
        if ($("txtContext")) {
            $("txtContext").onmouseup = stopPropagation;
            $("txtContext").onselectstart = stopPropagation;
        }

    }
    SendPostUrl(handler, _RMxmlHttp, url, param);
}

function putInComment() {
    //提交文章评论

    //    if($("validateCode").value=="")
    //    {
    //        alert("验证码不能为空,请填写!");
    //        $("validateCode").focus();
    //        return false;
    //    }
    if ($("txtContext").value.Trim() == "") {
        $('commentMessage').innerHTML = "评论内容不能为空，请填写！";
        $("txtContext").focus();
        return false;
    }
    var _RMxmlHttp = CreateXmlHttp();
    var url = "/News/comment.aspx?action=putInComment";
    var param = "lNewsCode=" + $("NDNewsCreateID").value.noharmcode();
    //param+="&validateCode="+$("validateCode").value.noharmcode();
    param += "&validateContent=" + $("txtContext").value.noharmcode();
    //param+="&pagenow=1";  

    function handler(vars) {
        var returnStr = vars.split("_");
        //$("validateCode").value="";
        if (returnStr[0] == "1") {
            $('commentMessage').innerHTML = returnStr[1];
            $("txtContext").value = "";
            var nextPage = 1;
            //		    if($('commentPageCount'))
            //		    {
            //		        nextPage = $('commentPageCount').value;
            //		    }

            getNewsComment(nextPage);

        } //如果是没有登录km
        else if (returnStr[1].indexOf("对不起") >= 0) {
            if (confirm("登陆KM平台后才能回复，点击确定转到登录页面。\r\n(系统会自动返回此页面。)")) {
                location.href = "/?turnurl=" + encodeURIComponent(location.href);
            }
        }
        else {
            $('commentMessage').innerHTML = returnStr[1];
            //$("txtContext").value="";
        }
        //getNewValidateCode();

    }
    SendPostUrl(handler, _RMxmlHttp, url, param);


}
function textAreaChange(el) {
    var mathObj = el.value.match(/\n/gi);
    var enterCount = 0;
    if (mathObj != null || mathObj != undefined)
        enterCount = (el.value.match(/\n/gi)).length;
    var haveCount = 500 - (parseInt(enterCount) * 3)
    if (el.value.length > haveCount) {
        el.value = el.value.substr(0, haveCount);
    }
    num.innerHTML = haveCount - el.value.length;
}
function gotoLogin() {
    location.href = "/?turnurl=" + encodeURIComponent(location.href);
}
function getNewValidateCode() {

    var _RMxmlHttp = CreateXmlHttp();
    var url = "/News/comment.aspx?action=getNewValidateCode";
    var param = "";

    function handler(vars) {
        $("validateCodetxt").innerHTML = vars;
    }
    SendPostUrl(handler, _RMxmlHttp, url, param);
}

function getNewsListArticle(pagenow) {
    //获取文章列表
    var category = (QueryString("type") == "" ? "news" : QueryString("type").noharmcode());
    var _NewsArxmlHttp = CreateXmlHttp();
    var url = "/News/newsList.aspx?action=newsListArticle";
    var param = "ClsID=" + QueryString("ClsID");
    param += "&pagenow=" + pagenow;
    param += "&ClsName=" + QueryString("ClsName").noharmcode();
    param += "&type=" + category;
    function handler(vars) {
        $("newsArticle").innerHTML = vars;
    }
    SendPostUrl(handler, _NewsArxmlHttp, url, param);
    var title = " 新闻平台   －网龙公司 内网新闻系统  ";
    switch (category.toLowerCase()) {
        case "sop":
            title = "SOP  - 网龙公司 标准作业流程查询  ";
            break;
        case "regulations":
            title = " 规章制度  - 网龙公司 规章制度查询  ";
            break;
        case "worktable":
            title = " 工作表格  - 网龙公司 工作表格查询";
            break;
        case "news":
            break;
    }
    document.title = title;
}
function init() {

    var key = unescape(QueryString("key"));
    var type = QueryString("type");
    if (key == "") {
        switch (type) {
            case "news":
            case "regulations":
            case "worktable":
            case "sop":
                $("clsType").value = type;

        }
        getNewsListArticle(1);
    }
    else {
        $("type").selectedIndex = type;
        $("key").value = key;
        var clsType = QueryString("clsType");
        if (clsType == "") {
            clsType = 0;
        }
        $("clsType").selectedIndex = clsType;
        searchNews(1);
    }
    getNewsList();
}
function getLinks() {
    var str = new StringBuffer();
    str.append('<table border="0" cellspacing="0" cellpadding="0" class="linkTable">');
    str.append('<tr>');
    str.append('    <td valign="bottom">');
    str.append('        <a href="http://km.ndea.91.com/home/guide/guide.htm" target="_blank">公司资料</a>');
    str.append('    </td>');
    str.append('    <td valign="bottom">');
    str.append('        <a href="http://192.168.2.22/docc/newgui.asp?cid=83" target="_blank">规章制度</a>');
    str.append('    </td>');
    str.append('    <td valign="bottom">');
    str.append('        <a href="http://192.168.2.22/sop/index.htm" target="_blank">SOP流程</a>');
    str.append('    </td>');
    str.append('    <td valign="bottom">');
    str.append('        <a href="http://km.ndea.91.com/home/guide/queerycenter.htm" target="_blank">查询中心</a>');
    str.append('    </td>');
    str.append('    <td valign="bottom">');
    str.append('        <a href="http://192.168.2.36/HrWeb/jifen/index.aspx" target="_blank">积分系统</a>');
    str.append('    </td>');
    str.append('    <td valign="bottom">');
    str.append('        <a href="http://192.168.2.171/forumdisplay.php?s=&forumid=4490" target="_blank">赏金猎人</a>');
    str.append('    </td>');
    str.append('</tr>');
    str.append('<tr>');
    str.append('    <td>');
    str.append('        <a href="http://blog.sina.com.cn/tqnd" target="_blank">公司官博</a>');
    str.append('    </td>');
    str.append('   <td>');
    str.append('        <a href="http://192.168.2.22/ndbbs/Start/Index.aspx" target="_blank">公司论坛</a>');
    str.append('    </td>');
    str.append('    <td>');
    str.append('        <a href="http://km.ndea.91.com/" target="_blank">KM平台</a>');
    str.append('    </td>');
    str.append('    <td>');
    str.append('        <a href="http://192.168.2.36/HrWeb/" target="_blank">ERP系统</a>');
    str.append('    </td>');
    str.append('    <td>');
    str.append('        <a href="http://km.ndea.91.com:90/" target="_blank">EA平台</a>');
    str.append('    </td>');
    str.append('    <td>');
    str.append('        <a href="http://mail.nd.com.cn/" target="_blank">ND邮箱</a>');
    str.append('    </td>');
    str.append('</tr>');
    str.append('<tr>');
    str.append('    <td>');
    str.append('        <a href="http://192.168.2.22/club/docc/index.asp" target="_blank">党团生活</a>');
    str.append('    </td>');
    str.append('   <td>');
    str.append('        <a href="http://192.168.2.22/djbbs/Start/Index.aspx" target="_blank">对话DJ</a>');
    str.append('    </td>');
    str.append('    <td>');
    str.append('        <a href="http://km.ndea.91.com/html/news/2008/02_01/2008020115444792.html" target="_blank">伯乐征集</a>');
    str.append('    </td>');
    str.append('    <td>');
    str.append('        <a href="file://192.168.11.110/nd点歌台" target="_blank">ND radio</a>');
    str.append('    </td>');
    str.append('    <td>');
    str.append('        <a href="http://km.ndea.91.com/home/service/index.htm" target="_blank">行政后勤</a>');
    str.append('    </td>');
    str.append('    <td>');
    str.append('        <a href="http://km.ndea.91.com/home/sszz/sszz.htm" target="_blank">图书馆</a>');
    str.append('    </td>');
    str.append('</tr>');
    str.append('</table>');
    return str.toString();
}

function searchNews(pagenow) {//搜索
    var key = $("key").value.noharmcode();
    var param = "&key=" + key
    param += "&type=" + $("type").value.noharmcode();
    param += "&clsType=" + $("clsType").value.noharmcode();
    param += "&pagenow=" + pagenow;
    AjaxSend(searchNews_handdle, "newsList.aspx?action=search", param);
    function searchNews_handdle(result) {
        $("newsArticle").innerHTML = result;
        key = key.split(' ');
        for (var i in key) {
            SetKeyColor($("newsArticle"), key[i], "red", "keyzone");
        }
    }
}
//  加重关键字的颜色
function SetKeyColor(obj, key, color, idStr) {
    if (key == "") return;                                      //  如果key为空，则跳出
    if (color == null || color == "") {                                                       //  如果没有提供颜色参数
        color = "red";                                      //  设置默认的颜色为红色
    }
    SetNode(obj, key, color, idStr);                        //  调用设置函数
    function SetNode(obj, key, color, idStr)                //  设置函数；参数：设置节点对象、关键字、颜色、需要加色的ID值包含字符串
    {
        if (obj.hasChildNodes() && obj.nodeType != 3) {                                                   //  如果有子节点且节点不是文本节点
            var childNodes = obj.childNodes;                //  获取所有子节点
            for (var i = 0; i < childNodes.length; i++)          //  遍历所有子节点
            {
                SetNode(childNodes[i], key, color, idStr);  //  递归设置
            }
        }
        else {                                                   //  如果是子节点
            if (obj.nodeName == "#text" && obj.nodeValue.replace(/^\s*|\s*$/g, "") != "") {                                               //  如果节点为文本且节点不为空格
                var pid = obj.parentNode.id;
                if (pid.indexOf(idStr) > -1) {                                           //  是要上色的节点
                    obj.nodeValue = obj.nodeValue.replace(new RegExp(key, "g"), "<font color=" + color + ">" + key + "</font>");
                    var strHTML = obj.parentNode.innerHTML;
                    strHTML = strHTML.replace(new RegExp("&lt;font color=" + color + "&gt;" + key + "&lt;/font&gt;", "g"), "<font color=" + color + ">" + key + "</font>");
                    obj.parentNode.innerHTML = strHTML;
                }
            }
        }
    }
}
//监控流量代码
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-52041649-1', 'auto');
  ga('send', 'pageview');
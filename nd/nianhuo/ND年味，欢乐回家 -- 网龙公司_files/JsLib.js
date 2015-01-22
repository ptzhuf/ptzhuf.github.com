String.prototype.noharmcode= function () {
			return this
				.replace(/&/g, "%26")				
				.replace(/\+/g, "%2b");
}
String.prototype.Trim = function()
{	
    return this.replace(/^\s*|\s*$/g,"");
}
String.prototype.RTrim = function()
{	
    return this
        .replace(/^\s*|\s*$/g,"")
        .replace(/&nbsp;/g,"")
        .replace(/<p><\/p>/g,"");
}
function numonly(n)
{ 
	n.value=n.value.replace(/\D/g,'') 
}
function JudgeNumOnly(obj) 
{ 
	obj.value=obj.value.replace(/\D/g,'');
}
function JudgeGoPage(p_txtNumName, p_PageCount)
{ 
	var m_ret = true;
	var m_toPage = document.getElementById(p_txtNumName);
	if ( m_toPage.value == '' ) 
	{ 
		alert('抱歉，转到的页数不能为空，请重新输入!');
		m_toPage.focus(); 
		m_ret = false;
	} 
	else if( parseInt(m_toPage.value)<1 || parseInt(m_toPage.value)>p_PageCount ) 
	{ 
		alert('抱歉，只能输入1至'+p_PageCount+'的整数，请重新输入！');
		m_toPage.focus();
		m_ret = false;
	}
	return m_ret;
}

function CreateXmlHttp()
{
    //var xmlHttp = false;
	try { xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); }
	catch (e) { try { xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); }
	catch (e) { try { xmlHttp = new XMLHttpRequest(); }
	catch (e) { xmlHttp = false; }}}
	return xmlHttp;	
}

function $(e) {return document.getElementById(e);}


function AjaxSend(handler,url,param)
{	
    Begin();
	var xmlHttp = CreateXmlHttp();	
	xmlHttp.open("POST",url, true);
    xmlHttp.setRequestHeader("content-length",param.length);
    xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");     
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4)
		{		    
			handler(xmlHttp.responseText);
			End();
		}
	}
    xmlHttp.send(param);
}

 function SendPostUrl(handler,newXmlHttp,url,param)
 {
        Begin();
	    newXmlHttp.open("POST",url, true);
        newXmlHttp.setRequestHeader("content-length",param.length);
        newXmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8"); 
        newXmlHttp.onreadystatechange = function(){if (newXmlHttp.readyState == 4){End();handler(newXmlHttp.responseText);}}
        newXmlHttp.send(param);
 }
 //判断是否为email 函数开始
	function isemail(emailstr) 
	{
		if ((emailstr.indexOf('@', 0) == -1) || emailstr.indexOf('.') == -1) 
	    {
	    	return false
	    }
	    else
	    {
	    	return true
	    }
	}
	//转义html符号
	function HTMLEncode( text )
    {
    if ( typeof( text ) != "string" )
       text = text.toString() ;

    text = text.replace(
       /&/g, "&amp;").replace(
       /"/g, "&quot;").replace(
       /</g, "&lt;").replace(
       />/g, "&gt;") ;

    return text ;
    }
function HTMLDecode( text )
    {
    if ( typeof( text ) != "string" )
       text = text.toString() ;

    text = text.replace(
       /&amp;/g, "&").replace(
       /&quot;/g, "\"").replace(
       /&lt;/g, "<").replace(
       /&gt;/g, ">") ;

    return text ;
}
//进度条启动
function Begin()
{
	if (!document.getElementById("processbar_div"))
	{
	    var t_span = document.createElement("span");
	    t_span.id = "processbar_div";
	    t_span.style.position = "absolute";
	    t_span.style.backgroundColor = "#ffffba";
	    t_span.style.border = "solid 1px #9db3c5";
	    t_span.style.right = "25px";
	    t_span.style.top = "10px";
	    t_span.style.zIndex = 1000;
	    t_span.style.fontSize = "12px";
	    t_span.style.padding = "2px";
	    t_span.innerHTML = "&nbsp;数据加载中...&nbsp;&nbsp;";
		if(document.body)
			document.body.appendChild(t_span);
	}
	else
	{
	    document.getElementById("processbar_div").style.display="";
	    document.getElementById("processbar_div").style.top=document.body.scrollTop+10;
	    
	}
}
//进度条关闭
function End()
{
    if(document.getElementById("processbar_div"))
    {
	    document.getElementById("processbar_div").style.display="none";
	}
}
//功能：返回cookie KEY值,如需复制本方法请连同function getCookiekeyIndex(cookiestring,name)一起复制
//作者：柯培宗 2007-10-19
function getCookie(name)
{
    var cookiestring=document.cookie;
    var search=name + "=";
    var offset=getCookiekeyIndex(cookiestring,name);
    if (offset!=null)
    {
        offset += search.length;
        var end = cookiestring.indexOf("&", offset);
        if (end == -1)  end = cookiestring.length;
        var returnstring= cookiestring.substring(offset, end);
        end = returnstring.indexOf(";");
	    if(end != -1)   returnstring=decodeURIComponent(returnstring.substring(0, end)).toString();
	    else    returnstring=decodeURIComponent(returnstring).toString();
	    if (returnstring!=null) {return returnstring;}else{return "";}
    }
    else
    {
        return "";
    }
}
//功能：返回cookie KEY出现的位置，不存在返回null
//作者：柯培宗 2007-10-19
function getCookiekeyIndex(cookiestring,name)
{
    var search=name + "=";
    var offset = cookiestring.indexOf(search)
    if (offset != -1)
    {
        //防止局部名称一致，判断前面是否cookie分隔＝号或者&号。
        var headstring=cookiestring.substring(offset-1,offset);
        if(headstring!="&"&&headstring!="=")
        {
            offset += search.length;
            cookiestring=cookiestring.substring(offset,cookiestring.length)
            return offset+getCookiekeyIndex(cookiestring,name);
        }
        else
        {
            return offset;
        }
    }
    else
    {
        return null;
    }
}
//显示提示信息
//调用事例
//<div id='lastTipsId' style='display:none;'>TipsIsNull</div>

//<table><tr><td>通行证:</td><td><input type='text' class='tinput' onfocus="showTips('tipspassport')" id='passport' maxlength='12' /></td></tr>
//<tr id='tipspassport' style='display:none;'><td colspan='2'><div class='tips'>字符数为4-12位，可以使用英文大小写字母a-z和数字0-9(必填)</div></td></tr>
//</table>
function showTips(id)
{
    var oldobj=$($("lastTipsId").innerHTML);
    var newobj=$(id);  
    if(oldobj){oldobj.style.display='none';}
    if(newobj)
    {
        newobj.style.display='';
        $("lastTipsId").innerHTML=id;
    }  
}
function StringBuffer()//新增字符串拼接类
{
 this._strings_= new Array;
}
StringBuffer.prototype.append=function(str)
{
 this._strings_.push(str);
};
StringBuffer.prototype.toString=function()
{
 return this._strings_.join("");
};
//责任人：柯培宗	QQ：813660	2006-06-28
//调用方法：比如地址为show.htm?id=2 取得id的值： QueryString("id")
function QueryString(qs)
{
	s = location.href;
	var SharpIndex=s.indexOf("#");
	if (SharpIndex!=-1) {
		s=s.substring(0,SharpIndex);
	}
	s = s.replace("?","?&").split("&");
	re = "";
	for(i=1;i<s.length;i++)
	{
		if(s[i].indexOf(qs+"=")==0)
		{
			re = s[i].replace(qs+"=","");
		}
	}
	return re;
}
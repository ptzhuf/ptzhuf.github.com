//功能：返回cookie KEY值
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
function headRight()
{
    var m_str = "";
    var m_tempuid=getCookie("UserCode");
    if (m_tempuid=="")
    {
	    m_str+="<a href='/Index.htm?turnurl="+encodeURIComponent(location.href)+"' title='登录KM平台'>在此登录</a>";
    }
    else
    {
	        m_str+=getCookie("UserName")+"，<span id='_MsgNew'>欢迎您的到来！</span> ";
	        m_str+=" <a href='/blog/?u="+m_tempuid+"' title='从这里可以去任何地方'>我的书桌</a> ";
	        m_str+=" <a href=\"/Ask/AskQuestion.aspx\" title='有不懂？问问看！'><font color=red>我要提问</font></a> ";
	        m_str+=" <a href='uund://msg/?uin=12580&type=5&from=wLTX1EtN' title='游戏工具部客服'><font color=blue>12580</font></a>";
	        m_str+=" <a href='/ui/Login.aspx?action=logoutbyurl' title='注销KM帐号'>注销登录</a>";	
	   
    }
    return m_str;
}
function headInit(type)
{ 
    var obj=$("top");
    if(obj)
    {
        var searchname,css
        switch(type)
        {
           case 1://日志
             searchname="日志搜索";
             break;
           case 2://不懂就问
             searchname="问题搜索";
             break;
           case 3://圈子
             searchname="圈子搜索";
             break;
        } 

       var url="/blog/"; 
       AjaxSend(checkLoginStatusHandler,url,"");
       function checkLoginStatusHandler(data)
       {
            var m_str="<table style=\"width:900px;font-size:12px;margin-top:4px;\"><tr><td colspan=\"3\" align=\"right\">";	
            var m_tempuid=getCookie("UserCode");
            m_str+=headRight();
            m_str+="</td></tr>";
            m_str+="<tr valign=\"middle\"><td style=\"width:170px;height:70px;\" class=\"logo\" onclick=\"location.href='/index.htm';\" title='首页'></td>";		    
            m_str+="<td style=\"width:440px;\">";
                if(type==0)
                {
                    m_str += "<a href=\"http://ndu.91.com/\"><div class='sys syscollegeactive'></div></a>";
                }
                else
                {
                    m_str+="<a href=\"http://ndu.91.com/\"><div class='sys syscollege' onmouseover=\"this.className='sys syscollegeactive';\" onmouseout=\"this.className='sys syscollege';\"></div></a>";
                }
                if(type==1)
                {
                   m_str+="<a href=\"/Blog/Knowledge.aspx\"><div class='sys sysbookroomactive'></div></a>";
                }
                else
                {
                    m_str+="<a href=\"/Blog/Knowledge.aspx\"><div class='sys sysbookroom' onmouseover=\"this.className='sys sysbookroomactive';\" onmouseout=\"this.className='sys sysbookroom';\"></div></a>";
                }
                if(type==2)
                {
                   m_str+="<a href=\"/Ask\"><div class='sys sysaskactive'></div></a>";
                }
                else
                {
                    m_str+="<a href=\"/Ask\"><div class='sys sysask' onmouseover=\"this.className='sys sysaskactive';\" onmouseout=\"this.className='sys sysask';\"></div></a>";
                }
                if(type==3)
                {
                   m_str+="<a href=\"/html/WorkCircle.html\"><div class='sys syscircleactive'></div></a>";
                }
                else
                {
                    m_str+="<a href=\"/html/WorkCircle.html\"><div class='sys syscircle' onmouseover=\"this.className='sys syscircleactive';\" onmouseout=\"this.className='sys syscircle';\"></div></a>";
                }   
                if(type==4)
                {
                    m_str+="<a href=\"/Library/BookInfos.aspx\"><div class='sys syslibraryactive'></div></a>";
    	           
                }
                else
                {
                    m_str+="<a href=\"/Library/BookInfos.aspx\"><div class='sys syslibrary' onmouseover=\"this.className='sys syslibraryactive';\" onmouseout=\"this.className='sys syslibrary';\"></div></a>";
                } 
                if(type==5)
                {
                    m_str+="<a href=\"/search/Index.aspx\"><div class='sys syssearchactive'></div></a>";
                }
                else
                {
                    m_str+="<a href=\"/search/Index.aspx\"><div class='sys syssearch' onmouseover=\"this.className='sys syssearchactive';\" onmouseout=\"this.className='sys syssearch';\"></div></a>";
                }        
                m_str+="</td><td align=\"right\">";
                if(type==2)
                {
                    m_str+="<input type=\"button\" onclick=\"window.open('AskQuestion.aspx')\" value=\"我要提问\" />";
                }
            m_str+="</td></tr></table>";
            obj.innerHTML=m_str;
            if($("_MsgNew")&&m_tempuid!="")
            {
                NDKM_MSG_Check(m_tempuid);         
            }
        }
    }
}

function NDKM_MSG_Check(CooUID)
{
    var xx = CreateXmlHttp();
    SendPostUrl(Msg_Check_handdle,xx,"/blog/Ajax_lib.aspx?Action=MsgCheck&random=" + Math.random(),"");
    function Msg_Check_handdle(result)
    {
        if(result.toString().toLowerCase()=="true")
        {
            $("_MsgNew").innerHTML="<a href=/blog/Msg><img src=/images/msg.gif border=0 align=absmiddle alt=您有新短消息点击进入查看></a>";
        }
    }
}

function $_xxxSearch(type)
{
   if($("$_xyzSearch")&&$("$_xyzSearch").value.Trim().length>0)
   {
        var url="/search/?action="+type+"&keytext="+encodeURIComponent($("$_xyzSearch").value.Trim());
        location=url;
   }
   else
   {
        alert("请输入关键字");
   }
}

function initbottom()
{
   if($("bottom"))
   {
        $("bottom").innerHTML = "CopyRight&copy;2006-2008  网龙公司 -- 知识管理平台";    
   }
}

function initheadandbottom(type)
{
    headInit(type);  
    initbottom();
}

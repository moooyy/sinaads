<?php
    header('Content-Type', 'application/javascript');
    $array = array();
    $array["pdps0"] = "{'id':'pdps0', 'type':'Couple','size':'980*90', 'engineType':'sina', 'value':['http://img.adbox.sina.com.cn/ad/11521.html', 'http://img.adbox.sina.com.cn/ad/14954.html', 'http://img.adbox.sina.com.cn/ad/14954.html'], pv: 'http://d1.sina.com.cn/click/pdps0', mapping:['http://d1.sina.com.cn/mapping/pdps0', 'http://d2.sina.com.cn/mapping/pdps0']}";
    $array["pdps1"] = "{'id':'pdps1', 'size':'300*500','type':'EMBED', 'content':{type:'url',src:'http://img.adbox.sina.com.cn/ad/6009.html', pv:'http://testpv.com'}}";
    $array["pdps4"] = "{'type':'BP', 'value':'http://baidu.com'}";
    $array["pdps2"] = "{'type':'Wins', size:'250*230','content':'http://img.adbox.sina.com.cn/ad/4739.html'}";
    $array["pdps3"] = "{'type':'Stream', size:'960*300','value':['http://img.adbox.sina.com.cn/ad/14785.html', 'http://img.adbox.sina.com.cn/ad/14954.html']}";
	$array['pdps5'] = "{'type':'EMBED', size:'300*250', content:{type:'html',src:'\\x3cscript type=\"text\/javascript\"\\x3e \/*120*120，创建于2013-6-5*\/ var cpro_id = \"u1297930\"; \\x3c\/script\\x3e \\x3cscript src=\"http:\/\/cpro.baidustatic.com\/cpro\/ui\/f.js\" type=\"text\/javascript\"\\x3e\\x3c\/script\\x3e'}}";
    
	$array['pdps6'] = "{'type':'EMBED', size:'300*250', content:{type:'js', src:'http://rm.sina.com.cn/bj_chuanyang/yhd20130701/29461711.js'}}";

	$array['pdps7'] = "{type:'EMBED', size:'950*90', content:{type:'html', src:'\\x3cscript type=\"text\/javascript\"\\x3etry { var google_page_url = window.top.location.href;}catch(err) {    var google_page_url = document.referrer || window.location.href;}var google_ad_client = \"ca-pub-1948721619348611\";var google_ad_slot = 9150438679;var google_ad_width = 950;var google_ad_height = 90;\\x3c\/script\\x3e\\x3cscript type=\"text\/javascript\"src=\"http:\/\/pagead2.googlesyndication.com\/pagead\/show_ads.js\"\\x3e\\x3c\/script\\x3e'}}";
    
    echo $_GET["callback"]."(".$array[$_GET['pdps']].");";
?>
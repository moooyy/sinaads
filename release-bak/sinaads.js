!function(a,b){"use strict";function c(b){this.uid="sinaadToolkitBox"+c.uid++,this.width=b.width||0,this.height=b.height||"auto",this.position=b.position||"center center",this.follow=b.follow||0,this.minViewportWidth=b.minViewportWidth||0,this.positionStyle=this.follow?d.browser.isSupportFixed?"fixed":"absolute":"absolute";var e=document.createElement("div");e.id=this.uid,e.style.cssText+="position:"+this.positionStyle+";width:"+this.width+"px;height:"+this.height+"px;z-index:9999;display:"+(b.autoShow?"block":"none"),document.body.insertBefore(e,document.body.firstChild),this.setPosition(),d.event.on(a,"resize",this.getResetPositionHandler()),this.follow&&!d.browser.isSupportFixed&&d.event.on(a,"scroll",this.getResetPositionHandler())}var d=a.sinaadToolkit=a.sinaadToolkit||{VERSION:"1.0.0",mode:-1!==a.location.href.indexOf("__sinaadToolkitDebug__")?"debug":"release",_consoleViewId:"sinaadToolkitDebugContainer",debug:function(b){var c=a.console||{log:function(a){var b=document.getElementById(d._consoleViewId);b||(b=document.createElement("ul"),b.id=d._consoleViewId,b.style.cssText="z-index:99999;overflow:auto;height:300px;position:absolute;right:0;top:0;opacity:.9;*filter:alpha(opacity=90);background:#fff;width:500px;",document.body.insertBefore(b,document.body.firstChild));var c=document.createElement("li");c.style.cssText="border-bottom:1px dotted #ccc;line-height:30px;font-size:12px;",c.innerHTML=a+Array.prototype.slice.call(arguments,1).join(" "),b.appendChild(c)}};"debug"===d.mode&&c.log(b,Array.prototype.slice.call(arguments,1))},error:function(a,b){if("debug"===d.mode)throw new Error(a+(b?":"+b.message:""))},now:function(){return+new Date},rnd:function(){return Math.floor(2147483648*Math.random()).toString(36)},rand:function(a,b){return Math.floor(a+Math.random()*(b-a+1))},hash:function(a){for(var b,c=0,d=0;!isNaN(b=a.charCodeAt(d++));)c=(c<<5)-c+b,c&=c;return Math.abs(c).toString(36)},isFunction:function(a){return"[object Function]"===Object.prototype.toString.call(a)},isString:function(a){return"[object String]"===Object.prototype.toString.call(a)},isNull:function(a){return"undefined"==typeof a||null===a},isArray:function(a){return"[object Array]"===Object.prototype.toString.call(a)},isNumber:function(a){return"[object Number]"===Object.prototype.toString.call(a)&&isFinite(a)}};d.RESOURCE_URL=d.RESOURCE_URL||["http://d1.sina.com.cn/litong/zhitou/sinaads","http://d2.sina.com.cn/litong/zhitou/sinaads","http://d3.sina.com.cn/litong/zhitou/sinaads","http://d4.sina.com.cn/litong/zhitou/sinaads","http://d5.sina.com.cn/litong/zhitou/sinaads","http://d6.sina.com.cn/litong/zhitou/sinaads","http://d7.sina.com.cn/litong/zhitou/sinaads","http://d8.sina.com.cn/litong/zhitou/sinaads","http://d9.sina.com.cn/litong/zhitou/sinaads"][d.rand(0,8)],d.TOOLKIT_URL=d.RESOURCE_URL+"/release/sinaadToolkit.js",d.browser=d.browser||function(c){var d={android:/(Android)\s+([\d.]+)/i.test(c),ipad:/(iPad).*OS\s([\d_]+)/i.test(c),webos:/(webOS|hpwOS)[\s\/]([\d.]+)/i.test(c),kindle:/Kindle\/([\d.]+)/i.test(c),silk:/Silk\/([\d._]+)/i.test(c),blackberry:/(BlackBerry).*Version\/([\d.]+)/i.test(c),bb10:/(BB10).*Version\/([\d.]+)/i.test(c),rimtabletos:/(RIM\sTablet\sOS)\s([\d.]+)/i.test(c),playbook:/PlayBook/i.test(c),chrome:/chrome\/(\d+\.\d+)/i.test(c)?+RegExp.$1:b,firefox:/firefox\/(\d+\.\d+)/i.test(c)?+RegExp.$1:b,ie:/msie (\d+\.\d+)/i.test(c)?document.documentMode||+RegExp.$1:b,isGecko:/gecko/i.test(c)&&!/like gecko/i.test(c),isStrict:"CSS1Compat"===document.compatMode,isWebkit:/webkit/i.test(c),opera:/opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(c)?+(RegExp.$6||RegExp.$2):b};d.iphone=!d.ipad&&/(iPhone\sOS)\s([\d_]+)/i.test(c),d.touchpad=d.webos&&/TouchPad/.test(c),d.tablet=!!(d.ipad||d.playbook||d.android&&!/Mobile/.test(c)||d.firefox&&/Tablet/.test(c)),d.phone=!(d.tablet||!(d.android||d.iphone||d.webos||d.blackberry||d.bb10||d.chrome&&/Android/.test(c)||d.chrome&&/CriOS\/([\d.]+)/.test(c)||d.firefox&&/Mobile/.test(c)));try{/(\d+\.\d+)/.test(a.external.max_version)&&(d.maxthon=+RegExp.$1)}catch(e){}return d.safari=/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(c)&&!/chrome/i.test(c)?+(RegExp.$1||RegExp.$2):b,d.isSupportFixed=!d.ie||d.ie>=7,d}(navigator.userAgent),d.array=d.array||{remove:function(a,b){for(var c=a.length;c--;)c in a&&a[c]===b&&a.splice(c,1);return a},each:function(a,b,c){a=d.array.ensureArray(a);var e,f,g,h=a.length;if("function"==typeof b)for(g=0;h>g&&(f=a[g],e=b.call(c||a,f,g),e!==!1);g++);return a},ensureArray:function(a){return d.isArray(a)?a:d.isNull(a)?[]:[a]}},d.string=d.string||function(){var a={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","	":"\\t","":"\\u000b"},b=/\uffff/.test("ï¿¿")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;return{encodeHTML:function(a){return String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")},decodeHTML:function(a){var b=String(a).replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");return b.replace(/&#([\d]+);/g,function(a,b){return String.fromCharCode(parseInt(b,10))})},formalString:function(c){var d=[];return d.push(c.replace(b,function(b){if(b in a)return a[b];var c=b.charCodeAt(0),d="\\u";return 16>c?d+="000":256>c?d+="00":4096>c&&(d+="0"),a[b]=d+c.toString(16),a[b]})),'"'+d.join("")+'"'},format:function(a,b){a=String(a);var c=Array.prototype.slice.call(arguments,1),d=Object.prototype.toString;return c.length?(c=1===c.length?null!==b&&/\[object Array\]|\[object Object\]/.test(d.call(b))?b:c:c,a.replace(/#\{(.+?)\}/g,function(a,b){var e=c[b];return"[object Function]"===d.call(e)&&(e=e(b)),"undefined"==typeof e?"":e})):a},toCamelCase:function(a){return a.indexOf("-")<0&&a.indexOf("_")<0?a:a.replace(/[-_][^-_]/g,function(a){return a.charAt(1).toUpperCase()})}}}(),d.object=d.object||{map:function(a,b){var c={};for(var d in a)a.hasOwnProperty(d)&&(c[d]=b(a[d],d));return c}},d.event=d.event||{on:function(a,b,c){a.attachEvent?a.attachEvent("on"+b,c):a.addEventListener&&a.addEventListener(b,c,!1)}},d.cookie=d.cookie||{_isValidKey:function(a){return new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+$').test(a)},_getRaw:function(a){if(d.cookie._isValidKey(a)){var b=new RegExp("(^| )"+a+"=([^;]*)(;|$)"),c=b.exec(document.cookie);if(c)return c[2]||null}return null},_setRaw:function(a,b,c){if(d.cookie._isValidKey(a)){c=c||{};var e=c.expires;"number"==typeof c.expires&&(e=new Date,e.setTime(e.getTime()+c.expires)),document.cookie=a+"="+b+(c.path?"; path="+c.path:"")+(e?"; expires="+e.toGMTString():"")+(c.domain?"; domain="+c.domain:"")+(c.secure?"; secure":"")}},get:function(a){var b=d.cookie._getRaw(a);return"string"==typeof b?b=decodeURIComponent(b):null},set:function(a,b,c){d.cookie._setRaw(a,encodeURIComponent(b),c)},remove:function(a,b){b=b||{},b.expires=new Date(0),d.cookie._setRaw(a,"",b)}},d.storage=d.storage||function(){var b={};d.event.on(a,"beforeunload",function(){for(var a in b)try{d.storage.remove(a),delete b[a]}catch(c){}});var c={id:"sinaadToolkitUserDataContainer",name:location.hostname,init:function(){var a=document.getElementById(c.id);if(!a)try{a=document.createElement("input"),a.type="hidden",a.style.display="none",a.addBehavior("#default#userData"),document.body.insertBefore(a,document.body.firstChild);var b=new Date;b.setDate(b.getDate()+365),a.expires=b.toUTCString()}catch(e){return d.error("sinaadToolkit.storage:userDataåˆå§‹åŒ–å¤±è´¥ï¼Œ"+e.message),null}return a},setItem:function(a,e,f){var g=c.init();g&&(g.load(c.name),g.setAttribute(a,e+(f?";expires="+(d.now()+f):"")),g.save(c.name)),f||(b[a]=1)},getItem:function(a){var b=c.init();return b?(b.load(c.name),b.getAttribute(a)):void 0},removeItem:function(a){var b=c.init();b&&(b.load(c.name),b.removeAttribute(a),b.save(c.name))}},e={getItem:function(b){return a.localStorage.getItem(b)},setItem:function(c,e,f){a.localStorage.setItem(c,e+(f?";expires="+(d.now()+f):"")),f||(b[c]=1)},removeItem:function(b){a.localStorage.removeItem(b)}},f={getItem:function(a){return d.cookie.get(a)},setItem:function(a,b,c){d.cookie.set(a,b,{expires:c||0})},removeItem:function(a){d.cookie.remove(a)}},g=a.localStorage?e:d.browser.ie&&d.browser.ie<8?c:f;return{get:function(a){try{var b=g.getItem(a);return b?(d.debug("sinaadToolkit.storage.get:èŽ·å–åˆ°"+a+"çš„å€¼: "+b),b=b.split(";"),b[1]&&d.now()>parseInt(b[1].split("=")[1],10)?(g.removeItem(a),null):b[0]):null}catch(c){return d.error("sinaadToolkit.storage.get:"+c.message),null}},set:function(a,b,c){try{g.setItem(a,b,c)}catch(e){d.error("sinaadToolkit.storage.set:"+e.message)}},remove:function(a){try{g.removeItem(a)}catch(b){d.error("sinaadToolkit.storage.remove:"+b.message)}}}}(),d.url=d.url||{createURL:function(a,b,c){return[c?"https":"http","://",a,b].join("")},top:function(){var b;try{b=a.top.location.href}catch(c){}return b||(a.top===a.self?a.location.href:a.document.referrer)}()},d.dom=d.dom||{get:function(a){return a?"string"==typeof a||a instanceof String?document.getElementById(a):!a.nodeName||1!==a.nodeType&&9!==a.nodeType?null:a:null},getDocument:function(a){return 9===a.nodeType?a:a.ownerDocument||a.document},getComputedStyle:function(a,b){var c,e=d.dom.getDocument(a);return e.defaultView&&e.defaultView.getComputedStyle&&(c=e.defaultView.getComputedStyle(a,null))?c[b]||c.getPropertyValue(b):""},getCurrentStyle:function(a,b){return a.style[b]||(a.currentStyle?a.currentStyle[b]:"")||d.dom.getComputedStyle(a,b)},_styleFixer:{},_styleFilter:[],getStyle:function(a,b){var c,e=d.dom;a=e.get(a),b=d.string.toCamelCase(b);var f=a.style[b]||(a.currentStyle?a.currentStyle[b]:"")||e.getComputedStyle(a,b);return f&&"auto"!==f||(c=e._styleFixer[b],c&&(f=c.get?c.get(a,b,f):d.dom.getStyle(a,c))),(c=e._styleFilter)&&(f=c.filter(b,f,"get")),f},getPosition:function(a){a=d.dom.get(a);var b,c,e=d.dom.getDocument(a),f=d.browser,g=d.dom.getStyle,h={left:0,top:0},i=f.ie&&!f.isStrict?e.body:e.documentElement;if(a===i)return h;if(a.getBoundingClientRect){c=a.getBoundingClientRect(),h.left=Math.floor(c.left)+Math.max(e.documentElement.scrollLeft,e.body.scrollLeft),h.top=Math.floor(c.top)+Math.max(e.documentElement.scrollTop,e.body.scrollTop),h.left-=e.documentElement.clientLeft,h.top-=e.documentElement.clientTop;var j=e.body,k=parseInt(g(j,"borderLeftWidth"),10),l=parseInt(g(j,"borderTopWidth"),10);f.ie&&!f.isStrict&&(h.left-=isNaN(k)?2:k,h.top-=isNaN(l)?2:l)}else{b=a;do{if(h.left+=b.offsetLeft,h.top+=b.offsetTop,f.isWebkit>0&&"fixed"===g(b,"position")){h.left+=e.body.scrollLeft,h.top+=e.body.scrollTop;break}b=b.offsetParent}while(b&&b!==a);for((f.opera>0||f.isWebkit>0&&"absolute"===g(a,"position"))&&(h.top-=e.body.offsetTop),b=a.offsetParent;b&&b!==e.body;)h.left-=b.scrollLeft,f.opera&&"TR"===b.tagName||(h.top-=b.scrollTop),b=b.offsetParent}return h}},d.dom._styleFilter.filter=function(a,b,c){for(var e,f=0,g=d.dom._styleFilter;e=g[f];f++)(e=e[c])&&(b=e(a,b));return b},d.page=d.page||{getScrollTop:function(){var b=document;return a.pageYOffset||b.documentElement.scrollTop||b.body.scrollTop},getScrollLeft:function(){var b=document;return a.pageXOffset||b.documentElement.scrollLeft||b.body.scrollLeft},getViewHeight:function(){var a=document,b="BackCompat"===a.compatMode?a.body:a.documentElement;return b.clientHeight},getViewWidth:function(){var a=document,b="BackCompat"===a.compatMode?a.body:a.documentElement;return b.clientWidth}},d.Deferred=d.Deferred||function(a){function b(a,b,c,f){return function(){if("function"==typeof c)try{var g=c.apply(a,arguments);e.isPromise(g)?g.then(function(){b.resolve.apply(b,arguments)},function(){b.reject.apply(b,arguments)}):b.resolve.call(b,g)}catch(h){d.error("sinaadToolkit.Deferred: _pipeå†…éƒ¨æ–¹æ³•å‡ºé”™-"+h.message),b.reject(h)}else b[f].apply(b,a._args)}}function c(b){if("pending"!==b._state){var c="resolved"===b._state?b._resolves.slice():b._rejects.slice();setTimeout(function(){a.array.each(c,function(a){try{a.apply(b,b._args)}catch(c){d.error("sinaadToolkit.Deferred: _flushå‡ºé”™"+c.message)}})},0),b._resolves=[],b._rejects=[]}}function e(){this._state="pending",this._args=null,this._resolves=[],this._rejects=[]}return e.prototype={resolve:function(){"pending"===this._state&&(this._state="resolved",this._args=[].slice.call(arguments),c(this))},reject:function(){"pending"===this._state&&(this._state="rejected",this._args=[].slice.call(arguments),c(this))},then:function(a,d){var f=new e;return this._resolves.push(b(this,f,a,"resolve")),this._rejects.push(b(this,f,d,"reject")),c(this),f},done:function(a){return this.then(a)},fail:function(a){return this.then(null,a)}},e.isPromise=function(a){return a&&"function"==typeof a.then},e}(d),d.sio=d.sio||function(){function b(a,b,c){a.setAttribute("type","text/javascript"),c&&a.setAttribute("charset",c),a.setAttribute("src",b),document.getElementsByTagName("head")[0].appendChild(a)}function c(a){a&&a.parentNode&&a.parentNode.removeChild(a),a=null}return{loadScript:function(a,d,e){var f,g=document.createElement("SCRIPT"),h=0,i=e||{},j=i.charset||"utf-8",k=d||function(){},l=i.timeout||0;g.onload=g.onreadystatechange=function(){if(!h){var a=g.readyState;if("undefined"==typeof a||"loaded"===a||"complete"===a){h=1;try{k(),clearTimeout(f)}finally{g.onload=g.onreadystatechange=null,c(g)}}}},l&&(f=setTimeout(function(){g.onload=g.onreadystatechange=null,c(g),i.onfailure&&i.onfailure()},l)),b(g,a,j)},jsonp:function(e,f,g){function h(b){return function(){try{b?n.onfailure&&n.onfailure():(f.apply(a,arguments),clearTimeout(j)),a[i]=null,delete a[i]}catch(d){}finally{c(l)}}}var i,j,k,l=document.createElement("SCRIPT"),m="_sinaads_cbs_",n=g||{},o=n.charset||"utf-8",p=n.queryField||"callback",q=n.timeout||0,r=new RegExp("(\\?|&)"+p+"=([^&]*)");d.isFunction(f)?(i=m+Math.floor(2147483648*Math.random()).toString(36),a[i]=h(0)):d.isString(f)?i=f:(k=r.exec(e))&&(i=k[2]),q&&(j=setTimeout(h(1),q)),e=e.replace(r,"$1"+p+"="+i),e.search(r)<0&&(e+=(e.indexOf("?")<0?"?":"&")+p+"="+i),b(l,e,o)},log:function(b,c){var e=new Image,f="_sinaads_sio_log_"+d.rnd();a[f]=e,e.onload=e.onerror=e.onabort=function(){e.onload=e.onerror=e.onabort=null,a[f]=null,e=null},e.src=b+(c?"":(b.indexOf("?")>0?"&":"?")+f)}}}(),d.swf=d.swf||{uid:0,version:function(){var b=navigator;if(b.plugins&&b.mimeTypes.length){var c=b.plugins["Shockwave Flash"];if(c&&c.description)return c.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s)+r/,".")+".0"}else if(a.ActiveXObject&&!a.opera)for(var d=12;d>=2;d--)try{var e=new a.ActiveXObject("ShockwaveFlash.ShockwaveFlash."+d);if(e){var f=e.GetVariable("$version");return f.replace(/WIN/g,"").replace(/,/g,".")}}catch(g){}}(),getMovie:function(b,c){c=c||a;var e,f=c.document[b];return 9===d.browser.ie?f&&f.length?1===(e=d.array.remove(d.toArray(f),function(a){return"embed"!==a.tagName.toLowerCase()})).length?e[0]:e:f:f||c[b]},createHTML:function(a){a=a||{};var b,c,e,f,g,h,i=d.swf.version,j=a.ver||"6.0.0",k={},l=d.string.encodeHTML;for(f in a)k[f]=a[f];if(a=k,!i)return"";for(i=i.split("."),j=j.split("."),e=0;3>e&&(b=parseInt(i[e],10),c=parseInt(j[e],10),!(b>c));e++)if(c>b)return"";var m=a.vars,n=["classid","codebase","id","width","height","align"];if(a.name=a.id=a.id||"sinaadtk_swf_uid_"+d.swf.uid++,a.align=a.align||"middle",a.classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000",a.codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0",a.movie=a.url||"",delete a.vars,delete a.url,"string"==typeof m)a.flashvars=m;else{var o=[];for(f in m)h=m[f],o.push(f+"="+encodeURIComponent(h));a.flashvars=o.join("&")}var p=["<object "];for(e=0,g=n.length;g>e;e++)h=n[e],p.push(" ",h,'="',l(a[h]),'"');p.push(">");var q={wmode:1,scale:1,quality:1,play:1,loop:1,menu:1,salign:1,bgcolor:1,base:1,allowscriptaccess:1,allownetworking:1,allowfullscreen:1,seamlesstabbing:1,devicefont:1,swliveconnect:1,flashvars:1,movie:1};for(f in a)h=a[f],f=f.toLowerCase(),q[f]&&(h||h===!1||0===h)&&p.push('<param name="'+f+'" value="'+l(h)+'" />');a.src=a.movie,delete a.id,delete a.movie,delete a.classid,delete a.codebase,a.type="application/x-shockwave-flash",a.pluginspage="http://www.macromedia.com/go/getflashplayer",p.push("<embed");var r;for(f in a)if(h=a[f],h||h===!1||0===h){if(new RegExp("^salign$","i").test(f)){r=h;continue}p.push(" ",f,'="',l(h),'"')}return r&&p.push(' salign="',l(r),'"'),p.push("></embed></object>"),p.join("")}},d.iframe=d.iframe||{uid:0,init:function(a,b,c,d){var e=d?'"':"",f=e+"0"+e;a.width=e+b+e,a.height=e+c+e,a.frameborder=f,a.marginwidth=f,a.marginheight=f,a.vspace=f,a.hspace=f,a.allowtransparency=e+"true"+e,a.scrolling=e+"no"+e},createHTML:function(a){var b=[];return a.name=a.name||a.id||"sinaadtk_iframe_uid_"+d.iframe.uid++,d.object.map(a,function(a,c){b.push(" "+c+'="'+(null===a?"":a)+'"')}),"<iframe"+b.join("")+"></iframe>"},fill:function(b,c){var e,f=d.browser.ie;if(f){try{e=!!b.contentWindow.document}catch(g){e=!1}if(e)try{f>6?(a.frames[b.name].contents=c,b.src='javascript:window["contents"]'):(a.frames[b.name].contents=c,b.src='javascript:document.write(window["contents"]);/* document.close(); */')}catch(g){d.error("sinaadToolkit.iframe.fill: æ— æ³•å¾€ieçš„iframeä¸­å†™å…¥å†…å®¹, ",g)}else try{var h="sinaads-ad-iframecontent-"+d.rnd();a[h]=c,c='var adContent = window.parent["'+h+'"];window.parent["'+h+'"] = null;document.write(adContent);',c=d.browser.ie&&d.browser.ie<=6?"window.onload = function() {document.write(\\'<sc\\' + \\'ript type=\"text/javascript\">document.domain = \""+document.domain+'";'+c+"<\\/scr\\' + \\'ipt>\\');"+"document.close();"+"};":'document.domain = "'+document.domain+'";'+c+"document.close();",b.src='javascript:\'<script type="text/javascript">'+c+"</script>'"}catch(g){a[h]=null,d.error("sinaadToolkit.iframe.fill: æ— æ³•é€šè¿‡ä¿®æ”¹document.domainçš„æ–¹å¼æ¥å¡«å……IEä¸‹çš„iframeå†…å®¹, ",g)}}else try{e=b.contentWindow?b.contentWindow.document:b.contentDocument,d.browser.firefox&&e.open("text/html","replace"),e.write(c),e.close()}catch(g){d.error("sinaadToolkit.iframe.fill: æ— æ³•ä½¿ç”¨æ ‡å‡†æ–¹æ³•å¡«å……iframeçš„å†…å®¹, ",g)}}},d.monitor=d.monitor||{parseTpl:function(){var a=/\{__([a-zA-Z0-9]+(_*[a-zA-Z0-9])*)__\}/g;return function(b,c){return b?b.replace(a,function(a,b){return b.indexOf("adbox_")>0?(b=b.split("_"),"{__mo"+b[2]+"__}"):c[b]||a}):""}}(),createImpressMonitor:function(a){var b=[];return d.array.each(a,function(a){var c={};d.iframe.init(c,1,1,!1),c.src=a,c.style="display:none;",b.push(d.iframe.createHTML(c))}),b.join("")},createClickMonitor:function(a,b){if(b){var c=[],e="";return d.array.each(b,function(b){var d="";if(b){switch(a){case"image":case"flash":case"text":d="sinaadToolkit.sio.log('"+b+"')",e=";";break;case"adbox":d="api_exu="+encodeURIComponent(b),e="&"}d&&c.push(d)}}),c.join(e)}}},d.ad=d.ad||{getTypeBySrc:function(a,b){var c=b;if(!c)switch(c=a.substring(a.length-3).toLowerCase()){case"swf":c="flash";break;case"tml":c="url";break;case".js":c="js";break;case"png":case"jpg":case"gif":case"bmp":c="image";break;default:c="html"}return"url"===c&&a.indexOf("adbox.sina.com.cn/ad/")>=0&&(c="adbox"),c},createHTML:function(a,b,c,e,f,g,h){var i,j,k="";if(b=d.array.ensureArray(b),a=d.array.ensureArray(a),f=d.array.ensureArray(f),c+=d.isNumber(c)?"px":"",e+=d.isNumber(e)?"px":"",h&&"string"==typeof h){var l={width:c,height:e,monitor:j};return d.array.each(b,function(b,c){l["src"+c]=b,l["type"+c]=a[c]||d.ad.getTypeBySrc(b,a[c]),l["link"+c]=f[c]||"",l["monitor"+c]=d.monitor.createClickMonitor(l["type"+c],g)}),l.src=l.src0||"",l.type=l.type0||"",l.link=l.link0||"",l.monitor=l.monitor0||"",d.string.format(h,l)}switch(b=b[0],a=a[0]||d.ad.getTypeBySrc(b,a[0]),f=f[0],j=d.monitor.createClickMonitor(a,g),a){case"url":i={},d.iframe.init(i,c,e,!1),i.src=b,k=d.iframe.createHTML(i);break;case"image":k='<img border="0" src="'+b+'" style="width:'+c+";height:"+e+';border:0" alt="'+b+'"/>',k=f?'<a href="'+f+'" target="'+(d.browser.phone?"_top":"_blank")+'"'+(j?' onclick="try{'+j+'}catch(e){}"':"")+">"+k+"</a>":k;break;case"text":k=f?'<a href="'+f+'" target="_blank"'+(j?' onclick="try{'+j+'}catch(e){}"':"")+">"+b+"</a>":b;break;case"flash":k=d.swf.createHTML({url:b,width:c,height:e,wmode:"transparent"}),f&&(k=['<div style="width:'+c+";height:"+e+';position:relative;overflow:hidden;">',k,'<a style="position:absolute;background:#fff;opacity:0;filter:alpha(opacity=0);width:'+c+";height:"+e+';left:0;top:0" href="'+f+'" target="'+(d.browser.phone?"_top":"_blank")+'"'+(j?' onclick="try{'+j+'}catch(e){}"':"")+"></a>","</div>"].join(""));break;case"adbox":i={},d.iframe.init(i,c,e,!1),i.src=b,j&&(i.name=j),k=d.iframe.createHTML(i);break;case"js":k=["<",'script charset="utf-8" src="',b,'"></',"script>"].join("");break;default:k=b.replace(/\\x3c/g,"<").replace(/\\x3e/g,">")}return k}},d.sandbox=d.sandbox||function(){function a(b,c){var e,f="";switch(typeof b){case"string":c.push(d.string.formalString(b));break;case"number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case"boolean":c.push(b);break;case"undefined":c.push("null");break;case"object":if(null===b){c.push("null");break}if(b instanceof Array){var g=b.length;for(c.push("["),f="",e=0;g>e;e++)c.push(f),a(b[e],c),f=",";c.push("]");break}c.push("{");var h;f="";for(var i in b)b.hasOwnProperty(i)&&(h=b[i],"function"!=typeof h&&(c.push(f),c.push(i),c.push(":"),a(h,c),f=","));c.push("}");break;case"function":}}function b(b){var c=[];return d.object.map(b,function(b,d){if(null!==b){var e=[];try{a(b,e),e=e.join("")}catch(f){}e&&c.push(d,"=",e,";")}}),c.join("")}var c=0;return{create:function(a,e,f,g,h){var i="sinaadtk_sandbox_id_"+c++;h=h||{},e+=d.isNumber(e)?"px":"",f+=d.isNumber(f)?"px":"";var j={};d.iframe.init(j,e,f,0),j.src="javascript:'<html><body style=background:transparent;></body></html>'",j.id=i,j.style="float:left;",a.innerHTML=d.iframe.createHTML(j),h=b(h),d.iframe.fill(document.getElementById(i),['<!doctype html><html><body style="background:transparent">',"<","script>",h,"</","script>",g,"</body></html>"].join(""))}}}(),c.uid=0,c.prototype={getMain:function(){return document.getElementById(this.uid)},getResetPositionHandler:function(){var a=this;return function(){a.setPosition()}},setPosition:function(){var a=this.getMain(),b=this.position.split(" "),c=d.page.getViewWidth(),e=d.page.getViewHeight(),f=0,g=0,h=Math.min(this.minViewportWidth?c/2-this.minViewportWidth/2:0,0);switch(this.follow&&(f=d.browser.isSupportFixed?0:d.page.getScrollTop()||0,g=d.browser.isSupportFixed?0:d.page.getScrollLeft()||0),b[0]){case"center":a.style.left=g+(c-this.width)/2+g+"px";break;case"left":a.style.left=g+h+"px";break;case"right":this.follow?a.style.left=g+(c-this.width)-h+"px":a.style.right=h+"px";break;default:a.style.left=g+(parseInt(b[0],10)||0)+"px"}switch(b[1]){case"center":a.style.top=(e-this.height)/2+f+"px";break;case"top":a.style.top=f+"px";break;case"bottom":this.follow?a.style.top=f+(e-this.height)+"px":a.style.bottom="0px";break;default:a.style.top=f+(parseInt(b[1],10)||0)+"px"}},show:function(){this.getMain().style.display="block"},hide:function(){this.getMain().style.display="none"}},d.Box=d.Box||c}(window),function(a,b){"use strict";function c(a){return/(^| )sinaads($| )/.test(a.className)&&"done"!==a.getAttribute("data-ad-status")}function d(a){var b,d=document.getElementsByTagName("ins"),e=0,f=d.length;for(b=d[e];f>e;b=d[++e])if(c(b)&&(!a||b.id===a))return b;return null}function e(e){var g=e.element;e=e.params||{},g?(c(g)||(g=g.id&&d(g.id))||b.debug("sinaads: è¯¥å…ƒç´ å·²ç»è¢«æ¸²æŸ“å®Œæˆï¼Œæ— éœ€æ¸²æŸ“",g),"innerHTML"in g||b.debug("sinaads: æ— æ³•æ¸²æŸ“è¯¥å…ƒç´ ",g)):(g=d())||b.debug("sinaads: æ‰€æœ‰å¾…æ¸²æŸ“çš„å…ƒç´ éƒ½å·²ç»è¢«æ¸²æŸ“å®Œæˆ"),g.setAttribute("data-ad-status","done");var h=b.dom.getPosition(g);g.setAttribute("data-ad-offset-left",h.left),g.setAttribute("data-ad-offset-top",h.top),e.sinaads_uid=a.sinaads_uid?++a.sinaads_uid:a.sinaads_uid=1;for(var i=g.attributes,j=i.length,k=0;j>k;k++){var l=i[k];if(/data-/.test(l.nodeName)){var n=l.nodeName.replace("data","sinaads").replace(/-/g,"_");e.hasOwnProperty(n)||(e[n]=l.nodeValue)}}e.sinaads_page_url=b.url.top,m.request(e.sinaads_ad_pdps).done(function(){f(g,m.get(e.sinaads_ad_pdps),e),b.isFunction(e.sinaads_success_handler)&&e.sinaads_success_handler()}).fail(function(){b.isFunction(e.sinaads_fail_handler)&&e.sinaads_fail_handler()})}function f(a,c,d){if(!c)return b.debug("sinaads: "+d.sinaads_ad_pdps+"æ•°æ®æ²¡æœ‰èŽ·å–åˆ°, æ— æ³•æ¸²æŸ“"),void 0;var e=b.now(),f=c.size.split("*"),g=d.sinaads_ad_width||(d.sinaads_ad_width=Number(f[0]))||0,h=d.sinaads_ad_height||(d.sinaads_ad_height=Number(f[1]))||0;b.array.each(c.content,function(e,f){b.debug("sinaads: å¤„ç†"+d.sinaads_ad_pdps+"ç¬¬"+(f+1)+"ä¸ªå†…å®¹çš„å¹¿å‘Šå±•çŽ°"),e.src=b.array.ensureArray(e.src),e.link=b.array.ensureArray(e.link),e.type=b.array.ensureArray(e.type);var i=e.monitor,j=e.pv;b.array.each(j,function(a,c){j[c]=b.monitor.parseTpl(a,d),b.debug("sinaads: "+d.sinaads_ad_pdps+"å‘é€æ›å…‰"+a),j[c]&&b.sio.log(j[c])}),b.array.each(i,function(a,c){i[c]=b.monitor.parseTpl(a,d),b.debug("sinaads: "+d.sinaads_ad_pdps+"å¤„ç†ç›‘æµ‹é“¾æŽ¥"+a)}),n.render(d.sinaads_ad_type||c.type,a,g,h,e,i,d),c.highlight&&"embed"===(d.sinaads_ad_type||c.type)&&(a.style.outline="2px solid #f00")}),b.debug("sinaads: æ¸²æŸ“å¹¿å‘Šå®Œæ¯•(è€—æ—¶ms)",b.now()-e)}function g(){b.debug("sinaads: è¿›å…¥æ‰«ææ¸²æŸ“å¹¿å‘Šæµç¨‹"+b.now());var c=a.sinaads;if(c&&c.shift)for(var d,f=50;(d=c.shift())&&0<f--;)e(d);a.sinaads={push:e}}if(!b.seed){var h=a.location.pathname,i=a.location.host,j=i.split(".")[0]+h.substring(0,h.lastIndexOf("/"));b.debug("sinaads: å½“å‰é¡µé¢ç§å­keyä¸º:"+j),j="sinaads_"+b.hash(j),b.seed=parseInt(b.storage.get(j),10)||b.rand(0,100),b.storage.set(j,b.seed>1e3?0:++b.seed,2592e6)}b.enterTime||(b.enterTime=b.now());var k="http://sax.sina.com.cn/impress.php";b.PLUS_RESOURCE_URL=b.RESOURCE_URL+"/release/plus/Media.js";var l=a._sinaadsTargeting=a._sinaadsTargeting||function(){for(var a,c=document.getElementsByTagName("head")[0].getElementsByTagName("meta"),d={},e=[],f=0,g=c.length;g>f;f++)e.push(c[f]);return b.array.each(e,function(a){0===a.name.indexOf("sinaads_")&&(d[a.name.split("_")[1]]=a.content)}),(a=b.cookie.get("sinaads_entry")||b.storage.get("sinaads_entry"))&&(d.entry=a,b.cookie.remove("sinaads_entry"),b.storage.remove("sinaads_entry")),b.debug("sinaads: å–å¾—å®šå‘ä¿¡æ¯",d),d}(),m=function(){function c(a){var c={1:"http://d3.sina.com.cn/litong/zhitou/union/tanx.html?pid=",2:"http://d3.sina.com.cn/litong/zhitou/union/google.html?pid=",3:"http://d3.sina.com.cn/litong/zhitou/union/yihaodian.html?pid=",4:"http://d3.sina.com.cn/litong/zhitou/union/baidu.html?pid=",5:"http://js.miaozhen.com/mzad_iframe.html?_srv=MZHKY&l="},d=a.size.split("*"),e=a.engineType;return!a.content&&a.value&&(b.debug("sinaads: è€æ•°æ®æ ¼å¼ï¼Œéœ€è¦è¿›è¡Œæ•°æ®é€‚é…(pdps)",a.id),a.content=a.value,delete a.value),b.array.each(a.content,function(f,g){var h,i,j=f.manageType;f=f.content,h=b.array.ensureArray(f.type),i=b.array.ensureArray(f.link),"network"===e&&(f={src:[c[""+j]+f+"&w="+d[0]+"&h="+d[1]],type:["url"]}),"dsp"===a.engineType&&17!==parseInt(j,10)&&(f={src:[f],type:["html"]}),b.array.each(f.src,function(a,c){h[c]=b.ad.getTypeBySrc(a,h[c])}),a.type={lmt:"stream",kl:"couplet",sc:"videoWindow",hzh:"embed",tl:"embed",jx:"embed",dtl:"embed",an:"embed",dan:"embed",xan:"embed",wzl:"textlink",ztwzl:"zhitoutextlink",qp:"fullscreen",fp:"turning",dl:"float",tip:"tip",bt:"bp",sx:"follow"}[a.type]||a.type||"embed",a.content[g]=f}),a}var d=a._sinaadsCacheData=a._sinaadsCacheData||{};return{request:function(a){var e=b.now(),f=new b.Deferred,g=[],h=!1,i=[];if(b.array.each(a,function(a){h=!!d[a],h?b.debug("sinaads: å½“å‰pdpsæ•°æ®å·²åŠ è½½ï¼Œç›´æŽ¥æ¸²æŸ“ï¼ˆpdps, æ•°æ®ï¼‰",a,d[a]):i.push(a)}),h)f.resolve();else{b.debug("sinaads: å½“å‰pdpsæ•°æ®æœªåŠ è½½ï¼Œç«‹å³åŠ è½½æ•°æ®ï¼ˆpdps, å…¨å±€ç¼“å­˜æ•°æ®ï¼‰"+i.join(),d),g=["adunitid="+i.join(","),"rotate_count="+b.seed,"TIMESTAMP="+b.enterTime.toString(36),"referral="+encodeURIComponent(b.url.top)];for(var j in l)g.push("tg"+j+"="+encodeURIComponent(l[j]));b.sio.jsonp(k+"?"+g.join("&"),function(a){"nodata"===a?(b.debug("sinaads: "+i.join()+"-è¯¥å¹¿å‘Šä½æ²¡æœ‰èŽ·å–åˆ°å¯ç”¨çš„æ•°æ®"),f.reject()):(b.debug("sinaads: èŽ·å–æ•°æ®å®Œæˆï¼ˆå‚æ•°ï¼Œæ—¶é—´ï¼Œè€—æ—¶msï¼Œç»“æžœæ•°æ®ï¼‰",g,b.now(),b.now()-e,a),b.array.each(a.ad,function(a){a=c?c(a):a,a.content instanceof Array&&a.content.length>0&&(d[a.id]=a)}),b.array.each(a.mapUrl,function(a){b.debug("sinaads: å–å¾—æ•°æ®ï¼Œä¸”éœ€è¦mapping, å‘é€cookie mappingï¼ˆurlï¼Œå‚æ•°ï¼Œæ—¶é—´ï¼‰"+a,g,b.now()),a&&b.sio.log(a,1)})),f.resolve()})}return f},get:function(a){return d[a]},add:function(a,b){d[a]=b}}}(),n=function(){function b(a,b){!d[a]&&(d[a]=b)}function c(a,b,e,f,g,h,i){var j=d[a],k=a;"function"==typeof j&&(k=j(b,e,f,g,h,i)||a),k!==a&&c(k,b,e,f,g,h,i)}var d=a.sinaadsRenderHandler=a.sinaadsRenderHandler||{};return{render:c,register:b,handlerMap:d}}();n.register("couplet",function(a,c,d,e,f,g){var h=b.PLUS_RESOURCE_URL||b.RESOURCE_URL+"/src/plus/CoupletMedia.js";if(a.style.cssText="position:absolute;top:-9999px",1===e.src.length)switch(e.type[0]){case"js":b.sio.loadScript(e.src[0]);break;case"html":return"embed"}if(e.src.length>1){var i={src:e.src,type:e.type,link:e.link,top:g.sinaads_couple_top||0,monitor:e.monitor||[],delay:g.sinaads_ad_delay||0};b.CoupletMediaData?new b.CoupletMedia(i):b.sio.loadScript(h,function(){new b.CoupletMedia(i)})}}),n.register("videoWindow",function(a,c,d,e,f,g){var h=b.PLUS_RESOURCE_URL||b.RESOURCE_URL+"/src/plus/VideoWindowMedia.js";if(a.style.cssText="position:absolute;top:-9999px","js"!==e.type[0]){var i={src:e.src[0],type:e.type[0],width:c,height:d,link:e.link[0],monitor:e.monitor,delay:g.sinaads_ad_delay||0};b.VideoWindowMedia?new b.VideoWindowMedia(i):b.sio.loadScript(h,function(){new b.VideoWindowMedia(i)})}else b.sio.loadScript(e.src[0])}),n.register("stream",function(a,c,d,e,f,g){var h=b.PLUS_RESOURCE_URL||b.RESOURCE_URL+"/src/plus/StreamMedia.js";if(a.style.cssText="position:absolute;top:-9999px",1===e.src.length&&"js"===e.type[0]){var i=document.createElement("div");i.id="SteamMediaWrap",document.body.insertBefore(i,document.body.firstChild),b.sio.loadScript(e.src[0])}if(e.src.length>1){var j={main:{type:e.type[0]||"flash",src:e.src[0]||"",link:e.link[0]||"",width:c,height:d},mini:{src:e.src[1]||"",type:e.type[1]||"flash",link:e.link[1]||e.link[0]||""},monitor:f,delay:g.sinaads_ad_delay||0};b.StreamMedia?new b.StreamMedia(j):b.sio.loadScript(h,function(){new b.StreamMedia(j)})}}),n.register("fullscreen",function(a,c,d,e,f,g){var h=b.PLUS_RESOURCE_URL||b.RESOURCE_URL+"/src/plus/FullscreenMedia.js";if(a.style.cssText="position:absolute;top:-9999px",1===e.src.length&&"js"===e.type[0])b.sio.loadScript(e.src[0]);else{var i={type:e.type[0]||"",src:e.src[0]||"",link:e.link[0]||"",monitor:f,width:c,height:d,hasClose:g.sinaads_fullscreen_close||0,delay:g.sinaads_ad_delay||0};b.FullscreenMedia?new b.FullscreenMedia(i):b.sio.loadScript(h,function(){new b.FullscreenMedia(i)})}}),n.register("bp",function(b,c,d,e,f,g){b.style.cssText="position:absolute;top:-9999px",a.open("http://d1.sina.com.cn/litong/zhitou/sinaads/release/plus/pbv4.html?"+e.link[0]+"${}"+("flash"===e.type[0]?"swf":e.type[0])+"${}"+e.src[0],"sinaads_bp_"+g.sinaads_ad_pdps,"width="+c+",height="+d)}),n.register("float",function(a,c,d,e,f,g){var h=b.PLUS_RESOURCE_URL||b.RESOURCE_URL+"/src/plus/FloatMedia.js";a.style.cssText="position:absolute;top:-99999px";var i={type:e.type,src:e.src,top:g.sinaads_float_top||0,monitor:f,link:e.link,delay:g.sinaads_ad_delay||0,sideWidth:c,sideHeight:d,pdps:g.sinaads_ad_pdps};b.FloatMedia?new b.FloatMedia(i):b.sio.loadScript(h,function(){new b.FloatMedia(i)})}),n.register("turning",function(a,c,d,e,f,g){return e.src=[b.swf.createHTML({id:"TurningMedia"+g.sinaads_uid,url:"http://d3.sina.com.cn/d1images/fanpai/picshow.swf",width:c,height:d,vars:{ad_num:e.src.length,pics:e.src.join("Â§"),urls:e.link.join("Â§"),pic_width:c-5,pic_height:d-5,flip_time:1e3*g.sinaads_turning_flip_duration||300,pause_time:1e3*g.sinaads_turning_flip_delay||4e3,wait_time:1e3*g.sinaads_turning_wait||1e3}})],e.type=["html"],"embed"}),n.register("textlink",function(a,c,d,e,f,g){var h=document.createElement("span");h.innerHTML=b.ad.createHTML(e.type,e.src,0,0,e.link,f,g.sinaads_ad_tpl||""),a.style.cssText+=";text-decoration:none",a.appendChild(h)}),n.register("zhitoutextlink",n.handlerMap.textlink),n.register("tip",function(a,c,d,e,f,g){var h=b.PLUS_RESOURCE_URL||b.RESOURCE_URL+"/src/plus/TipsMedia.js",i={width:c,height:d,src:e.src,type:e.type,link:e.link,monitor:f,autoShow:1,top:g.sinaads_tip_top||0,zIndex:g.sinaads_ad_zindex||0};
b.TipsMedia?new b.TipsMedia(a,i):b.sio.loadScript(h,function(){new b.TipsMedia(a,i)})}),n.register("follow",function(a,c,d,e,f,g){var h=b.PLUS_RESOURCE_URL||b.RESOURCE_URL+"/src/plus/FollowMedia.js",i={main:{width:c,height:d,src:e.src[0]||"",type:e.type[0]||"",link:e.link[0]||"",top:g.sinaads_follow_top||0},mini:{src:e.src[1]||"",type:e.type[1]||"",link:e.link[1]||e.link[0]||"",top:g.sinaads_follow_mini_top||"bottom"},monitor:f,delay:g.sinaads_ad_delay||0,duration:g.sinaads_ad_duration||5};b.FollowMedia?new b.FollowMedia(i):b.sio.loadScript(h,function(){new b.FollowMedia(i)})}),n.register("embed",function(a,c,d,e,f,g){var h,i=g.sinaads_uid,j="sinaads_iframe_"+i,k=e.type[0]||"",l=e.link[0]||"",m=e.src[0]||"",n=g.sinaads_ad_pdps;switch(!g.sinaads_ad_fullview||"flash"!==k&&"image"!==k?(c+="px",d+="px"):(c="100%",d="auto"),a.style.cssText+=";display:block;overflow:hidden;",a.innerHTML='<ins style="margin:0px auto;display:block;overflow:hidden;width:'+c+";height:"+d+';"></ins>',a=a.getElementsByTagName("ins")[0],h=m?b.ad.createHTML(k,m,c,d,l,f):"",k){case"text":case"image":case"url":case"adbox":case"flash":a.innerHTML=h;break;default:b.sandbox.create(a,c,d,h,{sinaads_uid:i,sinaads_async_iframe_id:j,sinaads_ad_pdps:n,sinaads_ad_width:c,sinaads_ad_height:d})}}),function(){if(!a._sinaadsPreviewDone){a._sinaadsPreviewDone=!0;for(var c,d,e=a.location.search.substring(1).split("&"),f={},g=["pdps","src","size"],h=0;d=e[h++];)d=d.split("="),0===d[0].indexOf("sinaads_preview_")&&(c=d[0].replace("sinaads_preview_",""),c&&d[1]&&!f[c]&&(f[c]=d[1],b.array.remove(g,c)));0===g.length&&(b.debug("sinaads: å¹¿å‘Šä½"+f.pdps+"ä¸ºé¢„è§ˆå¹¿å‘Šä½ï¼ˆé¢„è§ˆæ•°æ®ï¼‰",f),m.add(f.pdps,{content:[{src:f.src.split("|"),link:(f.link||"").split("|"),monitor:(f.monitor||"").split("|"),pv:(f.pv||"").split("|"),type:(f.type||"").split("|")}],size:f.size,id:f.pdps,type:"embed",highlight:f.highlight||!1}))}}();var o=a.sinaadsPerloadData=a.sinaadsPerloadData||[];o.done||(o instanceof Array&&o.length>0?(b.debug("sinaads: é¢„åŠ è½½æ‰¹é‡è¯·æ±‚æ•°æ®ï¼ˆé¢„åŠ è½½pdpsåˆ—è¡¨ï¼‰"+o.join(",")),m.request(o).done(g).fail(g)):g()),a.sinaadsPerloadData.done=1}(window,window.sinaadToolkit);
/*
//@ sourceMappingURL=sinaads.js.map
*/
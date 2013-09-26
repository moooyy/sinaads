/**
 * sinaadToolkit
 * @description 新浪广告工具包，提供了浏览器判断，渲染，cookie, storage, iframe, 转义等基础操作
 * @author  acelan <xiaobin8[at]staff.sina.com.cn>
 * @version  1.0.0
 */
(function (window, undefined) {

    "use strict";

    var sinaadToolkit = window.sinaadToolkit = window.sinaadToolkit || {
        /**
         * 工具包版本号
         * @type {String}
         * @const
         */
        VERSION : '1.0.0',
        /**
         * 模式 debug || release
         * 在页面url中使用__sinaadToolkitDebug__可以触发debug模式
         */
        mode : window.location.href.indexOf('__sinaadToolkitDebug__') !== -1 ? 'debug' : 'release',  //是否开启debug模式
        /**
         * @private
         */
        _consoleViewId : 'sinaadToolkitDebugContainer',
        /**
         * 调试方法，用于方便线上调试问题
         * @param  {String} msg 输出的信息
         */
        debug : function (msg) {
            var console = window.console || {
                log : function (msg) {
                    var consoleView = document.getElementById(sinaadToolkit._consoleViewId);
                    if (!consoleView) {
                        consoleView = document.createElement('ul');
                        consoleView.id = sinaadToolkit._consoleViewId;
                        consoleView.style.cssText = 'z-index:99999;overflow:auto;height:300px;position:absolute;right:0;top:0;opacity:.9;*filter:alpha(opacity=90);background:#fff;width:500px;';
                        document.body.insertBefore(consoleView, document.body.firstChild);
                    }
                    var li = document.createElement('li');
                    li.style.cssText = 'border-bottom:1px dotted #ccc;line-height:30px;font-size:12px;';
                    li.innerHTML = msg + Array.prototype.slice.call(arguments, 1).join(' ');
                    consoleView.appendChild(li);
                }
            };
            if (sinaadToolkit.mode === 'debug') {
                console.log(msg, Array.prototype.slice.call(arguments, 1));
            }
        },
        /**
         * 错误信息
         */
        error : function (msg, e) {
            if (sinaadToolkit.mode === 'debug') {
                throw new Error(msg + (e ? ':' + e.message : ''));
            }
        },
        /**
         * 获取当前时间戳
         * @return {Number} 当前时间戳
         * @static
         */
        now : function () {
            return +new Date();
        },
        /**
         * 随机数生成，生成一个随机数的36进制表示方法
         * @return {String} 生成一个随机的36进制字符串（包含0-9a-zA-Z）
         * @static
         */
        rnd : function () {
            return Math.floor(Math.random() * 2147483648).toString(36);
        },
        /**
         * 获取[min, max]区间内任意整数
         * @param  {Number} min 最小值
         * @param  {Number} max 最大值
         * @return {Number}     
         */
        rand : function (min, max) {
            return Math.floor(min + Math.random() * (max - min + 1));
        },
        /**
         * 把一个字符串生成唯一hash
         * @param  {String} s 要生成hash的字符串
         * @return {String}   36进制字符串
         */
        hash : function (s) {
            var hash = 0,
                i = 0,
                w;

            for (; !isNaN(w = s.charCodeAt(i++));) {
                hash = ((hash << 5) - hash) + w;
                hash = hash & hash;
            }

            return Math.abs(hash).toString(36);
        },
        /**
         * 判断是否是函数
         * @param  {Any}        source      需要判断的对象
         * @return {Boolean}                是否是函数
         * @staitc
         */
        isFunction : function (source) {
            return '[object Function]' === Object.prototype.toString.call(source);
        },
        /**
         * 判断是否是字符串
         * @param  {Any} source 要判断的对象
         * @return {Boolean}        是否字符串
         * @static
         */
        isString : function (source) {
            return '[object String]' === Object.prototype.toString.call(source);
        },
        /**
         * 判断是否是null或者未定义
         * @param  {Any} source  要判断的对象
         * @return {Boolean}      是否为null或未定义
         */
        isNull : function (source) {
            return ('undefined' === typeof source) || (source === null);
        },
        /**
         * 判断是否是数组
         */
        isArray : function (source) {
            return '[object Array]' === Object.prototype.toString.call(source);
        },
        /**
         * 判断是否是数字
         */
        isNumber : function (source) {
            return '[object Number]' === Object.prototype.toString.call(source) && isFinite(source);
        }
    };


    /**
     * 资源备选地址
     * @static
     * @const
     */
    sinaadToolkit.RESOURCE_URL = sinaadToolkit.RESOURCE_URL || [
        'http://d1.sina.com.cn/litong/zhitou/sinaads',
        'http://d2.sina.com.cn/litong/zhitou/sinaads',
        'http://d3.sina.com.cn/litong/zhitou/sinaads',
        'http://d4.sina.com.cn/litong/zhitou/sinaads',
        'http://d5.sina.com.cn/litong/zhitou/sinaads',
        'http://d6.sina.com.cn/litong/zhitou/sinaads',
        'http://d7.sina.com.cn/litong/zhitou/sinaads',
        'http://d8.sina.com.cn/litong/zhitou/sinaads',
        'http://d9.sina.com.cn/litong/zhitou/sinaads'
        //'.'
    ][sinaadToolkit.rand(0, 8)];

    /**
     * 工具包资源地址
     * @static
     * @const
     */
    sinaadToolkit.TOOLKIT_URL = sinaadToolkit.RESOURCE_URL + '/src/sinaadToolkit.js';

    /**
     * @namespace sinaadToolkit.browser
     */
    sinaadToolkit.browser = sinaadToolkit.browser || (function (ua) {
        /**
         * @lends sinaadToolkit.browser
         */
        var browser = {
            /**
             * 是否是andriod系统
             * @type {Boolean}
             */
            android : /(Android)\s+([\d.]+)/i.test(ua),
            /**
             * @type {Boolean}
             */
            ipad : /(iPad).*OS\s([\d_]+)/i.test(ua),
            /**
             * @type {Boolean}
             */
            webos : /(webOS|hpwOS)[\s\/]([\d.]+)/i.test(ua),
            /**
             * @type {Boolean}
             */
            kindle : /Kindle\/([\d.]+)/i.test(ua),
            /** 
             * @type {Boolean}
             */
            silk : /Silk\/([\d._]+)/i.test(ua),
            /** 
             * @type {Boolean}
             */
            blackberry : /(BlackBerry).*Version\/([\d.]+)/i.test(ua),
            /** 
             * @type {Boolean}
             */
            bb10 : /(BB10).*Version\/([\d.]+)/i.test(ua),
            /** 
             * @type {Boolean}
             */
            rimtabletos : /(RIM\sTablet\sOS)\s([\d.]+)/i.test(ua),
            /** 
             * @type {Boolean}
             */
            playbook : /PlayBook/i.test(ua),
            /** 
             * 如果是chrome浏览器，返回浏览器当前版本号
             * @type {Number}
             */
            chrome : /chrome\/(\d+\.\d+)/i.test(ua) ? + RegExp.$1 : undefined,
            /**
             * 如果是firefox浏览器，返回浏览器当前版本号
             * @type {Number}
             */
            firefox : /firefox\/(\d+\.\d+)/i.test(ua) ? + RegExp.$1 : undefined,
            /**
             * 如果是ie返回ie当前版本号
             * @type {Number}
             */
            ie : /msie (\d+\.\d+)/i.test(ua) ? (document.documentMode || + RegExp.$1) : undefined,
            /**
             * @type {Boolean}
             */
            isGecko : /gecko/i.test(ua) && !/like gecko/i.test(ua),
            /**
             * @type {Boolean}
             */
            isStrict : document.compatMode === "CSS1Compat",
            /**
             * @type {Boolean}
             */
            isWebkit : /webkit/i.test(ua),
            /**
             * 如果是opera,返回opera当前版本号
             * @type {Number}
             */
            opera : /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(ua) ?  + (RegExp.$6 || RegExp.$2) : undefined
        };

        /**
         * @type {Boolean}
         */
        browser.iphone = !browser.ipad && /(iPhone\sOS)\s([\d_]+)/i.test(ua);
        /**
         * @type {Boolean}
         */
        browser.touchpad = browser.webos && /TouchPad/.test(ua);
        /**
         * @type {Boolean}
         */
        browser.tablet = !!(browser.ipad || browser.playbook || (browser.android && !/Mobile/.test(ua)) || (browser.firefox && /Tablet/.test(ua)));
        /**
         * @type {Boolean}
         */
        browser.phone  = !!(!browser.tablet && (browser.android || browser.iphone || browser.webos || browser.blackberry || browser.bb10 || (browser.chrome && /Android/.test(ua)) || (browser.chrome && /CriOS\/([\d.]+)/.test(ua)) || (browser.firefox && /Mobile/.test(ua))));

        try {
            if (/(\d+\.\d+)/.test(window.external.max_version)) {
                /**
                 * 如果是遨游浏览器，返回遨游版本号
                 * @type {Number}
                 */
                browser.maxthon = + RegExp.$1;
            }
        } catch (e) {}

        /**
         * 如果是safari浏览器，返回safari版本号
         * @type {Number}
         */
        browser.safari = /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(ua) && !/chrome/i.test(ua) ? + (RegExp.$1 || RegExp.$2) : undefined;
        /**
         * 是否支持position:fixed属性
         * @type {Boolean}
         */
        browser.isSupportFixed = !browser.ie || browser.ie >= 7;

        return browser;

    })(navigator.userAgent);


    /**
     * @namespace sinaadToolkit.array
     */
    sinaadToolkit.array = sinaadToolkit.array || /** @lends sinaadToolkit.array */{
        /**
         * 移除数组元素
         * @param  {Array} source 要移除元素的数组
         * @param  {Any} match  要移除的元素
         * @return {Array}        移除元素后的数组
         */
        remove : function (source, match) {
            var len = source.length;
                
            while (len--) {
                if (len in source && source[len] === match) {
                    source.splice(len, 1);
                }
            }
            return source;
        },
        /**
         * 遍历数组
         * @param  {Array} source     要遍历的源数组
         * @param  {Function} iterator   遍历方法
         * @param  {Object} thisObject 调用对象
         * @return {Array}            被遍历的源数组
         */
        each : function (source, iterator, thisObject) {

            source = sinaadToolkit.array.ensureArray(source);

            var returnValue,
                item,
                i,
                len = source.length;
            
            if ('function' === typeof iterator) {
                for (i = 0; i < len; i++) {
                    item = source[i];
                    //TODO
                    //此处实现和标准不符合，标准中是这样说的：
                    //If a thisObject parameter is provided to forEach, it will be used as the this for each invocation of the callback. If it is not provided, or is null, the global object associated with callback is used instead.
                    returnValue = iterator.call(thisObject || source, item, i);
            
                    if (returnValue === false) {
                        break;
                    }
                }
            }
            return source;
        },
        /**
         * 将传入元素转换成一个数组，如果是一个数组，直接返回，如果不是，判断是否为null或者undefined,如果不是，返回这个元素组成的数组，否则返回空数组
         * @param  {Any} source 需要转换的对象
         * @return {Array}      转换后的数组
         */
        ensureArray : function (source) {
            return sinaadToolkit.isArray(source) ? source : sinaadToolkit.isNull(source) ? [] : [source];
        }
    };


    /**
     * @namespace sinaadToolkit.string
     */
    sinaadToolkit.string = sinaadToolkit.string || (function () {
        var ESCAPE_MAP = {
                '"'     : '\\"',
                "\\"    : "\\\\",
                "/"     : "\\/",
                "\b"    : "\\b",
                "\f"    : "\\f",
                "\n"    : "\\n",
                "\r"    : "\\r",
                "\t"    : "\\t",
                "\x0B"  : "\\u000b"
            },
            //字符串中非中文字符串
            STR_REG =  /\uffff/.test("\uffff") ? (/[\\\"\x00-\x1f\x7f-\uffff]/g) : (/[\\\"\x00-\x1f\x7f-\xff]/g);
        
        return /** @lends sinaadToolkit.string */{
            /**
             * 转义html
             * @param  {String} source 要转义的源字符串
             * @return {String}        转义后的字符串
             */
            encodeHTML : function (source) {
                return String(source)
                            .replace(/&/g, '&amp;')
                            .replace(/</g, '&lt;')
                            .replace(/>/g, '&gt;')
                            .replace(/"/g, "&quot;")
                            .replace(/'/g, "&#39;");
            },
            /**
             * 反转义html
             * @param  {String} source 要转义的源字符串
             * @return {String}        转义后的字符串
             */
            decodeHTML : function (source) {
                var str = String(source)
                            .replace(/&quot;/g, '"')
                            .replace(/&lt;/g, '<')
                            .replace(/&gt;/g, '>')
                            .replace(/&amp;/g, "&");
                //处理转义的中文和实体字符
                return str.replace(/&#([\d]+);/g, function (_0, _1) {
                    return String.fromCharCode(parseInt(_1, 10));
                });
            },
            /**
             * 转义字符串中的特殊字符
             * @params {Sting} source 要转义的字符串
             * @return {String} 转义后的字符串
             */
            formalString : function (source) {
                var ret = [];
                ret.push(source.replace(STR_REG, function (str) {
                    //如果再需要转义的字符表中，替换成转移字符对应的值
                    if (str in ESCAPE_MAP) {
                        return ESCAPE_MAP[str];
                    }
                    //否则转成对应的unicode码
                    var alphaCode = str.charCodeAt(0),
                        unicodePerfix = "\\u";
                    //需要增加几位0来补位
                    16 > alphaCode ? unicodePerfix += "000" : 256 > alphaCode ? unicodePerfix += "00" : 4096 > alphaCode && (unicodePerfix += "0");

                    //保存转移过的值到ESCAPE_MAP提高转义效率，同时返回进行替换
                    ESCAPE_MAP[str] = unicodePerfix + alphaCode.toString(16);

                    return ESCAPE_MAP[str];
                }));
                return '"' + ret.join('') + '"';
            },
            /**
             * 简单模版方法
             * @param  {String} source 模版
             * @param  {Object} opts   替换变量
             * @return {String}        模版替换后的结果
             */
            format : function (source, opts) {
                source = String(source);
                var data = Array.prototype.slice.call(arguments, 1),
                    toString = Object.prototype.toString;
                if (data.length) {
                    data = data.length === 1 ?
                        /* ie 下 Object.prototype.toString.call(null) == '[object Object]' */
                        (opts !== null && (/\[object Array\]|\[object Object\]/.test(toString.call(opts))) ? opts : data) : data;
                    return source.replace(/#\{(.+?)\}/g, function (match, key) {
                        var replacer = data[key];
                        // chrome 下 typeof /a/ == 'function'
                        if ('[object Function]' === toString.call(replacer)) {
                            replacer = replacer(key);
                        }
                        return ('undefined' === typeof replacer ? '' : replacer);
                    });
                }
                return source;
            },
            toCamelCase : function (source) {
                //提前判断，提高效率
                if (source.indexOf('-') < 0 && source.indexOf('_') < 0) {
                    return source;
                }
                return source.replace(/[-_][^-_]/g, function (match) {
                    return match.charAt(1).toUpperCase();
                });
            }
        };
    })();



    /**
     * @namespace sinaadToolkit.object
     */
    sinaadToolkit.object = sinaadToolkit.object || /** @lends sinaadToolkit.object */{
        /**
         * object的遍历方法
         * @param  {Object} source   要遍历的对象
         * @param  {Function} iterator 遍历方法，第一个参数为遍历的值，第二个位key
         * @return {Object}          key映射的遍历结果
         */
        map : function (source, iterator) {
            var results = {};
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    results[key] = iterator(source[key], key);
                }
            }
            return results;
        }
    };

    /**
     * @namespace sinaadToolkit.cookie
     */
    sinaadToolkit.cookie = sinaadToolkit.cookie || /** @lends sinaadToolkit.cookie */{
        /**
         * @private
         * @param  {String} key 要验证的cookie的key
         * @return {Boolean}    是否为符合规则的key
         */
        // http://www.w3.org/Protocols/rfc2109/rfc2109
        // Syntax:  General
        // The two state management headers, Set-Cookie and Cookie, have common
        // syntactic properties involving attribute-value pairs.  The following
        // grammar uses the notation, and tokens DIGIT (decimal digits) and
        // token (informally, a sequence of non-special, non-white space
        // characters) from the HTTP/1.1 specification [RFC 2068] to describe
        // their syntax.
        // av-pairs   = av-pair *(";" av-pair)
        // av-pair    = attr ["=" value] ; optional value
        // attr       = token
        // value      = word
        // word       = token | quoted-string
         
        // http://www.ietf.org/rfc/rfc2068.txt
        // token      = 1*<any CHAR except CTLs or tspecials>
        // CHAR       = <any US-ASCII character (octets 0 - 127)>
        // CTL        = <any US-ASCII control character
        //              (octets 0 - 31) and DEL (127)>
        // tspecials  = "(" | ")" | "<" | ">" | "@"
        //              | "," | ";" | ":" | "\" | <">
        //              | "/" | "[" | "]" | "?" | "="
        //              | "{" | "}" | SP | HT
        // SP         = <US-ASCII SP, space (32)>
        // HT         = <US-ASCII HT, horizontal-tab (9)>
        _isValidKey : function (key) {
            return (new RegExp("^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24")).test(key);
        },
        /**
         * 从cookie中获取key所对应的值
         * @private
         * @param  {String} key 要获取的cookie的key
         * @return {String}     cookie对应该key的值
         */
        _getRaw : function (key) {
            if (sinaadToolkit.cookie._isValidKey(key)) {
                var reg = new RegExp("(^| )" + key + "=([^;]*)(;|\x24)"),
                    result = reg.exec(document.cookie);
                     
                if (result) {
                    return result[2] || null;
                }
            }
            return null;
        },
        /**
         * 将cookie中key的值设置为value, 并带入一些参数
         * @private
         * @param  {String} key 要设置的cookie的key
         * @param  {String} value 要设置的值
         * @param  {Object} options 选项
         */
        _setRaw : function (key, value, options) {
            if (!sinaadToolkit.cookie._isValidKey(key)) {
                return;
            }
             
            options = options || {};

            // 计算cookie过期时间
            var expires = options.expires;
            if ('number' === typeof options.expires) {
                expires = new Date();
                expires.setTime(expires.getTime() + options.expires);
            }
             
            document.cookie =
                key + "=" + value +
                (options.path ? "; path=" + options.path : "") +
                (expires ? "; expires=" + expires.toGMTString() : "") +
                (options.domain ? "; domain=" + options.domain : "") +
                (options.secure ? "; secure" : '');

        },
        /**
         * 获取cookie中key的值
         * @param  {String} key 要获取的key
         * @return {String}     cookie值
         */
        get : function (key) {
            var value = sinaadToolkit.cookie._getRaw(key);
            if ('string' === typeof value) {
                value = decodeURIComponent(value);
                return value;
            }
            return null;
        },
        /**
         * 设置cookie值
         * @param  {String} key     要设置的key
         * @param  {String} value   要设置的value   
         * @param  {object} options 选项
         */
        set : function (key, value, options) {
            sinaadToolkit.cookie._setRaw(key, encodeURIComponent(value), options);
        },
        /**
         * 移除key相关的cookie
         * @param  {String} key     要移除的cookie的key
         * @param  {Object} options 选项
         */
        remove : function (key, options) {
            options = options || {};
            options.expires = new Date(0);
            sinaadToolkit.cookie._setRaw(key, '', options);
        }
    };

    /**
     * @namespace sinaadToolkit.storage
     */
    sinaadToolkit.storage = sinaadToolkit.storage || (function () {
        /**
         * userData相关方法
         */
        var userData = {
            id : 'sinaadToolkitUserDataContainer',
            name : location.hostname,
            init : function () {
                var dom = document.getElementById(userData.id);
                if (!dom) {
                    try {
                        dom = document.createElement('input');
                        dom.type = "hidden";
                        dom.style.display = "none";
                        dom.addBehavior("#default#userData");
                        document.body.insertBefore(dom, document.body.firstChild);
                        var expires = new Date();
                        expires.setDate(expires.getDate() + 365);
                        dom.expires = expires.toUTCString();
                    } catch (e) {
                        sinaadToolkit.error('sinaadToolkit.storage:userData初始化失败，' + e.message);
                        return null;
                    }
                }
                return dom;
            },
            setItem : function (key, value) {
                var dom = userData.init();
                if (dom) {
                    dom.load(userData.name);
                    dom.setAttribute(key, value);
                    dom.save(userData.name);
                }
            },
            getItem : function (key) {
                var dom = userData.init();
                if (dom) {
                    dom.load(userData.name);
                    return dom.getAttribute(key);
                }
            },
            removeItem : function (key) {
                var dom = userData.init();
                if (dom) {
                    dom.load(userData.name);
                    dom.removeAttribute(key);
                    dom.save(userData.name);
                }
            }
        };

        /**
         * localstorage相关方法
         */
        var ls = {
            getItem : function (key) {
                return window.localStorage.getItem(key);
            },
            setItem : function (key, value, expires) {
                window.localStorage.setItem(key, value + (expires ? ';expires=' + (sinaadToolkit.now() + expires) : ''));
            },
            removeItem : function (key) {
                window.localStorage.removeItem(key);
            }
        };

        /**
         * cookie相关方法
         * @type {Object}
         */
        var cookie = {
            getItem : function (key) {
                return sinaadToolkit.cookie.get(key);
            },
            setItem : function (key, value, expires) {
                sinaadToolkit.cookie.set(key, value, {expires : expires || 0});
            },
            removeItem : function (key) {
                sinaadToolkit.cookie.remove(key);
            }
        };

        /** 
         * 根据浏览器支持选择相关的存储方案
         * 当ie且ie<8时使用userData方案，否则使用localStorage方案，否则使用cookie方案
         */
        var storage = window.localStorage ? ls : sinaadToolkit.browser.ie && sinaadToolkit.browser.ie < 8 ? userData : cookie;

        return /** @lends sinaadToolkit.storage */{
            /**
             * 获取本地存储的key的值
             * @param  {String} key key
             * @return {String}     取得的值
             */
            get : function (key) {
                try {
                    var value = storage.getItem(key);
                    if (value) {
                        sinaadToolkit.debug('sinaadToolkit.storage.get:获取到' + key + '的值: ' + value);
                        value = value.split(';');
                        //有过期时间
                        if (value[1] && sinaadToolkit.now() > parseInt(value[1].split('=')[1], 10)) {
                            storage.removeItem(key);
                            return null;
                        } else {
                            return value[0];
                        }
                    }
                    return null;
                } catch (e) {
                    sinaadToolkit.error('sinaadToolkit.storage.get:' + e.message);
                    return null;
                }
            },
            /**
             * 设置本地存储key的值为value
             * 注意：请不要设置非字符串格式形式的值到本地存储
             * @param  {String} key     设置的key
             * @param  {String} value   设置的value
             * @param  {Number} expires 过期时间毫秒数
             */
            set : function (key, value, expires) {
                try {
                    storage.setItem(key, value, expires);
                } catch (e) {
                    sinaadToolkit.error('sinaadToolkit.storage.set:' + e.message);
                }
            },
            /**
             * 移除本地存储中key的值
             * @param  {String} key 要移除的key
             */
            remove : function (key) {
                try {
                    storage.removeItem(key);
                } catch (e) {
                    sinaadToolkit.error('sinaadToolkit.storage.remove:' + e.message);
                }
            }
        };
    })();



    /**
     * @namespace sinaadToolkit.url
     */
    sinaadToolkit.url = sinaadToolkit.url || /** @lends sinaadToolkit.url */{
        /**
         * 创建一个url
         * @param  {String} domain url主域
         * @param  {String} path   path
         * @param  {Boolean} useSSL 使用https?
         * @return {String}        生成的url
         */
        createURL : function (domain, path, useSSL) {
            return [useSSL ? "https" : "http", "://", domain, path].join("");
        },
        /**
         * 获取当前页面所在的主页面url
         * @return {String} 获取当前页面所在的主页面url
         */
        top : (function () {
            var top;
            try {
                top = window.top.location.href;
            } catch (e) {}
            return top || ((window.top === window.self) ?  window.location.href : window.document.referrer);
        })()
    };



    /**
     * @namespace sinaadToolkit.dom
     */
    sinaadToolkit.dom = sinaadToolkit.dom || /** @lends sinaadToolkit.dom */{
        /**
         * 获取元素
         * 
         */
        get : function (id) {
            if (!id) {
                return null;
            }
            if ('string' === typeof id || id instanceof String) {
                return document.getElementById(id);
            } else if (id.nodeName && (id.nodeType === 1 || id.nodeType === 9)) {
                return id;
            }
            return null;
        },
        /**
         * 获取某个dom节点所属的document
         * @param  {HTMLNodeElement} element 节点
         * @return {DocumentElement}         所属的document节点
         */
        getDocument : function (element) {
            return element.nodeType === 9 ? element : element.ownerDocument || element.document;
        },
        /**
         * 获取某个dom节点的某个计算后样式
         * @param  {HTMLNodeElement} element 节点
         * @param  {String} key     样式名
         * @return {String}         样式值
         */
        getComputedStyle : function (element, key) {
            var doc = sinaadToolkit.dom.getDocument(element),
                styles;
            if (doc.defaultView && doc.defaultView.getComputedStyle) {
                styles = doc.defaultView.getComputedStyle(element, null);
                if (styles) {
                    return styles[key] || styles.getPropertyValue(key);
                }
            }
            return '';
        },
        /**
         * 获取某个dom节点的某个当前样式
         * @param  {HTMLNodeElement} element 节点
         * @param  {String} key     样式名
         * @return {String}         样式值
         */
        getCurrentStyle : function (element, key) {
            return element.style[key] || (element.currentStyle ? element.currentStyle[key] : "") || sinaadToolkit.dom.getComputedStyle(element, key);
        },

        _styleFixer : {},
        _styleFilter : [],

        /**
         * 获取目标元素的样式值
         * @name sinaadToolkit.dom.getStyle
         * @function
         * @grammar sinaadToolkit.dom.getStyle(element, key)
         * @param {HTMLElement|string} element 目标元素或目标元素的id
         * @param {string} key 要获取的样式名
         * @remark
         * 
         * 为了精简代码，本模块默认不对任何浏览器返回值进行归一化处理（如使用getStyle时，不同浏览器下可能返回rgb颜色或hex颜色），也不会修复浏览器的bug和差异性（如设置IE的float属性叫styleFloat，firefox则是cssFloat）。<br />
         * sinaadToolkit.dom._styleFixer和sinaadToolkit.dom._styleFilter可以为本模块提供支持。<br />
         * 其中_styleFilter能对颜色和px进行归一化处理，_styleFixer能对display，float，opacity，textOverflow的浏览器兼容性bug进行处理。  
         * @shortcut getStyle
         * @meta standard
         * @returns {string} 目标元素的样式值
         */
        // TODO
        // 1. 无法解决px/em单位统一的问题（IE）
        // 2. 无法解决样式值为非数字值的情况（medium等 IE）
        getStyle : function (element, key) {
            var dom = sinaadToolkit.dom,
                fixer;

            element = dom.get(element);
            key = sinaadToolkit.string.toCamelCase(key);
            //computed style, then cascaded style, then explicitly set style.
            var value = element.style[key] ||
                        (element.currentStyle ? element.currentStyle[key] : "") ||
                        dom.getComputedStyle(element, key);

            // 在取不到值的时候，用fixer进行修正
            if (!value || value === 'auto') {
                fixer = dom._styleFixer[key];
                if (fixer) {
                    value = fixer.get ? fixer.get(element, key, value) : sinaadToolkit.dom.getStyle(element, fixer);
                }
            }
            
            /* 检查结果过滤器 */
            if ((fixer = dom._styleFilter)) {
                value = fixer.filter(key, value, 'get');
            }
            return value;
        },
        /**
         * 获取目标元素相对于整个文档左上角的位置
         * @name sinaadToolkit.dom.getPosition
         * @function
         * @grammar sinaadToolkit.dom.getPosition(element)
         * @param {HTMLElement|string} element 目标元素或目标元素的id
         * @meta standard
         *             
         * @returns {Object} 目标元素的位置，键值为top和left的Object。
         */
        getPosition : function (element) {
            element = sinaadToolkit.dom.get(element);
            var doc = sinaadToolkit.dom.getDocument(element),
                browser = sinaadToolkit.browser,
                getStyle = sinaadToolkit.dom.getStyle,
                // Gecko 1.9版本以下用getBoxObjectFor计算位置
                // 但是某些情况下是有bug的
                // 对于这些有bug的情况
                // 使用递归查找的方式
                // BUGGY_GECKO_BOX_OBJECT = browser.isGecko > 0 &&
                //                          doc.getBoxObjectFor &&
                //                          getStyle(element, 'position') === 'absolute' &&
                //                          (element.style.top === '' || element.style.left === ''),
                pos = {"left": 0, "top": 0},
                viewport = (browser.ie && !browser.isStrict) ? doc.body : doc.documentElement,
                parent,
                box;
            
            if (element === viewport) {
                return pos;
            }


            if (element.getBoundingClientRect) { // IE and Gecko 1.9+
                
                //当HTML或者BODY有border width时, 原生的getBoundingClientRect返回值是不符合预期的
                //考虑到通常情况下 HTML和BODY的border只会设成0px,所以忽略该问题.
                box = element.getBoundingClientRect();

                pos.left = Math.floor(box.left) + Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft);
                pos.top  = Math.floor(box.top)  + Math.max(doc.documentElement.scrollTop,  doc.body.scrollTop);
                
                // IE会给HTML元素添加一个border，默认是medium（2px）
                // 但是在IE 6 7 的怪异模式下，可以被html { border: 0; } 这条css规则覆盖
                // 在IE7的标准模式下，border永远是2px，这个值通过clientLeft 和 clientTop取得
                // 但是。。。在IE 6 7的怪异模式，如果用户使用css覆盖了默认的medium
                // clientTop和clientLeft不会更新
                pos.left -= doc.documentElement.clientLeft;
                pos.top  -= doc.documentElement.clientTop;
                
                var htmlDom = doc.body,
                    // 在这里，不使用element.style.borderLeftWidth，只有computedStyle是可信的
                    htmlBorderLeftWidth = parseInt(getStyle(htmlDom, 'borderLeftWidth'), 10),
                    htmlBorderTopWidth = parseInt(getStyle(htmlDom, 'borderTopWidth'), 10);
                if (browser.ie && !browser.isStrict) {
                    pos.left -= isNaN(htmlBorderLeftWidth) ? 2 : htmlBorderLeftWidth;
                    pos.top  -= isNaN(htmlBorderTopWidth) ? 2 : htmlBorderTopWidth;
                }
            /*
             * 因为firefox 3.6和4.0在特定页面下(场景待补充)都会出现1px偏移,所以暂时移除该逻辑分支
             * 如果 2.0版本时firefox仍存在问题,该逻辑分支将彻底移除. by rocy 2011-01-20
            } else if (doc.getBoxObjectFor && !BUGGY_GECKO_BOX_OBJECT){ // gecko 1.9-

                // 1.9以下的Gecko，会忽略ancestors的scroll值
                // https://bugzilla.mozilla.org/show_bug.cgi?id=328881 and
                // https://bugzilla.mozilla.org/show_bug.cgi?id=330619

                box = doc.getBoxObjectFor(element);
                var vpBox = doc.getBoxObjectFor(viewport);
                pos.left = box.screenX - vpBox.screenX;
                pos.top  = box.screenY - vpBox.screenY;
                */
            } else { // safari/opera/firefox
                parent = element;

                do {
                    pos.left += parent.offsetLeft;
                    pos.top  += parent.offsetTop;
              
                    // safari里面，如果遍历到了一个fixed的元素，后面的offset都不准了
                    if (browser.isWebkit > 0 && getStyle(parent, 'position') === 'fixed') {
                        pos.left += doc.body.scrollLeft;
                        pos.top  += doc.body.scrollTop;
                        break;
                    }
                    
                    parent = parent.offsetParent;
                } while (parent && parent !== element);

                // 对body offsetTop的修正
                if (browser.opera > 0 || (browser.isWebkit > 0 && getStyle(element, 'position') === 'absolute')) {
                    pos.top  -= doc.body.offsetTop;
                }

                // 计算除了body的scroll
                parent = element.offsetParent;
                while (parent && parent !== doc.body) {
                    pos.left -= parent.scrollLeft;
                    // see https://bugs.opera.com/show_bug.cgi?id=249965
                    // if (!b.opera || parent.tagName != 'TR') {
                    if (!browser.opera || parent.tagName !== 'TR') {
                        pos.top -= parent.scrollTop;
                    }
                    parent = parent.offsetParent;
                }
            }

            return pos;
        }
    };

    /**
     * 为获取和设置样式的过滤器
     * @private
     * @meta standard
     */
    sinaadToolkit.dom._styleFilter.filter = function (key, value, method) {
        for (var i = 0, filters = sinaadToolkit.dom._styleFilter, filter; (filter = filters[i]); i++) {
            if ((filter = filter[method])) {
                value = filter(key, value);
            }
        }
        return value;
    };


    /**
     * @namespace sinaadToolkit.page
     */
    sinaadToolkit.page = sinaadToolkit.page || /** @lends sinaadToolkit.page */{
        /**
         * 获取向上滚动高度
         * @return {Number} 向上滚动高度
         */
        getScrollTop : function () {
            var doc = document;
            return window.pageYOffset || doc.documentElement.scrollTop || doc.body.scrollTop;
        },
        /**
         * 获取向左滚动高度
         * @return {Number} 向左滚动高度
         */
        getScrollLeft : function () {
            var doc = document;
            return window.pageXOffset || doc.documentElement.scrollLeft || doc.body.scrollLeft;
        },
        /**
         * 获取页面高度
         * @return {Number} 页面高度
         */
        getViewHeight : function () {
            var doc = document,
                client = doc.compatMode === 'BackCompat' ? doc.body : doc.documentElement;
            return client.clientHeight;
        },
        /**
         * 获取页面宽度
         * @return {Number} 页面宽度
         */
        getViewWidth : function () {
            var doc = document,
                client = doc.compatMode === 'BackCompat' ? doc.body : doc.documentElement;
            return client.clientWidth;
        }
    };

    
    /**
     * @namespace sinaadToolkit.event
     */
    sinaadToolkit.event = sinaadToolkit.event || /** @lends sinaadToolkit.event */{
        /**
         * 注册事件
         * @param  {HTMLNodeElement}   dom      事件监听节点
         * @param  {String}   type     事件类型
         * @param  {Function} callback 回调方法
         */
        on : function (dom, type, callback) {
            if (dom.attachEvent) {
                dom.attachEvent('on' + type, function (e) {
                    callback.call(dom, e);
                });
            } else {
                dom.addEventListener(type, function (e) {
                    callback.call(dom, e);
                }, false);
            }
        }
    };


    /**
     * @namespace sinaadToolkit.Defered
     */
    sinaadToolkit.Deferred = sinaadToolkit.Deferred || (function (core) {
        function _pipe(original, deferred, callback, actionType) {
            return function () {
                if (typeof callback === 'function') {
                    try {
                        var returnValue = callback.apply(original, arguments);

                        if (Deferred.isPromise(returnValue)) {
                            returnValue.then(
                                function () {
                                    deferred.resolve.apply(deferred, arguments);
                                },
                                function () {
                                    deferred.reject.apply(deferred, arguments);
                                }
                            );
                        }
                        else {
                            deferred.resolve.call(deferred, returnValue);
                        }
                    }
                    catch (e) {
                        sinaadToolkit.error('sinaadToolkit.Deferred: _pipe内部方法出错-' + e.message);
                        deferred.reject(e);
                    }
                }
                // `.then()`及`.then(done, null)`时使用
                // 直接使用原`Deferred`保存的参数将`deferred`改为对应状态
                else {
                    deferred[actionType].apply(deferred, original._args);
                }
            };
        }
        //判断promise状态决定指定回调方法
        function _flush(deferred) {
            if (deferred._state === 'pending') {
                return;
            }
            var callbacks = deferred._state === 'resolved' ? deferred._resolves.slice() : deferred._rejects.slice();

            setTimeout(function () {
                core.array.each(callbacks, function (callback) {
                    try {
                        callback.apply(deferred, deferred._args);
                    } catch (e) {
                        sinaadToolkit.error('sinaadToolkit.Deferred: _flush出错' + e.message);
                    }
                });
            }, 0);

            deferred._resolves = [];
            deferred._rejects = [];
        }

        function Deferred() {
            this._state = 'pending'; //当前promise状态
            this._args = null;       //传递参数
            this._resolves = [];     //成功回调集合
            this._rejects = [];      //失败回调集合
        }
        
        Deferred.prototype = {
            resolve : function () {
                if (this._state !== "pending") {
                    return;
                }

                this._state = 'resolved';
                this._args = [].slice.call(arguments);

                _flush(this);
            },
            reject : function () {
                if (this._state !== 'pending') {
                    return;
                }
                this._state = 'rejected';
                this._args = [].slice.call(arguments);

                _flush(this);
            },
            then : function (resolve, reject) {
                var deferred = new Deferred();
                
                this._resolves.push(_pipe(this, deferred, resolve, 'resolve'));
                this._rejects.push(_pipe(this, deferred, reject, 'reject'));

                _flush(this);

                return deferred;
            },
            done : function (callback) {
                return this.then(callback);
            },
            fail : function (callback) {
                return this.then(null, callback);
            }
        };

        Deferred.isPromise = function (value) {
            return value && typeof value.then === 'function';
        };

        return Deferred;

    })(sinaadToolkit);

    /**
     * @namespace sinaadToolkit.sio
     */
    sinaadToolkit.sio = sinaadToolkit.sio || (function () {
        /**
         * @private
         * @param  {HTMLScriptElement} scr     script节点
         * @param  {String} url     资源地址
         * @param  {String} charset 字符集
         */
        function _createScriptTag(scr, url, charset) {
            scr.setAttribute('type', 'text/javascript');
            charset && scr.setAttribute('charset', charset);
            scr.setAttribute('src', url);
            document.getElementsByTagName('head')[0].appendChild(scr);
        }
        /**
         * @private
         * @param  {HTMLScriptElement} scr script节点
         */
        function _removeScriptTag(scr) {
            if (scr && scr.parentNode) {
                scr.parentNode.removeChild(scr);
            }
            scr = null;
        }
        return /** @lends sinaadToolkit.sio */{
            /**
             * 加载js模块
             * @param  {String} url          资源地址
             * @param  {Function} opt_callback 成功后回调方法
             * @param  {Object} opt_options  选项
             */
            loadScript : function (url, optCallback, optOptions) {
                var scr = document.createElement("SCRIPT"),
                    scriptLoaded = 0,
                    options = optOptions || {},
                    charset = options.charset || 'utf-8',
                    callback = optCallback || function () {},
                    timeOut = options.timeout || 0,
                    timer;
                
                // IE和opera支持onreadystatechange
                // safari、chrome、opera支持onload
                scr.onload = scr.onreadystatechange = function () {
                    // 避免opera下的多次调用
                    if (scriptLoaded) {
                        return;
                    }
                    
                    var readyState = scr.readyState;
                    if ('undefined' === typeof readyState ||
                         readyState === "loaded" ||
                         readyState === "complete") {
                        scriptLoaded = 1;
                        try {
                            callback();
                            clearTimeout(timer);
                        } finally {
                            scr.onload = scr.onreadystatechange = null;
                            _removeScriptTag(scr);
                        }
                    }
                };

                if (timeOut) {
                    timer = setTimeout(function () {
                        scr.onload = scr.onreadystatechange = null;
                        _removeScriptTag(scr);
                        options.onfailure && options.onfailure();
                    }, timeOut);
                }
                
                _createScriptTag(scr, url, charset);
            },
            /**
             * jsonp方式回调
             * @param  {String}   url         资源地址
             * @param  {Function} callback    回调方法
             * @param  {Object}   opt_options 选项
             */
            jsonp : function (url, callback, optOptions) {
                var scr = document.createElement('SCRIPT'),
                    prefix = '_sinaads_cbs_',
                    callbackName,
                    // callbackImpl,
                    options = optOptions || {},
                    charset = options.charset || 'utf-8',
                    queryField = options.queryField || 'callback',
                    timeOut = options.timeout || 0,
                    timer,
                    reg = new RegExp('(\\?|&)' + queryField + '=([^&]*)'),
                    matches;

                function getCallBack(onTimeOut) {
                     
                    return function () {
                        try {
                            if (onTimeOut) {
                                options.onfailure && options.onfailure();
                            } else {
                                callback.apply(window, arguments);
                                clearTimeout(timer);
                            }
                            window[callbackName] = null;
                            delete window[callbackName];
                        } catch (e) {
                            // ignore the exception
                        } finally {
                            _removeScriptTag(scr);
                        }
                    };
                }
         
                if (sinaadToolkit.isFunction(callback)) {
                    callbackName = prefix + Math.floor(Math.random() * 2147483648).toString(36);
                    window[callbackName] = getCallBack(0);
                } else if (sinaadToolkit.isString(callback)) {
                    // 如果callback是一个字符串的话，就需要保证url是唯一的，不要去改变它
                    // TODO 当调用了callback之后，无法删除动态创建的script标签
                    callbackName = callback;
                } else {
                    if ((matches = reg.exec(url))) {
                        callbackName = matches[2];
                    }
                }
         
                if (timeOut) {
                    timer = setTimeout(getCallBack(1), timeOut);
                }
         
                //如果用户在URL中已有callback，用参数传入的callback替换之
                url = url.replace(reg, '\x241' + queryField + '=' + callbackName);
                 
                if (url.search(reg) < 0) {
                    url += (url.indexOf('?') < 0 ? '?' : '&') + queryField + '=' + callbackName;
                }
                _createScriptTag(scr, url, charset);
            },
            /**
             * 日志方法
             * @param  {String} url 发送日志地址
             */
            log : function (url) {
                var img = new Image(),
                    key = '_sinaads_sio_log_' + sinaadToolkit.rnd();

                window[key] = img;
             
                img.onload = img.onerror = img.onabort = function () {
                    img.onload = img.onerror = img.onabort = null;
             
                    window[key] = null;
                    img = null;
                };
         
                img.src = url + (url.indexOf('?') > 0 ? '&' : '?') + key;
            }
        };
    })();


    /**
     * @namespace sinaadToolkit.swf
     */
    sinaadToolkit.swf = sinaadToolkit.swf || /** @lends sinaadToolkit.swf */{
        uid : 0,
        /**
         * flash版本号
         * @type {Number}
         */
        version : (function () {
            var n = navigator;
            if (n.plugins && n.mimeTypes.length) {
                var plugin = n.plugins["Shockwave Flash"];
                if (plugin && plugin.description) {
                    return plugin.description
                            .replace(/([a-zA-Z]|\s)+/, "")
                            .replace(/(\s)+r/, ".") + ".0";
                }
            } else if (window.ActiveXObject && !window.opera) {
                for (var i = 12; i >= 2; i--) {
                    try {
                        var c = new window.ActiveXObject('ShockwaveFlash.ShockwaveFlash.' + i);
                        if (c) {
                            var version = c.GetVariable("$version");
                            return version.replace(/WIN/g, '').replace(/,/g, '.');
                        }
                    } catch (e) {}
                }
            }
        })(),
        /**
         * 获取当前flash对象
         * @param  {String} name    要获取的flash的id或name
         * @param  {Object} context 从哪个上下文对象中获取这个flash对象，默认从当前上下文
         * @return {Object}         得到的flash对象
         */
        getMovie : function (name, context) {
            context = context || window;
            //ie9下, Object标签和embed标签嵌套的方式生成flash时,
            //会导致document[name]多返回一个Object元素,而起作用的只有embed标签
            var movie = context.document[name],
                ret;
            return sinaadToolkit.browser.ie === 9 ?
                movie && movie.length ?
                    (ret = sinaadToolkit.array.remove(sinaadToolkit.toArray(movie), function (item) {
                        return item.tagName.toLowerCase() !== "embed";
                    })).length === 1 ? ret[0] : ret
                    : movie
                : movie || context[name];
        },
        /**
         * 创建flash的html
         * @param  {Object} options 选项
         * @return {String}         flash的html
         */
        createHTML : function (options) {
            options = options || {};
            var version = sinaadToolkit.swf.version,
                needVersion = options.ver || '6.0.0',
                vUnit1, vUnit2, i, k, len, item, tmpOpt = {},
                encodeHTML = sinaadToolkit.string.encodeHTML;
            
            // 复制options，避免修改原对象
            for (k in options) {
                tmpOpt[k] = options[k];
            }
            options = tmpOpt;
            
            // 浏览器支持的flash插件版本判断
            if (version) {
                version = version.split('.');
                needVersion = needVersion.split('.');
                for (i = 0; i < 3; i++) {
                    vUnit1 = parseInt(version[i], 10);
                    vUnit2 = parseInt(needVersion[i], 10);
                    if (vUnit2 < vUnit1) {
                        break;
                    } else if (vUnit2 > vUnit1) {
                        return ''; // 需要更高的版本号
                    }
                }
            } else {
                return ''; // 未安装flash插件
            }
            
            var vars = options.vars,
                objProperties = ['classid', 'codebase', 'id', 'width', 'height', 'align'];
            
            // 初始化object标签需要的classid、codebase属性值
            options.name = options.id = options.id || 'sinaadToolkit_swf_uid_' + (sinaadToolkit.swf.uid++);
            options.align = options.align || 'middle';
            options.classid = 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000';
            options.codebase = 'http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0';
            options.movie = options.url || '';
            delete options.vars;
            delete options.url;
            
            // 初始化flashvars参数的值
            if ('string' === typeof vars) {
                options.flashvars = vars;
            } else {
                var fvars = [];
                for (k in vars) {
                    item = vars[k];
                    fvars.push(k + "=" + encodeURIComponent(item));
                }
                options.flashvars = fvars.join('&');
            }
            
            // 构建IE下支持的object字符串，包括属性和参数列表
            var str = ['<object '];
            for (i = 0, len = objProperties.length; i < len; i++) {
                item = objProperties[i];
                str.push(' ', item, '="', encodeHTML(options[item]), '"');
            }
            str.push('>');
            var params = {
                'wmode'             : 1,
                'scale'             : 1,
                'quality'           : 1,
                'play'              : 1,
                'loop'              : 1,
                'menu'              : 1,
                'salign'            : 1,
                'bgcolor'           : 1,
                'base'              : 1,
                'allowscriptaccess' : 1,
                'allownetworking'   : 1,
                'allowfullscreen'   : 1,
                'seamlesstabbing'   : 1,
                'devicefont'        : 1,
                'swliveconnect'     : 1,
                'flashvars'         : 1,
                'movie'             : 1
            };
            
            for (k in options) {
                item = options[k];
                k = k.toLowerCase();
                if (params[k] && (item || item === false || item === 0)) {
                    str.push('<param name="' + k + '" value="' + encodeHTML(item) + '" />');
                }
            }
            
            // 使用embed时，flash地址的属性名是src，并且要指定embed的type和pluginspage属性
            options.src  = options.movie;
            delete options.id;
            delete options.movie;
            delete options.classid;
            delete options.codebase;
            options.type = 'application/x-shockwave-flash';
            options.pluginspage = 'http://www.macromedia.com/go/getflashplayer';
            
            
            // 构建embed标签的字符串
            str.push('<embed');
            // 在firefox、opera、safari下，salign属性必须在scale属性之后，否则会失效
            // 经过讨论，决定采用BT方法，把scale属性的值先保存下来，最后输出
            var salign;
            for (k in options) {
                item = options[k];
                if (item || item === false || item === 0) {
                    if ((new RegExp("^salign\x24", "i")).test(k)) {
                        salign = item;
                        continue;
                    }
                    
                    str.push(' ', k, '="', encodeHTML(item), '"');
                }
            }
            
            if (salign) {
                str.push(' salign="', encodeHTML(salign), '"');
            }
            str.push('></embed></object>');
            
            return str.join('');
        }
    };



    /**
     * @namespace sinaadToolkit.iframe
     */
    sinaadToolkit.iframe = sinaadToolkit.iframe || /** @lends sinaadToolkit.iframe */{
        /**
         * 往一个对象中填充iframe的初始属性，返回一个用于生成iframe的对象
         * @param  {Object} config   需要填充的对象
         * @param  {Number} width    iframe宽
         * @param  {Number} height   iframe高
         * @param  {Boolean} useQuote 属性前后是否用引号包裹
         * @return {Object}          填充完初始属性，用于生成iframe的对象
         */
        init : function (config, width, height, useQuote) {
            var quote = useQuote ? '"' : "", //是否使用引号将属性包裹
                zero = quote + "0" + quote;
            config.width = quote + width + quote;
            config.height = quote + height + quote;
            config.frameborder = zero;
            config.marginwidth = zero;
            config.marginheight = zero;
            config.vspace = zero;
            config.hspace = zero;
            config.allowtransparency = quote + "true" + quote;
            config.scrolling = quote + "no" + quote;
        },
        /**
         * 使用iframe配置对象生成iframe的html
         * @param  {Object} config iframe配置属性对象
         * @return {String}        生成iframe的html
         */
        createHTML : function (config) {
            var html = [];

            //将iframe的name设置成跟id一样，如果没有的配置name的话
            config.name = config.name || config.id;

            sinaadToolkit.object.map(config, function (value, key) {
                html.push(" " + key + '="' + (null === value ? "" : value) + '"');
            });
            return "<iframe" + html.join("") + "></iframe>";
        },
        /**
         * 往iframe中填充内容
         * @param  {HTMLIframeElement} iframe  iframe节点
         * @param  {String} content 要填充的内容
         */
        fill : function (iframe, content) {
            var doc,
                ie = sinaadToolkit.browser.ie;
            //ie
            if (ie) {
                //是否可以获取到iframe的document
                try {
                    doc = !!iframe.contentWindow.document;
                } catch (e) {
                    doc = false;
                }
                if (doc) {
                    try {
                        //ie > 6
                        if (ie > 6) {
                            // var k;
                            // i: {
                            //     //ie 7 - 10
                            //     if (ie > 7 && ie <= 10) {
                            //         for (var i = 0; i < content.length; ++i) {
                            //             if (127 < content.charCodeAt(i)) {
                            //                 k = true;
                            //                 break i;
                            //             }
                            //         }
                            //     }
                            //     k = false;
                            // }
                            // if (k) {
                            //     var content = unescape(encodeURIComponent(content));
                            //     var mid = Math.floor(content.length / 2);
                            //     k = [];
                            //     for (var i = 0; i < mid; ++i) {
                            //         k[i] = String.fromCharCode(256 * content.charCodeAt(2 * i + 1) + content.charCodeAt(2 * i));
                            //     }
                            //     1 == content.length % 2 && (k[mid] = content.charAt(content.length - 1));
                            //     content = k.join("");
                            // }
                            window.frames[iframe.name].contents = content;
                            iframe.src = 'javascript:window["contents"]';
                        // ie < 6
                        } else {
                            window.frames[iframe.name].contents = content;
                            iframe.src = 'javascript:document.write(window["contents"]);/* document.close(); */';
                        }
                    } catch (e) {
                        sinaadToolkit.error("sinaadToolkit.iframe.fill: 无法往ie的iframe中写入内容, ", e);
                    }
                } else {
                    /**
                     * ie下，且iframe.contentWindow.document无法取到，跨域
                     * 比如宿主页面设置了document.domain, 而iframe没有设置
                     * 在iframe中设置document.domain  
                     */
                    try {
                        var key = "sinaads-ad-iframecontent-" + sinaadToolkit.rnd();
                        window[key] = content;
                        content = 'var adContent = window.parent["' + key + '"];window.parent["' + key + '"] = null;document.write(adContent);';
                        content = sinaadToolkit.browser.ie && sinaadToolkit.browser.ie <= 6 ?
                             "window.onload = function() {" +
                                "document.write(\\'<sc\\' + \\'ript type=\"text/javascript\">document.domain = \"" + document.domain + '";' + content + "<\\/scr\\' + \\'ipt>\\');" +
                                "document.close();" +
                            "};" :
                            'document.domain = "' + document.domain + '";' +
                            content +
                            "document.close();";

                        iframe.src = 'javascript:\'<script type="text/javascript">' + content + "\x3c/script>'";
                    } catch (e) {
                        window[key] = null;
                        sinaadToolkit.error("sinaadToolkit.iframe.fill: 无法通过修改document.domain的方式来填充IE下的iframe内容, ", e);
                    }
                }
            //标准浏览器，标准方法
            } else {
                try {
                    doc = iframe.contentWindow ? iframe.contentWindow.document : iframe.contentDocument,
                    sinaadToolkit.browser.firefox &&
                    doc.open("text/html", "replace");
                    doc.write(content);
                    doc.close();
                } catch (e) {
                    sinaadToolkit.error("sinaadToolkit.iframe.fill: 无法使用标准方法填充iframe的内容, ", e);
                }
            }
        }
    };


    /**
     * @namespace sinaadToolkit.monitor
     */
    sinaadToolkit.monitor = sinaadToolkit.monitor || /** @lends sinaadToolkit.monitor */{

        /**
         * 将监控url中的__xxx__变量名替换成正确的值，值从对象data中获取
         * @param  {String} monitorUrl 监控url
         * @param  {Object} data       用于替换的值对象
         * @return {String}            返回替换后的url
         */
        parseTpl : (function () {
            var reg = /\{__([a-zA-Z0-9]+(_*[a-zA-Z0-9])*)__\}/g;

            return function (monitorUrl, data) {
                if (!monitorUrl) {
                    return '';
                }
                return monitorUrl.replace(reg, function (s1, s2) {
                    //插入adbox能支持的模版变量
                    //见adbox监控接口文档，
                    //https://github.com/acelan86/pandora/wiki/%E6%B8%B2%E6%9F%93%E5%BC%95%E6%93%8E%E6%96%87%E6%A1%A3%E8%AF%B4%E6%98%8E
                    //adbox的监控需要插入到iframe的name中，使用api_exu=xxx的方式
                    if (s2.indexOf('adbox_') > 0) {
                        s2 = s2.split('_');
                        return '{__mo' + s2[2] + '__}';
                    }
                    return data[s2] || s1;
                });
            };
        })(),
        /**
         * 创建曝光监测, 返回创建曝光的iframe的html片段
         * @param  {Array:String} pvs 曝光监控的url数组
         * @return {String}     返回创建曝光的iframe的html片段
         */
        createImpressMonitor : function (pvs) {
            var html = [];

            sinaadToolkit.array.each(pvs, function (pv) {
                var config = {};
                sinaadToolkit.iframe.init(config, 1, 1, false);
                config.src = pv;
                config.style = 'display:none;';
                html.push(sinaadToolkit.iframe.createHTML(config));
            });
            return html.join('');
        },
        /**
         * 创建点击监测
         * @param  {String} type    需要监测的对象的类型，如图片，链接，flash等
         * @param  {Array:String} monitor 监测url数组
         * @return {String}         返回监测的html片段
         */
        createClickMonitor : function (type, monitor) {
            if (!monitor) {
                return;
            }

            var ret = [],
                comma = '';

            sinaadToolkit.array.each(monitor, function (url) {
                var code = '';

                if (url) {
                    switch (type) {
                    case 'image':
                    case 'flash':
                    case 'text':
                        code = 'sinaadToolkit.sio.log(\'' + url + '\')';
                        comma = ';';
                        break;
                    case 'adbox':
                        code = 'api_exu=' + encodeURIComponent(url);
                        comma = '&';
                        break;
                    default:
                        break;
                    }
                    code && ret.push(code);
                }
            });
            return ret.join(comma);
        }
    };



    /**
     * @namespace sinaadToolkit.ad
     */
    sinaadToolkit.ad = sinaadToolkit.ad || /** @lends sinaadToolkit.ad */{
        /**
         * 通过src地址获取资源类型
         * @param  {String} src 资源地址
         * @return {String}     类型
         */
        getTypeBySrc : function (src, defaultType) {
            var type = defaultType;
            if (!type) {
                type = src.substring(src.length - 3);
                switch (type) {
                    case 'swf':
                        type = 'flash';
                        break;
                    case 'tml':
                        type = 'url';
                        break;
                    case '.js' :
                        type = 'js';
                        break;
                    case 'png':
                    case 'jpg':
                    case 'gif':
                    case 'bmp':
                        type = 'image';
                        break;
                    default:
                        type = 'html';
                        break;
                }
            }

            if (type === 'url' && src.indexOf('adbox.sina.com.cn/ad/') >= 0) {
                type = 'adbox';
            }
            return type;
        },
        /**
         * 创建广告展现html
         * @param  {String} type    广告类型，如图片等
         * @param  {String} src     广告资源地址
         * @param  {Number} width   广告宽
         * @param  {Number} height  广告高
         * @param  {String} link    广告资源落地页地址
         * @param  {Array:String} monitor 广告点击监测的url数组
         * @param  {String} tpl     模版
         * @return {String}         广告展现html
         */
        createHTML : function (type, src, width, height, link, monitor, tpl) {
            var html = '',
                config,
                monitorCode;

            type = type || sinaadToolkit.ad.getTypeBySrc(src, type);

            width += sinaadToolkit.isNumber(width) ? 'px' : '',
            height += sinaadToolkit.isNumber(height) ? 'px' : '';

            monitorCode = sinaadToolkit.monitor.createClickMonitor(type, monitor);

            //如果提供了模版，则使用模版来渲染广告
            //模版中可以含有参数type, src, width, height, monitor, link
            //现在主要用在智投文字链和图文方式
            if (tpl && 'string' === typeof tpl) {
                return sinaadToolkit.string.format(tpl, {
                    type    : type,
                    src     : src,
                    width   : width,
                    monitor : monitorCode,
                    link    : link
                });
            }

            switch (type) {
                case 'url' :
                    config = {};
                    sinaadToolkit.iframe.init(config, width, height, false);
                    config.src = src;
                    html = sinaadToolkit.iframe.createHTML(config);
                    break;
                case 'image' :
                    html = '<img border="0" src="' + src + '" style="width:' + width + ';height:' + height + ';border:0" alt="' + src + '"/>';
                    html = link ? '<a href="' + link + '" target="' + (sinaadToolkit.browser.phone ? '_top' : '_blank') + '"' + (monitorCode ? ' onclick="try{' + monitorCode + '}catch(e){}"' : '') + '>' + html + '</a>' : html;
                    break;
                case 'text' :
                    html = link ? '<a href="' + link + '" target="_blank"' + (monitorCode ? ' onclick="try{' + monitorCode + '}catch(e){}"' : '') + '>' + src + '</a>' : src;
                    break;
                case 'flash' :
                    html = sinaadToolkit.swf.createHTML({
                        url : src,
                        width : width,
                        height : height,
                        wmode : 'transparent'
                    });
                    if (link) {
                        html = [
                            '<div style="width:' + width + ';height:' + height + ';position:relative;overflow:hidden;">',
                                html,
                                '<a style="position:absolute;background:#fff;opacity:0;filter:alpha(opacity=0);width:' + width + ';height:' + height + ';left:0;top:0" href="' + link + '" target="' + (sinaadToolkit.browser.phone ? '_top' : '_blank') + '"' + (monitorCode ? ' onclick="try{' + monitorCode + '}catch(e){}"' : '') + '></a>',
                            '</div>'
                        ].join('');
                    }
                    break;
                case 'adbox' :
                    config = {};
                    sinaadToolkit.iframe.init(config, width, height, false);
                    config.src = src;
                    monitorCode && (config.name = monitorCode);
                    html = sinaadToolkit.iframe.createHTML(config);
                    break;
                case 'js' :
                    html = ['<', 'script charset="utf-8" src="', src, '"></', 'script>'].join('');
                    break;
                default :
                    html = src.replace(/\\x3c/g, '<').replace(/\\x3e/g, '>');
                    break;
            }
            return html;
        }
    };



    /**
     * @namespace sinaadToolkit.sandbox
     */
    sinaadToolkit.sandbox = sinaadToolkit.sandbox || (function () {
        /**
         * 沙箱uid
         * @private
         * @type {Number}
         */
        var uid = 0;
        /**
         * 将对象转换成字符串形式表示
         * @private
         */
        function _stringify(value, arr) {
            var comma = "",
                i;

            switch (typeof value) {
                case "string":
                    arr.push(sinaadToolkit.string.formalString(value));
                    break;
                case "number":
                    arr.push(isFinite(value) && !isNaN(value) ? value : "null");
                    break;
                case "boolean":
                    arr.push(value);
                    break;
                case "undefined":
                    arr.push("null");
                    break;
                case "object":
                    //is Null
                    if (null === value) {
                        arr.push("null");
                        break;
                    }
                    //is Array
                    if (value instanceof Array) {
                        var len = value.length;

                        arr.push("[");
                        for (comma = "", i = 0; i < len; i++) {
                            arr.push(comma);
                            _stringify(value[i], arr);
                            comma = ",";
                        }
                        arr.push("]");
                        break;
                    }

                    //is Object
                    arr.push("{");
                    var v;
                    comma = "";
                    for (var key in value) {
                        if (value.hasOwnProperty(key)) {
                            v = value[key];
                            if ("function" !== typeof v) {
                                arr.push(comma);
                                arr.push(key);
                                arr.push(":");
                                _stringify(v, arr);
                                comma = ",";
                            }
                        }
                    }
                    arr.push("}");
                    break;
                case "function":
                    break;
                default:
                    //throw Error("未知的值类型: " + typeof value);
            }
        }
 

        /**
         * 将config的属性值转换成变量声明代码
         * @private
         */
        function _objToJsVarCode(obj) {
            var code = [];

            sinaadToolkit.object.map(obj, function (value, key) {
                if (null !== value) {
                    var tmp = [];
                    try {
                        _stringify(value, tmp);
                        tmp = tmp.join("");
                    } catch (e) {}
                    tmp && code.push(key, "=", tmp, ";");
                }
            });

            return code.join("");
        }

        return /** @lends sinaadToolkit.sandbox */{
            /**
             * 创建一个广告展现沙箱
             * @param  {HTMLNodeElement} container 沙箱所在容器
             * @param  {Number} width     沙箱宽
             * @param  {Number} height    沙箱高
             * @param  {String} content   沙箱内容
             * @param  {Object} context   沙箱中传入的外部属性值
             */
            create : function (container, width, height, content, context) {
                var sandboxId =  '_sinaads_sandbox_id' + uid++;

                context = context || {};

                width += sinaadToolkit.isNumber(width) ? 'px' : '';
                height += sinaadToolkit.isNumber(height) ? 'px' : '';

                var iframeConfig = {};
                sinaadToolkit.iframe.init(iframeConfig, width, height, 0);
                iframeConfig.src = 'javascript:\'<html><body style=background:transparent;></body></html>\'';
                iframeConfig.id = sandboxId;
                iframeConfig.style = 'float:left;';

                container.innerHTML = sinaadToolkit.iframe.createHTML(iframeConfig);

                //context转成js代码描述，用于注入到iframe中
                context = _objToJsVarCode(context);

                //构造iframe实体
                sinaadToolkit.iframe.fill(document.getElementById(sandboxId), [
                    '<!doctype html><html><body style="background:transparent">',
                        '<', 'script>', context, '</', 'script>',
                        content,
                    '</body></html>'
                ].join(""));
            }
        };
    })();



    /**
     * @name Box
     * @class 跟随容器，创建一个可以指定展现位置的跟随容器盒
     * @constructor
     */
    function Box(config) {
        var THIS = this;

        this.width = config.width || 0;
        this.height = config.height || 'auto';
        this.position = config.position || "center center";
        this.follow = config.follow || 0;
        this.minViewportWidth = config.minViewportWidth || 0;  //容器最小宽度

        this.positionStyle = this.follow ? (sinaadToolkit.browser.isSupportFixed ? 'fixed' : 'absolute') : 'absolute';

        this.element = document.createElement('div');
        this.element.style.cssText += 'position:' + this.positionStyle + ';width:' + this.width + 'px;height:' + this.height + 'px;z-index:9999;display:' + (config.autoShow ? 'block' : 'none');

        this.setPosition();

        sinaadToolkit.event.on(window, 'resize', function () {
            THIS.setPosition();
        });

        if (this.follow && !sinaadToolkit.browser.isSupportFixed) {
            sinaadToolkit.event.on(window, 'scroll', function () {
                THIS.setPosition();
            });
        }

        document.body.insertBefore(this.element, document.body.firstChild);
    }

    Box.prototype = /** @lends Box.prototype */{
        /**
         * 设置盒子的位置
         */
        setPosition : function () {
            var position = this.position.split(' '),
                viewWidth = sinaadToolkit.page.getViewWidth(),
                viewHeight = sinaadToolkit.page.getViewHeight(),
                offsetTop = 0,
                offsetLeft = 0,
                hOffset = Math.min(this.minViewportWidth ? (viewWidth / 2 - this.minViewportWidth / 2) : 0, 0);

            if (this.follow) {
                offsetTop = sinaadToolkit.browser.isSupportFixed ? 0 : sinaadToolkit.page.getScrollTop() || 0;
                offsetLeft = sinaadToolkit.browser.isSupportFixed ? 0 : sinaadToolkit.page.getScrollLeft() || 0;
            }

            switch (position[0]) {
                case 'center' :
                    this.element.style.left = offsetLeft + (viewWidth - this.width) / 2 + offsetLeft + 'px';
                    break;
                case 'left' :
                    this.element.style.left = offsetLeft + hOffset + 'px';
                    break;
                case 'right' :
                    if (this.follow) {
                        this.element.style.left = offsetLeft + (viewWidth - this.width) - hOffset + 'px';
                    } else {
                        this.element.style.right = hOffset + 'px';
                    }
                    break;
                default :
                    this.element.style.left = offsetLeft + (parseInt(position[0], 10) || 0) + 'px';
                    break;
            }
            switch (position[1]) {
                case 'center' :
                    this.element.style.top = (viewHeight - this.height) / 2 + offsetTop + 'px';
                    break;
                case 'top' :
                    this.element.style.top = offsetTop + 'px';
                    break;
                case 'bottom' :
                    if (this.follow) {
                        this.element.style.top = offsetTop + (viewHeight - this.height) + 'px';
                    } else {
                        this.element.style.bottom = '0px';
                    }
                    break;
                default :
                    this.element.style.top = offsetTop + (parseInt(position[1], 10) || 0) + 'px';
                    break;
            }
        },
        /**
         * 显示盒子
         */
        show : function () {
            this.element.style.display = 'block';
        },
        /**
         * 隐藏盒子
         */
        hide : function () {
            this.element.style.display = 'none';
        }
    };
    sinaadToolkit.Box = sinaadToolkit.Box || Box;

    /**
     * @todo 简单动画方法
     */
    

    /**
     * 计数种子，每次加载获取cookie或者storage中的这个值，如果没有，随机生成1个值
     */
    if (!sinaadToolkit.seed) {
        var _pathname = window.location.pathname,
            _host = window.location.host,
            KEY = _host.split('.')[0] + _pathname.substring(0, _pathname.lastIndexOf('/'));

        sinaadToolkit.debug('sinaadTookit: 当前页面种子key为:' + KEY);

        KEY = 'SinaadTK_' + sinaadToolkit.hash(KEY);

        sinaadToolkit.seed = parseInt(sinaadToolkit.storage.get(KEY), 10) || sinaadToolkit.rand(0, 100);
        //大于1000就从0开始，防止整数过大
        sinaadToolkit.storage.set(KEY, sinaadToolkit.seed > 1000 ? 0 : ++sinaadToolkit.seed, 30 * 24 * 60 * 60 * 1000);
    }

})(window);


/*
 * sinaads
 * 新浪统一商业广告脚本
 * 负责使用pdps(新浪广告资源管理码)向广告引擎请求数据并处理广告渲染
 * @author acelan <xiaobin8[at]staff.sina.com.cn>
 * @version 1.0.0
 * @date 2013-08-08
 *
 * @useage
 *     window.sinaadsPerloadData = [pdps1, pdps2, pdps3, ..., pdpsn]; 批量加载的代码
 *     (window.sinaads = window.sinaads || []).push({}); 投放一个位置
 *     (window.sinaads = window.sinaads || []).push({
 *         element : HTMLDOMElement,
 *         params : {
 *             sinaads_ad_width : xx,
 *             sinaads_ad_height : xxx,
 *             sinaads_ad_pdps : xxxx,
 *             ...
 *         }
 *     });
 *
 *
 * @info
 *    _sinaadsTargeting : 保存本页中的定向信息
 */
(function (window, core, undefined) {
    "use strict";

    var IMPRESS_URL = 'http://123.126.53.109/impress.php';
    //var IMPRESS_URL =  'http://123.126.53.109:8527/impress.php';
    //var IMPRESS_URL = 'http://sax.sina.com.cn/impress.php';

    core.PLUS_RESOURCE_URL = core.RESOURCE_URL + '/release/plus/Media.js';

    /**
     * 判断是否为sina商业广告节点且为未完成状态
     */
    //1.class=sinaads 
    //2.data-sinaads-status !== "done"
    function _isPenddingSinaad(element) {
        return (/(^| )sinaads($| )/).test(element.className) && "done" !== element.getAttribute("data-ad-status");
    }
    /**
     * 如果有id参数，则获取id为当前id的未渲染元素，如果没有提供id，则从现有的元素中获取一个待渲染广告元素
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    function _getSinaAd(id) {
        var inss = document.getElementsByTagName("ins"),
            i = 0,
            len = inss.length,
            ins;
        for (ins = inss[i]; i < len; ins = inss[++i]) {
            if (_isPenddingSinaad(ins) && (!id || ins.id === id)) {
                return ins;
            }
        }
        return null;
    }


    /**
     * 获取定向关键词, 全局只获取一次
     */
    var targeting = window._sinaadsTargeting = window._sinaadsTargeting || (function () {
        var metaNodes = document.getElementsByTagName('head')[0].getElementsByTagName('meta'),
            targeting = {},
            metas = [],
            entry,
            i = 0,
            len = metaNodes.length;
        //metas = Array.prototype.slice.call(metaNodes)在ie下报错’缺少 JScript 对象‘
        for (; i < len; i++) {
            metas.push(metaNodes[i]);
        }
        core.array.each(metas, function (meta) {
            if (meta.name.indexOf('sinaads_') === 0) {
                targeting[meta.name.split('_')[1]] = meta.content;
            }
        });
        if ((entry = core.cookie.get('sinaads_entry') || core.storage.get('sinaads_entry'))) {
            targeting.entry = entry;
            core.cookie.remove('sinaads_entry');
            core.storage.remove('sinaads_entry');
        }

        core.debug('sinaads: 取得定向信息', targeting);

        return targeting;
    })();


    /**
     * 数据模块
     * @return {[type]} [description]
     */
    var modelModule = (function () {
        var _cache = window._sinaadsCacheData = window._sinaadsCacheData || {};
        function _adapter(ad) {
            var networkMap = {
                    '1' : 'http://d3.sina.com.cn/litong/zhitou/union/tanx.html?pid=',
                    '2' : 'http://d3.sina.com.cn/litong/zhitou/union/google.html?pid='
                },
                size = ad.size.split('*'),
                engineType = ad.engineType;

            if (!ad.content && ad.value) {
                core.debug('sinaads: 老数据格式，需要进行数据适配(pdps)', ad.id);
                ad.content = ad.value;
                delete ad.value;
            }

            core.array.each(ad.content, function (content, i) {
                var manageType = content.manageType,
                    type,
                    link;

                content = content.content;
                type = core.array.ensureArray(content.type);
                link = core.array.ensureArray(content.link);

                if (engineType === 'network') {
                    content = {
                        src : [networkMap['' + manageType] + content + '&w=' + size[0] + '&h=' + size[1]],
                        type : ['url']
                    };
                }
                if (ad.engineType === 'dsp' && parseInt(manageType, 10) !== 17) {
                    content = {
                        src : [content],
                        type : ['html']
                    };
                }

                core.array.each(content.src, function (src, i) {
                    type[i] = core.ad.getTypeBySrc(src, type[i]);
                });
                // 通栏  950*90 tl
                // 画中画 300*250 hzh
                // 矩形 250*230 jx
                // 短通栏 640*90 dtl
                // 大按钮 300*120 dan
                // 小按钮 240*120 xan
                // 跨栏 1000*90 kl
                // 背投  750*450 bt
                // 文字链 wzl
                ad.type = ({
                    'lmt' : 'stream',
                    'kl' : 'couplet',
                    'sc' : 'videoWindow',
                    'hzh' : 'embed',
                    'tl' : 'embed',
                    'jx' : 'embed',
                    'dtl' : 'embed',
                    'an' : 'embed',
                    'dan' : 'embed',
                    'xan' : 'embed',
                    'wzl' : 'textlink',
                    'ztwzl' : 'zhitoutextlink',
                    'fp' : 'turning',
                    'dl' : 'float'
                }[ad.type]) || ad.type || 'embed';

                ad.content[i] = content;
            });

            return ad;
        }

        return {
            /**
             * 获取广告数据
             * @param  {Array} pdps 广告pdps
             * @return {Deferred}      promise调用对象
             */
            request : function (pdps) {
                var start = core.now(),
                    deferred = new core.Deferred(),
                    params = [],
                    isLoaded = false,
                    _pdps = [];


                //判断pdps相关数据是否存在，如果存在，直接返回，否则，请求后渲染
                core.array.each(pdps, function (str) {
                    isLoaded = !!_cache[str];
                    if (isLoaded) {
                        core.debug('sinaads: 当前pdps数据已加载，直接渲染（pdps, 数据）', str, _cache[str]);
                    } else {
                        _pdps.push(str);
                    }
                });

                if (isLoaded) {
                    deferred.resolve();
                } else {
                    core.debug('sinaads: 当前pdps数据未加载，立即加载数据（pdps, 全局缓存数据）' + _pdps.join(), _cache);
                    params = [
                        'adunitid=' + _pdps.join(','),                   //pdps数组
                        'rotate_count=' + core.seed,                    //轮播数
                        'TIMESTAMP=' + core.now().toString(36),         //时间戳
                        'referral=' + encodeURIComponent(core.url.top)  //当前页面url
                    ];


                    for (var key in targeting) {
                        params.push('tg' + key + '=' + encodeURIComponent(targeting[key]));
                    }

                    core.sio.jsonp(IMPRESS_URL + '?' + params.join('&'), function (data) {
                        if (data === 'nodata') {
                            core.debug('sinaads: ' + _pdps.join() + '-该广告位没有获取到可用的数据');
                            deferred.reject();
                        } else {
                            core.debug('sinaads: 获取数据完成（参数，时间，耗时ms，结果数据）', params, core.now(), core.now() - start, data);
                            //缓存数据到list中
                            core.array.each(data.ad, function (ad) {
                                ad = _adapter ? _adapter(ad) : ad;
                                if (ad.content instanceof Array && ad.content.length > 0) {
                                    _cache[ad.id] = ad;
                                }
                            });
                            /**
                             * cookie mapping
                             * 每次请求如果有mapping需要对应就发送请求
                             * @type {Number}
                             */
                            core.array.each(data.mapUrl, function (url) {
                                core.debug('sinaads: 取得数据，且需要mapping, 发送cookie mapping（url，参数，时间）' + url, params, core.now());
                                url && core.sio.log(url);
                            });
                        }
                        deferred.resolve();
                    });
                }

                return deferred;
            },
            get : function (pdps) {
                return _cache[pdps];
            },
            add : function (pdps, data) {
                _cache[pdps] = data;
            }
        };
    })();

    /**
     * 显示广告模块
     */
    var viewModule = (function () {
        var handlerMap = window.sinaadsRenderHandler = window.sinaadsRenderHandler || {};

        /**
         * 注册渲染方法
         * @param  {[type]} type    [description]
         * @param  {[type]} handler [description]
         * @return {[type]}         [description]
         */
        function _register(type, handler) {
            handlerMap[type] = handler;
        }

        function _render(type, element, width, height, content, monitor, config) {
            var handler = handlerMap[type],
                _type = type;
            if ('function' === typeof handler) {
                _type = handler(element, width, height, content, monitor, config) || type;
            }
            //上面的处理将媒体类型改变，按照新类型再执行一边render方法
            if (_type !== type) {
                _render(_type, element, width, height, content, monitor, config);
            }
        }

        /**
         * 注册一批方法
         */
        
        return {
            render : _render, //渲染方法
            register : _register,  //注册方法
            handlerMap : handlerMap
        };
    })();

    /** 注册一些常用的广告媒体类型显示方法 */
    viewModule.register('couplet', function (element, width, height, content, monitor, config) {
        var RESOURCE_URL = core.PLUS_RESOURCE_URL || core.RESOURCE_URL + '/src/plus/CoupletMedia.js';
        //是跨栏，隐藏掉改区块
        element.style.cssText = 'position:absolute;top:-9999px';
        //这里认为如果couplet类型给的是素材的话，那么素材必须大于1个，否则为html类型
        if (content.src.length === 1) {
            switch (content.type[0]) {
                case 'js' :
                    core.sio.loadScript(content.src[0]);
                    break;
                case 'html' :
                    return 'embed'; //某dsp插入一轮，比如乐居
            }
        }
        if (content.src.length > 1) {
            //注入跨栏数据
            var CoupletMediaData = {
                src         : content.src,
                type        : content.type,
                link        : content.link,
                top         : config.sinaads_couple_top || 0,
                monitor     : content.monitor || [],
                delay       : config.sinaads_ad_delay || 0
            };
            if (core.CoupletMediaData) {
                new core.CoupletMedia(CoupletMediaData);
            } else {
                core.sio.loadScript(RESOURCE_URL, function () {
                    new core.CoupletMedia(CoupletMediaData);
                });
            }
        }
    });

    viewModule.register('videoWindow', function (element, width, height, content, monitor, config) {
        var RESOURCE_URL = core.PLUS_RESOURCE_URL || core.RESOURCE_URL + '/src/plus/VideoWindowMedia.js';
        element.style.cssText = 'position:absolute;top:-9999px';
        if (content.type[0] !== 'js') {
            var VideoWindowMediaData = {
                src     : content.src[0],
                type    : content.type[0],
                width   : width,
                height  : height,
                link    : content.link[0],
                monitor : content.monitor,
                delay   : config.sinaads_ad_delay || 0
            };
            if (core.VideoWindowMedia) {
                new core.VideoWindowMedia(VideoWindowMediaData);
            } else {
                core.sio.loadScript(RESOURCE_URL, function () {
                    new core.VideoWindowMedia(VideoWindowMediaData);
                });
            }
        } else {
            core.sio.loadScript(content.src[0]);
        }
    });

    viewModule.register('stream', function (element, width, height, content, monitor, config) {
        var RESOURCE_URL = core.PLUS_RESOURCE_URL || core.RESOURCE_URL + '/src/plus/StreamMedia.js';
        //流媒体，隐藏掉该区块
        element.style.cssText = 'position:absolute;top:-9999px';
        if (content.src.length === 1 && content.type[0] === 'js') {
            //富媒体供应商提供的js
            //生成一个用于渲染容器到页面中
            var streamContainer = document.createElement('div');
            streamContainer.id = 'SteamMediaWrap';
            document.body.insertBefore(streamContainer, document.body.firstChild);
                
            core.sio.loadScript(content.src[0]);
        }
        //这里认为如果给的是素材的话，那么素材必须大于1个，否则为js类型
        if (content.src.length > 1) {
            //注入流媒体数据
            var StreamMediaData = {
                main : {
                    type    : content.type[0] || 'flash',
                    src     : content.src[0] || '',
                    link    : 'http://sina.com.cn',
                    width   : width,
                    height  : height
                },
                mini : {
                    src     : content.src[1] || '',
                    type    : content.type[1] || 'flash',
                    link    : 'http://sina.com.cn'
                },
                delay : config.sinaads_ad_delay || 0
            };
            if (core.StreamMedia) {
                new core.StreamMedia(StreamMediaData);
            } else {
                core.sio.loadScript(RESOURCE_URL, function () {
                    new core.StreamMedia(StreamMediaData);
                });
            }
        }
    });


    viewModule.register('fullscreen', function (element, width, height, content, monitor, config) {
        var RESOURCE_URL = core.PLUS_RESOURCE_URL || core.RESOURCE_URL + '/src/plus/FullscreenMedia.js';
        //是全屏广告，隐藏掉改区块
        element.style.cssText = 'position:absolute;top:-9999px';
        var FullScreenMediaData = {
            type        : content.type[0] || '',
            src         : content.src[0] || '',
            link        : content.link[0] || '',
            width       : width,
            height      : height,
            hasClose    : 1,
            delay       : config.sinaads_ad_delay || 0
        };
        if (core.FullscreenMedia) {
            new core.FullscreenMedia(element, FullScreenMediaData);
        } else {
            core.sio.loadScript(RESOURCE_URL, function () {
                new core.FullscreenMedia(element, FullScreenMediaData);
            });
        }
    });

    viewModule.register('bp', function (element, width, height, content) {
        //是背投广告，隐藏掉改区块
        element.style.cssText = 'position:absolute;top:-9999px';
        //这里规定背投的素材不能是js或者代码片段，而且只能有1个
        window.open('http://d1.sina.com.cn/d1images/pb/pbv4.html?' + content.link[0] + '${}' + content.type[0] + '${}' + content.src[0]);
        content.src = [];
    });

    viewModule.register('float', function (element, width, height, content, monitor, config) {
        var RESOURCE_URL = core.PLUS_RESOURCE_URL || core.RESOURCE_URL + '/src/plus/FloatMedia.js';
        element.style.cssText = 'position:absolute;top:-99999px';
        var FloatMediaData = {
            type : content.type,
            src : content.src,
            top : config.sinaads_float_top || 0,
            monitor : monitor,
            link : content.link,
            delay : config.sinaads_ad_delay || 0,
            sideWidth : width,
            sideHeight : height,
            pdps : config.sinaads_ad_pdps
        };
        if (core.FloatMedia) {
            new core.FloatMedia(FloatMediaData);
        } else {
            core.sio.loadScript(RESOURCE_URL, function () {
                new core.FloatMedia(FloatMediaData);
            });
        }
    });

    viewModule.register('turning', function (element, width, height, content, monitor, config) {
        content.src = [
            core.swf.createHTML({
                id : 'TurningMedia' + config.sinaads_uid,
                url : 'http://d3.sina.com.cn/d1images/fanpai/picshow.swf',
                width : width,
                height : height,
                vars : {
                    ad_num : content.src.length,
                    pics : content.src.join('§'),
                    urls : content.link.join('§'),
                    pic_width : width - 5,
                    pic_height : height - 5,
                    flip_time : config.sinaads_turning_flip_duration * 1000 || 300,
                    pause_time : config.sinaads_turning_flip_delay * 1000 || 4000,
                    wait_time : config.sinaads_turning_wait * 1000 || 1000
                }
            })
        ];
        content.type = ['html'];
        return 'embed'; //使用embed来解析
    });

    viewModule.register('textlink', function (element, width, height, content, monitor, config) {
        element.style.cssText = 'position:absolute;top:-9999px';
        var fragmentNode = document.createElement('span');
        fragmentNode.innerHTML = core.ad.createHTML('text', content.src[0], 0, 0, content.link[0], monitor, config.sinaads_ad_tpl || '');
        element.parentNode.insertBefore(fragmentNode, element);
    });

    viewModule.register('zhitoutextlink', viewModule.handlerMap.textlink);


    viewModule.register('tip', function (element, width, height, content, monitor, config) {
        var RESOURCE_URL = core.PLUS_RESOURCE_URL || core.RESOURCE_URL + '/src/plus/TipsMedia.js';
        var TipsMediaData = {
                width : width,
                height : height,
                src : content.src,
                type : content.type,
                link : content.link,
                monitor : monitor,
                autoShow : 1,
                top : config.sinaads_tip_top || 0,
                zIndex : config.sinaads_ad_zindex || 0
            };
        if (core.TipsMedia) {
            new core.TipsMedia(element, TipsMediaData);
        } else {
            core.sio.loadScript(RESOURCE_URL, function () {
                new core.TipsMedia(element, TipsMediaData);
            });
        }
    });
    viewModule.register('follow', function (element, width, height, content, monitor, config) {
        var RESOURCE_URL = core.PLUS_RESOURCE_URL || core.RESOURCE_URL + '/src/plus/FollowMedia.js';
        var FollowMediaData = {
                main : {
                    width : width,
                    height : height,
                    src : content.src[0] || '',
                    type : content.type[0] || '',
                    link : content.link[0] || '',
                    top : config.sinaads_follow_top || 0
                },
                mini : {
                    src : content.src[1] || '',
                    type : content.type[1] || '',
                    link : content.link[1] || content.link[0] || '',
                    top : config.sinaads_follow_mini_top || 'bottom'
                },
                monitor : monitor,
                delay : config.sinaads_ad_delay || 0,
                duration : config.sinaads_ad_duration || 5
            };
        if (core.FollowMedia) {
            new core.FollowMedia(FollowMediaData);
        } else {
            core.sio.loadScript(RESOURCE_URL, function () {
                new core.FollowMedia(FollowMediaData);
            });
        }
    });

    /**
     * 创建常规广告的曝光请求html
     * @param  {[type]} element [description]
     * @param  {[type]} config  [description]
     * @return {[type]}         [description]
     */
    viewModule.register('embed', function (element, width, height, content, monitor, config) {
        var uid         = config.sinaads_uid,
            iframeId    = 'sinaads_iframe_' + uid,
            type        = content.type[0] || '',
            link        = content.link[0] || '',
            src         = content.src[0] || '',
            pdps        = config.sinaads_ad_pdps,
            adContent;

        /**
         * 自适应宽度, 针对图片和flash
         */
        if (config.sinaads_ad_fullview && (type === 'flash' || type === 'image')) {
            width = '100%';
            height = 'auto';
        } else {
            width += 'px';
            height += 'px';
        }

        element.style.cssText += ';display:block;overflow:hidden;';
        element.innerHTML = '<ins style="margin:0px auto;display:block;overflow:hidden;width:' + width + ';height:' + height + ';"></ins>';
        element = element.getElementsByTagName('ins')[0];

        adContent = src ? core.ad.createHTML(type, src, width, height, link, monitor) : ''; //广告内容， 如果没有src，则不渲染

        switch (type) {
            case 'text' :
            case 'image' :
            case 'url' :
            case 'adbox' :
            case 'flash' :
                element.innerHTML = adContent;
                break;
            default :
                //创建广告渲染的沙箱环境，并传递部分广告参数到沙箱中
                core.sandbox.create(element, width, height, adContent, {
                    sinaads_uid             : uid,
                    sinaads_async_iframe_id : iframeId,
                    sinaads_ad_pdps         : pdps,
                    sinaads_ad_width        : width,
                    sinaads_ad_height       : height
                });
                break;
        }
    });



    /**
     * 初始化广告对象
     * @param  {object} config 配置项
     */
    function _init(config) {
        var element = config.element;      //广告容器

        config = config.params || {};   //广告配置

        //从config.element中得到需要渲染的ins元素，如果没有，则获取页面上未完成状态的广告节点
        if (element) {
            if (!_isPenddingSinaad(element) && (element = element.id && _getSinaAd(element.id), !element)) {
                core.debug("sinaads: 该元素已经被渲染完成，无需渲染", element);
            }
            if (!("innerHTML" in element)) {
                core.debug("sinaads: 无法渲染该元素", element);
            }
        //没有对应的ins元素, 获取一个待初始化的ins, 如果没有，抛出异常
        } else if (element = _getSinaAd(), !element) {
            core.debug("sinaads: 所有待渲染的元素都已经被渲染完成");
        }

        //置成完成状态，下面开始渲染
        element.setAttribute("data-ad-status", "done");

        //记录所在位置，留用
        var pos = core.dom.getPosition(element);
        element.setAttribute('data-ad-offset-left', pos.left);
        element.setAttribute('data-ad-offset-top', pos.top);

        //全局唯一id标识，用于后面为容器命名
        config.sinaads_uid = (window.sinaads_uid ? ++window.sinaads_uid : window.sinaads_uid = 1);

        //将data-xxx-xxxx,转换成sinaads_xxx_xxxx，并把值写入config
        //这里因为上面设置了data-ad-status属性, 所以sinaads-ad-status的状态也会被写入conf
        for (var attrs = element.attributes, len = attrs.length, i = 0; i < len; i++) {
            var attr = attrs[i];
            if (/data-/.test(attr.nodeName)) {
                var key = attr.nodeName.replace("data", "sinaads").replace(/-/g, "_");
                config.hasOwnProperty(key) || (config[key] = attr.nodeValue);
            }
        }
        //获取page_url 广告所在页面url
        config.sinaads_page_url = core.url.top;


        modelModule.request(config.sinaads_ad_pdps).done(function () {
            render(element, modelModule.get(config.sinaads_ad_pdps), config);
            core.isFunction(config.sinaads_success_handler) && config.sinaads_success_handler();
        }).fail(function () {
            core.isFunction(config.sinaads_fail_handler) && config.sinaads_fail_handler();
        });
    }


    /**
     * 根据广告媒体类型渲染广告
     */
    function render(element, data, config) {
        if (!data) {
            core.debug('sinaads: ' + config.sinaads_ad_pdps + '数据没有获取到, 无法渲染');
            return;
        }
        var start = core.now();

        var size    = data.size.split('*'),
            width   = config.sinaads_ad_width || (config.sinaads_ad_width = Number(size[0])) || 0,
            height  = config.sinaads_ad_height || (config.sinaads_ad_height = Number(size[1])) || 0;

        core.array.each(data.content, function (content, i) {
            core.debug('sinaads: 处理' + config.sinaads_ad_pdps + '第' + (i + 1) + '个内容的广告展现');

            content.src    = core.array.ensureArray(content.src);
            content.link   = core.array.ensureArray(content.link);
            content.type   = core.array.ensureArray(content.type);
            
            var monitor = content.monitor,
                pv = content.pv;

            /* 解析曝光，并注入模版值，发送曝光 */
            core.array.each(pv, function (url, i) {
                pv[i] = core.monitor.parseTpl(url, config);
                core.debug('sinaads: ' + config.sinaads_ad_pdps + '发送曝光' + url);
                pv[i] && core.sio.log(pv[i]);
            });
            /* 解析监控链接，注入模版， 后续使用*/
            core.array.each(monitor, function (url, i) {
                monitor[i] = core.monitor.parseTpl(url, config);
                core.debug('sinaads: ' + config.sinaads_ad_pdps + '处理监测链接' + url);
            });

            /** 
             * 按照媒体类型渲染广告
             */
            viewModule.render(
                config.sinaads_ad_type || data.type,
                element,
                width,
                height,
                content,
                monitor,
                config
            );
        });

        core.debug('sinaads: 渲染广告完毕(耗时ms)', core.now() - start);
    }


    /**
     * 初始化方法，处理js加载成功之前压入延迟触发的广告位，
     * 并将后续广告压入方法置成内部初始化方法
     */
    function init() {
        core.debug('sinaads: 进入扫描渲染广告流程' + core.now());
        /* 在脚本加载之前注入的广告数据存入在sinaads数组中，遍历数组进行初始化 */
        var perloadAds = window.sinaads;
        if (perloadAds && perloadAds.shift) {
            for (var ad, len = 50; (ad = perloadAds.shift()) && 0 < len--;) {
                _init(ad);
            }
        }
        //在脚本加载之后，sinaad重新定义，并赋予push方法为初始化方法
        window.sinaads = {push : _init};
    }


    /**
     * 查找是否有需要填充的预览数据，一次只允许预览一个广告位
     */
    (function initPreviewData() {
        var query = window.location.search.substring(1).split('&'),
            preview = {},
            keys = ['pdps', 'src', 'size'], //必需有的key
            i = 0,
            key,
            q;
        while ((q = query[i++])) {
            q = q.split('=');
            if (q[0].indexOf('sinaads_preview_') === 0) {
                key = q[0].replace('sinaads_preview_', '');
                if (key && q[1] && !preview[key]) {
                    preview[key] = q[1];
                    core.array.remove(keys, key);
                }
            }
        }
        //只有满足四个参数齐全才进行预览数据填充
        if (keys.length === 0) {
            core.debug('sinaads: 广告位' + preview.pdps + '为预览广告位（预览数据）', preview);
            //构造一个符合展现格式的数据放入到初始化数据缓存中
            modelModule.add(preview.pdps, {
                content : [
                    {
                        src : preview.src.split('|'),
                        link : (preview.link || '').split('|'),
                        monitor : (preview.monitor || '').split('|'),
                        pv : (preview.pv || '').split('|'),
                        type : (preview.type || '').split('|')
                    }
                ],
                size : preview.size,
                id : preview.pdps,
                type : 'embed'
            });
        }
    })();



    /* 判断是否有需要预加载的数据，加载完成后执行初始化操作，否则执行初始化操作 */
    var perloadData = window.sinaadsPerloadData = window.sinaadsPerloadData || [];
    if (!perloadData.done) {
        if (perloadData instanceof Array && perloadData.length > 0) {
            core.debug('sinaads: 预加载批量请求数据（预加载pdps列表）' + perloadData.join(','));
            modelModule.request(perloadData).done(init).fail(init);
        } else {
            init();
        }
    }
    window.sinaadsPerloadData.done = 1; //处理完成

})(window, window.sinaadToolkit);
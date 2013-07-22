(function (window, undefind) {
    //常量定义
    var SINAADS_AD_TYPE = 'sinaads_couple' + window.sinaads_ad_pdps,
        SINAADS_AD_TYPE_CLOSE_PIC = "http://d1.sina.com.cn/litong/zhitou/pic/close-h.jpg",
        SINAADS_AD_TYPE_CLOSE_CENTER_PIC = "http://d2.sina.com.cn/d1images/lmt/cls_66x22.gif";

    //获取所需变量及广告数据构造
    window.sinaads_ad_data.content = window.sinaads_ad_data.value[0].content; //兼容老数据
    var data = window.sinaads_ad_data.content,
        config = {
            src: data.src,
            //[主,左,右]
            link: data.link,
            //[主,左,右]
            top: 100,
            //距离顶部高度
            mainW: sinaads_ad_data.size.split("*")[0],
            mainH: sinaads_ad_data.size.split("*")[1],
            sideW: 120,
            sideH: 270,
            showCoupletMonitor: ""
        };

    //引入核心包
    var core = window.sinaads.core;
    if (!core) {
        if (!core) {
            throw new Error('请先引入sinaads.core包，地址xxx');
            return;
        }
    }

    //判断是否iframe中执行
    if (window.top === window.self) {
        sinaads_couple(config, window, window.document);
    } else {
        try {
            sinaads_couple(config, window.top, window.top.document); /* 使用适当的代码以让广告对 iframe 进行转义，并展示该广告。该代码很有可能需要使用 DOM 函数并引用顶部窗口。*/
        } catch(e) {
            document.write('由于代码被嵌套在iframe中，无法显示跨栏广告'); /* 该广告无法对该 iframe 进行转义。显示一个适当的备用广告。该备用广告将仍位于该 iframe 中。*/
        }
    }


    /**
     * 跨栏广告
     * @param  {[type]} config   [description]
     * @param  {[type]} window   [description]
     * @param  {[type]} document [description]
     * @return {[type]}          [description]
     */

    function sinaads_couple(config, window, document) {
        var me = this;
        me.isext = false;
        me.ishide = false;
        me.timer = "";
        me.timer_ext = "";
        me.tmpWidth = 0;
        this.cmWrap = document.createElement("div");

        function crtEl(elname, style) {
            var newEl = document.createElement(elname);
            var extstyle = "";
            for (var i in style) {
                if ((/\bwidth\b|\bheight\b|left\b|right\b|top\b|bottom\b/g).test(i)) {
                    extstyle += ";" + i + ":" + style[i] + "px;";
                } else {
                    extstyle += ";" + i + ":" + style[i] + ";";
                }
            }
            newEl.style.cssText += extstyle;
            return newEl;
        }
        //构造容器:中
        this.ccWrap = new crtEl("div", {
            width: 0,
            height: 112,
            overflow: "hidden",
            margin: "0 auto",
            position: "relative"
        });
        this.cciWrap = new crtEl("embed",{
            width: config.mainW,
            height: config.mainH
        });
        this.cciWrap.src = config.src[0];
        
        this.ccClose = new crtEl("div",{
            width: 66,
            height: 22,
            position: "absolute",
            top: config.mainH,
            right: 0,
            background: "url("+ SINAADS_AD_TYPE_CLOSE_CENTER_PIC +") no-repeat",
            cursor: "pointer"
        });

        this.ccWrap.appendChild(this.ccClose);
        this.ccWrap.appendChild(this.cciWrap);
        //构造容器:左
        this.clWrap = new crtEl("div", {
            width: config.sideW,
            height: 284,
            position: "absolute",
            left: 0,
            top: 0
        });
        this.cliWrap = new crtEl("embed",{
            width: config.sideW,
            height: config.sideH
        })
        this.cliWrap.src = config.src[1];

        this.clClose = new crtEl("div",{
            width: 40,
            height: 18,
            position: "absolute",
            top: config.sideH,
            right: 0,
            background: "url("+ SINAADS_AD_TYPE_CLOSE_PIC +") no-repeat",
            cursor: "pointer"
        });
        clWrap.appendChild(this.cliWrap);
        clWrap.appendChild(this.clClose);
        //构造容器:右
        this.crWrap = new crtEl("div", {
            width: config.sideW,
            height: 284,
            position: "absolute",
            right: 0,
            top: 0
        });
        this.criWrap = new crtEl("embed",{
            width: config.sideW,
            height: config.sideH
        })
        this.criWrap.src = config.src[2];
        this.crClose = new crtEl("div",{
            width: 40,
            height: 18,
            position: "absolute",
            top: config.sideH,
            left: 0,
            background: "url("+ SINAADS_AD_TYPE_CLOSE_PIC +") no-repeat",
            cursor: "pointer"
        });
        crWrap.appendChild(this.criWrap);
        crWrap.appendChild(this.crClose);

        this.showCC = function () {
            if (!me.isext && !me.ishide) {
                me.isext = true;
                clearTimeout(me.timer);
                ccWrap.style.display = "block";
                me.timer_ext = setInterval(function () {
                    if (me.tmpWidth < config.mainW) {
                        me.tmpWidth += (1000 - me.tmpWidth)/2;
                        ccWrap.style.width = me.tmpWidth + "px";
                    } else {
                        ccWrap.style.width = "1000px";
                        clearInterval(me.timer_ext);
                    }
                }, 50);
            }
            me.timer = setTimeout(function () {
                me.hideCC();
            }, 8000);
        };
        this.hideCC = function () {
            me.isext = false;
            clearTimeout(me.timer_ext);
            clearTimeout(me.timer);
            ccWrap.style.display = "none";
            me.tmpWidth = 0;
        }
        this.hideCM = function () {
            cmWrap.style.display = "none";
            me.ishide = true;
            me.hideCC();
        }
        cmWrap.appendChild(this.ccWrap);
        cmWrap.appendChild(this.clWrap);
        cmWrap.appendChild(this.crWrap);
        clWrap.onmouseover = this.showCC;
        crWrap.onmouseover = this.showCC;
        clClose.onclick = this.hideCM;
        crClose.onclick = this.hideCM;
        ccClose.onclick = this.hideCC;
        cmWrap.style.cssText += ";position:absolute;width:100%;top:"+ config.top +"px";

        document.body.insertBefore(cmWrap, document.body.firstChild);
    }
})(window);
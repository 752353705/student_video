(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/chartRoom/chartRoom"],{"049b":function(t,e,o){"use strict";o.r(e);var n=o("8952"),i=o.n(n);for(var s in n)"default"!==s&&function(t){o.d(e,t,(function(){return n[t]}))}(s);e["default"]=i.a},"22f5":function(t,e,o){"use strict";(function(t){o("21be");n(o("66fd"));var e=n(o("232f"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])},"232f":function(t,e,o){"use strict";o.r(e);var n=o("9a77"),i=o("049b");for(var s in i)"default"!==s&&function(t){o.d(e,t,(function(){return i[t]}))}(s);o("a37b");var c,l=o("f0c5"),a=Object(l["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],c);e["default"]=a.exports},"2a50":function(t,e,o){},8952:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=s(o("6bae")),i=o("1044");function s(t){return t&&t.__esModule?t:{default:t}}var c={mixins:[n.default],data:function(){return{show_exp:!1,show_img:!1,rightUserImg:"",sendVal:"",chartLeft:[],chartRight:[],scrollviewHigh:"",height:0,selfMask:{position:"fixed",bottom:0,top:0,left:0,right:0},inputBottom:"",showHeight:"",upOption:{use:!1,toTop:{src:""}},pageNum:1,pageSize:10,isEnd:!1,msgList:[]}},components:{},onLoad:function(){console.log("进入聊天界面"),t.setNavigationBarTitle({title:"小明"}),this.rightUserImg=t.getStorageSync("user_img")},onShow:function(){t.removeTabBarBadge({index:3})},onReady:function(){var e=this;t.getSystemInfo({success:function(o){e.phoneHeight=o.windowHeight;var n=t.createSelectorQuery().selectAll(".height");n.boundingClientRect((function(t){t.forEach((function(t,o){e.height+=parseInt(t.height)})),e.scrollviewHigh=e.phoneHeight-e.height,e.scrollviewHigh="height:"+e.scrollviewHigh+"px"})).exec()}})},methods:{downCallback:function(){var t=this;console.log("进行下拉请求，请求原先的聊天记录"),(0,i.apiMsgList)(this.pageNum,this.pageSize).then((function(e){console.log("下拉请求的数据 data ==》",e),t.pageNum++,t.mescroll.endSuccess(),e.length<t.pageSize&&(t.isEnd=!0,t.mescroll.lockDownScroll(!0)),e.forEach((function(t){t.VIEW_ID="msg"+t.id}));t.msgList[0];console.log("下拉获取数据 data",e,"this.msgList"),t.chartRight=e.concat(t.chartRight),t.msgscroll()})).catch((function(){t.pageNum--,t.mescroll.endErr()}))},msgscroll:function(){var e=this,o=this.msgList[0];this.$nextTick((function(){if(e.pageNum<=2)e.mescroll.scrollTo(99999,0);else if(o){var n=t.createSelectorQuery().select("#"+o.VIEW_ID);n.boundingClientRect((function(t){console.log("节点离页面顶部的距离="+t.top),e.mescroll.scrollTo(t.top-100,0)})).exec()}}))},send:function(){console.log("发送消息",this.sendVal),this.inputBottom=0,this.chartRight.push({title:this.sendVal}),this.sendVal="",this.msgscroll()},blur:function(){this.inputBottom=0},input:function(t){console.log("用户输入",t.detail.value),this.sendVal=t.detail.value},showExp:function(){console.log("显示表情小图案"),this.show_exp=!this.show_exp},showImg:function(){console.log("显示 选择本机图片"),this.show_img=!this.show_img},keyWord:function(t){console.log("键盘高度变化",t.detail.height),this.inputBottom="bottom:"+t.detail.height+"px",this.showHeight="height:"+t.detail.height+"px"},end:function(t){console.log("点击完成时触发",t.detail)},change:function(t){console.log("弹窗状态改变","popup "+t.type+" 状态",t.show)}}};e.default=c}).call(this,o("543d")["default"])},"9a77":function(t,e,o){"use strict";var n,i=function(){var t=this,e=t.$createElement;t._self._c},s=[];o.d(e,"b",(function(){return i})),o.d(e,"c",(function(){return s})),o.d(e,"a",(function(){return n}))},a37b:function(t,e,o){"use strict";var n=o("2a50"),i=o.n(n);i.a}},[["22f5","common/runtime","common/vendor"]]]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-myFans"],{"0dd8":function(t,e,n){"use strict";var i=n("ce6a"),a=n.n(i);a.a},"4beb":function(t,e,n){"use strict";n.r(e);var i=n("7b15"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);e["default"]=a.a},"76d8":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/* 页面左右间距 */\r\n/* 文字尺寸 */\r\n/*文字颜色*/\r\n/* 边框颜色 */\r\n/* 图片加载中颜色 */\r\n/* 行为相关颜色 */.empty[data-v-52e93d16]{width:200px;height:200px;position:absolute;top:36%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.fans[data-v-52e93d16]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;box-sizing:border-box;padding:%?20?% %?40?%;padding-left:0;margin:%?20?% %?40?%;position:relative}.fans .left[data-v-52e93d16]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.fans .left .img[data-v-52e93d16]{width:%?100?%;height:%?100?%;border-radius:50%;margin-right:%?40?%;overflow:hidden;-webkit-backface-visibility:hidden;-webkit-transform:translateZ(0)}.fans .left .img uni-image[data-v-52e93d16]{width:100%;height:100%}.fans .focus[data-v-52e93d16]{border:1px solid #ff234f;color:#ff234f;padding:%?6?% %?35?%;border-radius:%?40?%;font-size:%?27?%;font-weight:700}.fans .focuson[data-v-52e93d16]{color:#989898;font-weight:700;border:1px solid #989898}.fans[data-v-52e93d16]:after{content:"  ";position:absolute;left:0;bottom:0;width:100%;height:1px;border-bottom:1px solid #ababab;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.fans[data-v-52e93d16]:last-child::after{content:"  ";position:absolute;left:0;bottom:0;width:100%;height:1px;border-bottom:1px solid #fff;\r\n  /* 如果不用 background-color, 使用 border-top:1px solid #f00; 效果是一样的*/-webkit-transform:scaleY(.5);transform:scaleY(.5)}',""]),t.exports=e},"7b15":function(t,e,n){"use strict";n("99af"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{focus:!0,list:[],name:"",userId:"",pageNum:1,nextpage:!1}},onLoad:function(t){this.userId=t.userId,this.name=t.userName},onShow:function(){this.list=[],this.userId?(uni.setNavigationBarTitle({title:this.name+"的粉丝"}),this.getOtherFans()):(uni.setNavigationBarTitle({title:uni.getStorageSync("user_name")+"的粉丝"}),this.getMyFans())},onReachBottom:function(){this.nextpage&&(this.userId?this.getOtherFans():this.getMyFans())},methods:{goAuthor:function(t){var e={avatarUrl:this.list[t].avatarUrl,userId:this.list[t].userId};uni.navigateTo({url:"/pages/author/author?item=".concat(JSON.stringify(e))})},getMyFans:function(){var t=this;this.api._get("follow/fans",{pageNum:this.pageNum,pageSize:10},(function(e){t.list=t.list.concat(e.data.list),10==t.colSumList.length?(t.pageNum++,t.nextpage=!0):t.nextpage=!1}))},getOtherFans:function(){var t=this;this.api._get("follow/otherUserfans",{userId:this.userId,pageNum:this.pageNum,pageSize:10},(function(e){t.list=e.data.list}))},focusOn:function(t){var e=this;this.list[t].followed?e.api._post("follow",{followedId:e.list[t].userId},(function(n){e.list[t].followed=!e.list[t].followed})):this.api._post("follow",{followedId:e.list[t].userId},(function(n){e.list[t].followed=!e.list[t].followed}))}}};e.default=i},"8f81":function(t,e,n){"use strict";n.r(e);var i=n("b1fd"),a=n("4beb");for(var s in a)"default"!==s&&function(t){n.d(e,t,(function(){return a[t]}))}(s);n("0dd8");var o,r=n("f0c5"),l=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"52e93d16",null,!1,i["a"],o);e["default"]=l.exports},b1fd:function(t,e,n){"use strict";var i,a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[0!=t.list.length?t._l(t.list,(function(e,i){return n("v-uni-view",{key:i,staticClass:"fans",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goAuthor(i)}}},[n("v-uni-view",{staticClass:"left"},[n("v-uni-view",{staticClass:"img"},[n("v-uni-image",{attrs:{src:e.avatarUrl,mode:""}})],1),n("v-uni-view",{staticClass:"name"},[t._v(t._s(e.userName))])],1),n("v-uni-view",{staticStyle:{width:"180rpx",display:"flex","justify-content":"center","align-items":"center"}},[e.followed?n("v-uni-view",{staticClass:"focus focuson",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.focusOn(i)}}},[t._v("已关注")]):n("v-uni-view",{staticClass:"focus ",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.focusOn(i)}}},[t._v("关注")])],1)],1)})):[n("v-uni-image",{staticClass:"empty",attrs:{src:"/static/dingdan.png",mode:""}})]],2)},s=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return i}))},ce6a:function(t,e,n){var i=n("76d8");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("3d2cefc4",i,!0,{sourceMap:!1,shadowMode:!1})}}]);
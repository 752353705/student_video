(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pagesA-myData-myName"],{2058:function(n,t,a){var r=a("e2d5");"string"===typeof r&&(r=[[n.i,r,""]]),r.locals&&(n.exports=r.locals);var e=a("4f06").default;e("3546083f",r,!0,{sourceMap:!1,shadowMode:!1})},"2a3b":function(n,t,a){var r=a("535e");"string"===typeof r&&(r=[[n.i,r,""]]),r.locals&&(n.exports=r.locals);var e=a("4f06").default;e("07f332e8",r,!0,{sourceMap:!1,shadowMode:!1})},4859:function(n,t,a){"use strict";var r=a("2058"),e=a.n(r);e.a},"535e":function(n,t,a){var r=a("24fb");t=r(!1),t.push([n.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/* 页面左右间距 */\r\n/* 文字尺寸 */\r\n/*文字颜色*/\r\n/* 边框颜色 */\r\n/* 图片加载中颜色 */\r\n/* 行为相关颜色 */uni-input[data-v-a315a32c]{width:89%;height:%?90?%;background-color:#fff;margin:%?80?% auto;border-radius:%?30?%;padding-left:%?20?%}.btn[data-v-a315a32c]{width:67%;line-height:%?91?%;text-align:center;color:#fff;background-color:#f93;margin:%?20?% auto;border-radius:%?30?%}',""]),n.exports=t},"7b82":function(n,t,a){"use strict";a.r(t);var r=a("89bb"),e=a("e115");for(var u in e)"default"!==u&&function(n){a.d(t,n,(function(){return e[n]}))}(u);a("4859"),a("f02b");var i,o=a("f0c5"),c=Object(o["a"])(e["default"],r["b"],r["c"],!1,null,"a315a32c",null,!1,r["a"],i);t["default"]=c.exports},"89bb":function(n,t,a){"use strict";var r,e=function(){var n=this,t=n.$createElement,a=n._self._c||t;return a("v-uni-view",[a("v-uni-input",{attrs:{type:"text",value:n.value,placeholder:"添加一个名字","placeholder-style":"color:#a3a3a3",maxlength:"6"},on:{input:function(t){arguments[0]=t=n.$handleEvent(t),n.input.apply(void 0,arguments)}}}),a("v-uni-view",{staticClass:"btn",on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.submit.apply(void 0,arguments)}}},[n._v("保存")])],1)},u=[];a.d(t,"b",(function(){return e})),a.d(t,"c",(function(){return u})),a.d(t,"a",(function(){return r}))},b65f:function(n,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={data:function(){return{value:""}},onLoad:function(n){this.value=n.name},methods:{input:function(n){this.value=n.detail.value},submit:function(){this.api._put("user",{userName:this.value},(function(n){uni.navigateBack({delta:1})}))}}};t.default=r},e115:function(n,t,a){"use strict";a.r(t);var r=a("b65f"),e=a.n(r);for(var u in r)"default"!==u&&function(n){a.d(t,n,(function(){return r[n]}))}(u);t["default"]=e.a},e2d5:function(n,t,a){var r=a("24fb");t=r(!1),t.push([n.i,"uni-page-body[data-v-a315a32c]{background-color:#f5f5f5}body.?%PAGE?%[data-v-a315a32c]{background-color:#f5f5f5}",""]),n.exports=t},f02b:function(n,t,a){"use strict";var r=a("2a3b"),e=a.n(r);e.a}}]);
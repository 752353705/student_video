(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pagesA-myData-mySigin"],{"013a":function(i,t,n){var a=n("87bc");"string"===typeof a&&(a=[[i.i,a,""]]),a.locals&&(i.exports=a.locals);var o=n("4f06").default;o("8be8a7a0",a,!0,{sourceMap:!1,shadowMode:!1})},3586:function(i,t,n){"use strict";var a,o=function(){var i=this,t=i.$createElement,n=i._self._c||t;return n("v-uni-view",{staticClass:"sigin"},[n("v-uni-view",{staticClass:"bg"}),n("v-uni-view",{staticClass:"head"},[n("v-uni-view",{staticClass:"ticket"},[n("v-uni-text",{staticStyle:{"font-size":"32px","margin-right":"20rpx"}},[i._v(i._s(i.goldNumber||0))]),i._v("票")],1)],1),n("v-uni-view",{staticClass:"box pa-t20 pa-b20"},[n("v-uni-view",{staticClass:"tit"},[n("v-uni-text",[i._v("已经连续签到")]),n("v-uni-text",{staticStyle:{color:"red"}},[i._v(i._s(i.continuousSignNumber)+"天")])],1),n("v-uni-view",{staticClass:"main panel-center item-center wrap"},i._l(i.sigin_data,(function(t,a){return n("v-uni-view",{key:a,staticClass:"item panel-start item-center",class:a<i.continuousSignNumber?"act":"",on:{click:function(t){arguments[0]=t=i.$handleEvent(t),i.sigin(a)}}},[n("v-uni-view",{staticClass:"day text-center w-100"},[i._v(i._s(t.day))]),n("v-uni-view",{staticClass:"body text-center"},[n("v-uni-image",{attrs:{src:a<i.continuousSignNumber?"/static/dui.png":"/static/sigin.png"}}),n("v-uni-view",{staticClass:"money"},[i._v(i._s(t.money)+"票")])],1)],1)})),1)],1),n("v-uni-view",{staticClass:"common_task"},[n("v-uni-view",{staticClass:"tit"},[i._v("常规任务")]),n("v-uni-view",{staticClass:"task_detail"},[n("v-uni-view",{staticClass:"le"},[n("v-uni-image",{attrs:{src:"/static/task_gift.png",mode:""}})],1),n("v-uni-view",{staticClass:"ri"},[n("v-uni-view",{staticClass:"ri_tit"},[i._v("邀请好友")]),n("v-uni-view",{staticClass:"ri_des"},[i._v("邀请好友使用小驴邦,好友越多奖励越多")])],1),n("v-uni-view",{staticClass:"go_done",on:{click:function(t){arguments[0]=t=i.$handleEvent(t),i.goInvite.apply(void 0,arguments)}}},[i._v("去完成")])],1)],1)],1)},e=[];n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return e})),n.d(t,"a",(function(){return a}))},"3f0d":function(i,t,n){var a=n("24fb");t=a(!1),t.push([i.i,"uni-page-body[data-v-3542d067]{\n\t/* color: white; */background-color:#f2f3f5}body.?%PAGE?%[data-v-3542d067]{background-color:#f2f3f5}",""]),i.exports=t},"4bd1":function(i,t,n){var a=n("3f0d");"string"===typeof a&&(a=[[i.i,a,""]]),a.locals&&(i.exports=a.locals);var o=n("4f06").default;o("043962e5",a,!0,{sourceMap:!1,shadowMode:!1})},"82aa":function(i,t,n){"use strict";n.r(t);var a=n("ae22"),o=n.n(a);for(var e in a)"default"!==e&&function(i){n.d(t,i,(function(){return a[i]}))}(e);t["default"]=o.a},"87bc":function(i,t,n){var a=n("24fb");t=a(!1),t.push([i.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/* 页面左右间距 */\r\n/* 文字尺寸 */\r\n/*文字颜色*/\r\n/* 边框颜色 */\r\n/* 图片加载中颜色 */\r\n/* 行为相关颜色 */.sigin .bg[data-v-3542d067]{position:absolute;width:100%;height:%?450?%;background-image:-webkit-linear-gradient(left,#ec7034,#eb573e);background-image:linear-gradient(90deg,#ec7034,#eb573e);z-index:-1}.sigin .head[data-v-3542d067]{width:88%;box-sizing:border-box;margin:auto;padding-top:%?65?%;color:#fff}.sigin .head .ticket[data-v-3542d067]{margin-top:%?30?%}.sigin .box[data-v-3542d067]{width:88%;box-sizing:border-box;margin:%?59?% auto 0;background-color:#fff;border-radius:%?25?%}.sigin .box .tit[data-v-3542d067]{margin-left:%?20?%;font-weight:700;margin-bottom:%?10?%}.sigin .box .main[data-v-3542d067]{box-sizing:border-box}.sigin .box .main .item[data-v-3542d067]{position:relative;width:%?139?%;height:%?170?%;background-color:#f1f1f1;margin-top:%?20?%;margin-right:%?20?%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.sigin .box .main .item .dui[data-v-3542d067]{width:%?140?%;height:%?83?%;z-index:20;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.sigin .box .main .item .day[data-v-3542d067]{padding-top:%?10?%;height:%?40?%;font-weight:700;font-size:%?26?%;color:#7d8083}.sigin .box .main .item .body[data-v-3542d067]{height:%?114?%}.sigin .box .main .item .body uni-image[data-v-3542d067]{margin-top:%?10?%;width:%?60?%;height:%?60?%}.sigin .box .main .item .body .money[data-v-3542d067]{color:#b1b1b3}.sigin .box .main .act[data-v-3542d067]{background-color:#f0c054;color:#fff}.sigin .box .main .act .day[data-v-3542d067]{color:#fff;background-color:#f0c054}.sigin .box .main .act .body[data-v-3542d067]{background-color:#f0c054}.sigin .box .main .act .body .money[data-v-3542d067]{color:#fff}.sigin .box .main .n_act[data-v-3542d067]{background-color:#f1f1f1}.sigin .box .main .n_act .day[data-v-3542d067]{color:#848587;background-color:#f23030}.sigin .box .main .item[data-v-3542d067]:nth-child(4){margin-right:%?0?%}.sigin .box .main .item[data-v-3542d067]:nth-child(7){margin-right:%?0?%;width:%?297?%}.sigin .common_task[data-v-3542d067]{background-color:#fff;width:88%;box-sizing:border-box;margin:auto;margin-top:%?30?%;padding-top:%?30?%;padding-right:%?30?%;padding-bottom:%?30?%;padding-left:%?30?%;border-radius:%?10?%}.sigin .common_task .tit[data-v-3542d067]{font-size:%?30?%;font-weight:700;margin-bottom:%?20?%}.sigin .common_task .task_detail[data-v-3542d067]{position:relative;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.sigin .common_task .task_detail .le[data-v-3542d067]{width:%?88?%;height:%?88?%;margin-right:%?25?%}.sigin .common_task .task_detail .le uni-image[data-v-3542d067]{width:100%;height:100%}.sigin .common_task .task_detail .ri .ri_tit[data-v-3542d067]{font-size:%?30?%;margin-bottom:%?10?%}.sigin .common_task .task_detail .ri .ri_des[data-v-3542d067]{font-size:%?20?%;color:#7c7f82}.sigin .common_task .task_detail .go_done[data-v-3542d067]{width:%?122?%;line-height:%?47?%;background-color:#eb6a36;color:#fff;border-radius:%?40?%;position:absolute;right:%?10?%;top:%?9?%;font-size:%?27?%;text-align:center}uni-button[data-v-3542d067]{padding-left:0;padding-right:0}',""]),i.exports=t},"950a":function(i,t,n){"use strict";n.r(t);var a=n("3586"),o=n("82aa");for(var e in o)"default"!==e&&function(i){n.d(t,i,(function(){return o[i]}))}(e);n("fbe4"),n("bff3");var s,r=n("f0c5"),d=Object(r["a"])(o["default"],a["b"],a["c"],!1,null,"3542d067",null,!1,a["a"],s);t["default"]=d.exports},ae22:function(i,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{sigin_data:[{day:"第 1 天",money:1},{day:"第 2 天",money:2},{day:"第 3 天",money:3},{day:"第 4 天",money:4},{day:"第 5 天",money:5},{day:"第 6 天",money:6},{day:"第 7 天",money:7}],continuousSignNumber:0,act_btn:!1,city:"",goldNumber:""}},onLoad:function(){this.getUsInfo()},onShow:function(){var i=this;this.api._get("sign",{},(function(t){"0"===t.data.status?i.act_btn=!1:i.act_btn=!0,i.continuousSignNumber=t.data.continuousSignNumber}))},methods:{getUsInfo:function(){var i=this;uni.getStorageSync("token")&&this.api._get("user/info",{},(function(t){console.log("获取用户当前的 H币",t),i.goldNumber=t.data.goldNumber}))},sigin:function(i){if(i===this.continuousSignNumber){console.log("用户进行签到操作");var t=this;this.act_btn||this.api._post("sign",{hGold:this.sigin_data[this.continuousSignNumber].money},(function(i){t.act_btn=!0,t.goldNumber+=t.sigin_data[t.continuousSignNumber].money,t.continuousSignNumber++;var n={siginTime:Date.parse(new Date),overTime:new Date((new Date).toLocaleDateString()).getTime()+864e5-Date.parse(new Date)+6e4};uni.setStorageSync("sigin",JSON.stringify(n))}))}},goInvite:function(){uni.navigateTo({url:"/pagesA/myData/invite"})}}};t.default=a},bff3:function(i,t,n){"use strict";var a=n("013a"),o=n.n(a);o.a},fbe4:function(i,t,n){"use strict";var a=n("4bd1"),o=n.n(a);o.a}}]);
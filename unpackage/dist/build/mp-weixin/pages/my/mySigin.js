(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/mySigin"],{"0038":function(n,t,e){"use strict";var o=e("f567"),i=e.n(o);i.a},"134c":function(n,t,e){"use strict";(function(n){e("21be");o(e("66fd"));var t=o(e("cf8c"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},4004:function(n,t,e){},5871:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={data:function(){return{sigin_data:[{day:"第 1 天",money:1},{day:"第 2 天",money:2},{day:"第 3 天",money:3},{day:"第 4 天",money:4},{day:"第 5 天",money:5},{day:"第 6 天",money:6},{day:"第 7 天",money:7}],continuousSignNumber:0,act_btn:!1,city:"",goldNumber:""}},onLoad:function(){this.getUsInfo()},onShow:function(){var n=this;this.api._get("sign",{},(function(t){"0"===t.data.status?n.act_btn=!1:n.act_btn=!0,n.continuousSignNumber=t.data.continuousSignNumber}))},methods:{getUsInfo:function(){var t=this;n.getStorageSync("token")&&this.api._get("user/info",{},(function(n){console.log("获取用户当前的 H币",n),t.goldNumber=n.data.goldNumber}))},sigin:function(n){if(n===this.continuousSignNumber){console.log("用户进行签到操作");var t=this;this.act_btn||this.api._post("sign",{hGold:this.sigin_data[this.continuousSignNumber].money},(function(n){t.act_btn=!0,t.getUsInfo()}))}},goInvite:function(){n.navigateTo({url:"/pages/my/invite"})}}};t.default=e}).call(this,e("543d")["default"])},c1e0:function(n,t,e){"use strict";e.r(t);var o=e("5871"),i=e.n(o);for(var u in o)"default"!==u&&function(n){e.d(t,n,(function(){return o[n]}))}(u);t["default"]=i.a},c893:function(n,t,e){"use strict";var o,i=function(){var n=this,t=n.$createElement;n._self._c},u=[];e.d(t,"b",(function(){return i})),e.d(t,"c",(function(){return u})),e.d(t,"a",(function(){return o}))},cf8c:function(n,t,e){"use strict";e.r(t);var o=e("c893"),i=e("c1e0");for(var u in i)"default"!==u&&function(n){e.d(t,n,(function(){return i[n]}))}(u);e("e1ec"),e("0038");var c,a=e("f0c5"),r=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,"104cf9d3",null,!1,o["a"],c);t["default"]=r.exports},e1ec:function(n,t,e){"use strict";var o=e("4004"),i=e.n(o);i.a},f567:function(n,t,e){}},[["134c","common/runtime","common/vendor"]]]);
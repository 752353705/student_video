(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/mySigin"],{"134c":function(n,t,e){"use strict";(function(n){e("21be");u(e("66fd"));var t=u(e("cf8c"));function u(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},"2ea6":function(n,t,e){"use strict";var u=e("73a1"),a=e.n(u);a.a},5871:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u={data:function(){return{sigin_data:[{day:"第 1 天",money:1},{day:"第 2 天",money:1},{day:"第 3 天",money:1},{day:"第 4 天",money:1},{day:"第 5 天",money:1},{day:"第 6 天",money:1},{day:"第 7 天",money:1}],continuousSignNumber:0,act_btn:!1}},onLoad:function(){},onShow:function(){var n=this;this.api._get("sign",{},(function(t){"0"===t.data.status?n.act_btn=!1:n.act_btn=!0,n.continuousSignNumber=t.data.continuousSignNumber}))},methods:{sigin:function(){var n=this;this.act_btn||this.api._post("sign",{hGold:this.sigin_data[this.continuousSignNumber].money},(function(t){n.act_btn=!0,n.continuousSignNumber++}))}}};t.default=u},"73a1":function(n,t,e){},"7e5c":function(n,t,e){"use strict";var u,a=function(){var n=this,t=n.$createElement;n._self._c},i=[];e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return i})),e.d(t,"a",(function(){return u}))},c1e0:function(n,t,e){"use strict";e.r(t);var u=e("5871"),a=e.n(u);for(var i in u)"default"!==i&&function(n){e.d(t,n,(function(){return u[n]}))}(i);t["default"]=a.a},cf8c:function(n,t,e){"use strict";e.r(t);var u=e("7e5c"),a=e("c1e0");for(var i in a)"default"!==i&&function(n){e.d(t,n,(function(){return a[n]}))}(i);e("2ea6");var o,c=e("f0c5"),r=Object(c["a"])(a["default"],u["b"],u["c"],!1,null,"4e87a232",null,!1,u["a"],o);t["default"]=r.exports}},[["134c","common/runtime","common/vendor"]]]);
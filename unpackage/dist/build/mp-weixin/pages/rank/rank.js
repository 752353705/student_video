(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/rank/rank"],{"077b":function(t,n,e){"use strict";e.r(n);var a=e("7651"),r=e.n(a);for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);n["default"]=r.a},"37af":function(t,n,e){"use strict";var a=e("8c8d"),r=e.n(a);r.a},"3e8e":function(t,n,e){"use strict";var a,r=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return a}))},7651:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={data:function(){return{rankList:[]}},onLoad:function(t){this.getUserGift(t.articleId)},methods:{getUserGift:function(t){var n=this;this.api._get("gift/article/user/gift/".concat(t),{},(function(t){console.log("获取刷礼物 res",t),n.rankList=t.data}))}}};n.default=a},"7e60":function(t,n,e){"use strict";(function(t){e("21be");a(e("66fd"));var n=a(e("a212"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"8c8d":function(t,n,e){},a212:function(t,n,e){"use strict";e.r(n);var a=e("3e8e"),r=e("077b");for(var u in r)"default"!==u&&function(t){e.d(n,t,(function(){return r[t]}))}(u);e("37af");var c,i=e("f0c5"),o=Object(i["a"])(r["default"],a["b"],a["c"],!1,null,"16562c6a",null,!1,a["a"],c);n["default"]=o.exports}},[["7e60","common/runtime","common/vendor"]]]);
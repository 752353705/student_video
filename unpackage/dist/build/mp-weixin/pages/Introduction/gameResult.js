(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Introduction/gameResult"],{"094d":function(t,n,e){"use strict";var c,a=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return c}))},"535f":function(t,n,e){},"5c8f":function(t,n,e){"use strict";(function(t){e("21be");c(e("66fd"));var n=c(e("d71c"));function c(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"720e":function(t,n,e){"use strict";var c=e("ca10"),a=e.n(c);a.a},"7ddc":function(t,n,e){"use strict";e.r(n);var c=e("836e"),a=e.n(c);for(var u in c)"default"!==u&&function(t){e.d(n,t,(function(){return c[t]}))}(u);n["default"]=a.a},"836e":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{rank:[],rank_other:"",subjectId:""}},onLoad:function(t){this.subjectId=t.subjectId,this.rank_other=this.rank.slice(3),this.getRankList(t.subjectId)},methods:{goFlashTime:function(){console.log("大赛详情颁奖"),t.navigateTo({url:"/pages/Introduction/flashTime?subjectId=".concat(this.subjectId)})},goList:function(){t.navigateTo({url:"/pages/list/list?tab_act=2"})},getRankList:function(t){var n=this;this.http({url:"subject/ranking?subjectId=".concat(t),data:{}}).then((function(t){n.rank=t,n.rank_other=t.slice(3)}))}}};n.default=e}).call(this,e("543d")["default"])},"8a37":function(t,n,e){"use strict";var c=e("535f"),a=e.n(c);a.a},ca10:function(t,n,e){},d71c:function(t,n,e){"use strict";e.r(n);var c=e("094d"),a=e("7ddc");for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);e("720e"),e("8a37");var i,o=e("f0c5"),r=Object(o["a"])(a["default"],c["b"],c["c"],!1,null,"783aecd9",null,!1,c["a"],i);n["default"]=r.exports}},[["5c8f","common/runtime","common/vendor"]]]);
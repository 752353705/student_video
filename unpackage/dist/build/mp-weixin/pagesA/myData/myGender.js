(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/myData/myGender"],{2211:function(t,n,e){},2571:function(t,n,e){"use strict";e.r(n);var u=e("7bed"),a=e.n(u);for(var c in u)"default"!==c&&function(t){e.d(n,t,(function(){return u[t]}))}(c);n["default"]=a.a},"665f":function(t,n,e){"use strict";e.r(n);var u=e("692d"),a=e("2571");for(var c in a)"default"!==c&&function(t){e.d(n,t,(function(){return a[t]}))}(c);e("f3e1"),e("a7d8");var i,f=e("f0c5"),r=Object(f["a"])(a["default"],u["b"],u["c"],!1,null,"0b68be36",null,!1,u["a"],i);n["default"]=r.exports},"692d":function(t,n,e){"use strict";var u,a=function(){var t=this,n=t.$createElement;t._self._c},c=[];e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return u}))},"7bed":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{type:[{sex:"男",id:1},{sex:"女",id:2}],act:1}},onLoad:function(t){this.act=t.gender},methods:{submit:function(){this.http({url:"user",method:"PUT",data:{gender:this.type[this.act-1].id}}).then((function(n){t.navigateBack({delta:1})}))},active:function(t){this.act=t+1}}};n.default=e}).call(this,e("543d")["default"])},a7d8:function(t,n,e){"use strict";var u=e("cf8f"),a=e.n(u);a.a},cf8f:function(t,n,e){},d960:function(t,n,e){"use strict";(function(t){e("21be");u(e("66fd"));var n=u(e("665f"));function u(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},f3e1:function(t,n,e){"use strict";var u=e("2211"),a=e.n(u);a.a}},[["d960","common/runtime","common/vendor"]]]);
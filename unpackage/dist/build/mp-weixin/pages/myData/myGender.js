(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/myData/myGender"],{"270c":function(t,n,e){"use strict";e.r(n);var a=e("6ea8"),u=e("4a6b");for(var c in u)"default"!==c&&function(t){e.d(n,t,(function(){return u[t]}))}(c);e("f49e"),e("f4ef");var i,f=e("f0c5"),o=Object(f["a"])(u["default"],a["b"],a["c"],!1,null,"b1078e9e",null,!1,a["a"],i);n["default"]=o.exports},"4a6b":function(t,n,e){"use strict";e.r(n);var a=e("f8b9"),u=e.n(a);for(var c in a)"default"!==c&&function(t){e.d(n,t,(function(){return a[t]}))}(c);n["default"]=u.a},5903:function(t,n,e){"use strict";(function(t){e("21be");a(e("66fd"));var n=a(e("270c"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"6ea8":function(t,n,e){"use strict";var a,u=function(){var t=this,n=t.$createElement;t._self._c},c=[];e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return a}))},"7bba":function(t,n,e){},c5f1:function(t,n,e){},f49e:function(t,n,e){"use strict";var a=e("7bba"),u=e.n(a);u.a},f4ef:function(t,n,e){"use strict";var a=e("c5f1"),u=e.n(a);u.a},f8b9:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{type:[{sex:"男",id:1},{sex:"女",id:2}],act:1}},onLoad:function(t){this.act=t.gender},methods:{submit:function(){console.log("提交"),this.api._put("user",{gender:this.type[this.act-1].id},(function(n){t.navigateBack({delta:1})}))},active:function(t){this.act=t+1}}};n.default=e}).call(this,e("543d")["default"])}},[["5903","common/runtime","common/vendor"]]]);
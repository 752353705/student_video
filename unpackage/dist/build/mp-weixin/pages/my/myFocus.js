(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/myFocus"],{4779:function(t,n,e){"use strict";var o,i=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return o}))},"53e4":function(t,n,e){},"7c84":function(t,n,e){"use strict";e.r(n);var o=e("dd17"),i=e.n(o);for(var u in o)"default"!==u&&function(t){e.d(n,t,(function(){return o[t]}))}(u);n["default"]=i.a},"7fce":function(t,n,e){"use strict";e.r(n);var o=e("4779"),i=e("7c84");for(var u in i)"default"!==u&&function(t){e.d(n,t,(function(){return i[t]}))}(u);e("cef7");var s,a=e("f0c5"),l=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);n["default"]=l.exports},b334:function(t,n,e){"use strict";(function(t){e("21be");o(e("66fd"));var n=o(e("7fce"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},cef7:function(t,n,e){"use strict";var o=e("53e4"),i=e.n(o);i.a},dd17:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{focus:!0,list:[],name:"",userId:""}},onLoad:function(t){this.userId=t.userId},onShow:function(){this.userId?this.getOtherFans():this.getMyFans()},methods:{getMyFans:function(){var t=this;this.api._get("follow/follows",{pageNum:1,pageSize:10},(function(n){t.list=n.data.list}))},getOtherFans:function(){var t=this;this.api._get("follow/otherUserfollows",{userId:this.userId,pageNum:1,pageSize:10},(function(n){t.list=n.data.list}))},goAuthor:function(n){var e={avatarUrl:this.list[n].avatarUrl,userId:this.list[n].userId};t.navigateTo({url:"/pages/author/author?item=".concat(JSON.stringify(e))})},focusOn:function(n){var e=this;this.list[n].followed?t.showModal({content:"取消关注",success:function(t){t.confirm?e.api._post("follow",{followedId:e.list[n].userId},(function(t){e.list[n].followed=!e.list[n].followed})):t.cancel}}):this.api._post("follow",{followedId:e.list[n].userId},(function(t){e.list[n].followed=!e.list[n].followed}))}}};n.default=e}).call(this,e("543d")["default"])}},[["b334","common/runtime","common/vendor"]]]);
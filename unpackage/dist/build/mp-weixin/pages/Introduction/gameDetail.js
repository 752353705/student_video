(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Introduction/gameDetail"],{2490:function(t,a,e){},"50c3":function(t,a,e){"use strict";e.r(a);var n=e("97cc"),i=e.n(n);for(var c in n)"default"!==c&&function(t){e.d(a,t,(function(){return n[t]}))}(c);a["default"]=i.a},"5b9a":function(t,a,e){"use strict";e.r(a);var n=e("a4f6"),i=e("50c3");for(var c in i)"default"!==c&&function(t){e.d(a,t,(function(){return i[t]}))}(c);e("70ff"),e("60d8");var u,s=e("f0c5"),r=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"5f6d5abc",null,!1,n["a"],u);a["default"]=r.exports},"5cf4":function(t,a,e){},"60d8":function(t,a,e){"use strict";var n=e("2490"),i=e.n(n);i.a},"70ff":function(t,a,e){"use strict";var n=e("5cf4"),i=e.n(n);i.a},"97cc":function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e={data:function(){return{tab_act:0,game_detail:"",game_user:[],game_user_part:[],tab_msg:["详情","参赛选手"],hasBtn:!1}},onLoad:function(t){this.btnStyle(),this.getGameDetail(t.subjectId),this.getGamePlayers(t.subjectId)},methods:{btnStyle:function(){var t=this;this.api._get("parame/config/uploadArticle",{},(function(a){console.log("res 报名按钮",a),1==a.data.parameStatus?t.hasBtn=!0:t.hasBtn=!1}))},getGameDetail:function(a){var e=this;this.api._get("subject/".concat(a),{},(function(a){e.game_detail=a.data,t.setNavigationBarTitle({title:e.game_detail.subjectTitle})}))},getGamePlayers:function(t){var a=this;this.api._get("subject/players/".concat(t),{},(function(t){a.game_user=t.data,a.game_user.length>5?a.game_user_part=t.data.slice(0,5):a.game_user_part=t.data}))},tabAct:function(t){t!=this.tab_act&&(this.tab_act=t)},jumpList:function(){var a={subjectId:this.game_detail.subjectId,logo:this.game_detail.logoUrl,subjectTitle:this.game_detail.subjectTitle,introduction:this.game_detail.introduction};t.setStorageSync("gameMsg",JSON.stringify(a)),t.navigateTo({url:"/pages/publish/publishNotice"})}}};a.default=e}).call(this,e("543d")["default"])},a35c:function(t,a,e){"use strict";(function(t){e("21be");n(e("66fd"));var a=n(e("5b9a"));function n(t){return t&&t.__esModule?t:{default:t}}t(a.default)}).call(this,e("543d")["createPage"])},a4f6:function(t,a,e){"use strict";var n,i=function(){var t=this,a=t.$createElement;t._self._c},c=[];e.d(a,"b",(function(){return i})),e.d(a,"c",(function(){return c})),e.d(a,"a",(function(){return n}))}},[["a35c","common/runtime","common/vendor"]]]);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Introduction/gameDetail"],{"504c":function(t,e,a){"use strict";var n=a("a3c4"),c=a.n(n);c.a},"50c3":function(t,e,a){"use strict";a.r(e);var n=a("97cc"),c=a.n(n);for(var i in n)"default"!==i&&function(t){a.d(e,t,(function(){return n[t]}))}(i);e["default"]=c.a},"5b9a":function(t,e,a){"use strict";a.r(e);var n=a("c5b1"),c=a("50c3");for(var i in c)"default"!==i&&function(t){a.d(e,t,(function(){return c[t]}))}(i);a("70ff"),a("504c");var u,s=a("f0c5"),r=Object(s["a"])(c["default"],n["b"],n["c"],!1,null,"2447bce9",null,!1,n["a"],u);e["default"]=r.exports},"5cf4":function(t,e,a){},"70ff":function(t,e,a){"use strict";var n=a("5cf4"),c=a.n(n);c.a},"97cc":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{tab_act:0,game_detail:"",game_user:[],game_user_part:[],tab_msg:["详情","参赛选手"]}},onLoad:function(t){this.getGameDetail(t.subjectId),this.getGamePlayers(t.subjectId)},methods:{getGameDetail:function(e){var a=this;this.api._get("subject/".concat(e),{},(function(e){a.game_detail=e.data,t.setNavigationBarTitle({title:a.game_detail.subjectTitle})}))},getGamePlayers:function(t){var e=this;this.api._get("subject/players/".concat(t),{},(function(t){e.game_user=t.data,e.game_user.length>5?e.game_user_part=t.data.slice(0,5):e.game_user_part=t.data}))},tabAct:function(t){t!=this.tab_act&&(this.tab_act=t)},jumpList:function(){var e={subjectId:this.game_detail.subjectId,logo:this.game_detail.logoUrl,subjectTitle:this.game_detail.subjectTitle,introduction:this.game_detail.introduction};t.setStorageSync("gameMsg",JSON.stringify(e)),t.switchTab({url:"/pages/publish/publishNotice"})}}};e.default=a}).call(this,a("543d")["default"])},a35c:function(t,e,a){"use strict";(function(t){a("21be");n(a("66fd"));var e=n(a("5b9a"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},a3c4:function(t,e,a){},c5b1:function(t,e,a){"use strict";var n,c=function(){var t=this,e=t.$createElement;t._self._c},i=[];a.d(e,"b",(function(){return c})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){return n}))}},[["a35c","common/runtime","common/vendor"]]]);
=======
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Introduction/gameDetail"],{2490:function(t,a,e){},"50c3":function(t,a,e){"use strict";e.r(a);var n=e("97cc"),i=e.n(n);for(var c in n)"default"!==c&&function(t){e.d(a,t,(function(){return n[t]}))}(c);a["default"]=i.a},"5b9a":function(t,a,e){"use strict";e.r(a);var n=e("a4f6"),i=e("50c3");for(var c in i)"default"!==c&&function(t){e.d(a,t,(function(){return i[t]}))}(c);e("70ff"),e("60d8");var u,s=e("f0c5"),r=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"5f6d5abc",null,!1,n["a"],u);a["default"]=r.exports},"5cf4":function(t,a,e){},"60d8":function(t,a,e){"use strict";var n=e("2490"),i=e.n(n);i.a},"70ff":function(t,a,e){"use strict";var n=e("5cf4"),i=e.n(n);i.a},"97cc":function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e={data:function(){return{tab_act:0,game_detail:"",game_user:[],game_user_part:[],tab_msg:["详情","参赛选手"],hasBtn:!1}},onLoad:function(t){this.btnStyle(),this.getGameDetail(t.subjectId),this.getGamePlayers(t.subjectId)},methods:{btnStyle:function(){var t=this;this.api._get("parame/config/uploadArticle",{},(function(a){console.log("res 报名按钮",a),1==a.data.parameStatus?t.hasBtn=!0:t.hasBtn=!1}))},getGameDetail:function(a){var e=this;this.api._get("subject/".concat(a),{},(function(a){e.game_detail=a.data,t.setNavigationBarTitle({title:e.game_detail.subjectTitle})}))},getGamePlayers:function(t){var a=this;this.api._get("subject/players/".concat(t),{},(function(t){a.game_user=t.data,a.game_user.length>5?a.game_user_part=t.data.slice(0,5):a.game_user_part=t.data}))},tabAct:function(t){t!=this.tab_act&&(this.tab_act=t)},jumpList:function(){var a={subjectId:this.game_detail.subjectId,logo:this.game_detail.logoUrl,subjectTitle:this.game_detail.subjectTitle,introduction:this.game_detail.introduction};t.setStorageSync("gameMsg",JSON.stringify(a)),t.navigateTo({url:"/pages/publish/publishNotice"})}}};a.default=e}).call(this,e("543d")["default"])},a35c:function(t,a,e){"use strict";(function(t){e("21be");n(e("66fd"));var a=n(e("5b9a"));function n(t){return t&&t.__esModule?t:{default:t}}t(a.default)}).call(this,e("543d")["createPage"])},a4f6:function(t,a,e){"use strict";var n,i=function(){var t=this,a=t.$createElement;t._self._c},c=[];e.d(a,"b",(function(){return i})),e.d(a,"c",(function(){return c})),e.d(a,"a",(function(){return n}))}},[["a35c","common/runtime","common/vendor"]]]);
>>>>>>> masterCopy
=======
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Introduction/gameDetail"],{"50c3":function(t,e,a){"use strict";a.r(e);var n=a("97cc"),i=a.n(n);for(var c in n)"default"!==c&&function(t){a.d(e,t,(function(){return n[t]}))}(c);e["default"]=i.a},"5b9a":function(t,e,a){"use strict";a.r(e);var n=a("cae1"),i=a("50c3");for(var c in i)"default"!==c&&function(t){a.d(e,t,(function(){return i[t]}))}(c);a("70ff"),a("70af");var u,s=a("f0c5"),r=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"74ee1f01",null,!1,n["a"],u);e["default"]=r.exports},"5cf4":function(t,e,a){},"70af":function(t,e,a){"use strict";var n=a("c0f7"),i=a.n(n);i.a},"70ff":function(t,e,a){"use strict";var n=a("5cf4"),i=a.n(n);i.a},"97cc":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{tab_act:0,game_detail:"",game_user:[],game_user_part:[],tab_msg:["详情","参赛选手"],hasBtn:!1}},onLoad:function(t){this.btnStyle(),this.getGameDetail(t.subjectId),this.getGamePlayers(t.subjectId)},methods:{btnStyle:function(){var t=this;this.api._get("parame/config/uploadArticle",{},(function(e){console.log("res 报名按钮",e),1==e.data.parameStatus?t.hasBtn=!0:t.hasBtn=!1}))},getGameDetail:function(e){var a=this;this.api._get("subject/".concat(e),{},(function(e){a.game_detail=e.data,t.setNavigationBarTitle({title:a.game_detail.subjectTitle})}))},getGamePlayers:function(t){var e=this;this.api._get("subject/players/".concat(t),{},(function(t){e.game_user=t.data,e.game_user.length>5?e.game_user_part=t.data.slice(0,5):e.game_user_part=t.data}))},tabAct:function(t){t!=this.tab_act&&(this.tab_act=t)},jumpList:function(){var e={subjectId:this.game_detail.subjectId,logo:this.game_detail.logoUrl,subjectTitle:this.game_detail.subjectTitle,introduction:this.game_detail.introduction};t.setStorageSync("gameMsg",JSON.stringify(e)),t.switchTab({url:"/pages/publish/publishNotice"})}}};e.default=a}).call(this,a("543d")["default"])},a35c:function(t,e,a){"use strict";(function(t){a("21be");n(a("66fd"));var e=n(a("5b9a"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},c0f7:function(t,e,a){},cae1:function(t,e,a){"use strict";var n,i=function(){var t=this,e=t.$createElement;t._self._c},c=[];a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return c})),a.d(e,"a",(function(){return n}))}},[["a35c","common/runtime","common/vendor"]]]);
>>>>>>> master
=======
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Introduction/gameDetail"],{"39fd":function(t,e,a){"use strict";var n=a("bf61"),i=a.n(n);i.a},"50c3":function(t,e,a){"use strict";a.r(e);var n=a("97cc"),i=a.n(n);for(var c in n)"default"!==c&&function(t){a.d(e,t,(function(){return n[t]}))}(c);e["default"]=i.a},"58e9":function(t,e,a){"use strict";var n,i=function(){var t=this,e=t.$createElement;t._self._c},c=[];a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return c})),a.d(e,"a",(function(){return n}))},"5b9a":function(t,e,a){"use strict";a.r(e);var n=a("58e9"),i=a("50c3");for(var c in i)"default"!==c&&function(t){a.d(e,t,(function(){return i[t]}))}(c);a("70ff"),a("39fd");var u,s=a("f0c5"),r=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"853fb404",null,!1,n["a"],u);e["default"]=r.exports},"5cf4":function(t,e,a){},"70ff":function(t,e,a){"use strict";var n=a("5cf4"),i=a.n(n);i.a},"97cc":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{tab_act:0,game_detail:"",game_user:[],game_user_part:[],tab_msg:["详情","参赛选手"],hasBtn:!1}},onLoad:function(t){this.btnStyle(),this.getGameDetail(t.subjectId),this.getGamePlayers(t.subjectId)},methods:{btnStyle:function(){var t=this;this.api._get("parame/config/uploadArticle",{},(function(e){console.log("res 报名按钮",e),1==e.data.parameStatus?t.hasBtn=!0:t.hasBtn=!1}))},getGameDetail:function(e){var a=this;this.api._get("subject/".concat(e),{},(function(e){a.game_detail=e.data,t.setNavigationBarTitle({title:a.game_detail.subjectTitle})}))},getGamePlayers:function(t){var e=this;this.api._get("subject/players/".concat(t),{},(function(t){e.game_user=t.data,e.game_user.length>5?e.game_user_part=t.data.slice(0,5):e.game_user_part=t.data}))},tabAct:function(t){t!=this.tab_act&&(this.tab_act=t)},jumpList:function(){var e={subjectId:this.game_detail.subjectId,logo:this.game_detail.logoUrl,subjectTitle:this.game_detail.subjectTitle,introduction:this.game_detail.introduction};t.setStorageSync("gameMsg",JSON.stringify(e)),t.switchTab({url:"/pages/publish/publishNotice"})}}};e.default=a}).call(this,a("543d")["default"])},a35c:function(t,e,a){"use strict";(function(t){a("21be");n(a("66fd"));var e=n(a("5b9a"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},bf61:function(t,e,a){}},[["a35c","common/runtime","common/vendor"]]]);
>>>>>>> master

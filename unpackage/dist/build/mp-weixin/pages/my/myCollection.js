(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/myCollection"],{"3af1":function(t,n,e){"use strict";e.r(n);var o=e("c878"),i=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);n["default"]=i.a},6374:function(t,n,e){"use strict";var o,i=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return o}))},"64bb":function(t,n,e){"use strict";var o=function(t){t.options.wxsCallMethods||(t.options.wxsCallMethods=[])};n["a"]=o},"70d3":function(t,n,e){"use strict";var o=e("8d19"),i=e.n(o);i.a},"8d19":function(t,n,e){},"95f9":function(t,n,e){"use strict";(function(t){e("21be");o(e("66fd"));var n=o(e("f0e4"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},c878:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{pageNum:1,uname:"",uimg:"",btnShow:!1,colSumList:[],operList:[],indexList:[],nextpage:!1}},onLoad:function(){this.uname=t.getStorageSync("user_name"),this.uimg=t.getStorageSync("user_img")},onShow:function(){this.getData()},onPullDownRefresh:function(){console.log("下拉刷新"),this.getData(),setTimeout((function(){t.stopPullDownRefresh()}),0)},onReachBottom:function(){console.log("上拉加载"),this.nextpage&&this.getData()},methods:{getData:function(){var t=this;this.api._get("collection/list",{pageNum:this.pageNum,pageSize:10},(function(n){var e=n.data;console.log("val",e),t.colSumList=t.colSumList.concat(e.itemList),10==t.colSumList.length?(t.pageNum++,t.nextpage=!0):t.nextpage=!1}))},clickOper:function(t){this.btnShow||console.log("点击操作 e",t)},jumpDetail:function(n){if(this.btnShow)return console.log("e",n),void this.indexList.push(n.currentTarget.dataset.index);var e=n.currentTarget.dataset.item;e.conversation?t.navigateTo({url:"/pages/playVideo/playVideo?item="+encodeURIComponent(JSON.stringify(e))}):e.content?t.navigateTo({url:"/pages/playVideo/txtDetail?txtId=".concat(e.id)}):e.goodsDescribe&&t.navigateTo({url:"/pages/playVideo/usedDetail?usedId=".concat(e.id)}),console.log("跳转到详情页进行查看")},tapChange:function(){this.btnShow=!this.btnShow,this.btnShow||(this.operList=[],this.indexList=[])},checkboxChange:function(t){console.log("用户进行选择 多选",t),this.operList=t.detail.value.join(",")},del:function(){var t=this;this.api._del("collection?ids=".concat(this.operList),{},(function(n){console.log("删除成功",n.data),t.indexList.forEach((function(n){t.colSumList.splice(n,1)})),t.indexList=[]}))},clear:function(){var t=this;this.api._del("collection/all",{},(function(n){console.log("清空",n.data),t.colSumList=[]}))}}};n.default=e}).call(this,e("543d")["default"])},f0e4:function(t,n,e){"use strict";e.r(n);var o=e("6374"),i=e("3af1");for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);e("70d3");var c,s=e("f0c5"),u=e("64bb"),l=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,"244dbfca",null,!1,o["a"],c);"function"===typeof u["a"]&&Object(u["a"])(l),n["default"]=l.exports}},[["95f9","common/runtime","common/vendor"]]]);
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/myCollection"],{"3af1":function(t,e,n){"use strict";n.r(e);var o=n("c878"),i=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=i.a},"64bb":function(t,e,n){"use strict";var o=function(t){t.options.wxsCallMethods||(t.options.wxsCallMethods=[])};e["a"]=o},"8f9d":function(t,e,n){},"95f9":function(t,e,n){"use strict";(function(t){n("21be");o(n("66fd"));var e=o(n("f0e4"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},b64b:function(t,e,n){"use strict";var o,i=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return o}))},c878:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{pageNum:1,uname:"",uimg:"",btnShow:!1,colSumList:[],operList:[],nextpage:!1}},onLoad:function(){this.uname=t.getStorageSync("user_name"),this.uimg=t.getStorageSync("user_img"),this.getData()},onShow:function(){},onReachBottom:function(){this.nextpage&&this.getData()},methods:{getData:function(){var t=this;this.api._get("collection/list",{pageNum:this.pageNum,pageSize:10},(function(e){var n=e.data;t.colSumList=t.colSumList.concat(n.itemList),10==t.colSumList.length?(t.pageNum++,t.nextpage=!0):t.nextpage=!1}))},jumpDetail:function(e){if(this.btnShow)console.log("e",e);else{var n=e.currentTarget.dataset.item;n.conversation?t.navigateTo({url:"/pages/playVideo/playVideo?item="+encodeURIComponent(JSON.stringify(n))}):n.content?t.navigateTo({url:"/pages/playVideo/txtDetail?txtId=".concat(n.id)}):n.goodsDescribe&&t.navigateTo({url:"/pages/playVideo/usedDetail?usedId=".concat(n.id)})}},tapChange:function(){this.btnShow=!this.btnShow,this.btnShow||(this.operList=[])},checkboxChange:function(t){this.operList=t.detail.value},del:function(){var t=this;this.api._del("collection?ids=".concat(this.operList.join(",")),{},(function(e){for(var n=function(e){t.colSumList.forEach((function(n,o){console.log("item",n),n.collectionId==t.operList[e]&&t.colSumList.splice(o,1)}))},o=0;o<t.operList.length;o++)n(o);t.operList=[]}))},clear:function(){var e=this;t.showModal({title:"确定清空记录?",success:function(t){t.confirm?e.api._del("collection/all",{},(function(t){console.log("清空",t.data),e.colSumList=[],e.operList=[]})):t.cancel&&console.log("用户点击取消")}})}}};e.default=n}).call(this,n("543d")["default"])},f0e4:function(t,e,n){"use strict";n.r(e);var o=n("b64b"),i=n("3af1");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("fed9");var c,u=n("f0c5"),s=n("64bb"),l=Object(u["a"])(i["default"],o["b"],o["c"],!1,null,"894c4982",null,!1,o["a"],c);"function"===typeof s["a"]&&Object(s["a"])(l),e["default"]=l.exports},fed9:function(t,e,n){"use strict";var o=n("8f9d"),i=n.n(o);i.a}},[["95f9","common/runtime","common/vendor"]]]);
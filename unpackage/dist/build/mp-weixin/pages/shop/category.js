(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shop/category"],{"1b41":function(t,e,a){"use strict";var o,i=function(){var t=this,e=t.$createElement;t._self._c},n=[];a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return n})),a.d(e,"a",(function(){return o}))},"239d":function(t,e,a){"use strict";var o=a("d4c3"),i=a.n(o);i.a},4071:function(t,e,a){"use strict";a.r(e);var o=a("1b41"),i=a("f39b");for(var n in i)"default"!==n&&function(t){a.d(e,t,(function(){return i[t]}))}(n);a("239d");var r,s=a("f0c5"),c=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);e["default"]=c.exports},"897a":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={data:function(){return{navList:[],goodsList:[],id:0,currentCategory:{},scrollLeft:0,scrollTop:0,scrollHeight:0,page:1,size:10,totalPages:1}},onLoad:function(t){var e=this;t.id&&(e.id=parseInt(t.id)),wx.getSystemInfo({success:function(t){e.scrollHeight=t.windowHeight}}),this.getCategoryInfo()},onReachBottom:function(){if(!(this.totalPages>this.page))return wx.showToast({title:"已经到底了!",icon:"none",duration:2e3}),!1;this.page=this.page+1,this.getGoodsList()},methods:{getCategoryInfo:function(){var t=this;this._get("goods/category",{id:this.id},(function(e){if(0==e.errno){t.navList=e.data.brotherCategory,t.currentCategory=e.data.currentCategory,wx.setNavigationBarTitle({title:e.data.parentCategory.name}),e.data.parentCategory.id==t.id&&(t.id=e.data.currentCategory.id);for(var a=0,o=t.navList.length,i=0;i<o;i++)if(a+=1,t.navList[i].id==t.id)break;a>o/2&&o>5&&(t.scrollLeft=60*a),t.getGoodsList()}}))},getGoodsList:function(){var t=this;this._get("goods/list",{categoryId:t.id,page:t.page,size:t.size},(function(e){t.goodsList=t.goodsList.concat(e.data.goodsList),t.totalPages=e.data.totalPages}))},switchCate:function(t){if(this.id==t.currentTarget.dataset.id)return!1;var e=this,a=t.detail.x,o=t.currentTarget;a<60?e.scrollLeft=o.offsetLeft-60:a>330&&(e.scrollLeft=o.offsetLeft),this.id=t.currentTarget.dataset.id,this.goodsList=[],this.page=1,this.totalPages=1,this.getCategoryInfo()}}};e.default=o},ab7d:function(t,e,a){"use strict";(function(t){a("21be");o(a("66fd"));var e=o(a("4071"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},d4c3:function(t,e,a){},f39b:function(t,e,a){"use strict";a.r(e);var o=a("897a"),i=a.n(o);for(var n in o)"default"!==n&&function(t){a.d(e,t,(function(){return o[t]}))}(n);e["default"]=i.a}},[["ab7d","common/runtime","common/vendor"]]]);
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/myData/myConsumption"],{"2ed0":function(t,e,n){},3281:function(t,e,n){"use strict";n.r(e);var i=n("e986"),a=n("d72b");for(var s in a)"default"!==s&&function(t){n.d(e,t,(function(){return a[t]}))}(s);n("3c0d");var o,u=n("f0c5"),d=Object(u["a"])(a["default"],i["b"],i["c"],!1,null,"ecde3d76",null,!1,i["a"],o);e["default"]=d.exports},"3c0d":function(t,e,n){"use strict";var i=n("2ed0"),a=n.n(i);a.a},"88f8":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=function(){n.e("components/swiper-tab-head").then(function(){return resolve(n("5601"))}.bind(null,n)).catch(n.oe)},a={data:function(){return{tabIndex:0,tabBars:[{name:"获取记录",id:"0"},{name:"消费记录",id:"1"}],hisList:[],g_pageNum:1,d_pageNum:1,nextpage:!1}},components:{swiperTabHead:i},onLoad:function(){this.getHgold()},onReachBottom:function(){this.nextpage&&(0==this.tabIndex?this.getHgold():this.delHgold())},methods:{tabtap:function(t){t!==this.tabIndex&&(this.tabIndex=t,this.g_pageNum=1,this.d_pageNum=1,this.hisList=[],"0"==this.tabBars[this.tabIndex].id?this.getHgold():"1"==this.tabBars[this.tabIndex].id&&this.delHgold())},getHgold:function(){var t=this;this.api._get("hgold/get/list",{pageNum:this.g_pageNum,pageSize:10},(function(e){t.hisList=t.hisList.concat(e.data.list),10==e.data.list?(t.g_pageNum++,t.nextpage=!0):t.nextpage=!1}))},delHgold:function(){var t=this;this.api._get("hgold/lose/list",{pageNum:this.d_pageNum,pageSize:10},(function(e){t.hisList=t.hisList.concat(e.list),10==e.list.length?(t.d_pageNum++,t.nextpage=!0):t.nextpage=!1}))}}};e.default=a},d72b:function(t,e,n){"use strict";n.r(e);var i=n("88f8"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);e["default"]=a.a},e986:function(t,e,n){"use strict";var i,a=function(){var t=this,e=t.$createElement;t._self._c},s=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return i}))},eeff:function(t,e,n){"use strict";(function(t){n("21be");i(n("66fd"));var e=i(n("3281"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["eeff","common/runtime","common/vendor"]]]);
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Introduction/Introduction"],{"09cd":function(t,a,i){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i={data:function(){return{pageNum:1,nextpage:!1,tab_act:1,tab_list:["即将开始","进行中","已结束"],game_list:[],game_type:[],value:0,id:"",ad:""}},onReachBottom:function(){console.log("上拉加载");var t=1;this.nextpage&&(0==this.tab_act?this.noStart(this.id,t):1==this.tab_act?this.proceed(this.id,t):2==this.tab_act&&this.end(this.id,t))},onLoad:function(){var t=this;this.api._get("subject/type",{},(function(a){t.game_type=[{id:"",typeName:"全部"}].concat(a.data)})),this.proceed(""),this.getAd()},methods:{getAd:function(){var t=this;this.api._get("subject/ads",{},(function(a){t.ad=a.data}))},bindPickerChange:function(t){this.value=t.detail.value,this.id=this.game_type[t.detail.value].id,0==this.tab_act?this.noStart(this.id):1==this.tab_act?this.proceed(this.id):2==this.tab_act&&this.end(this.id)},golist:function(a){t.switchTab({url:"/pages/list/list"});var i={subjectId:this.game_list[a].subjectId,logo:this.game_list[a].logoUrl,subjectTitle:this.game_list[a].subjectTitle,introduction:this.game_list[a].introduction};t.setStorageSync("gameMsg",JSON.stringify(i))},hot:function(t){t!==this.tab_act&&(this.tab_act=t,0==this.tab_act?this.noStart(this.id):1==this.tab_act?this.proceed(this.id):2==this.tab_act&&this.end(this.id))},noStart:function(t,a){var i=this;this.api._get("subject/notStart",{subjectTypeId:t||"",pageNum:this.pageNum,pageSize:10},(function(t){i.game_list=1==a?i.game_list.concat(t.data.list):t.data.list,10==t.data.list?(i.pageNum++,i.nextpage=!0):i.nextpage=!1}))},proceed:function(a,i){var e=this;this.api._get("subject/onGoing",{subjectTypeId:a||"",pageNum:this.pageNum,pageSize:10},(function(a){e.game_list=1==i?e.game_list.concat(a.data.list):a.data.list;var n={subjectId:a.data.list[0].subjectId,logo:a.data.list[0].logoUrl,subjectTitle:a.data.list[0].subjectTitle,introduction:a.data.list[0].introduction};t.setStorageSync("gameMsg",JSON.stringify(n)),10==a.data.list?(e.pageNum++,e.nextpage=!0):e.nextpage=!1}))},end:function(t,a){var i=this;this.api._get("subject/finished",{subjectTypeId:t||"",pageNum:this.pageNum,pageSize:10},(function(t){i.game_list=1==a?i.game_list.concat(t.data.list):t.data.list,10==t.data.list?(i.pageNum++,i.nextpage=!0):i.nextpage=!1}))}}};a.default=i}).call(this,i("543d")["default"])},"11ff":function(t,a,i){},"123b":function(t,a,i){},"1f37":function(t,a,i){"use strict";var e=i("11ff"),n=i.n(e);n.a},"2a7a":function(t,a,i){"use strict";i.r(a);var e=i("09cd"),n=i.n(e);for(var s in e)"default"!==s&&function(t){i.d(a,t,(function(){return e[t]}))}(s);a["default"]=n.a},"6ed8":function(t,a,i){"use strict";i.r(a);var e=i("ac5e"),n=i("2a7a");for(var s in n)"default"!==s&&function(t){i.d(a,t,(function(){return n[t]}))}(s);i("1f37"),i("9792");var c,u=i("f0c5"),o=Object(u["a"])(n["default"],e["b"],e["c"],!1,null,"9074c174",null,!1,e["a"],c);a["default"]=o.exports},"80b4":function(t,a,i){"use strict";(function(t){i("21be");e(i("66fd"));var a=e(i("6ed8"));function e(t){return t&&t.__esModule?t:{default:t}}t(a.default)}).call(this,i("543d")["createPage"])},9792:function(t,a,i){"use strict";var e=i("123b"),n=i.n(e);n.a},ac5e:function(t,a,i){"use strict";var e,n=function(){var t=this,a=t.$createElement;t._self._c},s=[];i.d(a,"b",(function(){return n})),i.d(a,"c",(function(){return s})),i.d(a,"a",(function(){return e}))}},[["80b4","common/runtime","common/vendor"]]]);
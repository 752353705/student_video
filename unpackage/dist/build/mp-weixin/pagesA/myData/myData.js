(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/myData/myData"],{"318f":function(n,t,e){},4280:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(){e.e("components/min-picker/min-popup").then(function(){return resolve(e("35fc"))}.bind(null,e)).catch(e.oe)},i=function(){e.e("components/min-picker/min-picker").then(function(){return resolve(e("303b"))}.bind(null,e)).catch(e.oe)},u={data:function(){return{startTime:[1940,1,1],endTime:[2020],show:!1,userInfo:"",time:"暂无",value:0}},components:{minPopup:o,minPicker:i},onLoad:function(){},onShow:function(){this.getUsInfo()},methods:{cancel:function(){this.close()},sure:function(n){n.a?this.userInfo.birthday=n.a+"-"+n.b+"-"+n.c:this.userInfo.birthday=this.startTime[0]+"-"+n.b+"-"+n.c,this.http({url:"user",method:"PUT",data:{birthday:this.userInfo.birthday}})},showPop:function(){this.show=!0},close:function(){this.show=!1},getUsInfo:function(){var t=this;n.getStorageSync("token")&&this.http({url:"user/info"}).then((function(n){t.userInfo=n.data}))},changName:function(){n.navigateTo({url:"/pagesA/myData/myName?name="+this.userInfo.userName})},changIntro:function(){n.navigateTo({url:"/pagesA/myData/myIntroduction?personalProfile="+this.userInfo.personalProfile})},changGender:function(){n.navigateTo({url:"/pagesA/myData/myGender?gender="+this.userInfo.gender})}}};t.default=u}).call(this,e("543d")["default"])},"6ac5":function(n,t,e){"use strict";var o={minPopup:function(){return e.e("components/min-popup/min-popup").then(e.bind(null,"d2d7"))},minPicker:function(){return e.e("components/min-picker/min-picker").then(e.bind(null,"303b"))}},i=function(){var n=this,t=n.$createElement;n._self._c},u=[];e.d(t,"b",(function(){return i})),e.d(t,"c",(function(){return u})),e.d(t,"a",(function(){return o}))},"747c":function(n,t,e){"use strict";e.r(t);var o=e("4280"),i=e.n(o);for(var u in o)"default"!==u&&function(n){e.d(t,n,(function(){return o[n]}))}(u);t["default"]=i.a},"94c0":function(n,t,e){"use strict";e.r(t);var o=e("6ac5"),i=e("747c");for(var u in i)"default"!==u&&function(n){e.d(t,n,(function(){return i[n]}))}(u);e("fc39");var c,r=e("f0c5"),a=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,"9b6600be",null,!1,o["a"],c);t["default"]=a.exports},f15c:function(n,t,e){"use strict";(function(n){e("21be");o(e("66fd"));var t=o(e("94c0"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},fc39:function(n,t,e){"use strict";var o=e("318f"),i=e.n(o);i.a}},[["f15c","common/runtime","common/vendor"]]]);
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/setting"],{"4e9f":function(n,e,o){"use strict";var t,a=function(){var n=this,e=n.$createElement,o=(n._self._c,n.user_phone.slice(0,3)),t=n.user_phone.slice(7);n.$mp.data=Object.assign({},{$root:{g0:o,g1:t}})},i=[];o.d(e,"b",(function(){return a})),o.d(e,"c",(function(){return i})),o.d(e,"a",(function(){return t}))},"6fc6":function(n,e,o){"use strict";var t=o("d06f"),a=o.n(t);a.a},"7b10":function(n,e,o){"use strict";(function(n){o("21be");t(o("66fd"));var e=t(o("ce5b"));function t(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,o("543d")["createPage"])},"7d10":function(n,e,o){"use strict";o.r(e);var t=o("b6ff"),a=o.n(t);for(var i in t)"default"!==i&&function(n){o.d(e,n,(function(){return t[n]}))}(i);e["default"]=a.a},b6ff:function(n,e,o){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={data:function(){return{is_IOS:!1,userInfo:"",user_phone:"",useList:[{icon:"iconweibiaoti--",txt:"个人资料"},{icon:"iconzu",txt:"H币"},{icon:"iconIcon",txt:"充值"},{icon:"iconwodeshoucang",txt:"我的收藏"},{icon:"iconliulanjilu-tianchong",txt:"浏览记录"},{icon:"icontuichudenglu",txt:"退出登录"}]}},components:{},onLoad:function(){this.getPhoneType()},onShow:function(){this.user_phone=n.getStorageSync("user_phone"),this.getUsInfo()},methods:{getPhoneType:function(){switch(n.getSystemInfoSync().platform){case"android":console.log("运行Android上");break;case"ios":console.log("运行iOS上"),this.is_IOS=!0;break;default:console.log("运行在开发者工具上");break}},jump:function(){console.log("跳转页面"),n.navigateTo({url:"/pages/login/login"})},getUsInfo:function(){var e=this;n.getStorageSync("token")&&this.api._get("user/info",{},(function(n){console.log("获取用户当前的 H币",n),e.userInfo=n.data}))},open:function(e){var o=this;this.user_phone?0===e?n.navigateTo({url:"/pages/myData/myData"}):1===e?n.navigateTo({url:"/pages/my/myWallet"}):2===e?n.navigateTo({url:"/pages/recharge/recharge?money=".concat(this.userInfo.goldNumber,"&userId=").concat(this.userInfo.userId)}):5===e?n.showModal({title:"提示",content:"确定退出吗",success:function(e){e.confirm?o.api._post("auth/logout",{},(function(e){o.userInfo.userName="",o.userInfo.avatarUrl="/static/avatarUrl.png",o.user_phone="",n.removeStorageSync("user_name"),n.removeStorageSync("user_img"),n.removeStorageSync("token"),n.removeStorageSync("user_phone")})):e.cancel},fail:function(){console.log("调用接口失败")}}):3===e?n.navigateTo({url:"/pages/my/myCollection"}):4===e?n.navigateTo({url:"/pages/my/myHistory"}):6===e&&n.navigateTo({url:"/pages/my/myRun"}):n.navigateTo({url:"/pages/login/login"})}}};e.default=o}).call(this,o("543d")["default"])},ce5b:function(n,e,o){"use strict";o.r(e);var t=o("4e9f"),a=o("7d10");for(var i in a)"default"!==i&&function(n){o.d(e,n,(function(){return a[n]}))}(i);o("6fc6");var c,u=o("f0c5"),r=Object(u["a"])(a["default"],t["b"],t["c"],!1,null,"9d858052",null,!1,t["a"],c);e["default"]=r.exports},d06f:function(n,e,o){}},[["7b10","common/runtime","common/vendor"]]]);
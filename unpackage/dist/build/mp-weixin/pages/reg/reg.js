(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/reg/reg"],{"206f":function(e,n,t){},2825:function(e,n,t){"use strict";var o,a=function(){var e=this,n=e.$createElement;e._self._c},u=[];t.d(n,"b",(function(){return a})),t.d(n,"c",(function(){return u})),t.d(n,"a",(function(){return o}))},"7de8":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={data:function(){return{}},methods:{seekWord:function(){console.log("忘记密码"),e.navigateTo({url:"/pages/seekWord/seekWord"})},signIn:function(){console.log("进行用户注册"),e.navigateTo({url:"/pages/signIn/signIn"})},formSubmit:function(n){return console.log("e",n.detail.value),n.detail.value.username?n.detail.value.password?void this._post("auth/login",{username:n.detail.value.username,password:n.detail.value.password},(function(n){console.log("用户进行登录",n),wx.setStorageSync("token",n.data.token),wx.setStorageSync("user_img",n.data.avatarUrl),wx.setStorageSync("user_name",n.data.nickName),wx.setStorageSync("user_phone",n.data.phone),wx.setStorageSync("token",n.data.token),e.navigateBack({delta:2})})):e.showToast({title:"请填入密码",icon:"none",duration:2e3}):e.showToast({title:"请填入用户名",icon:"none",duration:2e3})},formReset:function(e){console.log("清空数据")}}};n.default=t}).call(this,t("543d")["default"])},"8b53":function(e,n,t){"use strict";t.r(n);var o=t("7de8"),a=t.n(o);for(var u in o)"default"!==u&&function(e){t.d(n,e,(function(){return o[e]}))}(u);n["default"]=a.a},b4b5:function(e,n,t){"use strict";t.r(n);var o=t("2825"),a=t("8b53");for(var u in a)"default"!==u&&function(e){t.d(n,e,(function(){return a[e]}))}(u);t("f4db");var r,i=t("f0c5"),s=Object(i["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);n["default"]=s.exports},de33:function(e,n,t){"use strict";(function(e){t("21be");o(t("66fd"));var n=o(t("b4b5"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},f4db:function(e,n,t){"use strict";var o=t("206f"),a=t.n(o);a.a}},[["de33","common/runtime","common/vendor"]]]);
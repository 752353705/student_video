(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/my"],{"01b4":function(e,n,o){"use strict";var t=o("25fe"),i=o.n(t);i.a},"0c8a":function(e,n,o){"use strict";o.r(n);var t=o("5378"),i=o.n(t);for(var s in t)"default"!==s&&function(e){o.d(n,e,(function(){return t[e]}))}(s);n["default"]=i.a},"25fe":function(e,n,o){},5378:function(e,n,o){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t=i(o("6bae"));function i(e){return e&&e.__esModule?e:{default:e}}var s=function(){Promise.all([o.e("common/vendor"),o.e("components/mescroll-swiper-item")]).then(function(){return resolve(o("8704"))}.bind(null,o)).catch(o.oe)},r=function(){Promise.all([o.e("common/vendor"),o.e("components/uni-popup/uni-popup-useoperation")]).then(function(){return resolve(o("2c50"))}.bind(null,o)).catch(o.oe)},u=function(){o.e("components/swiper-tab-head").then(function(){return resolve(o("5601"))}.bind(null,o)).catch(o.oe)},a={mixins:[t.default],data:function(){return{showsigin:!1,mescrollBot:"200",userInfo:{likes:0,gender:0,personalProfile:""},opertop:"300rpx",operleft:"100rpx",txtid:"",swiper_height:"",tabIndex:0,tabBars:[{name:"图文",id:"myTxt"}],kw:"myTxt",act:0,user_phone:"",column:"",row:"",showNum:1}},components:{swiperTabHead:u,MescrollItem:s,uniPopupUseoperation:r},onLoad:function(){this.swiper_height=e.getSystemInfoSync().windowHeight-20+"px"},onShow:function(){this.user_phone=e.getStorageSync("user_phone"),this.getUsInfo(),e.getStorageSync("token")?this.showsigin=!0:this.showsigin=!1,1!=this.showNum?(console.log("进行下拉更新"),this.$refs.mescroll.refash()):this.showNum=2},onHide:function(){this.$refs.popup_useoperation.close()},methods:{myDelArticle:function(){this.$refs.mescroll.swiperDelArticle(this.txtid),this.$refs.mescroll.refash()},goSetting:function(){e.navigateTo({url:"/pages/my/setting"})},getUsInfo:function(){var n=this;e.getStorageSync("token")&&this.api._get("user/info",{},(function(e){console.log("获取用户当前的 H币",e),n.userInfo=e.data}))},sigin:function(){console.log("进行签到"),e.navigateTo({url:"/pages/my/mySigin"})},showSigin:function(){this.$refs.popup_sigin.close()},showUseroperation:function(e,n){console.log("显示"),this.opertop=JSON.parse(n).btntop,this.operleft=JSON.parse(n).btnleft,this.txtid=e,this.$refs.popup_useoperation.open()},closeUseroperation:function(){console.log("关闭"),this.$refs.popup_useoperation.close()},goFans:function(n){1==n?(console.log("跳转到 关注列表"),e.navigateTo({url:"/pages/my/myFocus"})):2==n&&(console.log("跳转到 粉丝列表"),e.navigateTo({url:"/pages/my/myFans"}))},tabChange:function(e){this.tabIndex=e.detail.current,this.kw=this.tabBars[this.tabIndex].id},tabtap:function(e){this.tabIndex=e,this.kw=this.tabBars[this.tabIndex].id},close:function(e){this.$refs.popup_user.close()},jump:function(){console.log("跳转页面"),e.navigateTo({url:"/pages/login/login"})}}};n.default=a}).call(this,o("543d")["default"])},"8ccf":function(e,n,o){"use strict";var t={uniPopup:function(){return Promise.all([o.e("common/vendor"),o.e("components/uni-popup/uni-popup")]).then(o.bind(null,"f48e"))}},i=function(){var e=this,n=e.$createElement,o=(e._self._c,e.user_phone.slice(0,3)),t=e.user_phone.slice(7);e.$mp.data=Object.assign({},{$root:{g0:o,g1:t}})},s=[];o.d(n,"b",(function(){return i})),o.d(n,"c",(function(){return s})),o.d(n,"a",(function(){return t}))},aae8:function(e,n,o){"use strict";o.r(n);var t=o("8ccf"),i=o("0c8a");for(var s in i)"default"!==s&&function(e){o.d(n,e,(function(){return i[e]}))}(s);o("01b4");var r,u=o("f0c5"),a=Object(u["a"])(i["default"],t["b"],t["c"],!1,null,"1eeb355c",null,!1,t["a"],r);n["default"]=a.exports},f23a:function(e,n,o){"use strict";(function(e){o("21be");t(o("66fd"));var n=t(o("aae8"));function t(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,o("543d")["createPage"])}},[["f23a","common/runtime","common/vendor"]]]);
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/recharge/pay"],{"0e13":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{userId:"",fee:"",hGold:"",orderCode:""}},onLoad:function(e){this.userId=e.userId,this.fee=e.fee,this.hGold=e.hGold},methods:{oderPay:function(){var t=this;this.api._post("user/prepay?userId=".concat(this.userId,"&fee=").concat(this.fee,"&hGold=").concat(this.hGold),{},(function(n){console.log("测试支付",n.data),t.orderCode=n.data.orderCode,e.requestPayment({provider:"wxpay",timeStamp:n.data.payResult.timeStamp,nonceStr:n.data.payResult.nonceStr,package:n.data.payResult.packageValue,signType:n.data.payResult.signType,paySign:n.data.payResult.paySign,success:function(){console.log("支付接口成功 调用",n),e.requestSubscribeMessage({tmplIds:["lqaQsaedBYoH8lvRB7oGtConmMmO_AuJnG79RQ6CR0g"],success:function(e){"requestSubscribeMessage:ok"==e.errMsg?(console.log("用户订阅成功",t.orderCode),t.api._get("notify/wxPaymentMessage/".concat(t.orderCode),{},(function(e){console.log("订阅成功，再次调用接口",e)}))):console.log("用户订阅失败")}})},fail:function(e){console.log("fail:",e)}})}),(function(e){console.log("err",e)}))}}};t.default=n}).call(this,n("543d")["default"])},3824:function(e,t,n){"use strict";var o=n("4251"),a=n.n(o);a.a},4251:function(e,t,n){},"4a3b":function(e,t,n){"use strict";(function(e){n("21be");o(n("66fd"));var t=o(n("f183"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"92c4":function(e,t,n){"use strict";n.r(t);var o=n("0e13"),a=n.n(o);for(var u in o)"default"!==u&&function(e){n.d(t,e,(function(){return o[e]}))}(u);t["default"]=a.a},be84:function(e,t,n){"use strict";var o,a=function(){var e=this,t=e.$createElement;e._self._c},u=[];n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return o}))},f183:function(e,t,n){"use strict";n.r(t);var o=n("be84"),a=n("92c4");for(var u in a)"default"!==u&&function(e){n.d(t,e,(function(){return a[e]}))}(u);n("3824");var c,r=n("f0c5"),s=Object(r["a"])(a["default"],o["b"],o["c"],!1,null,"22327110",null,!1,o["a"],c);t["default"]=s.exports}},[["4a3b","common/runtime","common/vendor"]]]);
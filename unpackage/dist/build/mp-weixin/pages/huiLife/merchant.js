(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/huiLife/merchant"],{"09f0":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(){e.e("components/uni-popup/uni-popup-huicode").then(function(){return resolve(e("dcad"))}.bind(null,e)).catch(e.oe)},c={data:function(){return{photoList:["https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2668268226,1765897385&fm=26&gp=0.jpg","https://img.alicdn.com/imgextra/i3/2888462616/O1CN01ERra5J1VCAbZaKI5n_!!0-item_pic.jpg_430x430q90.jpg","https://gd3.alicdn.com/imgextra/i3/819381730/O1CN01YV4mXj1OeNhQIhQlh_!!819381730.jpg_400x400.jpg","https://img.alicdn.com/imgextra/i4/3470687433/O1CN0124mMQOSERr18L1h_!!3470687433.jpg_430x430q90.jpg"],hasCode:!1,codesrc:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2852594709,2202399704&fm=26&gp=0.jpg"}},components:{uniPopupHuicode:o},methods:{previewImage:function(t){console.log("图片预览",t.currentTarget.dataset.num);var e=t.currentTarget.dataset.num;n.previewImage({current:e,urls:this.photoList,loop:!0,longPressActions:!0})},getCode:function(){var t=this;n.showToast({title:"领取成功",icon:"none",success:function(){console.log("获取优惠码"),t.hasCode=!0}})},showCode:function(){this.$refs.popupHuicode.open()},callPhone:function(){n.makePhoneCall({phoneNumber:"15930245253"})}}};t.default=c}).call(this,e("543d")["default"])},"0d49":function(n,t,e){"use strict";var o={uniPopup:function(){return Promise.all([e.e("common/vendor"),e.e("components/uni-popup/uni-popup")]).then(e.bind(null,"f48e"))}},c=function(){var n=this,t=n.$createElement;n._self._c},u=[];e.d(t,"b",(function(){return c})),e.d(t,"c",(function(){return u})),e.d(t,"a",(function(){return o}))},4541:function(n,t,e){"use strict";(function(n){e("21be");o(e("66fd"));var t=o(e("6df7"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},"4e49":function(n,t,e){},"6df7":function(n,t,e){"use strict";e.r(t);var o=e("0d49"),c=e("f2c3");for(var u in c)"default"!==u&&function(n){e.d(t,n,(function(){return c[n]}))}(u);e("aac1"),e("79af");var i,a=e("f0c5"),r=Object(a["a"])(c["default"],o["b"],o["c"],!1,null,"4ed78621",null,!1,o["a"],i);t["default"]=r.exports},"72c5":function(n,t,e){},"79af":function(n,t,e){"use strict";var o=e("4e49"),c=e.n(o);c.a},aac1:function(n,t,e){"use strict";var o=e("72c5"),c=e.n(o);c.a},f2c3:function(n,t,e){"use strict";e.r(t);var o=e("09f0"),c=e.n(o);for(var u in o)"default"!==u&&function(n){e.d(t,n,(function(){return o[n]}))}(u);t["default"]=c.a}},[["4541","common/runtime","common/vendor"]]]);
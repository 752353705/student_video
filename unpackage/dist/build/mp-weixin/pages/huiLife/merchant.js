(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/huiLife/merchant"],{"09f0":function(t,n,o){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=i(o("61dc"));function i(t){return t&&t.__esModule?t:{default:t}}var c=function(){o.e("components/uni-popup/uni-popup-huicode").then(function(){return resolve(o("dcad"))}.bind(null,o)).catch(o.oe)},u={data:function(){return{companyId:"",store_msg:[],goodsList:[],store:e.default.store[0].data.poiList.poiInfos,photoList:["https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2668268226,1765897385&fm=26&gp=0.jpg","https://img.alicdn.com/imgextra/i3/2888462616/O1CN01ERra5J1VCAbZaKI5n_!!0-item_pic.jpg_430x430q90.jpg","https://gd3.alicdn.com/imgextra/i3/819381730/O1CN01YV4mXj1OeNhQIhQlh_!!819381730.jpg_400x400.jpg","https://img.alicdn.com/imgextra/i4/3470687433/O1CN0124mMQOSERr18L1h_!!3470687433.jpg_430x430q90.jpg"],hasCode:!1,codesrc:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2852594709,2202399704&fm=26&gp=0.jpg"}},components:{uniPopupHuicode:c},onLoad:function(t){this.companyId=t.companyId,this.getGoodsList(),this.getStoreMsg()},methods:{getGoodsList:function(){this.http({url:"product/list",data:{companyId:7}}).then((function(t){console.log("获取相应商家的商品 res",t)}))},getStoreMsg:function(){var t=this;this.http({url:"company/8"}).then((function(n){console.log("商家详情",n),t.store_msg=n.data}))},jumpGoodsDetail:function(){t.navigateTo({url:"/pages/huiLife/goodsDetail"})},previewImage:function(n){console.log("图片预览",n.currentTarget.dataset.num);var o=n.currentTarget.dataset.num;t.previewImage({current:o,urls:this.photoList,loop:!0,longPressActions:!0})},getCode:function(){var n=this;t.showToast({title:"领取成功",icon:"none",success:function(){console.log("获取优惠码"),n.hasCode=!0}})},showCode:function(){this.$refs.popupHuicode.open()},callPhone:function(){t.makePhoneCall({phoneNumber:"15930245253"})}}};n.default=u}).call(this,o("543d")["default"])},"32a4":function(t,n,o){"use strict";var e=o("ed71"),i=o.n(e);i.a},4541:function(t,n,o){"use strict";(function(t){o("21be");e(o("66fd"));var n=e(o("6df7"));function e(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,o("543d")["createPage"])},"6df7":function(t,n,o){"use strict";o.r(n);var e=o("9514"),i=o("f2c3");for(var c in i)"default"!==c&&function(t){o.d(n,t,(function(){return i[t]}))}(c);o("aac1"),o("32a4");var u,a=o("f0c5"),s=Object(a["a"])(i["default"],e["b"],e["c"],!1,null,"b8ed69fc",null,!1,e["a"],u);n["default"]=s.exports},"72c5":function(t,n,o){},9514:function(t,n,o){"use strict";var e={uniPopup:function(){return Promise.all([o.e("common/vendor"),o.e("components/uni-popup/uni-popup")]).then(o.bind(null,"f48e"))}},i=function(){var t=this,n=t.$createElement;t._self._c},c=[];o.d(n,"b",(function(){return i})),o.d(n,"c",(function(){return c})),o.d(n,"a",(function(){return e}))},aac1:function(t,n,o){"use strict";var e=o("72c5"),i=o.n(e);i.a},ed71:function(t,n,o){},f2c3:function(t,n,o){"use strict";o.r(n);var e=o("09f0"),i=o.n(e);for(var c in e)"default"!==c&&function(t){o.d(n,t,(function(){return e[t]}))}(c);n["default"]=i.a}},[["4541","common/runtime","common/vendor"]]]);
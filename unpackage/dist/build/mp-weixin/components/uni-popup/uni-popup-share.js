(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-popup/uni-popup-share"],{"1bf0":function(n,t,e){"use strict";var u,c=function(){var n=this,t=n.$createElement;n._self._c},i=[];e.d(t,"b",(function(){return c})),e.d(t,"c",(function(){return i})),e.d(t,"a",(function(){return u}))},"59ba":function(n,t,e){"use strict";var u=e("c3ec"),c=e.n(u);c.a},"67df":function(n,t,e){"use strict";e.r(t);var u=e("9541"),c=e.n(u);for(var i in u)"default"!==i&&function(n){e.d(t,n,(function(){return u[n]}))}(i);t["default"]=c.a},9541:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u={name:"UniPopupShare",props:{title:{type:String,default:"分享到"}},inject:["popup"],data:function(){return{bottomData:[{text:"微信",icon:"https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-2.png",name:"wx"},{text:"其他",icon:"https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-5.png",name:"more"}]}},created:function(){},methods:{setId:function(){},select:function(n,t){var e=this;console.log("点击了",n.name,t),this.$emit("select",{item:n,index:t},(function(){e.popup.close()}))},close:function(){this.popup.close()}}};t.default=u},c3ec:function(n,t,e){},daf5:function(n,t,e){"use strict";e.r(t);var u=e("1bf0"),c=e("67df");for(var i in c)"default"!==i&&function(n){e.d(t,n,(function(){return c[n]}))}(i);e("59ba");var o,a=e("f0c5"),r=Object(a["a"])(c["default"],u["b"],u["c"],!1,null,"1a290e4c",null,!1,u["a"],o);t["default"]=r.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-popup/uni-popup-share-create-component',
    {
        'components/uni-popup/uni-popup-share-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("daf5"))
        })
    },
    [['components/uni-popup/uni-popup-share-create-component']]
]);

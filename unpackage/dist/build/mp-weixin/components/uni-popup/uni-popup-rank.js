(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-popup/uni-popup-rank"],{"159a":function(t,n,e){"use strict";e.r(n);var u=e("8b1c"),a=e("ee6b");for(var c in a)"default"!==c&&function(t){e.d(n,t,(function(){return a[t]}))}(c);e("ec6c");var i,r=e("f0c5"),o=Object(r["a"])(a["default"],u["b"],u["c"],!1,null,"2e6f3a4a",null,!1,u["a"],i);n["default"]=o.exports},"4d51":function(t,n,e){},"8b1c":function(t,n,e){"use strict";var u,a=function(){var t=this,n=t.$createElement;t._self._c},c=[];e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return u}))},9420:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u={name:"UniPopupRank",props:{title:{type:String,default:"分享到"},articleId:{type:Number}},data:function(){return{giftRank:[]}},created:function(){var t=this;setTimeout((function(){console.log("articleId",t.articleId),t.getUserGift(t.articleId)}),0)},methods:{getUserGift:function(t){var n=this;this.api._get("gift/article/user/gift/".concat(t),{},(function(t){console.log("获取刷礼物 res",t),n.giftRank=t.data}))}}};n.default=u},ec6c:function(t,n,e){"use strict";var u=e("4d51"),a=e.n(u);a.a},ee6b:function(t,n,e){"use strict";e.r(n);var u=e("9420"),a=e.n(u);for(var c in u)"default"!==c&&function(t){e.d(n,t,(function(){return u[t]}))}(c);n["default"]=a.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-popup/uni-popup-rank-create-component',
    {
        'components/uni-popup/uni-popup-rank-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("159a"))
        })
    },
    [['components/uni-popup/uni-popup-rank-create-component']]
]);

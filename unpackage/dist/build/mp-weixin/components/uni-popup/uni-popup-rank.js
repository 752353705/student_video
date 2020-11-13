(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-popup/uni-popup-rank"],{"159a":function(t,n,e){"use strict";e.r(n);var c=e("41c2"),u=e("ee6b");for(var a in u)"default"!==a&&function(t){e.d(n,t,(function(){return u[t]}))}(a);e("ca83");var i,r=e("f0c5"),o=Object(r["a"])(u["default"],c["b"],c["c"],!1,null,"333ccbc6",null,!1,c["a"],i);n["default"]=o.exports},"41c2":function(t,n,e){"use strict";var c,u=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return c}))},9420:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var c={name:"UniPopupRank",props:{title:{type:String,default:"分享到"},articleId:{type:Number}},data:function(){return{giftRank:[]}},created:function(){var t=this;setTimeout((function(){console.log("articleId",t.articleId),t.getUserGift(t.articleId)}),0)},methods:{getUserGift:function(t){var n=this;this.api._get("gift/article/user/gift/".concat(t),{},(function(t){console.log("获取刷礼物 res",t),n.giftRank=t.data}))}}};n.default=c},b2d1:function(t,n,e){},ca83:function(t,n,e){"use strict";var c=e("b2d1"),u=e.n(c);u.a},ee6b:function(t,n,e){"use strict";e.r(n);var c=e("9420"),u=e.n(c);for(var a in c)"default"!==a&&function(t){e.d(n,t,(function(){return c[t]}))}(a);n["default"]=u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-popup/uni-popup-rank-create-component',
    {
        'components/uni-popup/uni-popup-rank-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("159a"))
        })
    },
    [['components/uni-popup/uni-popup-rank-create-component']]
]);

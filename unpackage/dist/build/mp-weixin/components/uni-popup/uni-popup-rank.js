(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-popup/uni-popup-rank"],{"159a":function(t,n,e){"use strict";e.r(n);var u=e("e791"),r=e("ee6b");for(var a in r)"default"!==a&&function(t){e.d(n,t,(function(){return r[t]}))}(a);e("22c0");var i,c=e("f0c5"),o=Object(c["a"])(r["default"],u["b"],u["c"],!1,null,"6a4ccff1",null,!1,u["a"],i);n["default"]=o.exports},"22c0":function(t,n,e){"use strict";var u=e("ef2d"),r=e.n(u);r.a},9420:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u={name:"UniPopupRank",props:{title:{type:String,default:"分享到"},articleId:{type:Number}},data:function(){return{giftRank:[]}},created:function(){var t=this;setTimeout((function(){console.log("articleId",t.articleId),t.getUserGift(t.articleId)}),0)},methods:{getUserGift:function(t){var n=this;this.http({url:"gift/article/user/gift/".concat(t),data:{}}).then((function(t){console.log("获取刷礼物 res",t),n.giftRank=t.data}))}}};n.default=u},e791:function(t,n,e){"use strict";var u,r=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return u}))},ee6b:function(t,n,e){"use strict";e.r(n);var u=e("9420"),r=e.n(u);for(var a in u)"default"!==a&&function(t){e.d(n,t,(function(){return u[t]}))}(a);n["default"]=r.a},ef2d:function(t,n,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-popup/uni-popup-rank-create-component',
    {
        'components/uni-popup/uni-popup-rank-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("159a"))
        })
    },
    [['components/uni-popup/uni-popup-rank-create-component']]
]);

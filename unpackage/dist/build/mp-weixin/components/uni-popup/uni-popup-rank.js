(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-popup/uni-popup-rank"],{"159a":function(t,n,e){"use strict";e.r(n);var a=e("9318"),u=e("ee6b");for(var i in u)"default"!==i&&function(t){e.d(n,t,(function(){return u[t]}))}(i);e("a25a");var r,c=e("f0c5"),o=Object(c["a"])(u["default"],a["b"],a["c"],!1,null,"52083f3e",null,!1,a["a"],r);n["default"]=o.exports},"80dc":function(t,n,e){},9318:function(t,n,e){"use strict";var a,u=function(){var t=this,n=t.$createElement;t._self._c},i=[];e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return a}))},9420:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={name:"UniPopupRank",props:{title:{type:String,default:"分享到"},articleId:{type:Number}},data:function(){return{giftRank:[]}},created:function(){var t=this;setTimeout((function(){console.log("articleId",t.articleId),t.getUserGift(t.articleId)}),0)},methods:{getUserGift:function(t){var n=this;this.api._get("gift/article/user/gift/".concat(t),{},(function(t){console.log("获取刷礼物 res",t),n.giftRank=t.data}))}}};n.default=a},a25a:function(t,n,e){"use strict";var a=e("80dc"),u=e.n(a);u.a},ee6b:function(t,n,e){"use strict";e.r(n);var a=e("9420"),u=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);n["default"]=u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-popup/uni-popup-rank-create-component',
    {
        'components/uni-popup/uni-popup-rank-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("159a"))
        })
    },
    [['components/uni-popup/uni-popup-rank-create-component']]
]);

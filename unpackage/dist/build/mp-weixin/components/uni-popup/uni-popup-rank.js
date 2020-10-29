(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-popup/uni-popup-rank"],{"159a":function(t,e,n){"use strict";n.r(e);var u=n("8d9e"),i=n("ee6b");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("1c96");var a,c=n("f0c5"),o=Object(c["a"])(i["default"],u["b"],u["c"],!1,null,"63146bd6",null,!1,u["a"],a);e["default"]=o.exports},"1c96":function(t,e,n){"use strict";var u=n("5fef"),i=n.n(u);i.a},"5fef":function(t,e,n){},"8d9e":function(t,e,n){"use strict";var u,i=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return u}))},9420:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={name:"UniPopupRank",props:{title:{type:String,default:"分享到"},articleId:{type:Number}},data:function(){return{giftRank:[]}},created:function(){var t=this;setTimeout((function(){console.log("articleId",t.articleId),t.getUserGift(t.articleId)}),0)},methods:{getUserGift:function(t){var e=this;this.api._get("gift/article/user/gift/".concat(t),{},(function(t){console.log("获取刷礼物 res",t),e.giftRank=t.data}))}}};e.default=u},ee6b:function(t,e,n){"use strict";n.r(e);var u=n("9420"),i=n.n(u);for(var r in u)"default"!==r&&function(t){n.d(e,t,(function(){return u[t]}))}(r);e["default"]=i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-popup/uni-popup-rank-create-component',
    {
        'components/uni-popup/uni-popup-rank-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("159a"))
        })
    },
    [['components/uni-popup/uni-popup-rank-create-component']]
]);

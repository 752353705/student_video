(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/wfallsflow"],{"004c":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={props:{list:{type:Array}},data:function(){return{loadingImg:"/static/loading.png",viewList:[{list:[]},{list:[]}],everyNum:2,scrollTop:0,showBtn:!1}},components:{},methods:{longpress:function(t){var n,e;console.log("用户进行长按 e",t),this.showBtn=!0,n=t.touches[0].clientY+224>667?Math.abs(383)+"px":t.touches[0].clientY+"px",e=375-t.touches[0].clientX<287?Math.abs(68)+"px":t.touches[0].clientX+"px",this.$emit("showUseroperation",n,e)},delwateritem:function(){},init:function(){this.viewList=[{list:[]},{list:[]}],this.handleViewRender(0,0)},handleViewRender:function(n,e){var i=this,o=this.viewList.reduce((function(t,n){return t+n.list.length}),0);if(o>this.list.length-1)this.$emit("finishLoad",o);else{var c=t.createSelectorQuery().in(this),a=0;c.selectAll("#wf-list").boundingClientRect((function(t){a=t[0].bottom-t[1].bottom<=0?0:1,i.viewList[a].list.push(i.list[o])})).exec()}},jumpVideo:function(n,e,i,o,c,a,u,s,l,r){t.navigateTo({url:"/pages/playVideo/playVideo?videoId=".concat(n,"&avatarUrl=").concat(e,"&userName=").concat(i,"&conversation=").concat(o,"&commentNum=").concat(c,"&userId=").concat(a,"&praseCount=").concat(u,"&id=").concat(s,"&forwardCount=").concat(l,"&coverUrl=").concat(r)})}},mounted:function(){this.list.length&&this.init()},onReady:function(){}};n.default=e}).call(this,e("543d")["default"])},1096:function(t,n,e){"use strict";e.r(n);var i=e("34dc"),o=e("64c1");for(var c in o)"default"!==c&&function(t){e.d(n,t,(function(){return o[t]}))}(c);e("5433e");var a,u=e("f0c5"),s=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,"a7ab78e2",null,!1,i["a"],a);n["default"]=s.exports},"34dc":function(t,n,e){"use strict";var i={uLazyLoad:function(){return e.e("node-modules/uview-ui/components/u-lazy-load/u-lazy-load").then(e.bind(null,"92b9"))}},o=function(){var t=this,n=t.$createElement;t._self._c},c=[];e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return i}))},"5433e":function(t,n,e){"use strict";var i=e("8ba0"),o=e.n(i);o.a},"64c1":function(t,n,e){"use strict";e.r(n);var i=e("004c"),o=e.n(i);for(var c in i)"default"!==c&&function(t){e.d(n,t,(function(){return i[t]}))}(c);n["default"]=o.a},"8ba0":function(t,n,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/wfallsflow-create-component',
    {
        'components/wfallsflow-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("1096"))
        })
    },
    [['components/wfallsflow-create-component']]
]);
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/sin-barrage/sin-barrage"],{372:
/*!***************************************************************************!*\
  !*** D:/myself/work/student_video/components/sin-barrage/sin-barrage.vue ***!
  \***************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var r=n(/*! ./sin-barrage.vue?vue&type=template&id=21bc6a48& */373),a=n(/*! ./sin-barrage.vue?vue&type=script&lang=js& */375);for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);n(/*! ./sin-barrage.vue?vue&type=style&index=0&lang=scss& */377);var u,o=n(/*! ../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */10),s=Object(o["default"])(a["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],u);s.options.__file="components/sin-barrage/sin-barrage.vue",t["default"]=s.exports},373:
/*!**********************************************************************************************************!*\
  !*** D:/myself/work/student_video/components/sin-barrage/sin-barrage.vue?vue&type=template&id=21bc6a48& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(e,t,n){"use strict";n.r(t);var r=n(/*! -!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./sin-barrage.vue?vue&type=template&id=21bc6a48& */374);n.d(t,"render",(function(){return r["render"]})),n.d(t,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(t,"components",(function(){return r["components"]}))},374:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/myself/work/student_video/components/sin-barrage/sin-barrage.vue?vue&type=template&id=21bc6a48& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(e,t,n){"use strict";var r;n.r(t),n.d(t,"render",(function(){return a})),n.d(t,"staticRenderFns",(function(){return u})),n.d(t,"recyclableRender",(function(){return i})),n.d(t,"components",(function(){return r}));var a=function(){var e=this,t=e.$createElement;e._self._c},i=!1,u=[];a._withStripped=!0},375:
/*!****************************************************************************************************!*\
  !*** D:/myself/work/student_video/components/sin-barrage/sin-barrage.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var r=n(/*! -!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./sin-barrage.vue?vue&type=script&lang=js& */376),a=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=a.a},376:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/myself/work/student_video/components/sin-barrage/sin-barrage.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={name:"sinBarrage",props:{list:{type:Array||Object,default:function(){return{}}},rows:{type:Number,default:3},color:{type:String,default:"#FFFFFF"},background:{type:String,default:"#000000"},opacity:{type:Number,default:.7},left:{type:Number,default:35},bottom:{type:Number,default:120},msec:{type:Number,default:2e3}},data:function(){return{barrageList:[]}},mounted:function(){var e=this,t=0,n=this.list.length;console.log("初始this.list",this.list,n),r=setInterval((function(){if(!(n>0))return console.log("定时器1"),void clearInterval(r);if(t==n&&(console.log("清除定时器"),clearInterval(r),e.$emit("showSinBar")),console.log("定时器"),e.barrageList.length<e.rows)e.barrageList.push(e.list[0]),e.list.splice(0,1);else{var a=e.barrageList[0];e.barrageList.splice(a,1),e.list.push(a);var i=e.list[0];e.list.splice(i,1),e.barrageList.push(i)}t++}),this.msec)},beforeDestroy:function(){console.log("组件销毁"),clearInterval(r)}};t.default=a},377:
/*!*************************************************************************************************************!*\
  !*** D:/myself/work/student_video/components/sin-barrage/sin-barrage.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var r=n(/*! -!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./sin-barrage.vue?vue&type=style&index=0&lang=scss& */378),a=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=a.a},378:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/myself/work/student_video/components/sin-barrage/sin-barrage.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/sin-barrage/sin-barrage.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/sin-barrage/sin-barrage-create-component',
    {
        'components/sin-barrage/sin-barrage-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(372))
        })
    },
    [['components/sin-barrage/sin-barrage-create-component']]
]);

(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/sin-barrage/sin-barrage"],{358:
/*!***************************************************************************!*\
  !*** D:/myself/work/student_video/components/sin-barrage/sin-barrage.vue ***!
  \***************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var r=n(/*! ./sin-barrage.vue?vue&type=template&id=21bc6a48& */359),u=n(/*! ./sin-barrage.vue?vue&type=script&lang=js& */361);for(var a in u)"default"!==a&&function(e){n.d(t,e,(function(){return u[e]}))}(a);n(/*! ./sin-barrage.vue?vue&type=style&index=0&lang=scss& */363);var o,i=n(/*! ../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */10),s=Object(i["default"])(u["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],o);s.options.__file="components/sin-barrage/sin-barrage.vue",t["default"]=s.exports},359:
/*!**********************************************************************************************************!*\
  !*** D:/myself/work/student_video/components/sin-barrage/sin-barrage.vue?vue&type=template&id=21bc6a48& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(e,t,n){"use strict";n.r(t);var r=n(/*! -!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./sin-barrage.vue?vue&type=template&id=21bc6a48& */360);n.d(t,"render",(function(){return r["render"]})),n.d(t,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(t,"components",(function(){return r["components"]}))},360:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/myself/work/student_video/components/sin-barrage/sin-barrage.vue?vue&type=template&id=21bc6a48& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(e,t,n){"use strict";var r;n.r(t),n.d(t,"render",(function(){return u})),n.d(t,"staticRenderFns",(function(){return o})),n.d(t,"recyclableRender",(function(){return a})),n.d(t,"components",(function(){return r}));var u=function(){var e=this,t=e.$createElement;e._self._c},a=!1,o=[];u._withStripped=!0},361:
/*!****************************************************************************************************!*\
  !*** D:/myself/work/student_video/components/sin-barrage/sin-barrage.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var r=n(/*! -!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./sin-barrage.vue?vue&type=script&lang=js& */362),u=n.n(r);for(var a in r)"default"!==a&&function(e){n.d(t,e,(function(){return r[e]}))}(a);t["default"]=u.a},362:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/myself/work/student_video/components/sin-barrage/sin-barrage.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u={name:"sinBarrage",props:{list:{type:Array||Object,default:function(){return{}}},rows:{type:Number,default:3},color:{type:String,default:"#FFFFFF"},background:{type:String,default:"#000000"},opacity:{type:Number,default:.7},left:{type:Number,default:35},bottom:{type:Number,default:120},msec:{type:Number,default:2e3}},data:function(){return{barrageList:[]}},mounted:function(){var e=this;console.log("初始this.list",this.list[0]);var t=0,n=this.list.length;r=setInterval((function(){t<e.rows?e.barrageList.push(e.list[t]):t<n-1?(e.barrageList.splice(0,1),e.barrageList.push(e.list[t])):e.barrageList.splice(0,1),t++,t==n+e.rows&&(console.log("清除定时器"),clearInterval(r))}),this.msec)},beforeDestroy:function(){console.log("组件销毁"),clearInterval(r)}};t.default=u},363:
/*!*************************************************************************************************************!*\
  !*** D:/myself/work/student_video/components/sin-barrage/sin-barrage.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var r=n(/*! -!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../uniapp/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./sin-barrage.vue?vue&type=style&index=0&lang=scss& */364),u=n.n(r);for(var a in r)"default"!==a&&function(e){n.d(t,e,(function(){return r[e]}))}(a);t["default"]=u.a},364:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/myself/work/student_video/components/sin-barrage/sin-barrage.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/sin-barrage/sin-barrage.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/sin-barrage/sin-barrage-create-component',
    {
        'components/sin-barrage/sin-barrage-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(358))
        })
    },
    [['components/sin-barrage/sin-barrage-create-component']]
]);
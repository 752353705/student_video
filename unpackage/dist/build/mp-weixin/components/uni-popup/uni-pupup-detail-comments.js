(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-popup/uni-pupup-detail-comments"],{"1e60":function(t,e,i){"use strict";var n=i("3a8a"),s=i.n(n);s.a},"3a8a":function(t,e,i){},"847f":function(t,e,i){"use strict";var n={uDivider:function(){return i.e("node-modules/uview-ui/components/u-divider/u-divider").then(i.bind(null,"5adc"))}},s=function(){var t=this,e=t.$createElement;t._self._c},o=[];i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}))},bfbd:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=s(i("08bb"));function s(t){return t&&t.__esModule?t:{default:t}}var o=function(){i.e("components/user-detail-comment").then(function(){return resolve(i("10a3"))}.bind(null,i)).catch(i.oe)},l={name:"UniPopupShare",props:{detailMsgList:{type:Object},detail_index:{type:Number},type:{type:String},title:{type:String,default:"分享到"},videoId:{type:String},txtId:{type:String},usedId:{type:String}},inject:["popup"],data:function(){return{express_show:!1,express_list:n.default,btm:"0",lineHeight:"66rpx",inputfocus:!1,upOption:{use:!1,toTop:{src:""},empty:{use:!1}},downOption:{isLock:!0},userImg:"",sendStyle:!0,commentId:"",replayIndex:"",twoShow:!1,val:"",send_btn_style:!1,pageNum:1}},components:{userDetailComment:o},created:function(){},mounted:function(){var e=this;t.getStorage({key:"user_img",success:function(t){e.userImg=t.data||"/static/avatarUrl.png"},fail:function(t){e.userImg="/static/avatarUrl.png"}})},methods:{showExpression:function(){console.log("显示表情"),this.express_show=!this.express_show,this.express_show?this.btm="361rpx":this.btm=0},chooseExpress:function(t){console.log("选择表情,输入框中展示的是表情对应的字符",t),this.val=this.val+"["+t.currentTarget.dataset.item+"]",this.send_btn_style=!0},showDetailComment:function(t){console.log("index popup",t),this.$emit("showDetailComment",t)},linechange:function(t){0!=t.detail.lineCount&&(t.detail.lineCount<4?this.lineHeight=66*t.detail.lineCount+"rpx":this.lineHeight="198rpx")},changeMsgList:function(t,e){console.log("uni-pop"),this.$emit("changeMsgList",{index:t,index2:e})},getComment:function(){this.$emit("getComment")},getVideoCmt:function(t){var e=this;this.api._get("comment/getComments",{pageNum:t,pageSize:10,videoId:e.videoId},(function(t){if(console.log("请求评论 上拉加载 ===》 res",t.data.list),e.mescroll.endSuccess(t.data.list.length),JSON.stringify(e.msgList)==JSON.stringify(t.data.list))return!1;e.msgList=e.msgList.concat(t.data.list)}))},sendVal:function(t){this.val=t.detail.value,""!==this.val&&this.val.trim()?this.send_btn_style=!0:this.send_btn_style=!1},keyboardheightchange:function(t){console.log("键盘高度变了e",t.detail.height),0==t.detail.height?(this.btm=0,this.express_show=!1):this.btm=2*t.detail.height+10+"rpx"},blur:function(){this.btm=0,this.inputfocus=!1,this.inputfocus=!1},send:function(){""!==this.val&&this.val.trim()&&("video"==this.type?this.sendVideoCmt():"txt"==this.type?this.sendTxtCmt():"used"==this.type&&this.sendUsedCmt(),this.reply())},sendTxtCmt:function(){var t=this;this.api._post("article/comment/addReply",{commentId:t.commentId,content:t.val},(function(e){t.sendStyle=!0,t.$emit("changeComment",{val:t.val,index:t.replayIndex,replayVal:t.replayVal,commentId:e.data}),t.val="",t.replayVal="留下你的精彩评论吧"}))},reply:function(t,e){console.log("父级中 reply"),"video"==this.type?this.replyVideoCmt(this.detail_index,e):"txt"==this.type?this.replyTxtCmt(this.detail_index,e):"used"==this.type&&this.replyUsedCmt(this.detail_index,e),console.log("父级中 reply")},replyTxtCmt:function(t,e){void 0==e?(this.replayVal="回复 @"+this.detailMsgList.userName,this.commentId=this.detailMsgList.id,this.sendStyle=!1,this.replayIndex=t,this.inputfocus=!0):(console.log("进行二级回复",this.detailMsgList.replyList[e]),this.replayVal="回复 @"+this.detailMsgList.replyList[e].userName,this.commentId=this.detailMsgList.id,this.sendStyle=!1,this.replayIndex=t,this.inputfocus=!0)},select:function(t,e){var i=this;this.$emit("select",{item:t,index:e},(function(){i.popup.close()}))},close:function(){this.popup.close()},showMore:function(){console.log("显示更多"),this.twoShow=!0}}};e.default=l}).call(this,i("543d")["default"])},dc0d:function(t,e,i){"use strict";i.r(e);var n=i("847f"),s=i("e4bd");for(var o in s)"default"!==o&&function(t){i.d(e,t,(function(){return s[t]}))}(o);i("1e60");var l,a=i("f0c5"),u=Object(a["a"])(s["default"],n["b"],n["c"],!1,null,"43a6c329",null,!1,n["a"],l);e["default"]=u.exports},e4bd:function(t,e,i){"use strict";i.r(e);var n=i("bfbd"),s=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=s.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-popup/uni-pupup-detail-comments-create-component',
    {
        'components/uni-popup/uni-pupup-detail-comments-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("dc0d"))
        })
    },
    [['components/uni-popup/uni-pupup-detail-comments-create-component']]
]);

(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-popup/uni-popup-comments"],{"0bc9":function(t,e,s){"use strict";var n={mescrollUni:function(){return Promise.all([s.e("common/vendor"),s.e("components/mescroll-uni/mescroll-uni")]).then(s.bind(null,"78cf"))}},i=function(){var t=this,e=t.$createElement;t._self._c},o=[];s.d(e,"b",(function(){return i})),s.d(e,"c",(function(){return o})),s.d(e,"a",(function(){return n}))},"0ca6":function(t,e,s){"use strict";s.r(e);var n=s("0bc9"),i=s("4efe");for(var o in i)"default"!==o&&function(t){s.d(e,t,(function(){return i[t]}))}(o);s("5ab1");var a,l=s("f0c5"),c=Object(l["a"])(i["default"],n["b"],n["c"],!1,null,"286c8738",null,!1,n["a"],a);e["default"]=c.exports},"4efe":function(t,e,s){"use strict";s.r(e);var n=s("d81f9"),i=s.n(n);for(var o in n)"default"!==o&&function(t){s.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},"5ab1":function(t,e,s){"use strict";var n=s("849a"),i=s.n(n);i.a},"849a":function(t,e,s){},d81f9:function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(s("6bae"));function i(t){return t&&t.__esModule?t:{default:t}}var o=function(){Promise.all([s.e("common/vendor"),s.e("components/mescroll-uni/components/mescroll-empty")]).then(function(){return resolve(s("c4b1"))}.bind(null,s)).catch(s.oe)},a=function(){s.e("components/user-comment").then(function(){return resolve(s("5541"))}.bind(null,s)).catch(s.oe)},l={mixins:[n.default],name:"UniPopupShare",props:{title:{type:String,default:"分享到"},videoId:{type:String}},inject:["popup"],data:function(){return{inputfocus:!1,upOption:{toTop:{src:""}},downOption:{isLock:!0},userImg:"",replayVal:"写评论",sendStyle:!0,commentId:"",replayIndex:"",threereplayname:"回复 旭东：",twoShow:!1,val:"",msgList:[],pageNum:1}},components:{MescrollEmpty:o,userComment:a},created:function(){console.log("创建 uni-popup-comments"),console.log("当前的时间 data==>",new Date)},mounted:function(){var e=this;t.getStorage({key:"user_img",success:function(t){e.userImg=t.data}})},methods:{changeMsgList:function(t,e){void 0==e?this.msgList[t].liked?(this.msgList[t].liked=!1,this.msgList[t].praseCount--):(this.msgList[t].liked=!0,this.msgList[t].praseCount++):this.msgList[t].replyList[e].liked?(this.msgList[t].replyList[e].liked=!1,this.msgList[t].replyList[e].praseCount--):(this.msgList[t].replyList[e].liked=!0,this.msgList[t].replyList[e].praseCount++)},downCallback:function(){console.log("下拉刷新");var t=this;this._get("comment/getComments",{pageNum:t.pageNum,pageSize:10,videoId:t.$props.videoId},(function(e){console.log("请求评论下拉刷新 ===》 res",e.data.list),t.msgList=e.data.list,t.mescroll.endSuccess()}))},upCallback:function(t){var e=this;this._get("comment/getComments",{pageNum:e.pageNum,pageSize:10,videoId:e.$props.videoId},(function(t){if(console.log("请求评论 上拉加载 ===》 res",t.data.list),e.pageNum=t.data.nextPage,e.mescroll.endSuccess(t.data.list.length),console.log("_this.msgList ===》",e.msgList,"res.data.list ==>",t.data.list),JSON.stringify(e.msgList)==JSON.stringify(t.data.list))return!1;e.msgList=e.msgList.concat(t.data.list)}))},sendVal:function(t){this.val=t.detail.value},send:function(){var e=this;""!==this.val&&this.val.trim()&&(console.log("发表评论e",this.val),this.sendStyle?this._post("comment/add",{videoId:e.$props.videoId,content:e.val},(function(s){console.log("发表评论成功 res==>",s),e.msgList.unshift({avatarUrl:t.getStorageSync("user_img"),userName:t.getStorageSync("user_name"),content:e.val,createTime:"",praseCount:""}),e.val="",e.$emit("changeCommentsNum")})):this._post("comment/addReply",{commentId:e.commentId,content:e.val},(function(s){console.log("进行评论回复 res==>",s),e.sendStyle=!0,e.msgList[e.replayIndex].replyList.unshift({content:e.val,avatarUrl:t.getStorageSync("user_img"),userName:t.getStorageSync("user_name"),createTime:"",praseCount:""}),console.log("评论的回复 msgList ==》",e.msgList),e.val=""})))},reply:function(t,e){void 0==e?(this.replayVal="回复 @"+this.msgList[t].userName,this.commentId=this.msgList[t].id,this.sendStyle=!1,this.replayIndex=t,this.inputfocus=!0):(console.log("进行二级回复",this.msgList[t].replyList[e]),this.replayVal="回复 @"+this.msgList[t].replyList[e].userName,this.commentId=this.msgList[t].id,this.sendStyle=!1,this.replayIndex=t,this.inputfocus=!0)},select:function(t,e){var s=this;this.$emit("select",{item:t,index:e},(function(){s.popup.close()}))},close:function(){this.popup.close()},showMore:function(){console.log("显示更多"),this.twoShow=!0}}};e.default=l}).call(this,s("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-popup/uni-popup-comments-create-component',
    {
        'components/uni-popup/uni-popup-comments-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("0ca6"))
        })
    },
    [['components/uni-popup/uni-popup-comments-create-component']]
]);
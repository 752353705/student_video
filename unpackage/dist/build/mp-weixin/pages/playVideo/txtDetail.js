(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/playVideo/txtDetail"],{"62dc":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=function(){n.e("components/sin-barrage/sin-barrage").then(function(){return resolve(n("b4b6"))}.bind(null,n)).catch(n.oe)},o=function(){n.e("components/uni-popup/uni-popup-share").then(function(){return resolve(n("daf5"))}.bind(null,n)).catch(n.oe)},s=function(){n.e("components/uni-popup/uni-popup-comments").then(function(){return resolve(n("0ca6"))}.bind(null,n)).catch(n.oe)},a=function(){n.e("components/uni-popup/uni-pupup-detail-comments").then(function(){return resolve(n("dc0d"))}.bind(null,n)).catch(n.oe)},c=function(){n.e("components/uni-popup/uni-popup-gifts").then(function(){return resolve(n("0b1d"))}.bind(null,n)).catch(n.oe)},u=function(){n.e("components/uni-popup/uni-popup-recharge").then(function(){return resolve(n("ad35"))}.bind(null,n)).catch(n.oe)},r=function(){n.e("components/uni-popup/uni-popup-rank").then(function(){return resolve(n("159a"))}.bind(null,n)).catch(n.oe)},l={data:function(){return{is_IOS:!1,offset:[-12,-12],sinBar:!0,list:[],bottom:500,left:42,color:"#FFFFFF",background:"#000000",msec:2e3,rankList:[{num:667,txt:"票数"},{num:1,txt:"排名"},{num:0,txt:"距离上一名"}],rank:[],money:0,fanlist:[],clt:!1,txtItem:{title:"",content:""},imgArr:"",txtId:"",userName:"",avatarUrl:"",forwardCount:0,timeStamp:0,pageNum:1,msgList:[],detailMsgList:{},commentState:!0,detail_index:""}},components:{sinBarrage:i,uniPopupShare:o,uniPopupComments:s,uniPopupGifts:c,uniPopupRecharge:u,uniPopupDetailComments:a,uniPopupRank:r},onLoad:function(e){this.txtId=e.txtId,this.getGift(e.txtId),this.getTxtDetail(this.txtId),this.userName=t.getStorageSync("user_name"),this.avatarUrl="/static/avatarUrl.png",t.showShareMenu({withShareTicket:!0,menus:["shareAppMessage","shareTimeline"]}),this.getPhoneType()},onShow:function(){this.api._post("history",{itemId:this.txtId,itemType:"A"},(function(t){})),this.getRank()},onShareAppMessage:function(t){var e=this;return"button"===t.from&&console.log("按钮进行的转发",t),this.api._post("article/forward/".concat(e.txtId),{},(function(t){e.txtItem.forwardCount++})),{title:this.txtItem.title,path:"/pages/playVideo/txtDetail?txtId="+this.txtId}},onShareTimeline:function(){return"button"===res.from&&console.log("按钮进行的朋友圈转发",res),{title:this.txtItem.title,query:"txtId=".concat(this.txtId),imageUrl:this.imgArr[0]}},methods:{showDetailComment:function(t){var e=this;this.detail_index=t,e.detailMsgList=e.msgList[t],this.$refs.popupDetailComments.open()},getPhoneType:function(){switch(t.getSystemInfoSync().platform){case"android":console.log("运行Android上");break;case"ios":console.log("运行iOS上"),this.is_IOS=!0;break;default:console.log("运行在开发者工具上");break}},getRank:function(){var t=this;this.api._get("article/ranking/".concat(this.txtId),{},(function(e){console.log("获取当前作品排行",e),t.rank=e.data}))},getUserGift:function(t){var e=this;this.api._get("gift/article/user/gift/".concat(t),{},(function(t){console.log(" 获取刷礼物 res",t),e.giftRank=t.data}))},goGameDetail:function(){t.navigateTo({url:"/pages/Introduction/gameDetail?subjectId=".concat(this.txtItem.subjectId)})},previewImg:function(){t.previewImage({current:0,urls:this.imgArr})},getGift:function(t){var e=this;this.api._get("gift/article/gift/".concat(t),{},(function(t){e.list=t.data}))},showSinBar:function(){this.sinBar=!1},goRank:function(){t.navigateTo({url:"/pages/rank/rank?articleId=".concat(this.txtItem.id)})},rankPopup:function(t,e){this.$refs.popupRank.open(),e()},hiddenRank:function(){this.$refs.popupRank.close()},getOtherFans:function(){var t=this;this.api._get("follow/otherUserfans",{userId:this.txtItem.userId,pageNum:this.pageNum,pageSize:10},(function(e){console.log("获取其他人的粉丝列表 res ===>",e),t.fanlist=e.data.list}))},gofansLis:function(){t.navigateTo({url:"/pages/my/myFans"})},collection:function(){var t=this;this.api._post("collection",{itemId:this.txtItem.id,itemType:"A"},(function(e){t.txtItem.collectionStatus=!t.txtItem.collectionStatus}))},downImg:function(e){console.log("用户长按图片进行下载"),t.downloadFile({url:e,success:function(e){console.log("downloadFile成功",e),t.saveImageToPhotosAlbum({filePath:e.tempFilePath,success:function(t){console.log("saveVideoToPhotosAlb、um成功",t),wx.hideLoading(),wx.showToast({title:"下载成功",icon:"none"})},fail:function(t){console.log("saveVideoToPhotosAlbum失败",t),"saveImageToPhotosAlbum:fail auth deny"==t.errMsg&&wx.showModal({title:"提示",content:"需要您授权保存相册",showCancel:!1,success:function(t){wx.openSetting({success:function(t){t.authSetting["scope.writePhotosAlbum"]?wx.showModal({title:"提示",content:"获取权限成功,再次点击下载即可保存",showCancel:!1}):wx.showModal({title:"提示",content:"获取权限失败，将无法保存到相册哦~",showCancel:!1})}})}})}})},fail:function(t){console.log("downloadFile失败",t)}})},getTxtDetail:function(t){var e=this;this.api._get("article/".concat(t),{},(function(t){console.log("获取文章的详情",t),e.txtItem=t.data,e.imgArr=t.data.images.split(","),e.getOtherFans()}))},getHgold:function(){var t=this;this.api._get("user/gold",{},(function(e){t.money=e.data.goldNumber,t.$refs.popupRecharge.open()}))},recharge:function(t,e){this.getHgold(),e()},close:function(t){this.$refs.popupShare.close()},changeCommentsNum:function(t){this.txtItem.commentNum+=1},back:function(){var e=getCurrentPages();console.log("当前页面栈 routes",e),e.length>1?t.navigateBack({delta:1}):t.switchTab({url:"/pages/list/list"})},goAuthor:function(){var e={avatarUrl:this.txtItem.avatarUrl,userId:this.txtItem.userId};t.navigateTo({url:"/pages/author/author?item=".concat(JSON.stringify(e))})},focusOn:function(){var t=this;this.txtItem.followed?t.api._post("follow",{followedId:t.txtItem.userId},(function(e){t.txtItem.followed=!t.txtItem.followed,t.getOtherFans()})):this.api._post("follow",{followedId:t.txtItem.userId},(function(e){t.txtItem.followed=!t.txtItem.followed,t.getOtherFans()}))},sendGift:function(){this.$refs.popupGifts.open()},selectgift:function(e,n){var i=this;t.showModal({title:"提示",content:"您确定赠送".concat(e.item.giftName,"吗"),success:function(n){n.confirm?i.api._post("gift/article",{articleId:i.txtItem.id,giftId:e.item.giftId},(function(n){507===n.data.errno?i.is_IOS?t.showModal({title:"当前H币不足"}):i.recharge():(wx.hideLoading(),setTimeout((function(){t.showToast({icon:"none",duration:2e3,title:"加油成功",success:function(){setTimeout((function(){i.getRank(),i.sinBar=!0,i.list=[{avatarImage:t.getStorageSync("user_img"),giftImage:e.item.giftImage,giftName:e.item.giftName}]}),2e3)}},500)})))})):n.cancel&&console.log("用户点击取消")}})},getComment:function(){var t=this;t.$refs.popupComments.open(),this.commentState&&this.api._get("article/comment/list",{pageNum:this.pageNum,pageSize:10,articleId:this.txtId},(function(e){if(console.log("请求文章评论 ===》 res",e.data.list),JSON.stringify(t.msgList)==JSON.stringify(e.data.list)&&0!==e.data.list.length)return!1;t.msgList=t.msgList.concat(e.data.list),10==e.data.list.length?(console.log("请求"),t.pageNum++,t.commentState=!0):(console.log("不请求"),t.commentState=!1)}))},changeComment:function(e){console.log("进行评论回复111111000",e),e.replayVal?(console.log("二级回复"),this.msgList[e.index].replyList.unshift({content:e.val,avatarUrl:t.getStorageSync("user_img"),userName:t.getStorageSync("user_name"),createTime:"",praseCount:"",id:e.commentId})):(console.log("一级回复"),this.msgList.unshift({avatarUrl:t.getStorageSync("user_img"),userName:t.getStorageSync("user_name"),content:e.val,createTime:"",praseCount:"",replyList:[],id:e.commentId}))},changeMsgList:function(t){console.log("txtdetail"),void 0==t.index2?this.msgList[t.index].liked?(this.msgList[t.index].liked=!1,this.msgList[t.index].praseCount--):(this.msgList[t.index].liked=!0,this.msgList[t.index].praseCount++):this.msgList[t.index].replyList[t.index2].liked?(this.msgList[t.index].replyList[t.index2].liked=!1,this.msgList[t.index].replyList[t.index2].praseCount--):(this.msgList[t.index].replyList[t.index2].liked=!0,this.msgList[t.index].replyList[t.index2].praseCount++)},confirmShare:function(){this.$refs.popupShare.open()},getLike:function(t){var e=this;this.txtItem.praseStatus?this.api._post("article/likeArticle/".concat(e.txtItem.id),{},(function(t){e.txtItem.praseStatus=!1,e.txtItem.praseCount--})):this.api._post("article/likeArticle/".concat(e.txtItem.id),{},(function(t){e.txtItem.praseStatus=!0,e.txtItem.praseCount++}))}}};e.default=l}).call(this,n("543d")["default"])},"9b18":function(t,e,n){},a570:function(t,e,n){"use strict";var i=n("9b18"),o=n.n(i);o.a},a5f6:function(t,e,n){"use strict";var i={sinBarrage:function(){return n.e("components/sin-barrage/sin-barrage").then(n.bind(null,"b4b6"))},uIcon:function(){return n.e("node-modules/uview-ui/components/u-icon/u-icon").then(n.bind(null,"66cf"))},uBadge:function(){return n.e("node-modules/uview-ui/components/u-badge/u-badge").then(n.bind(null,"d875"))},uniPopup:function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-popup/uni-popup")]).then(n.bind(null,"f48e"))}},o=function(){var t=this,e=t.$createElement;t._self._c},s=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return i}))},b682:function(t,e,n){"use strict";(function(t){n("21be");i(n("66fd"));var e=i(n("e7c4"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},bc8b:function(t,e,n){"use strict";var i=n("be68"),o=n.n(i);o.a},bcfa:function(t,e,n){"use strict";n.r(e);var i=n("62dc"),o=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);e["default"]=o.a},be68:function(t,e,n){},e7c4:function(t,e,n){"use strict";n.r(e);var i=n("a5f6"),o=n("bcfa");for(var s in o)"default"!==s&&function(t){n.d(e,t,(function(){return o[t]}))}(s);n("a570"),n("bc8b");var a,c=n("f0c5"),u=Object(c["a"])(o["default"],i["b"],i["c"],!1,null,"202b48ff",null,!1,i["a"],a);e["default"]=u.exports}},[["b682","common/runtime","common/vendor"]]]);
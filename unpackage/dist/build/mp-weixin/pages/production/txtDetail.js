(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/production/txtDetail"],{"014e":function(t,e,n){"use strict";(function(t){var o;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=function(){n.e("components/sin-barrage/sin-barrage").then(function(){return resolve(n("b4b6"))}.bind(null,n)).catch(n.oe)},s=function(){Promise.all([n.e("common/vendor"),n.e("components/zhangyu-qrcode-poster/zhangyu-qrcode-poster")]).then(function(){return resolve(n("081d"))}.bind(null,n)).catch(n.oe)},a=function(){n.e("components/circle").then(function(){return resolve(n("9298"))}.bind(null,n)).catch(n.oe)},u=function(){n.e("components/uni-popup/uni-popup-message").then(function(){return resolve(n("9447"))}.bind(null,n)).catch(n.oe)},c=function(){n.e("components/uni-popup/uni-popup-share").then(function(){return resolve(n("daf5"))}.bind(null,n)).catch(n.oe)},r=function(){Promise.all([n.e("common/vendor"),n.e("components/uni-popup/uni-popup-comments")]).then(function(){return resolve(n("0ca6"))}.bind(null,n)).catch(n.oe)},l=function(){Promise.all([n.e("common/vendor"),n.e("components/uni-popup/uni-pupup-detail-comments")]).then(function(){return resolve(n("dc0d"))}.bind(null,n)).catch(n.oe)},d=function(){n.e("components/uni-popup/uni-popup-gifts").then(function(){return resolve(n("0b1d"))}.bind(null,n)).catch(n.oe)},h=function(){n.e("components/uni-popup/uni-popup-rank").then(function(){return resolve(n("159a"))}.bind(null,n)).catch(n.oe)},f={data:function(){return{percent:0,limit:30,cirStatue:!0,code:"https://ceshigfsc.oss-cn-beijing.aliyuncs.com/c2f34846-f2f0-4fe6-a921-3d810625490e.jpg",game_statue:1,msg:"",scroll_style:!1,offset:[-12,-12],sinBar:!0,list:[],bottom:500,left:42,color:"#FFFFFF",background:"#000000",msec:2e3,rank:[],money:0,fanlist:[],clt:!1,txtItem:{title:"",content:""},imgArr:"",txtId:"",userName:"",avatarUrl:"",forwardCount:0,timeStamp:0,pageNum:1,msgList:[],detailMsgList:{},commentState:!0,detail_index:"",userInfo:"",game_is_state:!1}},components:{circle:a,uniPopupMessage:u,sinBarrage:i,uniPopupShare:c,uniPopupComments:r,uniPopupGifts:d,uniPopupDetailComments:l,QrcodePoster:s,uniPopupRank:h},onLoad:function(e){this.txtId=e.txtId,this.getGift(e.txtId),this.getTxtDetail(this.txtId),this.userName=t.getStorageSync("user_name"),this.avatarUrl="/static/avatarUrl.png",t.showShareMenu({withShareTicket:!0,menus:["shareAppMessage","shareTimeline"]})},onShow:function(){this.getUsInfo(),this.recordHistory(),this.getRank()},onHide:function(){clearInterval(o)},onUnload:function(){clearInterval(o)},onShareAppMessage:function(t){var e=this,n=this;return"button"===t.from&&console.log("按钮进行的转发",t),this.http({url:"article/forward/".concat(n.txtId),data:{}}).then((function(t){e.txtItem.forwardCount++})),{title:this.txtItem.title,path:"/pages/production/txtDetail?txtId="+this.txtId}},onShareTimeline:function(){return"button"===res.from&&console.log("按钮进行的朋友圈转发",res),{title:this.txtItem.title,query:"txtId=".concat(this.txtId),imageUrl:this.imgArr[0]}},onPageScroll:function(){var t,e=this;if(this.scroll_style){if(this.timeout)return void clearTimeout(t);this.timeout=!0,t=setTimeout((function(){e.scroll_style=!1,e.timeout=!1}),3e3)}else this.scroll_style=!0;this.cirStatue&&(this.seeTxtAward(),this.cirStatue=!1)},methods:{recordHistory:function(){this.http({url:"history",method:"POST",data:{itemId:this.txtId,itemType:"A"}})},getUsInfo:function(){var t=this;this.http({url:"user/info"}).then((function(e){t.userInfo=e.data}))},seeTxtAward:function(){var t=this;o=setInterval((function(){t.percent!==t.limit?t.percent++:t.http({url:"user/increaseGold?userId=".concat(t.userInfo.userId,"&goldNumber=1"),method:"POST"}).then((function(e){t.msg="恭喜浏览作品获得1票",t.$refs.popup.open(),clearInterval(o)}))}),1e3)},subjectStatue:function(t){var e=this;this.http({url:"subject/".concat(t)}).then((function(t){e.game_statue=t.data.progressStatus}))},showDetailComment:function(t){this.detail_index=t,this.detailMsgList=this.msgList[t],this.$refs.popupDetailComments.open()},getRank:function(){var t=this;this.http({url:"article/ranking/".concat(this.txtId)}).then((function(e){t.rank=e.data}))},getUserGift:function(t){var e=this;this.http({url:"gift/article/user/gift/".concat(t)}).then((function(t){e.giftRank=t.data}))},goGameDetail:function(){t.navigateTo({url:"/pages/Introduction/gameDetail?subjectId=".concat(this.txtItem.subjectId)})},previewImg:function(){t.previewImage({current:0,urls:this.imgArr})},getGift:function(t){var e=this;this.http({url:"gift/article/gift/".concat(t)}).then((function(t){e.list=t.data}))},showSinBar:function(){this.sinBar=!1},goRank:function(){t.navigateTo({url:"/pages/rank/rank?articleId=".concat(this.txtItem.id)})},rankPopup:function(t,e){this.$refs.popupRank.open(),e()},hiddenRank:function(){this.$refs.popupRank.close()},getOtherFans:function(){var t=this;this.http({url:"follow/otherUserfans",data:{userId:this.txtItem.userId,pageNum:this.pageNum,pageSize:10}}).then((function(e){t.fanlist=e.data.list}))},gofansLis:function(){t.navigateTo({url:"/pages/my/myFans"})},collection:function(){var t=this;this.http({url:"collection",method:"POST",data:{itemId:this.txtItem.id,itemType:"A"}}).then((function(e){t.txtItem.collectionStatus=!t.txtItem.collectionStatus,t.txtItem.collectionStatus?(t.msg="收藏成功",t.$refs.popup.open()):(t.msg="取消收藏",t.$refs.popup.open())}))},downImg:function(e){console.log("用户长按图片进行下载"),t.showModal({title:"是否下载当前图片",success:function(n){n.confirm?t.downloadFile({url:e,success:function(e){console.log("downloadFile成功",e),t.saveImageToPhotosAlbum({filePath:e.tempFilePath,success:function(t){console.log("saveVideoToPhotosAlb、um成功",t),wx.hideLoading(),wx.showToast({title:"下载成功",icon:"none"})},fail:function(t){console.log("saveVideoToPhotosAlbum失败",t),"saveImageToPhotosAlbum:fail auth deny"==t.errMsg&&wx.showModal({title:"提示",content:"需要您授权保存相册",showCancel:!1,success:function(t){wx.openSetting({success:function(t){t.authSetting["scope.writePhotosAlbum"]?wx.showModal({title:"提示",content:"获取权限成功,再次点击下载即可保存",showCancel:!1}):wx.showModal({title:"提示",content:"获取权限失败，将无法保存到相册哦~",showCancel:!1})}})}})}})},fail:function(t){console.log("downloadFile失败",t)}}):n.cancel&&console.log("用户点击取消")},fail:function(){t.showToast({icon:"none",title:"下载失败"})}})},getTxtDetail:function(t){var e=this;this.http({url:"article/".concat(t)}).then((function(t){console.log("获取文章的详情",t),e.txtItem=t.data,e.imgArr=t.data.images.split(","),e.getOtherFans(),e.subjectStatue(e.txtItem.subjectId),console.log("this.txtItem.subjectId",e.txtItem.subjectId),16==e.txtItem.subjectId&&(e.game_is_state=!0)}))},getHgold:function(){var t=this;this.http({url:"user/gold"}).then((function(e){t.money=e.data.goldNumber,t.$refs.popupRecharge.open()}))},close:function(t){this.$refs.popupShare.close()},changeCommentsNum:function(t){this.txtItem.commentNum+=1},goAuthor:function(){var e={avatarUrl:this.txtItem.avatarUrl,userId:this.txtItem.userId};t.navigateTo({url:"/pages/author/author?item=".concat(JSON.stringify(e))})},focusOn:function(){var t=this;this.http({url:"follow",method:"POST",data:{followedId:this.txtItem.userId}}).then((function(e){t.txtItem.followed=!t.txtItem.followed,t.getOtherFans()}))},sendGift:function(){this.$refs.popupGifts.open()},selectgift:function(e,n){var o=this;t.showModal({title:"提示",content:"您确定投".concat(e.item.goldNumber,"票吗"),success:function(t){t.confirm?o.userSendGift(e,o.txtItem.id,e.item.giftId):t.cancel&&console.log("用户点击取消")}})},userSendGift:function(e,n,o){var i=this,s=this;this.http({url:"gift/article",method:"POST",data:{articleId:n,giftId:o}}).then((function(n){507===n.data.errno?(i.$refs.poster.showCanvas(i.code),i.$refs.popupGifts.close()):(wx.hideLoading(),setTimeout((function(){t.showToast({icon:"none",duration:2e3,title:"投票成功",success:function(){setTimeout((function(){s.getRank(),s.sinBar=!0,s.list=[{avatarImage:t.getStorageSync("user_img"),giftImage:e.item.giftImage,goldNumber:e.item.goldNumber}]}),3e3)}},500)})))}))},getComment:function(){var t=this;t.$refs.popupComments.open(),this.commentState&&this.http({url:"article/comment/list",data:{pageNum:this.pageNum,pageSize:10,articleId:this.txtId}}).then((function(e){if(console.log("请求文章评论 ===》 res",e.data.list),JSON.stringify(t.msgList)==JSON.stringify(e.data.list)&&0!==e.data.list.length)return!1;t.msgList=t.msgList.concat(e.data.list),10==e.data.list.length?(console.log("请求"),t.pageNum++,t.commentState=!0):(console.log("不请求"),t.commentState=!1)}))},changeComment:function(e){console.log("进行评论回复111111000",e),e.replayVal?(console.log("二级回复"),this.msgList[e.index].replyList.unshift({content:e.val,avatarUrl:t.getStorageSync("user_img"),userName:t.getStorageSync("user_name"),createTime:"",praseCount:"",id:e.commentId})):(console.log("一级回复"),this.msgList.unshift({avatarUrl:t.getStorageSync("user_img"),userName:t.getStorageSync("user_name"),content:e.val,createTime:"",praseCount:"",replyList:[],id:e.commentId}))},changeMsgList:function(t){console.log("txtdetail"),void 0==t.index2?this.msgList[t.index].liked?(this.msgList[t.index].liked=!1,this.msgList[t.index].praseCount--):(this.msgList[t.index].liked=!0,this.msgList[t.index].praseCount++):this.msgList[t.index].replyList[t.index2].liked?(this.msgList[t.index].replyList[t.index2].liked=!1,this.msgList[t.index].replyList[t.index2].praseCount--):(this.msgList[t.index].replyList[t.index2].liked=!0,this.msgList[t.index].replyList[t.index2].praseCount++)},confirmShare:function(){this.$refs.popupShare.open()}}};e.default=f}).call(this,n("543d")["default"])},"03aa":function(t,e,n){"use strict";var o={sinBarrage:function(){return n.e("components/sin-barrage/sin-barrage").then(n.bind(null,"b4b6"))},uBadge:function(){return n.e("node-modules/uview-ui/components/u-badge/u-badge").then(n.bind(null,"d875"))},uniPopup:function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-popup/uni-popup")]).then(n.bind(null,"f48e"))}},i=function(){var t=this,e=t.$createElement,n=(t._self._c,t.list.slice(0,5));t.$mp.data=Object.assign({},{$root:{g0:n}})},s=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return o}))},6590:function(t,e,n){"use strict";var o=n("8718"),i=n.n(o);i.a},8718:function(t,e,n){},9906:function(t,e,n){"use strict";n.r(e);var o=n("014e"),i=n.n(o);for(var s in o)"default"!==s&&function(t){n.d(e,t,(function(){return o[t]}))}(s);e["default"]=i.a},"992d":function(t,e,n){"use strict";n.r(e);var o=n("03aa"),i=n("9906");for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);n("6590"),n("dcba");var a,u=n("f0c5"),c=Object(u["a"])(i["default"],o["b"],o["c"],!1,null,"5727b788",null,!1,o["a"],a);e["default"]=c.exports},a290:function(t,e,n){"use strict";(function(t){n("21be");o(n("66fd"));var e=o(n("992d"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},dcba:function(t,e,n){"use strict";var o=n("f728"),i=n.n(o);i.a},f728:function(t,e,n){}},[["a290","common/runtime","common/vendor"]]]);
<template>
	<view>
		<scroll-view class="container" style="height: 100%;">
		  <view class="search-header">
		    <view class="input-box">
		      <!-- <image class="icon" src="http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/search2-2fb94833aa.png"></image> -->
					<u-icon class="icon"  name="search"></u-icon>
		      <input name="input" class="keyword" focus="true" :value="keyword" 
					confirm-type="search" @input="inputChange"  @confirm="onKeywordConfirm" 
					:placeholder="defaultKeyword.keyword" />
		      <image class="del" v-if="keyword" @tap="clearKeyword" 
					src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/clearIpt-f71b83e3c2.png"></image>
		    </view>
		    <view class="right" @tap="closeSearch">取消</view>
		  </view>
		</scroll-view>
		
		<!-- 搜索结果渲染列表 -->
		<view class="" style="padding: 12rpx;padding-top:54px;">
			<view class="item" v-for="(item, index) of article_msg" :key="item.id"
				:data-index="index" :data-listindex="listIndex"
				@longpress="longpress" @click="jump(item)">
				<!-- :data-videoId='item.videoId' -->
				<!-- 视频封面 -->
				<u-lazy-load @load="handleViewRender(listIndex, index)" 
					@error="handleViewRender(listIndex, index)" 
					:image="item.coverUrl || 'https://ceshigfsc.oss-cn-beijing.aliyuncs.com/33e2ec6b-565e-4f0c-90b6-dd726ccec025.jpg' "></u-lazy-load>
				<!-- 上传视频的简单的简介 转发量 {{ item.forwardCount }} -->
				<view class="introduction">
					{{ item.conversation || item.title }}
					<!-- 简单的简介简单的简介简单的简介简单的简介简单的简介简单的简介简单的简介 -->
				</view>
				<!-- 如果渲染的是 商品的话显示 商品的价格 -->
				<view class="price" v-if="item.price" >
					<view>
						￥
						<text class="num"> 
							{{item.price / 100}} 
							<!-- {{price.floatdiv(item.price,100)}} -->
						</text>
					</view>
					<view class="see_num">
						{{item.viewsNum}} 人浏览
					</view>
				</view>
				
				
				<!-- 用户的 头像以及点赞数 -->
				<view class="item_foot">
					<view class="left">
						<view class="user_img"><image :src="item.avatarUrl || avatarUrl " mode=""></image></view>
						<view class="msg">
							<!-- 姓名 *** 如果没有则是来自自己的作品  -->
							{{ item.userName || userName }}
						</view>
					</view>
					<view class="right" @tap.stop="waterLike"  
						:data-index="index" :data-listindex="listIndex"
						>
							<!-- <view style="margin-right: 10rpx;" >
								0人浏览
							</view> -->
							<u-icon  v-if="!item.liked" name="heart" color="#000000" size="34"></u-icon>
							<u-icon  v-else name="heart-fill" color="red" size="34"></u-icon>
						<view style="margin-left: 10rpx;" >
							<!-- 票数 文章点赞数                     -->
							{{ item.praseCount }}
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	// import MescrollItem from "@/components/mescroll-swiper-item.vue";
	// import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	// import MescrollEmpty from '@/components/mescroll-uni/components/mescroll-empty.vue';
	// import wfallsFlow from '@/components/wfallsflow.vue';
	export default {
		data() {
			return {
				kw:"search",
				// 用户输入的关键字
				keyword: '',
				// 搜索到的信息
				article_msg:[],
				searchStatus: false,
				goodsList: [],
				helpKeyword: [],
				defaultKeyword: {
					keyword:'输入搜索内容'
				},
				page: 1,
				size: 10,
			};
		},
		components:{
			// MescrollEmpty,
			// MescrollItem,
			// wfallsFlow,
			// swiperTabHead,
		},
		onLoad(){
			// this.getSearchKeyword();
		},
		onShow() {
			
			
		},
		onReady: function(res) {
			
		},
		onHide() {
			// 进行搜索之后清除数据
		},
		// 用户进行上拉加载
		onReachBottom:function() {
			if (this.article_msg.length == 10) {
				 this.page = this.page + 1
				 this.selectComponent("#mescroll").$vm.getSearch(this.keyword,this.page,true);
				 
			} else {
				 wx.showToast({
							 title: '已经到底了!',
							 icon: 'none',
							 duration: 2000
				 });
				 return false;
			}
			// 请求新的数据
		  // this.getGoodsList();
		},
		methods:{
			// 用户进行搜索文章
			searchArticle(){
				// 执行子组件中的方法
				// this.selectComponent("#mescroll").$vm.getSearch(this.keyword,1,false);
				// console.log(this.selectComponent("#mescroll"))
				
				this.api._get('article/search',{
					pageNum:1,
					pageSize:10,
					title:this.keyword
				},(res)=>{
					console.log('进行搜索',res)
					this.article_msg = this.article_msg.concat(res.data.list) 
					console.log('this.article_msg',this.article_msg)
				})
			},
			
			// 用户输入内容发生改变
			inputChange: function(e) {
			  this.keyword = e.detail.value
			    this.searchStatus = false
			
			  if (e.detail.value) {
					// 进行搜素
					this.searchArticle()
			    // this.getHelpKeyword();
			  }
			},
			//事件处理函数
			closeSearch: function() {
			  wx.navigateBack()
			},
			// 清除关键字
			clearKeyword: function() {
			  this.keyword = ''
			    this.searchStatus = false
			},
			// 用户在输入是 点击虚拟键盘上的完成
			onKeywordConfirm(event) {
			  this.getSearchResult(event.detail.value);
			}, 
		}
	}
</script>

<style>
	page {
	  min-height: 100%;
	  background-color: #f4f4f4;
	}
</style>

<style lang="less" scoped>

		.item {
			margin-bottom: 18rpx;
			background-color: white;
			// height: 200px;
			image {
				display: block;
				width: 100%;
			}

			// 上传视频的 用户简介
			.introduction {
				// width: 100%;
				// // height: 90rpx;
				box-sizing: border-box;
				padding: 5rpx 20rpx;
				color: black;
				// line-height: 40rpx;
				// font-weight: 200;
				// font-family: Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei';
				// 首行缩进
				// text-indent: 2em;
				// 最多两行，超出省略号显示
				display: -webkit-box;
				overflow: hidden;
				text-overflow: ellipsis;
				word-break: break-all;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}

			// 二手商品的 价格显示
			.price{
				box-sizing: border-box;
				padding: 5rpx 20rpx;
				color: #fc3c3b;
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				.num{
					font-weight: bolder;
					font-size: 38rpx;
				}
				.see_num{
					color: #838383;
					font-size: 23rpx;
				}
				
			}
			
			
			// 上传视频的 用户个人信息
			.item_foot {
				width: 100%;
				height: 50rpx;
				display: flex;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 0rpx 20rpx;
				align-items: center;
				// margin-top: 15rpx;
				color: #bebbc4;
				font-size: 24rpx;
				.left {
					display: flex;
					justify-content: space-evenly;
					align-items: center;
					.user_img {
						width: 40rpx;
						height: 40rpx;
						border-radius: 50%;
						overflow: hidden;
						margin-right: 10rpx;
						image {
							width: 100%;
							height: 100%;
						}
					}
				}
				.right {
					display: flex;
					justify-content: space-evenly;
					align-items: center;
					.icon {
						width: 30rpx;
						height: 30rpx;
						margin-right: 6rpx;
						image {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}

.container {
  min-height: 100%;
  background-color: #f4f4f4;
}

.search-header {
  position: fixed;
	z-index: 20;
  top: 0;
  width: 750rpx;
  height: 92rpx;
  display: flex;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
	box-sizing: border-box;
  padding: 0 31.25rpx;
  font-size: 29rpx;
  color: #333;
}

.search-header .input-box {
  position: relative;
  margin-top: 16rpx;
  float: left;
  width: 0;
  flex: 1;
  height: 59rpx;
  line-height: 59rpx;
  padding: 0 20rpx;
  background: #f4f4f4;
}

.search-header .icon {
  position: absolute;
  top: 14rpx;
  left: 20rpx;
  width: 31rpx;
  height: 31rpx;
}

.search-header .del {
  position: absolute;
  top: 3rpx;
  right: 10rpx;
  width: 53rpx;
  height: 53rpx;
  z-index: 10;
}

.search-header .keyword {
  position: absolute;
  top: 0;
  left: 40rpx;
  width: 506rpx;
  height: 59rpx;
  padding-left: 30rpx;
}

.search-header .right {
  margin-top: 24rpx;
  margin-left: 31rpx;
  margin-right: 6rpx;
  width: 58rpx;
  height: 43rpx;
  line-height: 43rpx;
  float: right;
}

.no-search {
  height: auto;
  overflow: hidden;
  margin-top: 91rpx;
}

.search-keywords {
  background: #fff;
  width: 750rpx;
  height: auto;
  overflow: hidden;
  margin-bottom: 20rpx;
}

.search-keywords .h {
	box-sizing: border-box;
  padding: 0 31.25rpx;
  height: 93rpx;
  line-height: 93rpx;
  width: 100%;
  color: #999;
  font-size: 29rpx;
}

.search-keywords .title {
  display: block;
  width: 120rpx;
  float: left;
}

.search-keywords .icon {
  margin-top: 19rpx;
  float: right;
  display: block;
  margin-left: 511rpx;
  height: 55rpx;
  width: 55rpx;
}

.search-keywords .b {
  width: 750rpx;
  height: auto;
  overflow: hidden;
  padding-left: 31.25rpx;
}

.search-keywords .item {
  display: inline-block;
  width: auto;
  height: 48rpx;
  line-height: 48rpx;
  padding: 0 15rpx;
  border: 1px solid #999;
  margin: 0 31.25rpx 31.25rpx 0;
  font-size: 24rpx;
  color: #333;
}

.search-keywords .item.active {
  color: #b4282d;
  border: 1px solid #b4282d;
}

.shelper-list {
  width: 750rpx;
  height: auto;
  overflow: hidden;
  background: #fff;
  padding: 0 31.25rpx;
}

.shelper-list .item {
  height: 93rpx;
  width: 687.5rpx;
  line-height: 93rpx;
  font-size: 24rpx;
  color: #333;
  border-bottom: 1px solid #f4f4f4;
}

.sort {
  position: fixed;
	z-index: 20;
  top: 91rpx;
  background: #fff;
  width: 100%;
  height: 78rpx;
}

.sort-box {
  background: #fff;
  width: 100%;
  height: 78rpx;
  overflow: hidden;
  padding: 0 30rpx;
  display: flex;
  border-bottom: 1px solid #d9d9d9;
}

.sort-box .item {
  height: 78rpx;
  line-height: 78rpx;
  text-align: center;
  flex: 1;
  color: #333;
  font-size: 30rpx;
}

.sort-box .item .txt {
  display: block;
  width: 100%;
  height: 100%;
  color: #333;
}

.sort-box .item.active .txt {
  color: #b4282d;
}

.sort-box .item.by-price {
  background: url(//yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/no-3127092a69.png) 155rpx center no-repeat;
  background-size: 15rpx 21rpx;
}

.sort-box .item.by-price.active.asc {
  background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/up-636b92c0a5.png) 155rpx center no-repeat;
  background-size: 15rpx 21rpx;
}

.sort-box .item.by-price.active.desc {
  background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/down-95e035f3e5.png) 155rpx center no-repeat;
  background-size: 15rpx 21rpx;
}

.sort-box-category {
  background: #fff;
  width: 100%;
  height: auto;
  overflow: hidden;
  padding: 40rpx 40rpx 0 0;
  border-bottom: 1px solid #d9d9d9;
}

.sort-box-category .item {
  height: 54rpx;
  line-height: 54rpx;
  text-align: center;
  float: left;
  padding: 0 16rpx;
  margin: 0 0 40rpx 40rpx;
  border: 1px solid #666;
  color: #333;
  font-size: 24rpx;
}

.sort-box-category .item.active {
  color: #b4282d;
  border: 1px solid #b4282d;
}

.cate-item {
  margin-top: 175rpx;
  height: auto;
  overflow: hidden;
}

.cate-item .h {
  height: 145rpx;
  width: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.cate-item .h .name {
  display: block;
  height: 35rpx;
  margin-bottom: 18rpx;
  font-size: 30rpx;
  color: #333;
}

.cate-item .h .desc {
  display: block;
  height: 24rpx;
  font-size: 24rpx;
  color: #999;
}

.cate-item .b {
  width: 750rpx;
  padding: 0 6.25rpx;
  height: auto;
  overflow: hidden;
}

.cate-item .list-filter {
  height: 80rpx;
  width: 100%;
  background: #fff;
  margin-bottom: 6.25rpx;
}

.cate-item .b .item {
  float: left;
  background: #fff;
  width: 365rpx;
  margin-bottom: 6.25rpx;
  padding-bottom: 33.333rpx;
  height: auto;
  overflow: hidden;
  text-align: center;
}

.cate-item .b .item-b {
  margin-left: 6.25rpx;
}

.cate-item .item .img {
  width: 302rpx;
  height: 302rpx;
}

.cate-item .item .name {
  display: block;
  width: 365.625rpx;
  height: 35rpx;
  margin: 11.5rpx 0 22rpx 0;
  text-align: center;
  overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
		
  // padding: 0 20rpx;
  font-size: 30rpx;
  color: #333;
}

.cate-item .item .price {
  display: block;
  width: 365.625rpx;
  height: 30rpx;
  text-align: center;
  font-size: 30rpx;
  color: #b4282d;
}

.search-result-empty {
  width: 100%;
  height: 100%;
  padding-top: 300rpx;
}

.search-result-empty .icon {
  margin: 0 auto;
  display: block;
  width: 240rpx;
  height: 240rpx;
}

.search-result-empty .text {
  display: block;
  width: 100%;
  height: 40rpx;
  font-size: 28rpx;
  text-align: center;
  color: #999;
}

</style>

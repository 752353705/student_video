<template>
	<view>
		<scroll-view class="container" style="height: 100%;">
		  <view class="search-header">
		    <view class="input-box">
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
		<view class="list-container" style="padding: 12rpx;padding-top:54px;" >
			<view id="wf-list" class="list" v-for="(list, listIndex) in viewList" :key="listIndex">
				<!-- 每一个作品 -->
				<view class="item" v-for="(item, index) of list.list" :key="item.id" 
					:data-index="index" :data-listindex="listIndex"
					@longpress="longpress" @click="jump(item)">
					<!-- 作品封面 -->
					<u-lazy-load @load="handleViewRender(listIndex, index)" 
						@error="handleViewRender(listIndex, index)" 
						:image="item.coverUrl || 'https://ceshigfsc.oss-cn-beijing.aliyuncs.com/33e2ec6b-565e-4f0c-90b6-dd726ccec025.jpg' "
						>
					</u-lazy-load>
					<!-- 作品标题 -->
					<view class="introduction">
						{{ item.conversation || item.title }}
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
						<view style="display: flex;" >
							<view style="margin-right: 10rpx;" >
								<text style="margin-right: 10rpx;" 
									class="iconfont iconzongtoupiaoshu"
								></text>
								{{item.goldNumber}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="text-align: center;color: #999999;"  v-if="list.length == 0">
			—— 暂无更多 ——
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				viewList: [{ list: [] }, { list: [] }],
				initType:true,
				kw:"search",
				// 用户输入的关键字
				keyword: '',
				// 搜索到的信息
				searchStatus: false,
				goodsList: [],
				helpKeyword: [],
				defaultKeyword: {
					keyword:'输入作品标题'
				},
				page: 1,
				size: 10,
			};
		},
		mounted() {
			if (this.list.length) {
				this.init();
			}
		},
		// 用户进行上拉加载
		onReachBottom:function() {
			if (this.list.length == 10) {
				this.page = this.page + 1
				this.searchArticle()
			} else {
				wx.showToast({
					title: '已经到底了!',
					icon: 'none',
					duration: 2000
				});
				return false;
			}
		},
		methods:{
			// 制作瀑布流
			init() {
				this.viewList = [{ list: [] }, { list: [] }];
				setTimeout(() => {
					this.handleViewRender(0, 0);
				}, 0);
			},
			handleViewRender(x, y) {
				const index = this.viewList.reduce((total, current) => total + current.list.length, 0);
				const query = uni.createSelectorQuery().in(this);
				let listFlag = 0;
				query
					.selectAll('#wf-list')
					.boundingClientRect(data => {
						if(this.list.length == this.viewList[0].list.length + this.viewList[1].list.length) return
						listFlag = data[0].bottom - data[1].bottom <= 0 ? 0 : 1;
						this.viewList[listFlag].list.push(this.list[index]);
					})
					.exec();
			},
			// 用户点击 进行跳转操作
			jump(item) {
				// console.log('进行跳转 item', item);
				uni.navigateTo({
					url:`/pages/production/txtDetail?txtId=${item.id}`
				});
			},
			// 用户进行搜索文章
			searchArticle(){
				this.http({
					url: 'article/search',
					data: {
						pageNum: this.page,
						pageSize: 10,
						title: this.keyword
					}
				}).then(res => {
					// console.log('进行搜索',res)
					if(this.page !== 1){
						// console.log('上拉加载')
						this.list = this.list.concat(res.data.list) 
						this.handleViewRender()
					}else{
						// console.log('下拉刷新')
						this.list = res.data.list
						this.init();
					}
				})
			},
			// 用户输入内容发生改变
			inputChange: function(e) {
				// 剔除用户输入空格
				if(!e.detail.value || !e.detail.value.trim()){
					console.log('输入内容为空')
					return;
				}
				// 对比前后两个关键字是否一致
				if(e.detail.value == this.keyword){
					// 关键词一致
					this.searchStatus = false
				}else{
					// 关键词发生变化
					this.page = 1
					this.keyword = e.detail.value
					this.searchStatus = true
					// 进行搜素
					this.searchArticle()
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

<style lang="scss" scoped>

	.box{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-start;
		.item {
			width: 49%;
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
	}


.list-container {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;

	.list {
		width: calc(50% - 8rpx);
		display: flex;
		flex-direction: column;
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
  // top: 14rpx;
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

</style>

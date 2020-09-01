<template>
	<view class="container">
		<view class="cate-nav">
			<scroll-view scroll-x="true" class="cate-nav-body" style="width: 750rpx;" :scroll-left="scrollLeft">
				<view v-for="(item, index) in navList" :class="id == item.id ? 'active item' : 'item'" :key="item.id" :data-id="item.id" :data-index="index" @tap="switchCate">
					<view class="name jhx_f7">{{ item.name }}</view>
				</view>
			</scroll-view>
		</view>
		<scroll-view scroll-y="true" :scroll-top="scrollTop" :style="{ height: scrollHeight }">
			<view class="cate-item">
				<view class="b">
					<navigator
						:class="(iindex + 1) % 2 == 0 ? 'item-b item' : 'item'"
						:url="'/pages/shopdetail/shopdetail?id=' + iitem.id"
						v-for="(iitem, iindex) in goodsList"
						:key="iitem.id"
					>
						<image class="img" :src="iitem.picUrl" background-size="cover"></image>
						<text class="name jhx_f2">{{ iitem.name }}</text>
						<text class="price jhx_f8">￥{{ iitem.retailPrice }}</text>
					</navigator>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			navList: [],
			goodsList: [],
			id: 0,
			currentCategory: {},
			scrollLeft: 0,
			scrollTop: 0,
			scrollHeight: 0,
			page: 1,
			size: 10,
			totalPages: 1
		};
	},

	onLoad(options) {
		// 页面初始化 options为页面跳转所带来的参数
		var that = this;
		if (options.id) {
			that.id = parseInt(options.id);
		}

		wx.getSystemInfo({
			success: function(res) {
				that.scrollHeight = res.windowHeight
			}
		});

		this.getCategoryInfo();
	},
	onReachBottom: function() {
		if (this.totalPages > this.page) {
			this.page = this.page + 1;
		} else {
			wx.showToast({
				title: '已经到底了!',
				icon: 'none',
				duration: 2000
			});
			return false;
		}
		this.getGoodsList();
	},
	methods: {
		getCategoryInfo: function() {
			let that = this;

			this.api._get(
				'goods/category',
				{
					id: this.id
				},
				function(res) {
					if (res.errno == 0) {
						that.navList = res.data.brotherCategory;
						that.currentCategory = res.data.currentCategory;

						wx.setNavigationBarTitle({
							title: res.data.parentCategory.name
						});

						// 当id是L1分类id时，这里需要重新设置成L1分类的一个子分类的id
						if (res.data.parentCategory.id == that.id) {
							that.id = res.data.currentCategory.id;
						}

						//nav位置
						let currentIndex = 0;
						let navListCount = that.navList.length;
						for (let i = 0; i < navListCount; i++) {
							currentIndex += 1;
							if (that.navList[i].id == that.id) {
								break;
							}
						}
						if (currentIndex > navListCount / 2 && navListCount > 5) {
							that.scrollLeft = currentIndex * 60;
						}
						that.getGoodsList();
					} else {
						//显示错误信息
					}
				}
			);

			//   util.request(api.GoodsCategory, {
			//       id: this.data.id
			//     })
			//     .then(function(res) {

			//       if (res.errno == 0) {
			//         that.setData({
			//           navList: res.data.brotherCategory,
			//           currentCategory: res.data.currentCategory
			//         });

			//         wx.setNavigationBarTitle({
			//           title: res.data.parentCategory.name
			//         })

			//         // 当id是L1分类id时，这里需要重新设置成L1分类的一个子分类的id
			//         if (res.data.parentCategory.id == that.data.id) {
			//           that.setData({
			//             id: res.data.currentCategory.id
			//           });
			//         }

			//         //nav位置
			//         let currentIndex = 0;
			//         let navListCount = that.data.navList.length;
			//         for (let i = 0; i < navListCount; i++) {
			//           currentIndex += 1;
			//           if (that.data.navList[i].id == that.data.id) {
			//             break;
			//           }
			//         }
			//         if (currentIndex > navListCount / 2 && navListCount > 5) {
			//           that.setData({
			//             scrollLeft: currentIndex * 60
			//           });
			//         }
			//         that.getGoodsList();

			//       } else {
			//         //显示错误信息
			//       }

			//     });
		},

		getGoodsList: function() {
			var that = this;

			this._get(
				'goods/list',
				{
					categoryId: that.id,
					page: that.page,
					size: that.size
				},
				function(res) {
					(that.goodsList = that.goodsList.concat(res.data.goodsList)), (that.totalPages = res.data.totalPages);
				}
			);

			// util.request(api.GoodsList, {
			//     categoryId: that.data.id,
			//     page: that.data.page,
			//     size: that.data.size
			//   })
			//   .then(function(res) {
			//     that.setData({
			//       goodsList: that.data.goodsList.concat(res.data.goodsList),
			//       totalPages: res.data.totalPages
			//     });
			//   });
		},

		switchCate: function(event) {
			if (this.id == event.currentTarget.dataset.id) {
				return false;
			}
			var that = this;
			var clientX = event.detail.x;
			var currentTarget = event.currentTarget;
			if (clientX < 60) {
				that.scrollLeft = currentTarget.offsetLeft - 60;
			} else if (clientX > 330) {
				that.scrollLeft = currentTarget.offsetLeft;
			}
			this.id = event.currentTarget.dataset.id;
			this.goodsList = [];
			this.page = 1;
			this.totalPages = 1;

			this.getCategoryInfo();
		}
	}
};
</script>

<style>
.container {
	background: #f9f9f9;
}

.cate-nav {
	position: fixed;
	left: 0;
	top: 0;
	z-index: 1000;
}

.cate-nav-body {
	height: 84rpx;
	white-space: nowrap;
	background: #fff;
	border-top: 1px solid rgba(0, 0, 0, 0.15);
	overflow: hidden;
}

.cate-nav .item {
	display: inline-block;
	height: 84rpx;
	min-width: 130rpx;
	padding: 0 15rpx;
}

.cate-nav .item .name {
	display: block;
	height: 84rpx;
	padding: 0 20rpx;
	line-height: 84rpx;
	width: auto;
}

.cate-nav .item.active .name {
	color: #85c43f;
	border-bottom: 2px solid #85c43f;
}

.cate-item {
	margin-top: 94rpx;
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
	
	box-sizing: border-box;
	padding: 0 20rpx;
	font-size: 30rpx;
	color: #333;
	
	
	
}

.cate-item .item .price {
	display: block;
	width: 365.625rpx;
	height: 30rpx;
	text-align: center;
}
</style>

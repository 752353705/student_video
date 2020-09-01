<template>
	<view class="shop container">
		<!-- 搜索框 -->
		<view class="searchBox height">
			<u-icon class="tab_more" label="更多" label-pos="bottom" label-size="24" margin-top="10" size="50" name="arrow-down" color="white" label-color="white" @click="more"></u-icon>
			<navigator url="/pages/find/find" class="serach" hover-class="none">
				<u-icon size="40" name="search"></u-icon>
				<span>搜索</span>
			</navigator>
			<navigator class="tab_fenlei" url="/pages/shopClassify/shopClassify" hover-class="none">
				<u-icon label="分类" label-pos="bottom" label-size="24" margin-top="10" size="50" name="grid-fill" color="white" label-color="white"></u-icon>
			</navigator>
		</view>
		<!-- 背景图 -->
		<!-- <view class="bg"></view> -->
		<!-- 限制内容的区域 让其在中部体现 -->
		<view class="content">
			<!-- 轮播图 -->
			<view class="swiper_box">
				<swiper class="swiper" :autoplay="true" :interval="3000" :duration="500" :indicator-dots="false" circular="true" @change="currentChange">
					<swiper-item :style="{ 'background-color': item.background }" class="swiperitem" v-for="(item, index) in banner" :key="index">
						<image :src="item.url" mode="scaleToFill"></image>
					</swiper-item>
				</swiper>
				<view class="current">{{ current }}/{{ banner.length }}</view>
			</view>
			<!-- 购物车 图标 -->
			<view class="shop_car_box">
				<text class="cart-count">{{cartGoodsCount || 0}}</text>
				<!-- <image @click="goshopCar" class="shop_car" src="/static/car.png" mode=""></image> -->
				<text @click="goshopCar" class="t-icon icongouwuche"></text>
			</view>
			<!-- 分类图标 -->
			<view class="m-menu jhx_bg0">
				<navigator hover-class="none" class="item" :url="'/pages/shop/category?id=' + item.id" v-for="item in channel" :key="item.id">
					<image :src="item.iconUrl" background-size="cover"></image>
					<text class="jhx_f2">{{ item.name }}</text>
				</navigator>
			<!-- 	<navigator hover-class="none" class="item" url="/pages/catalog/catalog" open-type="switchTab">
					<image src="/static/channel_category.png" background-size="cover"></image>
					<text class="jhx_f2">更多分类</text>
				</navigator> -->
			</view>

			<!-- 活动专场 -->
			<view class="a-section a-topic" v-if="topics.length > 0">
				<view class="h">
					<view>
						<navigator url="/pages/topic/topic" hover-class="none"><text class="txt jhx_f4">活动专场</text></navigator>
					</view>
				</view>
				<view class="b">
					<scroll-view scroll-x class="list">
						<view class="item" v-for="(item, index) in topics" :key="item.id">
							<navigator :url="'../topicDetail/topicDetail?id=' + item.id" hover-class="none">
								<image class="img" :src="item.picUrl" background-size="cover"></image>
								<view class="np">
									<text class="name jhx_f7">{{ item.title }}</text>
									<text class="price jhx_f8">￥{{ item.price }}元起</text>
								</view>
								<text class="desc jhx_f5">{{ item.subtitle }}</text>
							</navigator>
						</view>
					</scroll-view>
				</view>
			</view>

			<!-- 商品瀑布流的渲染 -->
			<shop-waterfall :list="newGoods"></shop-waterfall>

		</view>

		<!-- 展示更多的 弹出框 -->
		<uni-popup ref="popupShare" type="top"><uni-popup-more @changeCommentsNum="changeCommentsNum" :videoId="videoId" @select="select" @close="close"></uni-popup-more></uni-popup>
	</view>
</template>

<script>
// 引入展示更多的 弹出框
import uniPopupMore from '../../components/uni-popup/uni-popup-more.vue';
//测试用数据
import Json from '../../Json.js';
// 引入商品瀑布流
import shopWaterfall from '@/components/shop-waterfall.vue';
// import QrcodePoster from '/components/zhangyu-qrcode-poster.vue'
import MescrollItem from '@/components/mescroll-swiper-item.vue';
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
// 引入tabHead 切换
// import swiperTabHead from '@/components/swiper-tab-head.vue';
export default {
	data() {
		return {
			id: '',
			cartGoodsCount:'', //当前购物车内的商品
			goods: [], // 商品列表
			banner: [], //swiper轮播图图片
			// 轮播图的指示点
			current: 1,
		
			tabIndex: 0,
			swiper_height: '', // 需要固定swiper的高度
			height: 0,
			tabTop: 0,

			// 插件数据
			channel: [], //分类专区
			topics: [], //活动专场
			newGoods: [''] //新品首发
		};
	},
	components: {
		shopWaterfall,
		// swiperTabHead,
		uniPopupMore,
		MescrollItem
	},
	onLoad() {
		let _this = this;
		// 发起请求进行网络请求
		this.api._get('home/index', {}, function(res) {
			console.log('请求数据', res);

			// 配置 商城数据
			_this.banner = res.data.banner;
			_this.channel = res.data.channel;
			_this.topics = res.data.topicList;
			_this.newGoods = res.data.newGoodsList;
		});

		// this.$refs.popupShare.open();
		// 获取商品的 展示列表
		// this.loadData();
		// 设置滚动区域的高度
		uni.getSystemInfo({
			success(res) {
				// console.log('页面信息res',res)
				_this.phoneHeight = res.windowHeight; //获取用户设备的高度
				console.log('用户的设备高度', res.windowHeight);
				// 计算组件的高度
				let view = uni.createSelectorQuery().selectAll('.height');
				view
					.boundingClientRect(data => {
						// 计算上方各元素的高度总和
						data.forEach((item, index) => {
							// console.log('item',item.height)
							_this.height += parseInt(item.height);
						});
						_this.swiper_height = _this.phoneHeight - _this.height;
						// console.log('_this.height',_this.height)
						_this.swiper_height = _this.swiper_height + 'px';
					})
					.exec();
			}
		});

		// 获取搜索框的高度,进而决定，分类列表头部距离顶部的粘性定位
		let view = uni.createSelectorQuery().selectAll('.searchBox');
		view
			.boundingClientRect(data => {
				// 计算上方各元素的高度总和
				data.forEach((item, index) => {
					// console.log('item',item.height)
					_this.height += parseInt(item.height);
				});
				_this.tabTop = _this.height;
			})
			.exec();
	},
	onReady() {
		// 动态设置滚动区域的高度
		let _this = this;
		uni.getSystemInfo({
			success(res) {
				// console.log('页面信息res',res)
				_this.phoneHeight = res.windowHeight; //获取用户设备的高度
				// console.log(res.windowHeight);
				// 计算组件的高度
				let view = uni.createSelectorQuery().selectAll('.height');
				view
					.boundingClientRect(data => {
						// 计算上方各元素的高度总和
						data.forEach((item, index) => {
							console.log('item', item.height);
							_this.height += parseInt(item.height);
						});
						_this.height = _this.height + 'px';
					})
					.exec();
			}
		});
	},
	onShow() {
		let that = this
		// that.cartGoodsCount = 3
		// 获取当前 购物车之中 商品数量
		this.api._get('cart/goodscount',{
			id:that.id
		},function( res ){
			console.log('onShow res',res.data )
			that.cartGoodsCount = res.data 
		})
	},
	methods: {
		// 展示更多内容
		more() {
			console.log('展示更多');
			this.$refs.popupShare.open();
		},
		close() {
			this.$refs.popupShare.close();
		},
		// loadData() {
		// 	// 获取商品列表中的数据
		// 	this.goods = Json['goodsList'];
		// 	// 获取轮播图中的数据
		// 	// this.swiperImg = Json['carouselList']
		// },
		// 监控轮播图的变化
		currentChange(e) {
			// console.log('轮播图变化',e.detail.current)
			this.current = e.detail.current + 1;
		},
		// 跳转到购物车页面
		goshopCar() {
			uni.navigateTo({
				url: '/pages/shopcar/shopcar'
			});
		},
		// 控制tab切换
		//接受子组件传过来的值点击切换导航
		tabtap(index) {
			console.log('点击切换');
			this.tabIndex = index;
		},
		//滑动切换导航
		tabChange(e) {
			this.tabIndex = e.detail.current;
		}
	}
};
</script>

<style lang="less">
.shop {
	// 搜索框
	.searchBox {
		width: 100%;
		height: 99rpx;
		// background-color: #f1c91c;
		background-color: #85c43f;
		padding: 20rpx 0;
		position: sticky;
		z-index: 10;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 10rpx 20rpx;
		margin-bottom: 5px;
		padding-bottom: 30rpx;
		.serach {
			background-color: white;
			border-radius: 33rpx;
			width: 100%;
			height: 100%;
			text-align: center;
			color: #453a74;
			display: flex;
			align-items: center;
			justify-content: center;
			image {
				width: 40rpx;
				height: 40rpx;
				margin-right: 13rpx;
			}
		}
		.tab_more {
			margin-right: 18rpx;
		}
		.tab_fenlei {
			margin-left: 18rpx;
		}
	}

	// 背景图
	.bg {
		width: 100%;
		height: 160px;
		background-color: #f83f20;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 0 0 20rpx 20rpx;
	}

	// 内容区域
	.content {
		box-sizing: border-box;
		padding: 0 20rpx;
		overflow: hidden;
		// 轮播图 盒子
		.swiper_box {
			position: relative;
			border-radius: 25rpx;
			overflow: hidden;
			.swiper {
				.swiperitem {
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
			.current {
				width: 56rpx;
				height: 44rpx;
				font-size: 27rpx;
				position: absolute;
				bottom: 10px;
				right: 11px;
				background-color: #f83f20;
				color: white;
				border-radius: 20rpx;
				box-sizing: border-box;
				padding: 7rpx 10rpx;
				opacity: 0.8;
			}
		}
		// 购物车图标
		.shop_car_box {
				width: 73rpx;
				height: 73rpx;
				// background-color: #f83f20;
				border-radius: 50%;
				overflow: hidden;
				position: fixed;
				bottom: 33rpx;
				right: 40rpx;
				z-index: 20;
				opacity: 1;
				.shop_car {
					width: 100%;
					height: 100%;
				}
				.cart-count{
					height: 28rpx;
					width: 28rpx;
					z-index: 10;
					position: absolute;
					top: 6rpx;
					right:  8rpx;
					background: #b4282d;
					text-align: center;
					font-size: 18rpx;
					color: #fff;
					line-height: 28rpx;
					border-radius: 50%;
						
				}
			}
		
		
		
	
		// 分类图标
		.cate-section {
			display: flex;
			justify-content: space-around;
			align-items: center;
			flex-wrap: wrap;
			padding: 30upx 22upx;
			background: #fff;
			.cate-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 26upx;
				color: #303133;
			}
			image {
				width: 88upx;
				height: 88upx;
				margin-bottom: 14upx;
				border-radius: 50%;
				opacity: 0.7;
				box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);
			}
		}
	}
}

// 插件样式
.m-menu {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	padding-bottom: 0rpx;
	padding-top: 30rpx;
}

.m-menu .item {
	width: 139rpx;
	height: 136rpx;
}

.m-menu image {
	display: block;
	width: 64rpx;
	height: 64rpx;
	margin: 0 auto;
	margin-bottom: 16rpx;
}

.m-menu text {
	display: block;
	text-align: center;
	margin: 0 auto;
	line-height: 1;
	font-size: 24rpx;
}

.a-section {
	// width: 750rpx;
	width: 100%;
	height: auto;
	overflow: hidden;
	background: #fff;
}

.a-section .h {
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: center;
	height: 130rpx;
}

.a-section .h .txt {
	padding-right: 30rpx;
	background-size: 16.656rpx 27rpx;
	display: inline-block;
	height: 36rpx;
	line-height: 36rpx;
}
.container .a-section .title {
	height: 120rpx;
	border-top: 0rpx solid #eee;
	padding-top: 14rpx;
	margin: 0 30rpx;
}

.container .a-section .title .text {
	width: 530rpx;
}

.container .a-section .title .text .name {
	margin-bottom: 5rpx;
	position: relative;
}

.container .a-section .title .text .name .new {
	position: absolute;
	top: 6rpx;
	left: 210rpx;
	font-size: 20rpx;
	font-weight: bold;
}

.container .a-section .title .more .iconfont {
	margin-left: 9rpx;
	font-size: 26rpx;
	vertical-align: 3rpx;
}

.container .a-section .hot-bg {
	width: 100%;
	height: 215rpx;
	background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAADXCAMAAAByKSS0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4MGE2NWE3Zi0yNWE4LTZmNGQtYTMxMy00MTZhMTBmYmE0ODQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzAzNzI0OTY3QTU4MTFFOTlFNzhFREU5RTk4NzY5N0QiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzAzNzI0OTU3QTU4MTFFOTlFNzhFREU5RTk4NzY5N0QiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzA2YjgyZTgtYmI3ZC1jZDQ0LWI1ZGYtZDg2MTY0N2ExZTgyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjgwYTY1YTdmLTI1YTgtNmY0ZC1hMzEzLTQxNmExMGZiYTQ4NCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiPwrBwAAAGAUExURf2cSv/58f2gTfVSIPyWFv/t1v2gFfZZMfyeFf2jFP7QkP2qU+atUfuHLvdpHPuSFvl2G/7YpfycFfZaHvuFMfyaFf7Hc/qKGOqwU/yYFv2kFPdrHPqoK+iuUvuQF/dmHfhxG/qFGPdjHfuOF/huHPh0G/diHfhsHPZeHvhyG/uMF/VVH/ZcHvZZH/ZgHvl4Gv2zWfqIGPl6GvuJMPqGGPVWH/2lO/qCGfl+Gfl8GvuwdO2yVPl8J/qBMfuINf21RvqAGeuxU/7kuvqENfqIOPZdNPp9MfuUFv2lUOusR/qFOPG1VPqBNf2wV/uMMP68VP2lG/y+jv2+Xv2vNvZgNfqVVfuNNu+zVPVWKPZhHvZbM/ZYLPuaJva4VPuZOf3cwP2lF/dsHPCwSfGsO/ulXvynIPl9IPqII/uMG/ycG/mIQPqFIPl4H/h1If2tVfuMI/hzIvmBJPuRIvqHG/qeY/mAG/qCGvmAGfVXH/VTIPhvHPZYMPyZFvuLGPl9Gv///yfqZwMAAACAdFJOU/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AOAVLZwAAEzJJREFUeNrsnYl7E8cBxSciRPGhJE4U1wGZltxN0sTURBBbkjEyDr5lGSTV4nBxhCm4gDnjuJB/vbOHVrO7s6d2pZ3Z94Qp6de0n9ufX9++fbNLTg1Yx7q+t+hnTb+r+gerT3r6QdW3Zv2o6F+Kvlb0eVd/NekDVmep/v0N1Ze6/qD6W1d/p/qK0UdUPzH6p65fqN5SXdb1+vXrK1cuMTqv6yLVBV1/6eoN1XeKvujqHKsPu/pV1bsmfabqf4o+VfQxo/fNes+mEZvOJECFmZkNRY8fPx6juk6VuZ5RRKwqhv9PIcOB3YH2333Q/m3MtFthD0T7pfC0nwtI+/+iov1MQmg34a7yruFuAv6O8nVrTwzcg9P+STDaPw9C+5cJoP2LaGl/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');
	background-repeat: no-repeat;
	background-size: 100% 100%;
	box-sizing: border-box;
	padding: 14rpx;
	margin-bottom: 0;
}

.container .a-section .hot-bg .title {
	height: 87rpx;
}

.container .a-section .hot-bg .title .text {
	width: 575rpx;
	font-size: 24rpx;
	color: #fff;
}

.container .a-section .hot-bg .title .text .label {
	font-size: 30rpx;
	font-weight: bold;
	margin-right: 20rpx;
	color: #fff;
}

.container .a-section .hot-bg .title .more {
	font-size: 26rpx;
	color: #fff;
}

.container .a-section .hot-bg .title .more .iconfont {
	font-size: 25rpx;
	vertical-align: 2rpx;
	margin-left: 10rpx;
	color: #fff;
}
.a-topic .b {
	height: 533rpx;
	width: 100%;
	padding: 0 0 48rpx 0;
}

.a-topic .b .list {
	height: 533rpx;
	width: 100%;
	white-space: nowrap;
}

.a-topic .b .item {
	display: inline-block;
	height: 533rpx;
	width: 100%;

	overflow: hidden;
}

.a-topic .b .item:last-child {
	// margin-right: 30rpx;
}

.a-topic .b .img {
	height: 387.5rpx;
	width: 680.5rpx;
	margin-bottom: 30rpx;
}

.a-topic .b .np {
	height: 55rpx;
	text-align: center;
	width: 680.5rpx;
}

.a-topic .b .np .price {
	padding-left: 40rpx;
}

.a-topic .b .desc {
	display: block;
	height: 39rpx;
	text-align: center;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.jhx_f8 {
	font-size: 33rpx;
	color: #ec4223;
	font-weight: bold;
}

.jhx_f4 {
	font-size: 30rpx;
	color: #333;
	font-weight: bold;
}
</style>

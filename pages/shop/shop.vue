<template>
	<view class="shop">
		<!-- 搜索框 -->
		<view class="searchBox height" >
			<navigator url="" class="serach" @click="goSearch">
				<image src="/static/search.png" mode=""></image>
				<span>搜索</span>
			</navigator>
			<!-- 分类 -->
			<navigator class="tab_fenlei" url="/pages/shopClassify/shopClassify" >
				<image src="/static/fenlei.png" mode=""></image>
			</navigator>
		</view>
		
		
		<!-- 轮播图 -->
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="true" 
						:autoplay="true" :interval="3000" :duration="500"
						circular="true" previous-margin="15px"   next-margin="15px"
					>
						<swiper-item style="background-color: #0062CC;">
							<view  class="swiper-item uni-bg-red">A</view>
						</swiper-item>
						<swiper-item style="background-color: #cc306e;">
							<view  class="swiper-item uni-bg-green">B</view>
						</swiper-item>
						<swiper-item style="background-color: #8acc61;">
							<view  class="swiper-item uni-bg-blue">C</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		
		<!-- 商品分类 -->
			<!-- 头部类别展示 -->
			<swiperTabHead :top="height" :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiperTabHead>
			
			<!-- 相应的商品展示 -->
			<swiper :style="{height:swiper_height}" :current="tabIndex" @change="tabChange">
				<swiper-item style="box-sizing: border-box;padding: 0 10rpx;" v-for="(tab,i) in tabBars" :key="i">
					<mescroll-item :waterFullHeight="swiper_height" :i="i" :index="tabIndex" :tabs="tabBars"></mescroll-item>
				</swiper-item>
			</swiper>
			
		
	</view>
</template>

<script>
	// import QrcodePoster from '/components/zhangyu-qrcode-poster.vue'
	import MescrollItem from "@/components/mescroll-swiper-item.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	// 引入tabHead 切换
	import swiperTabHead from "@/components/swiper-tab-head.vue";
	export default {
	    data() {
				return {
					tabBars:[
						{ name:"推荐",id:"guanzhu" },
						{ name:"配饰",id:"tuijian" },
						{ name:"服装",id:"tuijian" },
						{ name:"包包",id:"tuijian" },
						{ name:"内衣",id:"tuijian" },
					], 
					tabIndex:0,
					swiper_height: "", // 需要固定swiper的高度
					height:0,
				}
	    },
			components:{
				swiperTabHead,
				MescrollItem,
			},
			onLoad() {
				this.swiper_height = uni.getSystemInfoSync().windowHeight + 'px'
			},
			onReady() {
				// 动态设置滚动区域的高度
				let _this = this 
				uni.getSystemInfo({
					success(res) {
						// console.log('页面信息res',res)
							_this.phoneHeight = res.windowHeight; //获取用户设备的高度
							// console.log(res.windowHeight);
							// 计算组件的高度
							let view = uni.createSelectorQuery().selectAll('.height');
							view.boundingClientRect(data => {
								// 计算上方各元素的高度总和
								data.forEach((item,index) => {
									console.log('item',item.height)
									_this.height += parseInt(item.height)
								})
									_this.height = _this.height + 'px'
							}).exec();
					}
				});
				
				
				
			},
	    methods: {
				// 控制轮播图
	        changeIndicatorDots(e) {
	            this.indicatorDots = !this.indicatorDots
	        },
	        changeAutoplay(e) {
	            this.autoplay = !this.autoplay
	        },
	        intervalChange(e) {
	            this.interval = e.target.value
	        },
	        durationChange(e) {
	            this.duration = e.target.value
	        },
			// 控制tab切换
				//接受子组件传过来的值点击切换导航
				tabtap(index){
					console.log('点击切换')
					this.tabIndex = index;
				},
				//滑动切换导航
				tabChange(e){
				  this.tabIndex = e.detail.current
				},
	    }
	}
</script>

<style lang="less">
	.shop{
		box-sizing: border-box;
		padding: 0 20rpx;
		
		// 搜索框
		.searchBox{
			width: 100%;
			height: 80rpx;
			background-color: white;
			padding: 20rpx 0;
			position: sticky;
			z-index: 10;
			top: 0;
			left: 0;
			display: flex;
			align-items: center;
			.serach{
				background-color: #cbcbcf;
				border-radius: 33rpx;
				width: 100%;
				height: 100%;
				text-align: center;
				color: #453a74;
				display: flex;
				align-items: center;
				justify-content: center;
				image{
					width: 40rpx;
					height:40rpx ;
					margin-right: 13rpx;
				}
			}
			.tab_fenlei{
				margin-left: 18rpx;
				image{
					width: 48rpx;
					height: 48rpx;
				}
			}
		}
	
	
	
	}
</style>

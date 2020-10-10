<template>
	<view class="listPage">
		<!-- 搜索框 -->
		<view class="searchBox height">
			<view class="serach " @click="goSearch">
				<u-icon size="40" name="search"></u-icon>
				<span>搜索</span>
			</view>
		</view>
		
		<!-- 赛事 类型说明 height -->
		<view class="game_type height">
			<view class="le">
				<view >
					<image class="img_box" src="" :mode="aspectFit"></image>
				</view>
				<view class="body">
					<view class="name">红书杯大赛</view>
					<view class="desc">拍视频,赢大奖</view>
				</view>
			</view>
			<view class="btn" @click="goGame">
				去参赛
			</view>
		</view>
		
		
		<!-- 视频分类 -->
		<!-- <swiperTabHead class="height" ref="swipertab" :flex="true" 
			:tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap" 
			:top="top"></swiperTabHead> -->
		<!-- <view class=""></view> -->
		<!-- 小喇叭 进行通知 -->
		<!-- <u-notice-bar class="height notice" 
			  mode="horizontal" 
			:is-circular="true" :list="notice"
			>
		</u-notice-bar> -->
		
		<!-- 轮播滑动页面 -->
		<!-- <swiper style="" :style="{height:mescroll_height}" :current="tabIndex" @change="tabChange"> -->
			<!-- <swiper-item :emptyOption="emptyOption" style="box-sizing: border-box;padding: 0 10rpx;" v-for="(tab,i) in tabBars" :key="i"> -->
				<mescroll-item :mescrollBot="mescrollBot" 
					:kw="kw" @showUseroperation="showUseroperation" 
					@closeUseroperation="closeUseroperation" :waterFullHeight="mescroll_height" 
					:i="i" :index="tabIndex" :tabs="tabBars"
					@getListVideo="getListVideo" 
					
				>
				</mescroll-item>
			<!-- </swiper-item> -->
		<!-- </swiper> -->
	</view>
</template>

<script>
	// 引入mescroll-mixins.js
	import MescrollItem from "@/components/mescroll-swiper-item.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollEmpty from '@/components/mescroll-uni/components/mescroll-empty.vue';
	import {apiSearch} from "@/API/mock.js"
	// 引入tabHead 切换
	import swiperTabHead from "@/components/swiper-tab-head.vue";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				// 视频滚动区域距离底部的距离
				// mescrollBot:'200',
				// 视频的数据
				// videolist:[],
				// 请求数据的关键词
				kw:"listTxt",
				// notice:[
				// 	'寒雨连江夜入吴',
				// 	'平明送客楚山孤',
				// 	'洛阳亲友如相问',
				// 	'一片冰心在玉壶'
				// ],
				// 空布局时自定义提示
				emptyOption:{
					tip:'list空布局提示'
				},
				top:"0rpx",
				// 参赛选手列表
				height:0,
				mescroll_height:'',
				//控制nav切换
				tabIndex:0,// 选中的
				tabBars:[
					// { name:"视频",id:"listVideo" },
					{ name:"图文",id:"listTxt" },
					// { name:"跳蚤市场",id:"listUsed" },
				], 
			}
		},
		components:{
			MescrollEmpty,
			MescrollItem,
			swiperTabHead,
		},
		onLoad() {
			let _this = this
			// 设置滚动区域的高度
			uni.getSystemInfo({
				success(res) {
						_this.phoneHeight = res.windowHeight; //获取用户设备的高度
						console.log('用户的设备高度',res.windowHeight);
						// 计算组件的高度
						let view = uni.createSelectorQuery().selectAll('.height');
						view.boundingClientRect(data => {
							// 计算上方各元素的高度总和
							data.forEach((item,index) => {
								// console.log('item',item.height)
								_this.height += parseInt(item.height)
							})
								_this.mescroll_height =  _this.phoneHeight - _this.height ;
								_this.mescroll_height =  _this.mescroll_height +"px";
						}).exec();
				}
			});
		},
		onReady() {
			
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {
				// 来自页面内转发按钮
				console.log(res.target)
			}
			return {
				title: '首页分享',
				path: '/page/list/list'
			}
		},
		onShow() {
			// console.log('list页面 onshow 进行页面的刷新')
			
		},
		methods: {
			// 用户点击比赛跳转到大赛界面
			goGame(){
				console.log('跳转大赛')
				uni.navigateTo({
					url:'/pages/Introduction/Introduction'
				})
			},
			
			// 控制签到弹窗的显隐
			showSigin(){
				this.$refs.popup_sigin.close()
			},
			// 控制 首页 用户操作弹窗的显隐
			showUseroperation(btntop,btnleft){
				// console.log('list 中 按钮显示的位置',"btntop ==>",btntop,"btnleft ==>",btnleft)
				// this.opertop = btntop
				// this.operleft = btnleft
				// this.$refs.popup_useoperation.open()
			},
			
			// 用于关闭弹窗
			closeUseroperation(num){
				this.$refs.popup_useoperation.close()
			},
			//滑动切换导航
			tabChange(e){
			  this.tabIndex = e.detail.current
				// 用户进行 互动操作，修改 kw 进行请求不同类型的数据
				this.kw = this.tabBars[this.tabIndex].id
			},
			//接受子组件传过来的值点击切换导航
			tabtap(index){
				this.tabIndex = index;
				this.kw = this.tabBars[this.tabIndex].id
			},
			// 控制测试的视频列表
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			// 跳转到搜搜页面
			goSearch(){
				uni.navigateTo({
					url:"/pages/find/find"
				})
			},
		}
	}
</script>

<style  scoped lang="less">
	// page{
	// 	background-color: #f5f6fa;
	// }
	.listPage{
		background-color: #f5f6fa;
		box-sizing: border-box;
		padding: 0rpx 10rpx 0;
		// 滚动的小喇叭
		// .notice{
		// 	position: fixed;
		// 	top:0;
		// 	top:144rpx;
		// 	width: 100%;
		// 	height: 40px;
		// 	z-index: 90;
		// 	box-sizing: border-box;
		// 	padding-right: 20rpx;
		// }
		
		.searchBox{
			width: 100%;
			height: 77rpx;
			background-color: white;
			padding: 50rpx 0 20rpx 0;
			position: sticky;
			z-index: 10;
			top: 0;
			left: 0;
			.serach{
				background-color: #f5f5f5;
				border-radius: 33rpx;
				width: 69%;
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
		}
		
		// 赛事分类
		.game_type{
			background-color: white;
			margin-bottom: 20rpx;
			position: sticky;
			margin-top: 30rpx;
			top: 133rpx;
			left: 0;
			z-index: 20;
			// width: 99%;
			height: 168rpx;
			// background-color: red;
			box-sizing: border-box;
			padding-left: 20rpx;
			padding-top: 20rpx;
			padding-right: 20rpx;
			padding-bottom: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			// 四周阴影
			// box-shadow:0px 2px 5px 5px #dddddd;
			
			// box-shadow:0px 1px 10px 3px #dddddd;
			
			// box-shadow: 10px 10px 5px #dddddd;
			
			.le{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.img_box{
					background-color: yellow;
					border-radius: 50%;
					width: 100rpx;
					height: 100rpx;
				}
				.body{
					margin-left: 20rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					.name{
						font-size: 30rpx;
						font-weight: bold;
					}
					.desc{
						color: #6d6d6d;
						margin-top: 20rpx;
						font-size: 20rpx;
					}
				}
			}
			.btn{
				box-sizing: border-box;
				// padding-left: 16rpx;
				// padding-top: 10rpx;
				// padding-right: 16rpx;
				// padding-bottom: 10rpx;
				padding: 10rpx 16rpx;
				border: 1px solid black;
				border-radius: 10rpx;
				font-size: 20rpx;
			}
		}
		
		// .pop{
		// 	.imgBox{
		// 		width: 100%;
		// 		display: flex;
		// 		justify-content: center;
		// 		align-items: center;
		// 		.img{
		// 			width: 62.5rpx;
		// 			height: 62.5rpx;
		// 			margin-top: 20rpx;
		// 		}
		// 	}
		// }
	}
</style>

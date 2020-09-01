	<!-- wxd568924fb2698a50 -->
<template>
	<view class="listPage">
		<!-- 搜索框 -->
		<view class="searchBox height">
			<view class="serach " @click="goSearch">
				<!-- <image src="/static/search.png" mode=""></image> -->
				<u-icon size="40" name="search"></u-icon>
				<span>搜索</span>
			</view>
		</view>
		
		<!-- 视频分类 -->
		<swiperTabHead class=" height" ref="swipertab" :flex="true" :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap" :top="top"></swiperTabHead>
		
		<!-- 小喇叭 进行通知 -->
		<u-notice-bar class=" height notice" 
			  mode="horizontal" 
			:is-circular="true" :list="notice"
			>
		</u-notice-bar>
		
		<!-- 轮播滑动页面 -->
		<swiper style="margin-top: 49px;" :style="{height:mescroll_height}" :current="tabIndex" @change="tabChange">
			<swiper-item :emptyOption="emptyOption" style="box-sizing: border-box;padding: 0 10rpx;" v-for="(tab,i) in tabBars" :key="i">
				<mescroll-item :mescrollBot="mescrollBot" :videolist='videolist' 
					:kw="kw" @showUseroperation="showUseroperation" 
					@closeUseroperation="closeUseroperation" :waterFullHeight="mescroll_height" 
					:i="i" :index="tabIndex" :tabs="tabBars"
				>
				</mescroll-item>
			</swiper-item>
		</swiper>
		
		<!-- 用于进行用户操作的弹出框 -->	
		<!-- <uni-popup  class="pop" animation="false" ref="popup_useoperation" type="00" mask-click="false">
			<uni-popup-useoperation :opertop="opertop" :operleft="operleft" type="success"  message="成功消息" duration="0" />
		</uni-popup> -->
		
	</view>
</template>

<script>
	// 用户进行操作的提示 弹出框
	import uniPopupUseoperation from '@/components/uni-popup/uni-popup-useoperation.vue'
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
				mescrollBot:'300',
				// 视频的数据
				videolist:[],
				// 请求数据的关键词
				kw:"listVideo",
				// kw:"listTxt",
				
				// 控制操作窗口的弹窗 暂时 功能隐藏
				// opertop:"300rpx",
				// operleft:"100rpx",
				// 小喇叭提示
				notice:[
					'寒雨连江夜入吴',
					'平明送客楚山孤',
					'洛阳亲友如相问',
					'一片冰心在玉壶'
				],
				// 空布局时自定义提示
				emptyOption:{
					tip:'list空布局提示'
				},
				top:"144rpx",
				// 参赛选手列表
				height:0,
				mescroll_height:'',
				//控制nav切换
				tabIndex:0,// 选中的
				tabBars:[
					{ name:"视频",id:"listVideo" },
					{ name:"文章",id:"listTxt" },
					{ name:"二手",id:"listUsed" },
				], 
			}
		},
		components:{
			MescrollEmpty,
			MescrollItem,
			swiperTabHead,
			uniPopupUseoperation,
		},
		onLoad() {
			// this.mescroll_height = uni.getSystemInfoSync().windowHeight + 'px'
			let _this = this
			// 设置滚动区域的高度
			uni.getSystemInfo({
				success(res) {
					// console.log('页面信息res',res)
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
		onShow() {
			console.log('list页面 onshow 进行页面的刷新')
			
		},
		methods: {
			// 控制用户操作弹窗的显隐
			// showUseroperation(btntop,btnleft){
			// 	console.log('list 中 按钮显示的位置',"btntop ==>",btntop,"btnleft ==>",btnleft)
				
			// 	this.opertop = btntop
			// 	this.operleft = btnleft
				
			// 	this.$refs.popup_useoperation.open()
			// },
			
			// 用于关闭弹窗
			closeUseroperation(num){
				// console.log('关闭')
				this.$refs.popup_useoperation.close()
				// this.$refs.popup_video.close()
			},
			
			//滑动切换导航
			tabChange(e){
			  this.tabIndex = e.detail.current
				// 用户进行 互动操作，修改 kw 进行请求不同类型的数据
				this.kw = this.tabBars[this.tabIndex].id
				
				
				// 当 tabIndex 到 4  的时候触发 swiper 的滚动效果
				// 触发 滚动头部 到左侧的距离
				// this.$refs.swipertab.changeLeft(this.tabIndex)
				
				
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
					url:"../find/find"
				})
			},
		
		}
	}
</script>

<style  scoped lang="less">
	.listPage{
		box-sizing: border-box;
		padding: 0rpx 10rpx 0;
		
		// 滚动的小喇叭
		.notice{
			position: fixed;
			// top:196rpx;
			top:212rpx;
			width: 100%;
			height: 40px;
			z-index: 90;
			box-sizing: border-box;
			padding-right: 20rpx;
		}
		
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
				background-color: #cbcbcf;
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
		
		.pop{
			.imgBox{
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				.img{
					width: 62.5rpx;
					height: 62.5rpx;
					margin-top: 20rpx;
				}
			}
		}
		
	}
	

</style>

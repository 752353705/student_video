<template>
	<view class="listPage">
		<!-- 搜索框 -->
		<!-- <view class="searchBox height">
			<view class="serach " @click="goSearch">
				<u-icon size="40" name="search"></u-icon>
				<span>搜索</span>
			</view>
		</view> -->
		
		<!-- 视频分类 -->
		<!-- <swiperTabHead class="height" ref="swipertab" :flex="true" 
			:tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap" 
			:top="top"></swiperTabHead> -->
		<view class=""></view>
		<!-- 小喇叭 进行通知 -->
		<u-notice-bar class="height notice" 
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
					@getListVideo="getListVideo"
				>
				</mescroll-item>
			</swiper-item>
		</swiper>
		
		<!-- 用于进行用户操作的弹出框 -->	
		<!-- <uni-popup  class="pop" animation="false" ref="popup_useoperation" type="00" mask-click="false">
			<uni-popup-useoperation :opertop="opertop" :operleft="operleft" type="success"  message="成功消息" duration="0" />
		</uni-popup> -->
		
		<!-- 用户进行签到的弹框 -->
		<!-- <uni-popup  class="pop" animation="false" ref="popup_sigin"  mask-click="false">
			<uni-popup-sigin @showSigin="showSigin" :opertop="opertop" :operleft="operleft" type="success"  message="成功消息" duration="0" />
		</uni-popup> -->
		
	</view>
</template>

<script>
	// 用户进行签到
	// import uniPopupSigin from '@/components/uni-popup/uni-popup-sigin.vue'
	
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
				mescrollBot:'166',
				// 视频的数据
				videolist:[],
				// 请求数据的关键词
				kw:"listTxt",
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
				// top:"144rpx",
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
			// uniPopupSigin,
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
			// this.$refs.popup_sigin.open()
			console.log('list页面 onshow 进行页面的刷新')
			// 先进行判断是否有sigin 值
			// if(!uni.getStorageSync('sigin')){
			// 	if(!uni.getStorageSync('token')){
			// 		return
			// 	}
			// 	// 没有值 -  进行签到
			// 	this.api._post('user/signResult',{},(res)=>{
			// 		console.log('没有 sigin',res)
			// 		if(res.data =='no'){
			// 			// this.$refs.popup_sigin.open()
			// 			// 跳转到签到页面
			// 			uni.navigateTo({
			// 				url:"/pages/my/mySigin"
			// 			})
			// 		}
			// 	})
			// }else{
			// 	// 有值 进行 判断是否 已经过期
			// 	// 获取当前的时间戳
			// 	let nowTime = new Date().getTime()
			// 	if(nowTime - JSON.parse(uni.getStorageSync('sigin')).siginTime > JSON.parse(uni.getStorageSync('sigin')).overTime ){
			// 		console.log('应当重新进行签到了')
			// 		// 弹出签到框
			// 		// this.$refs.popup_sigin.open()
			// 		uni.navigateTo({
			// 			url:"/pages/my/mySigin"
			// 		})
			// 	}
			// 	// else{
			// 	// 		uni.showToast({
			// 	// 			icon:'none',
			// 	// 			title:'已完成签到'
			// 	// 		})
						
						
			// 	// 	}
			// }
		},
		methods: {
			// 控制签到弹窗的显隐
			showSigin(){
				this.$refs.popup_sigin.close()
			},
			// 控制 首页 用户操作弹窗的显隐
			showUseroperation(btntop,btnleft){
				console.log('list 中 按钮显示的位置',"btntop ==>",btntop,"btnleft ==>",btnleft)
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
			top:0;
			// top:212rpx;
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

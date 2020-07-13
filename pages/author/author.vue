<template>
	<view class="author">
		<!-- 头部 -->
		<view class="head height">
			<view class="userImg"></view>
			<view class="right">
				<view class="box">
					<!-- 关注 -->
					<view class="focus t_c" @click="goFans">
						<view class="">1</view>
						<view class="">关注</view>
					</view>
					<!-- 粉丝 -->
					<view class="fans t_c" @click="goFans">
						<view class="">1.6万</view>
						<view class="">粉丝</view>
					</view>
					<!-- 获赞与收藏 -->
					<view class="collection t_c">
						<view class="">24.3万</view>
						<view class="">获赞与收藏</view>
					</view>
				</view>
				
				<view class="rightBtm">
					<view v-if="!focus" class="focusBtn t_c" @click="focusOn">关注</view>
					<view v-else class="focusBtn t_c" @click="focusOn">已关注</view>
					<image src="../../static/msg2.png" mode="" @click="goChart"></image>
				</view>
			</view>
		</view>
		
		<!-- 作者个人资料  以及个人的描述-->
		<view class="authorMsg height">
			视频作者个人资料以及个人描述
		</view>
		
		<!-- 作者相关的视频 -->
		<view class="content">
			<!-- 头部 滑动 -->
			<swiperTabHead class="height"  :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiperTabHead>
			<!-- 作品展示 -->
			<swiper :style="{height:swiper_height}"  :current="tabIndex" @change="tabChange">
				<swiper-item style="box-sizing: border-box;padding: 0 10rpx;" v-for="(tab,i) in tabBars" :key="i" >
					<mescroll-item :waterFullHeight="swiper_height" style="padding-top: 0;" :i="i" :index="tabIndex" :tabs="tabBars"></mescroll-item>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	// 使用 mescroll
	import MescrollItem from "@/components/mescroll-swiper-item.vue";
	import {apiSearch} from "@/API/mock.js"
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import wfallsFlow from '../../components/wfallsflow.vue'
	// 引入tabHead 切换
	import swiperTabHead from "../../components/swiper-tab-head.vue";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				swiper_height: "", // 需要固定swiper的高度
				//控制nav切换
				tabIndex:0,// 选中的
				tabBars:[
					{ name:"作品",id:"guanzhu" },
					{ name:"关注",id:"tuijian" },
				],   
				act:0,
				// 作者的个人作品
				list:[],
				focus:false
			};
		},
		components:{
			wfallsFlow,
			MescrollItem,
			swiperTabHead
		},
		onLoad() {
			// 测试
			this.swiper_height = uni.getSystemInfoSync().windowHeight + 'px'
			// console.log('屏幕高度',uni.getSystemInfoSync().windowHeight)
			
			// console.log('作者页')
			// 显示正在加载弹窗
			uni.showLoading({
			   title: '加载中'
			});
		
			
		},
		onReady() {
			uni.hideLoading();
		},
		methods:{
			// 点击聊天图标，跳转到聊天室
			goChart(){
				uni.navigateTo({
					url:`/pages/chartRoom/chartRoom`
				})
			},
			// 判断当前用户是否对其进行了关注
			focusOn(){
				let _this = this 
				console.log('关注')
				if(!this.focus){
					//未关注
					this.focus = !this.focus 
				}else{
					// 已关注，再次点击表示是否取消关注
					uni.showModal({
						content:"确认不在关注",
						success:function(res){
							if (res.confirm) {
								console.log('用户点击确定');
								_this.focus = !_this.focus //用户取消关注
							} else if (res.cancel) {
									console.log('用户点击取消');
							}
						}
					})
				}
			},
			// 切换作品以及关注
			//滑动切换导航
			tabChange(e){
			  this.tabIndex = e.detail.current
			},
			//接受子组件传过来的值点击切换导航
			tabtap(index){
				this.tabIndex = index;
			},
			goFans(){
				console.log('跳转到粉丝列表')
				// 当进行跳转的时候将，作者的关注列表以及粉丝列表传递过去
				uni.navigateTo({
					url:`/pages/fansList/fansList?list=${3}`
				})
			}
		}
	}
</script>

<style lang="less">
.author{
	width: 100%;
	height: 69.44rpx;
	.head{
		display: flex;
		box-sizing: border-box;
		padding: 40rpx 40rpx;
		.userImg{
			width: 150rpx;
			height: 150rpx;
			background-color: yellow;
			border-radius: 50%;
			
		}
		.right{
			width: 77%;
			margin-left: 30rpx;
			.box{
				display: flex;
				justify-content: space-evenly;
				align-items: center;
			}
			.rightBtm{
				margin-top: 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				image{
					width: 60rpx;
					height: 60rpx;
				}
				.focusBtn{
					width: 80%;
					height: 40rpx;
					border-radius: 40rpx;
					color: white;
					background-color: red;
					padding: 10rpx 0;
				}
			}
		}
	}
	.authorMsg{
		width: 100%;
		height: 100rpx;
		box-sizing: border-box;
		padding: 0 40rpx;
	}
}
</style>

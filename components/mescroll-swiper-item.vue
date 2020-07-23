<template>
	<!-- 
	swiper中的transfrom会使fixed失效,此时用height="100%"固定高度; 
	swiper中无法触发mescroll-mixins.js的onPageScroll和onReachBottom方法,只能用mescroll-uni,不能用mescroll-body
	-->
	<mescroll-uni ref="mescrollRef" @init="mescrollInit" height="100%" top="60" :bottom="mescrollBot" 
		:down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick"
	>
		<!-- 数据列表 -->
		<!-- <good-list :list="goods"></good-list> -->
		
		<!-- 普通界面 -->
		<block v-if="showType == 0">
			<mescroll-empty v-if="goods.length === 0"></mescroll-empty>
			<block v-else>
				<wfalls-flow style="{height:400px}" :list="goods"></wfalls-flow>
			</block>
		</block>
		
		<!-- 上传视频界面  -->
		<block v-if="showType == 1" >
			<mescroll-empty v-if="goods.length === 0" ></mescroll-empty>
			<block v-else>
				<wfalls-flow v-if="i === 0" style="{height:400px}" :list="goods" ></wfalls-flow>
				
				<view class="box" v-else>
					<!--渲染结束 点击可以上传视频-->
					<view class="push_video" @click="open(1)">
							<view class="cross"> </view>
							<view class="txt">上传短视频</view>
					</view>
					
					<view class="push_img" @click="open(0)">
						<view class="cross"></view>
						<view class="txt">上传图文</view>
					</view>
					
				</view>
				<!-- <solt></solt> -->
			</block>
			
			
			
			
		</block>
		
		
		<!-- 上传视频的弹出框 -->
		<uni-popup class="pop" animation="false" ref="popup_video" 
			type="center" mask-click="false"
			@change="change"
		>
			<uni-popup-pushvideo :video_src="video_src" @changeVideoSrc = "changeVideo"  @clear="clear" duration="0" />
			<view class="imgBox">
				<image class="img" src="/static/close.png" mode="" @click="close(1)"></image>
			</view>
		</uni-popup>
		
		<!-- 上传图片的弹出框 -->
		<uni-popup class="pop" animation="false" ref="popup_img"
			type="center" mask-click="false"
			@change="change"
		>
			<uni-popup-pushimg :video_src="video_src" @changeVideoSrc = "changeVideo" @clear="clear" duration="0" />
			<view class="imgBox">
				<image class="img" src="/static/close.png" mode="" @click="close(0)"></image>
			</view>
		</uni-popup>
		
	</mescroll-uni>
</template>

<script>
	import MescrollEmpty from '@/components/mescroll-uni/components/mescroll-empty.vue';
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/components/mescroll-uni/mixins/mescroll-more-item.js";
	import {apiSearch} from "@/API/mock.js"
	
	import goodList from "@/components/good-list.vue"
	// const list = require('@/static/data.json').list;
	import wfallsFlow from '@/components/wfallsflow.vue'
	
	
	export default {
		mixins: [MescrollMixin,MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
		components:{
			MescrollEmpty,
			goodList,
			wfallsFlow
		},
		data() {
			return {
				video_src:'',
				downOption:{
					auto:false, // 不自动加载 (mixin已处理第一个tab触发downCallback)
				},
				upOption:{
					auto:false, // 不自动加载
					// page: {
					// 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					// 	size: 10 // 每页数据的数量
					// },
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty:{
						tip: '~ 空空如也 ~', // 提示
						btnText: '去看看'
					}
				},
				goods: [] //列表数据
			}
		},
		props:{
			showType:Number,
			i: Number, // 每个tab页的专属下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
			// 自定义显示 上拉加载时 距离页面底部的 位置
			mescrollBot:{
				type:Number,
				default(){
					return 0
				}
			},
			index: { // 当前tab的下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
				type: Number,
				default(){
					return 0
				}
			},
			waterFullHeight:{
				type: Number,
			},
			tabs: { // 为了请求数据,演示用,可根据自己的项目判断是否要传
				type: Array,
				default(){
					return []
				}
			}
		},
		onLoad() {

		},
		methods: {
			// 显示上传视频
			open(num){
				if(num == 0){
					// 打开上传图片的弹框
					this.$refs.popup_img.open();
				}else if(num == 1){
					// 打开上传视频的弹框
					this.$refs.popup_video.open();
					
				}
			},
			close(num) {
				// this.$refs.popup_user.close();
				if(num == 0){
					// 关闭上传图片的弹框
					this.$refs.popup_img.close();
				}else if(num == 1){
					// 关闭上传视频的弹框
					this.$refs.popup_video.close();
					
				}
			},
			change(e) {
				console.log('popup tabbar' + e.type + ' 状态', e.show)
				if(!e.show){
					// 弹窗关闭
					console.log('上传视频弹窗隐藏')
					this.video_src = ''
					
					this.images = []
				}
			},
			changeVideo(val){
				console.log('修改video_src')
				this.video_src = val
			},
			// 清空当前的视频
			clear(){
				this.video_src = ''
			},
			
			/*下拉刷新的回调 */
			downCallback() {
				// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
				// loadSwiper();
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				// autoShowLoading = true
				this.mescroll.resetUpScroll()
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				console.log('swiper 上拉加载')
				//联网加载数据
				// let keyword = this.tabs[this.i].name
				// apiSearch(page.num, page.size,keyword).then(curPageData=>{
				apiSearch(page.num, page.size).then(curPageData=>{
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					this.mescroll.endSuccess(curPageData.length);
					//设置列表数据
					if(page.num == 1) this.goods = []; //如果是第一页需手动制空列表
					console.log('curPageData',curPageData)
					this.goods=this.goods.concat(curPageData); //追加新数据
					console.log('上拉加载 goods',this.goods)
				}).catch(()=>{
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
				
			},
			//点击空布局按钮的回调
			emptyClick(){
				uni.showToast({
					title:'点击了按钮,具体逻辑自行实现'
				})
			}
		}
	}
</script>

<style lang="less">
	.pop {
		.imgBox {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			.img {
				width: 62.5rpx;
				height: 62.5rpx;
				margin-top: 20rpx;
			}
		}
	}
	
	.box{
		display: flex;
		justify-content: space-evenly;
		.push_video,.push_img{
			width: 314rpx;
			height: 308rpx;
			background-color: #d8d3d1;
			border-radius: 20rpx;
			box-sizing: border-box;
			padding-top: 25rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			// 绘制十字
			.cross {
				background: #f0eaf0;
				height: 138.88rpx;
				position: relative;
				width: 14rpx;
				margin-bottom: 20rpx;
			}
			.cross:after {
				background-color: #f0eaf0;
				content: '';
				height: 14rpx;
				left: -59.77rpx;
				position: absolute;
				top: 60.77rpx;
				width: 138.88rpx;
			}
			.txt {
				color: #616060;
				font-size: 33rpx;
				font-weight: bolder;
			}
		}
	}
	
	
	
</style>
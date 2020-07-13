	<!-- wx15787d9dfeab4b4a -->
<template>
	<view class="listPage">
		<!-- 搜索框 -->
		<view class="searchBox">
			<view class="serach height" @click="goSearch">
				<image src="/static/search.png" mode=""></image>
				<span>搜索</span>
			</view>
		</view>
		
		<!-- 瀑布流 -->
		<view  :style="{height:mescroll_height}" >
			<mescroll-body ref="mescrollRef" @init="mescrollInit"
				@down="downCallback" @up="upCallback" 
			>
				<mescroll-empty v-if="goods.length === 0" ></mescroll-empty>
				<wfalls-flow v-else :style="{height:mescroll_height}"  :list="goods" ></wfalls-flow>
			</mescroll-body>
		</view>
			
	</view>
</template>

<script>
	// 引入mescroll-mixins.js
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollEmpty from '@/components/mescroll-uni/components/mescroll-empty.vue';
	import {apiSearch} from "@/API/mock.js"
	
	const list = require('@/static/data.json').list;
	import wfallsFlow from '../../components/wfallsflow.vue'
	import goodList from "@/components/good-list.vue"
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				// 参赛选手列表
				goods:[],
				mescroll_height:'',
			}
		},
		components:{
			MescrollEmpty,
			wfallsFlow
		},
		onLoad() {
			this.mescroll_height = uni.getSystemInfoSync().windowHeight + 'px'
			console.log('首页 this',this.globalData)
			// 显示正在加载弹窗
			uni.showLoading({
			   title: '加载中'
			});
			
		},
		onReady() {
			// 页面加载完毕
			console.log('页面加载完毕')
			uni.hideLoading();
		},
		methods: {
			// 控制测试的视频列表
			/*mescroll组件初始化的回调,可获取到mescroll对象 (此处可删,mixins已默认)*/
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			/*下拉刷新的回调, 有三种处理方式:*/
			downCallback(){
				console.log('downCallback 下拉刷新')
				// 第1种: 请求具体接口
				// uni.request({
				// 	url: 'xxxx',
				// 	success: () => {
				// 		// 请求成功,隐藏加载状态
				// 		this.mescroll.endSuccess()
				// 	},
				// 	fail: () => {
				// 		// 请求失败,隐藏加载状态
				// 		this.mescroll.endErr()
				// 	}
				// })
				// 第2种: 下拉刷新和上拉加载调同样的接口, 那么不用第1种方式, 直接mescroll.resetUpScroll()即可
				// this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				// 第3种: 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
				setTimeout(()=>{
					this.mescroll.endSuccess()
				},3000)
				
				
				// 此处仍可以继续写其他接口请求...
				// 调用其他方法...
			},
			/*上拉加载的回调*/
			upCallback(page) {
				console.log('swiper 上拉加载')
				//联网加载数据
				// let keyword = this.tabs[this.i].name
				// apiSearch(page.num, page.size,keyword).then(curPageData=>{
				apiSearch(page.num, page.size).then(curPageData=>{
					console.log('上拉请求数据 curPageData',curPageData)
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					this.mescroll.endSuccess(curPageData.length);
					//设置列表数据
					// if(pageNum == 1) this.goods = []; //如果是第一页需手动制空列表
					console.log('curPageData',curPageData)
					this.goods=this.goods.concat(curPageData); //追加新数据
					console.log('上拉加载 追加后 goods',this.goods)
				}).catch(()=>{
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
			},
			
			// 跳转到搜搜页面
			goSearch(){
				uni.navigateTo({
					url:"../find/find"
				})
			},
			touchMove(e){
				console.log('进行移动 e',e)
			},
			
			// 点击列表中每一项，进行跳转到视频播放页
			jumpFind(e){
				// 根据点击的id进行跳转到视频播放页面
				uni.navigateTo({
					url: "/pages/playVideo/playVideo"
				});
			},
			
			// 控制弹出框
			open(){
				this.$refs.popup_video.open()
			},
			
			close(){
				this.$refs.popup_video.close()
			},
			//scrollView 区域
			toupper(){
				console.log('toupper')
			},
		}
	}
</script>

<style  scoped lang="less">
	.listPage{
		box-sizing: border-box;
		padding: 0rpx 10rpx 0;
		.searchBox{
			width: 100%;
			height: 80rpx;
			background-color: white;
			padding: 20rpx 0;
			position: sticky;
			z-index: 10;
			top: 0;
			left: 0;
			
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
		}
		
		.head{
		  width: 100%;
		  height: 470rpx;
			// background-color: #0d0737;
		  image{
		    width: 100%;
		    height: 100%;
		  }
		}
		.cent{
			position: relative;
		  // background-color:#0d0737;
		  width: 100%;
			height: 100%;
		  box-sizing: border-box;
		  padding: 11.5rpx;
		  padding-top: 20rpx;
		  .sum{
		    width: 100%;
		    height: 100rpx;
		    // background-color: #2f1b8e;
		    border-radius: 20rpx;
		    display: flex;
		    justify-content: space-evenly;
		    align-items: center;
		    margin-bottom: 20rpx;
		    .item{
		      text-align: center;
					width: 200rpx;
		      .num{
		        font-weight: bolder;
		        color: #ffe34f;
		        font-size: 42rpx;
		      }
		      .name{
						width: 100%;
		        color: #c2bdd1;
		        font-size: 27rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						image{
							width: 30rpx;
							height: 30rpx;
							margin-right: 8rpx;
						}
		      }
		    }
		  }
		  
			.box{
				// background-color: #0d0737;
				
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

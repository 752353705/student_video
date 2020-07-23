<template>
	<view>
		<!-- 进行自我作品的展示 与  进行作品的上传操作 -->
		<!-- 分类展示头 -->
		<swiperTabHead  :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiperTabHead>
			
		
		<swiper :style="{height:swiper_height}" :current="tabIndex" @change="tabChange">
			<swiper-item style="box-sizing: border-box;padding: 0 10rpx;" v-for="(tab,i) in tabBars" :key="i">
				<mescroll-item :showType="showType" :waterFullHeight="swiper_height" :i="i" :index="tabIndex" :tabs="tabBars"></mescroll-item>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	// 引入tabHead 切换
	import swiperTabHead from "@/components/swiper-tab-head.vue";
	import MescrollItem from "@/components/mescroll-swiper-item.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	
	export default {
		data() {
			return {
				showType:1,
				swiper_height: "", // 需要固定swiper的高度
				tabIndex: 0, // 当前tab的下标
				tabBars:[
					{ name:"我的作品",id:"guanzhu" },
					{ name:"上传作品",id:"tuijian" },
				],
			};
		},
		components:{
			swiperTabHead,
			MescrollItem,
		},
		onLoad() {
			this.swiper_height = uni.getSystemInfoSync().windowHeight + 'px'
			let _this = this
			console.log('发布界面')
					
			// this.$refs.popup_video.open()	
			// this.$refs.popup_user.open()
			uni.showLoading({
			   title: '加载中'
			});
		},
		onReady() {
			// 页面加载完毕
			console.log('页面加载完毕')
			uni.hideLoading();
		},
		methods:{
			//滑动切换导航
			tabChange(e){
			  this.tabIndex = e.detail.current
			},
			//接受子组件传过来的值点击切换导航
			tabtap(index){
				this.tabIndex = index;
			},
			// 制作瀑布流
			getLoadNum(num){
			    console.log('共加载了:'+num);
			    !this.isNewRenderDone&&uni.hideLoading()
			    this.isNewRenderDone = true
			},	
			// 点击我的视频跳转到视频播放页
			goPlayVideo(){
				uni.navigateTo({
					url: "/pages/playVideo/playVideo"
				})
			},
		},
	}
</script>

<style lang="less">

</style>

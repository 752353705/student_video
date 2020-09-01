<template>
	<view>
		<!-- 分类展示头 -->
		<swiperTabHead :flex="true" :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiperTabHead>
			
		<swiper :style="{height:swiper_height}" :current="tabIndex" @change="tabChange">
			<swiper-item style="box-sizing: border-box;padding: 0 10rpx;" v-for="(tab,i) in tabBars" :key="i">
				<mescroll-item  :waterFullHeight="swiper_height" :i="i" :index="tabIndex" :tabs="tabBars"></mescroll-item>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import MescrollItem from "@/components/mescroll-swiper-item.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import {apiSearch} from "@/API/mock.js"
	
	// 引入tabHead 切换
	import swiperTabHead from "@/components/swiper-tab-head.vue";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				tabBars:[
					{ name:"全部",id:"guanzhu" },
					{ name:"作品",id:"tuijian" },
					{ name:"用户",id:"tuijian" },
				],
					// 测试
					swiper_height: "", // 需要固定swiper的高度
					tabIndex: 0, // 当前tab的下标
					//控制nav切换
					tabIndex:0,// 选中的
					act:0,
			};
		},
		components:{
			swiperTabHead,
			MescrollItem
		},
		onLoad(options){
			
			this.swiper_height = uni.getSystemInfoSync().windowHeight + 'px'
			uni.showLoading({
			  title: '加载中'
			});
			
			
			
			
			
			
		},
		onReady() {
			// 页面加载完毕
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
		}
	}
</script>

<style lang="less">
	
</style>

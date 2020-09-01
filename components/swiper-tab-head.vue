<template>
	<scroll-view :enable-flex="flex" scroll-left="0" 
		class="uni-tab-bar" :style="{ top: top }" 
		scroll-x="true"   :scroll-left="left"
		:scroll-with-animation="true"
	>
	<!-- @scroll="scroll"  -->
		<block v-for="(tab, index) in tabBars" :key="tab.id" :style="scrollStyle">
			<view class="swiper-tab-list" :class="{ active: tabIndex == index }" @tap="tabtap(index)" :style="scrollItemStyle">
				<view class="">{{ tab.name }} {{ tab.num ? tab.num : '' }}</view>
			</view>
		</block>
	</scroll-view>
</template>
<script>
	export default {
		data() {
			return {
				left:0,
				// 存储的当前 tabIndex
				index:0
			}
		},
		props: {
			// 是否开启弹性布局
			flex:{
				type:Boolean,
				default:false
			},
			// 粘性定位 top
			top: {
				type: String,
				default: '0'
			},
			tabBars: Array,
			tabIndex:{
				type:Number,
				default:0
			} ,
			scrollStyle: {
				type: String,
				default: ''
			},
			scrollItemStyle: {
				type: String,
				default: ''
			}
		},
		methods: {
			// 
			
			
			//点击切换导航
			tabtap(index) {
				// this.tabIndex = index;
				this.$emit('tabtap', index);
			},
			// 当滚动区域内部内容滚动到一定的位置，滚带条自动向右移动
			changeLeft(num){
				console.log('tab-head num ==> ',num)
				this.index = num
				this.left = (this.index - 3) * 60 
				
				
				// if(num > 3){
				// 	// 当 tabIndex 到达 4 的时候；滚动条向左侧滚动
				// 	// console.log("tabIndex 到达 4 的时候；滚动条向左侧滚动")
				// 	this.left = (this.index - 3) * 60 
				// }else if( num < 4 ){
				// 	// 当用户 向右滑动 left 减少
				// 	this.left = (this.index - 3) * 60 
				// }
				
			},
		}
	}
</script>

<style lang="less">
	// 控制 小喇叭的 样式
	.data-v-7d5e07c6{
		position: sticky;
		top: 80rpx;
	}
	
	
	/* 整体的长度 */
	.uni-tab-bar {
		white-space: nowrap;
		width: 100%;
		height: 61rpx;
		background-color: white;
		box-sizing: border-box;
		position: sticky;
		left: 0;
		z-index: 10;
		
		display: flex;
		justify-content: space-evenly;
	}
	
	.swiper-tab-list {
		display: inline-block;
		width: 117rpx;
		height: 61rpx;
		line-height: 61rpx;
		text-align: center;
		font-size: 34rpx;
		color: #969696;
		text-align: center;
		// 被激活状态
		&.active{
			color: #f83f20;
			font-weight: bold;
		}
		
	}
	
	
	
</style>
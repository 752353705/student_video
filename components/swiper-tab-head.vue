<template>
    <view class="uni-tab-bar" :style="{'top':top}">
        <scroll-view class="uni-swiper-tab tab" scroll-x="true" 
					@scroll="scroll" scroll-left="120"
					enable-flex="true"
				>
            <block v-for="(tab,index) in tabBars" :key="tab.id" :style="scrollStyle">
                <view 
									class="swiper-tab-list" 
									:class="{'active' : tabIndex==index}"
									@tap="tabtap(index)"
									:style="scrollItemStyle"
                >
									<view class="">{{tab.name}} {{tab.num?tab.num:""}}</view>
									<view class="swiper-tab-line"></view>
                </view>
            </block>
        </scroll-view>
    </view>
</template>

<script>
	export default {
	        props:{
						// 粘性定位 top
						top:{
							type:String,
							default:'0'
						},
						tabBars:Array,
						tabIndex:Number,
						scrollStyle:{
							type:String,
							default:""
						},
						scrollItemStyle:{
							type:String,
							default:""
						}
	        },
	        methods:{
	            //点击切换导航
	            tabtap(index){
	                // this.tabIndex = index;
	                this.$emit('tabtap',index)
	            }
	        }
	    }
</script>

<style lang="less">
	.uni-swiper-tab{
		width: 100%;
		// border-bottom: 1rpx solid #EEEEEE;
		// text-align: center;
		justify-content: space-evenly;
		margin-bottom: 10rpx;
		height: 70rpx;
		line-height: 50rpx;
  }
	.tab{
		display: flex;
		justify-content: space-evenly;
	}
	.swiper-tab-list{
		color: #969696;
		font-weight: bold;
		display: inline-block;
		text-align: center;
		// margin-left: 30rpx;
		
	}
	.uni-tab-bar{
		box-sizing: border-box;
		// padding: 10rpx 10rpx;
		position: sticky;
		left: 0;
		z-index: 10;
		background-color: white;
	}
	.uni-tab-bar .active{
			color: red;
	}
	.active .swiper-tab-line{
			border-bottom: 1rpx solid red;
			width: 70rpx;
			margin: auto;
			border-top: 6rpx solid red;
			border-radius: 20rpx;
	}
</style>

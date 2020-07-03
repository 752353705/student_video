<template>
    <view class="uni-tab-bar">
        <scroll-view class="uni-swiper-tab" scroll-x="true" @scroll="scroll" scroll-left="120">
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
		border-bottom: 1rpx solid #EEEEEE;
		text-align: center;
  }
	.swiper-tab-list{
		color: #969696;
		font-weight: bold;
		display: inline-block;
		margin-left: 30rpx;
	}
	.uni-tab-bar .active{
			color: #343434;
	}
	.active .swiper-tab-line{
			border-bottom: 9rpx solid #FEDE33;
			width: 70rpx;
			margin: auto;
			border-top: 6rpx solid #FEDE33;
			border-radius: 20rpx;
	}
</style>

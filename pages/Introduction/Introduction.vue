<template>
	<view class="introduction">
		<swiper :indicator-dots="true" :autoplay="true" 
			:interval="3000" :duration="1000" :circular="true"
			
			>
			<swiper-item>
				<view class="swiper-item">赛事1</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">赛事2</view>
			</swiper-item>
		</swiper>
		
		<view class="tab">
			<view @tap='hot' class="">报名中</view>
			<view @tap='proceed' class="">进行中</view>
			<view @tap='end' class="">已结束</view>
		</view>
		
		<view class="cont">
			<view class="item" v-for="(item,index) in [1,2,3,4]" :index="key"
				@tap="golist"
				>
				赛事简介
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data(){
			return {
				num:1
			}
		},
		methods:{
			// 跳转到作品列表
			golist(){
				console.log('跳转到作品列表')
				uni.switchTab({
					url:'/pages/list/list'
				})
			},
			hot(){
				console.log('报名中')
			},
			proceed(){
				console.log('进行中')
			},
			end(){
				console.log('已结束')
			}
		}
	}
</script>

<style lang="less" scoped>
	.introduction{
		swiper{
			height: 300rpx;
			swiper-item{
				background-color: yellow;
			}
		} 
		.tab{
			margin-top: 20rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
		}
		.cont{
			box-sizing: border-box;
			padding-left: 20rpx;
			padding-top: 20rpx;
			padding-right: 20rpx;
			padding-bottom: 20rpx;
			.item{
				width: 99%;
				height: 186rpx;
				margin: auto;
				margin-bottom: 30rpx;
				background-color: red;
			}
		}
	}
</style>

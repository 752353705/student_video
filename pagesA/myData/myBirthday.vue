<template>
	<view class="gender">
		<view class="tit">选择生日</view>
		<view class="uni-title uni-common-pl">时间选择器</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">当前选择</view>
				<view class="uni-list-cell-db">
					<picker mode="time" :value="time" start="09:01" end="21:01" @change="bindTimeChange">
						<view class="uni-input">{{ time }}</view>
					</picker>
				</view>
			</view>
		</view>
		<!-- 保存按钮 -->
		<view class="btn" @click="submit">保存</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			type: ['男', '女'],
			act: 1,
			time: '12:01'
		};
	},
	onLoad() {},
	methods: {
		bindTimeChange: function(e) {
			this.time = e.target.value;
		},
		
		// 用户进行提交
		submit() {
			console.log('提交');
		}
	}
};
</script>

<style>
page {
	background-color: #f5f5f5;
}
</style>

<style lang="scss" scoped>
.gender {
	box-sizing: border-box;
	padding-top: 52rpx;
	padding-left: 20rpx;
	padding-right: 20rpx;
	padding-bottom: 20rpx;
	.tit {
		color: #999999;
	}
	.choose {
		margin-top: 31rpx;
		border-radius: 30rpx;
		background-color: white;
		width: 100%;
		box-sizing: border-box;
		padding-top: 23rpx;
		padding-left: 36rpx;
		padding-right: 23rpx;
		padding-bottom: 36rpx;
		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 80rpx;
			border-bottom: 1rpx solid #e6e6e6;
		}
		.item:last-child {
			border: none;
		}
	}

	.btn {
		width: 67%;
		line-height: 91rpx;
		text-align: center;
		color: white;
		background-color: $bg-color;
		margin: 63rpx auto;
		border-radius: 30rpx;
	}
}
</style>

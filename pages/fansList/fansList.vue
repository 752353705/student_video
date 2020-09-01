<template>
	<view>
		<!-- 有关注的粉丝 -->
		<view class="fans" v-for="(item) in list" :key="index">
			<view class="left">
				<view class="img">
					<image :src="item.avatarUrl" mode=""></image>
				</view>
				<view class="name">{{item.userName}}</view>
			</view>
			<view v-if="focus" class="focus" @click="focusOn">
				关注
			</view>
			<view v-else class="focus focuson" @click="focusOn">
				已关注
			</view>
		</view>
		<!-- 暂无关注 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				focus:true,
				list:[], // 用于渲染的信息内容
				name:''
			};
		},
		onLoad(option) {
			// 渲染 粉丝列表或者关注列表
			console.log('当前 渲染那个 列表',option.name)
			this.name = option.name
			uni.setNavigationBarTitle({
			    title: option.name
			});
			
		},
		onShow() {
			let _this = this 
			if(this.name == '关注'){
				// 获取当前的 粉丝列表
				this.api._get("follow/follows",{
					"pageNum":1,
					"pageSize":10
				},function(res){
					console.log('获取关注的粉丝列表 res ===>', res)
					
					_this.list = res.data.list
				})
			}
		},
		methods:{
			focusOn(){
				let _this = this
				if(this.focus){
					// 用户未关注
					this.focus = false
				}else{
					// 用户已经进行了关注，此时再进行点击表示用户是否要取消关注
					uni.showModal({
						content:"确认不在关注",
						success:function(res){
							if (res.confirm) {
								console.log('用户点击确定');
								_this.focus = true //用户取消关注
							} else if (res.cancel) {
									console.log('用户点击取消');
							}
						}
					})
					
				}
			},
		}
	}
</script>

<style lang="less">
.fans{
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	padding: 20rpx 40rpx;
	padding-left: 0;
	margin: 20rpx 40rpx;
	position: relative;
	.left{
		display: flex;
		align-items: center;
		.img{
			width: 100rpx;
			height: 100rpx;
			background-color: yellow;
			border-radius: 50%;
			margin-right: 40rpx;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	.focus{
		border: 1px solid red;
		color: red;
		padding: 6rpx 35rpx;
		// padding-top: 10rpx;
		// padding-right: 10rpx;
		// padding-bottom: 10rpx;
		// padding-left: 10rpx;
		border-radius: 40rpx;
		font-size: 27rpx;
	}
	.focuson{
		background-color: #ff2440;
		color: white;
	}
}
// 绘制0.5px的底线
.fans:after{
	content: "  ";
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 1px;
	 border-bottom:1px solid black;
	/* 如果不用 background-color, 使用 border-top:1px solid #f00; 效果是一样的*/
	-webkit-transform: scaleY(.5);
	transform:scaleY(.5);
}
.fans:last-child::after{
	content: "  ";
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 1px;
	border-bottom:1px solid white;
	/* 如果不用 background-color, 使用 border-top:1px solid #f00; 效果是一样的*/
	-webkit-transform: scaleY(.5);
	transform:scaleY(.5);
}
</style>

<template>
	<view class="propaganda">
	<view class="main">
		<!-- 主体展示 内容  -->
		<view class="main_body">
			<view class="item"
				v-for="(item,index) in gameList "
				:key="index"
				@click="goNewsDetail(item.id)"
				>
					<!-- 文章宣传图 -->
					<view class="top_img">
						<image :src="item.image" mode="widthFix"></image>
					</view>
				<view class="btm">
					<!-- 左 文章标题 -->
					<view class="item_le_title ellipsis_2">
						{{item.title || ''}}
					</view>
					<!-- 文章来源 -->
					<!-- <view class="from">{{item.createBy}}</view> -->
					<!-- 右 文章小图 -->
					<image v-if="item.smallImage" class="item_le_img" :src="item.smallImage" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		props:{
			gameList:{
				type:Array,
				default:[]
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			// 跳转到 新闻详情中
			goNewsDetail(id){
				uni.navigateTo({
					url:'/pages/newsDetail/newsDetail?newsId=' + id
				})
			}
		}
	}
</script>

<style>
	page{
		background: #F5F4F9;
	}
</style>

<style lang="scss">
.propaganda{
	box-sizing: border-box;
	padding:0rpx 22rpx ;
	padding-top: 0rpx;
	.main{
		border-radius: 8rpx;
		box-sizing: border-box;
		// padding:24rpx 28rpx ;
		// background-color: #FFFFFF;
		.main_body{
			.item{
				background-color: #FFFFFF;
				margin: 24rpx 0rpx;
				border-bottom: 1rpx solid #E3E3E3;
				.top_img{
					image{
						width: 100%;
						height: 100%;
					}
				}
				.btm{
					display: flex;
					justify-content: space-between;
					align-items: center;
					box-sizing: border-box;
					margin-top: 30rpx;
					padding-bottom: 30rpx;
					padding-left: 30rpx;
					padding-right: 30rpx;
					.item_le_title{
						
						font-size: 32rpx;
						overflow:hidden;
						text-overflow:ellipsis;
						display:-webkit-box;
						/* autoprefixer: off */
						-webkit-box-orient:vertical;
						/* autoprefixer: on */
						-webkit-line-clamp:2; 
					}
					.from{
						font-size: 24rpx;
						color: #999999;
					}
					.item_le_img{
						width: 120rpx;
					}
				}
			}
			.item:last-child{
				border:none;
			}
		}
	}
}
</style>

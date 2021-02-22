<template>
	<view class="propaganda">
	<view class="main">
		<!-- 主体展示 内容  -->
		<view class="main_body">
			<view class="item"
				v-for="(item,index) in list_data "
				:key="index"
				@click="goNewsDetail(item.id)"
				>
					<!-- 文章宣传图 -->
					<view class="top_img">
						<image :src="item.image" mode="widthFix" @load="showImg(index)"></image>
						<!-- 文字 -->
						<view v-show="item.imgState" class="txt ellipsis_2">
							{{item.title || ''}}
						</view>
					</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		props:{
			newsList:{
				type:Array,
				default:[]
			}
		},
		data() {
			return {
				list_data:[]
			};
		},
		mounted() {
			this.list_data = [...this.newsList]
		},
		watch:{
			newsList:{
				handler(newValue, oldValue){
					this.list_data = [...newValue]
				}
			}
		},
		methods:{
			// 让图片和文字同时显示
			showImg(index){
				this.list_data[index].imgState = true
			},
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
	padding:200rpx 22rpx ;
	padding-top: 0rpx;
	.main{
		border-radius: 8rpx;
		box-sizing: border-box;
		.main_body{
			.item{
				// background-color: #FFFFFF;
				margin: 24rpx 0rpx;
				// border-bottom: 1rpx solid #E3E3E3;
				.top_img{
					position: relative;
					.txt{
						font-weight: bold;
						position: absolute;
						bottom: 17rpx;
						left: 0rpx;
						color: white;
						padding-left: 24rpx;
						padding-right: 24rpx;
						// 黑色描边
						-webkit-text-stroke: 1rpx black;
						
					}
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

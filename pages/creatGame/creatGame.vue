<template>
	<view class="creat_game">
		
		<!-- 活动设置 -->
		<view class="game_set">
			<!-- 标题 -->
			<view class="head">
				<view class="tag"></view>
				<text class="text">活动设置</text>
			</view>
			<!-- 活动主题 -->
			<view class="game_theme">
				<!-- 标题 -->
				<view class="game_theme_hint">
					<text class="must">*</text>
					<text>活动主题图</text>
					<text class="hint">(建议尺寸750*600)</text>
				</view>
				<!-- 图片 -->
				<view class="game_theme_img">
					<image 
						src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg" 
						mode="">
					</image>
					<!-- 更换图片 -->
					<view class="chang_theme_img">
						更换
					</view>
				</view>
				<!-- 活动名称 -->
				<view class="game_name">
					<view class="le">
						<text class="must">*</text>
						<text>活动名称</text>
					</view>
					<view class="ri">
						<input type="text" value=""
							maxlength="30"
							placeholder="请输入(限30字)"
							placeholder-class="place_style"
							/>
					</view>
				</view>
				<!-- 分享标题 -->
				<view class="game_name">
					<view class="le">
						<text class="must">*</text>
						<text>分享标题</text>
					</view>
					<view class="ri">
						<input type="text" value=""
							dir='rtl'
							maxlength="30"
							placeholder="请输入(限30字)"
							placeholder-class="place_style"
							/>
					</view>
				</view>
				<!-- 开始时间 -->
				<view class="game_start_time" @click="showPop">
					<view class="le">
						<text class="must">*</text>
						<text>大赛开始时间</text>
					</view>
					<view class="ri">
						<text style="margin-right: 10rpx;">{{startTime}}</text>
					</view>
				</view>
				<!-- 结束时间 -->
				<view class="game_end_time" @click="showPop">
					<view class="le">
						<text class="must">*</text>
						<text>大赛结束时间</text>
					</view>
					<view class="ri">
						<text style="margin-right: 10rpx;">{{endTime}}</text>
					</view>
				</view>
				
				
			</view>
		</view>
		
		
		
		
		<!-- 时间选择器 -->
		<min-popup heightSize="500" :show="show" @close='close'>
		    <min-picker 
		    :endTime="endTime"
		    :startTime="startTime"
		    @cancel="cancel"
		    @sure="sure"
		    >
		    </min-picker>
		</min-popup>
		
		
	</view>
</template>

<script>
	import minPopup from '@/components/min-picker/min-popup.vue'
	import minPicker from '@/components/min-picker/min-picker.vue'
	export default {
		data() {
			return {
				// 日期插件 显隐
				startTime:[2020,11,1],
				endTime:[2050,1,1],
				show:false,
				
				time:'暂无',
				// 选择器当前的下标
				value:0,
			};
		},
		components:{
			minPopup,
			minPicker
		},
		methods:{
			// 获取选择的日期
			// 取消事件
			cancel(){
			  this.close()
			},
			// 确认事件
			sure(e){
			  console.log(e)
			  
			},
			
			// picker显示
			showPop(){
			  this.show = true
			},
			
			// 关闭picker
			close(){
			  this.show = false
			},
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
</style>

<style lang="scss">
	// * 必填样式
	.must{
		color: red;
		margin-right: 10rpx;
	}
	
	.creat_game{
		// 活动设置
		.game_set{
			margin-top: 30rpx;
			box-sizing: border-box;
			padding-top: 30rpx;
			padding-right: 30rpx;
			padding-bottom: 30rpx;
			padding-left: 30rpx;
			background-color: white;
			// 标题
			.head{
				display: flex;
				align-items: center;
				justify-content: flex-start;
				.tag{
					width: 10rpx;
					height: 40rpx;
					background-color: #ff8800;
					border-radius: 10rpx;
				}
				.text{
					margin-left: 20rpx;
					font-weight: bolder;
					font-size: 30rpx;
				}
			}
			// 活动主题图
			.game_theme{
				margin-top: 40rpx;
				.game_theme_hint{
					margin-bottom: 30rpx;
					.hint{
						color: #b7b7b7;
						font-size: 26rpx;
						margin-left: 10rpx;
					}
				}
				// 图片展示
				.game_theme_img{
					width: 100%;
					height: 396rpx;
					position: relative;
					image{
						width: 100%;
						height: 100%;
					}
					// 更换按钮
					.chang_theme_img{
						position: absolute;
						bottom: 0;
						right: 0;
						background-color: #332400;
						color: white;
						padding-top: 6rpx;
						padding-right: 8rpx;
						padding-bottom: 8rpx;
						padding-left: 9rpx;
						border-radius: 14rpx 0 0 0;
						font-size: 28rpx;
					}
				}
				// 活动名称
				.game_name{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 20rpx;
					padding-bottom: 20rpx;
					border-bottom: 1rpx solid #f7f7f7;
					.ri{
						width: 67%;
						.place_style{
							text-align: right;
						}
					}
				}
				// 大赛开始时间
				.game_start_time{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 20rpx;
					padding-bottom: 20rpx;
					border-bottom: 1rpx solid #f7f7f7;
					.ri{
						width: 67%;
						text-align: right;
					}
				}
				// 大赛结束时间
				.game_end_time{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 20rpx;
					padding-bottom: 20rpx;
					.ri{
						width: 67%;
						text-align: right;
					}
				}
				
				
			}
		}
	}
</style>

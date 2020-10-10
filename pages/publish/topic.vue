<template>
	<view class="topic">
		<view class="searchBox">
			<view class="serach " @click="goSearch">
				<u-icon size="40" name="search"></u-icon>
				<span style="margin-left: 10rpx;">搜索更多话题</span>
			</view>
			<view class="">
				取消
			</view>
		</view>
		
		<scroll-view :enable-flex="flex" scroll-left="0" 
			class="scroll" :style="{ top: top }" 
			scroll-x="true"   :scroll-left="left"
			:scroll-with-animation="true"
			>
			<view class="scroll-view-item" 
				v-for="(item,index) in game_type"
				:key="index"
				@click="choose(index)"
				>
				<image
					style="width: 100px;height: 150rpx;"
					class="scroll-view-item"
					:src="item.image" 
					mode="widthFix"
					>
				</image>
				<view class="name"
					:class="act == index ? 'act' : '' "
					>
					{{item.typeName}}
				</view>
			</view>
			
		</scroll-view>
		
		
		<!-- 展示话题 -->
		<view class="item" 
			v-for="(item,index) in [1,2,23,4,4]"
			:key="index"
			@click="back"
			>
			<text># </text>话题1
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				// 当前话题分类
				game_type: [],
				// 当前选中的话题
				act:0,
			}
		},
		onLoad() {
			let _this = this
			this.api._get('subject/type',{},function(res){
				console.log('请求大赛类型',res)
				_this.game_type = res.data
			})
		},
		methods:{
			// 用户点击响应的图片进行筛选
			choose(index){
				this.act = index
			},
			// 用户选择话题之后返回上一页
			back(){
				this.$eventHub.$emit('topic','话题');
				uni.switchTab({
					url:`/pages/publish/publishNotice`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.topic{
		box-sizing: border-box;
		padding-top: 20rpx;
		padding-right: 47rpx;
		padding-bottom: 20rpx;
		padding-left: 47rpx;
		.searchBox{
			width: 100%;
			height: 77rpx;
			background-color: white;
			padding: 0rpx 0 20rpx 0;
			position: sticky;
			z-index: 10;
			top: 0;
			left: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.serach{
				background-color: #f5f5f5;
				border-radius: 33rpx;
				width: 83%;
				height: 100%;
				text-align: center;
				color: #453a74;
				
				display: flex;
				align-items: center;
				justify-content: flex-start;
				padding-left: 20rpx;
				image{
					width: 40rpx;
					height:40rpx ;
					margin-right: 13rpx;
				}
			}
		}
		// 滚动区域
		.scroll{
			// width: 300px;
			width: 100%;
			height: 150rpx;
			white-space: nowrap;
			display: flex;
			justify-content: space-evenly;
			border-bottom: 1rpx solid #e7e7e7;
			border-top: 1rpx solid #e7e7e7;
			padding-top: 20rpx;
			padding-bottom: 20rpx;
			.scroll-view-item{
				display: inline-block;
				margin-right: 50rpx;
				position: relative;
				background-color: #0d151d;
				width: 100px;
				height: 150rpx;
				border-radius: 30rpx;
				overflow: hidden;
				image {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					width: 100%;
				}
				.name{
					position: absolute;
					bottom: 14rpx;
					left:50%;
					transform: translateX(-50%);
					color: white;
					font-size: 30rpx;
					font-weight: bold;
					// 被选中的
					&.act{
						border-bottom: 7rpx solid white;
					}
				}
				
			}
		}
		
		
		.item{
			padding-top: 20rpx;
			padding-bottom: 20rpx;
			border-bottom: 1rpx solid #e7e7e7;
		}
		.item:last-child{
			border: none;
		}
	}
</style>

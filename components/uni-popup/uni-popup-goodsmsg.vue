<template>
	<view class="uni-popup-goodsmsg">
		<view class="uni-goodsmsg-title">
			<text class="uni-goodsmsg-title-text">物品类型</text>
		</view>
		<view class="uni-goodsmsg-content">
			<view class="item" :class=" act == index ? 'act' : '' "
				v-for="(item,index) in chooseData"
				:key="index" @click="choose(index)"
				>
				{{item.text}}
			</view>
		</view>
		
		<view class="btn_no" @click="close">取消</view>
		<view class="btn_yes" @click="close">确定</view>
	</view>
</template>

<script>
export default {
	// name: 'UniPopupShare',
	// props: {
	// 	title: {
	// 		type: String,
	// 		default: '分享到'
	// 	}
	// },
	// inject: ['popup'],
	data() {
		return {
			act:0,
			chooseData: [
				{
					text: '其他',
				},{
					text: '文件',
				},{
					text: '美食',
				},{
					text: '鲜花',
				},{
					text: '钥匙',
				},{
					text: '手机',
				}
			]
		};
	},
	created() {},
	methods: {
		// 用户点击选择物品类型
		choose(index){
			this.act = index
		},
		
		
		/**
		 * 控制进行分享时的图片
		 * */
		 setId(){
			 // console.log('进行分享 uni-popup-share')
		 },
		 
		/**
		 * 选择内容
		 */
		select() {
			// console.log('点击了', item.name, index);
			this.$emit(
				'select',{},
				() => {
					this.popup.close();
				}
			);
		},
		/**
		 * 关闭窗口
		 */
		close() {
			this.$emit('closeGoodsmsg','鲜花')
		}
	}
};
</script>
<style lang="scss" scoped>
.uni-popup-goodsmsg {
	position: relative;
	height: 209px;
	background-color: #fff;
	// 标题
	.uni-goodsmsg-title {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 40px;
		.uni-goodsmsg-title-text {
			font-size: 35rpx;
			font-weight: bolder;
			color: #666;
		}
	}
	// 内容区
	.uni-goodsmsg-content{
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-wrap: wrap;
		box-sizing: border-box;
		padding-top: 20rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-bottom: 20rpx;
		.item{
			
			
			width: 200rpx;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			
			margin-left: 30rpx;
			margin-top: 30rpx;
			font-size: 29rpx;
			&.act{
				color: #ff8d07;
				background-color: #fff1e0;
				border: 1px solid #ff8d07;
			}
		}
		
	}
	// 选择按钮
	.btn_no{
		position: absolute;
		left: 29rpx;
		top: 20rpx;
		font-size: 34rpx;
	}
	.btn_yes{
		position: absolute;
		right: 29rpx;
		top: 20rpx;
		color: #ff8b03;
		font-size: 34rpx;
	}
	
}



</style>

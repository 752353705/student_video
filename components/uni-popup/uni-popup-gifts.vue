<template>
		<!-- 送礼物的弹窗 -->
		<view class="uni-popup-share">
			<view class="uni-share-title">
				<text class="uni-share-title-text">{{ title }}</text>
			</view>
			<view class="uni-share-content">
				<!-- 当礼物 变多的时候 可以使用 轮播图的效果进行显示 -->
				<swiper style="width: 100%;height: 248px;" :indicator-dots="false" :autoplay="false">
					<swiper-item class="uni-share-content-box"  v-for="(item, index) in giftList" :key="index" >
						<view class="uni-share-content-item" v-for="(i_item, i_index) in item" :key="i_item.giftId" @click.stop="select(i_item, i_index)">
							<image class="uni-share-image" :src="i_item.giftImage" mode="aspectFill"></image>
							<text class="uni-share-text">{{ i_item.giftName }}</text>
							<text class="uni-share-text">{{ i_item.goldNumber }} 票</text>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="rank" @click="rankPopup">排行榜</view>
			
			<!-- 进行H5充值 -->
			<!-- <view  class="uni-share-button-box">
				<view v-if="!is_IOS" class="recharge" @click="recharge">
					充值
					<u-icon size="28" name="arrow-right"></u-icon>
				</view>
			</view> -->
		</view>
</template>

<script>
export default {
	name: 'UniPopupShare',
	props: {
		title: {
			type: String,
			default: '分享到'
		}
	},
	inject: ['popup'],
	data() {
		return {
			// 控制IOS端 充值礼物方面禁止，不显示相应界面
			is_IOS:false,
			giftList:[]
		};
	},
	created() {
		// 创建的时候，请求礼物数据信息
		this.getGift()
		this.getPhoneType()
	},
	methods: {
		// 获取用户当前的使用环境
		getPhoneType(){
			switch(uni.getSystemInfoSync().platform){
				case 'android':
					 console.log('运行Android上')
					 break;
				case 'ios':
					 console.log('运行iOS上')
					 this.is_IOS = true
					 break;
				default:
					 console.log('运行在开发者工具上')
					 break;
			}
		},
		/**
		 * 请求礼物数据
		 * */
		getGift(){
			this.http({
				url:'gift'
			}).then(res => {
				// 将返回的数据信息进行赋值
				console.log('礼物信息',res)
				// 将礼物进行处理
				let len = res.data.length
				for(let i = 0;i < Math.ceil(len/8);i++){
					let arr = []
					this.giftList.push(res.data.slice(i*8,i*8+8))
				}
			})
		},
		/**
		 * 当前送礼物的排行信息
		 * */
		rankPopup() {
			console.log('获取排行');
			this.$emit('rankPopup', {}, () => {
				console.log('showRank 页面显示充值弹窗');
			});
		},
		/**
		 * 跳转到 H5 充值页面
		 * */
		 recharge() {
		 	console.log('gift 跳转到充值弹窗');
		 	uni.navigateTo({
		 		url:'/pages/H5Pay/H5Pay'
		 	})
		 },
		/**
		 * 选择内容
		 */
		select(item, index) {
			// console.log('select', item, index);
			this.$emit(
				'select',
				{
					item,
					index
				},
				() => {
					this.popup.close();
				}
			);
		},
		/**
		 * 关闭窗口
		 */
		close() {
			this.popup.close();
			this.show = true;
		}
	}
};
</script>
<style lang="scss" scoped>
// 送礼物界面
.uni-popup-share {
	position: relative;
	background-color: #171926;
	color: white;
	border-radius: 20rpx 20rpx 0 0;
	
	padding-bottom: 57rpx;
	
}
.uni-share-title {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: 40px;
}
.uni-share-title-text {
	font-size: 40rpx;
	font-weight: bolder;
	// color: #666;
}
.uni-share-content {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	justify-content: center;
	padding-top: 10px;
}

.uni-share-content-box {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	flex-wrap: wrap;
	width: 360px;
	justify-content: flex-start;
	align-items: flex-start;
}

.uni-share-content-item {
	width: 90px;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	justify-content: center;
	padding: 10px 0;
	align-items: center;
	// background-color: transparent;
}

.uni-share-content-item:active {
	// background-color: #f5f5f5;
}

.uni-share-image {
	width: 50px;
	height: 50px;
}

.uni-share-text {
	margin-top: 10px;
	font-size: 14px;
	// color: #3B4144;
}

.uni-share-button-box {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	padding: 10px 15px;
	justify-content: flex-end;
}

.recharge {
	color: #ffd72a;
	// width: 126rpx;
	display: flex;
	height: 65rpx;
	background-color: #10131c;
	text-align: center;
	line-height: 65rpx;
	border-radius: 20rpx;
	padding: 0 20rpx;
}

.uni-share-button {
	flex: 1;
	border-radius: 50px;
	color: #666;
	font-size: 16px;
	background-color: transparent;
}

.uni-share-button::after {
	border-radius: 50px;
	border: none;
}

// 排行布局
.rank {
	position: absolute;
	top: 20rpx;
	right: 62rpx;
	font-size: 33rpx;
	font-weight: bolder;
	color: #e7c229;
}
</style>

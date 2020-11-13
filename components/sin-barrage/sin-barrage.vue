<template>
	<view>
		<transition-group name="barrage" class="barrage" :style="{ bottom: bottom + 'rpx', left: left + 'rpx' }">
			<view class="barrage-item" v-for="(item, index) in barrageList" :key="item.id">
				<image class="barrage-image" :src="item.avatarImage"></image>
				<view class="barrage-text">
					<text class="" :style="{ color: color, background: background, opacity: opacity }">{{ item.text }}</text>
					<view>投 {{ item.goldNumber }} 票</view>
				</view>
				<image class="barrage-image" :src="item.giftImage"></image>
			</view>
		</transition-group>
	</view>
</template>

<script>
let time1;
export default {
	name: 'sinBarrage',
	props: {
		list: {
			type: Array || Object,
			default() {
				return {};
			}
		},
		rows: {
			type: Number,
			default: 3
		},
		color: {
			type: String,
			default: '#FFFFFF'
		},
		background: {
			type: String,
			default: '#000000'
		},
		opacity: {
			type: Number,
			default: 0.7
		},
		left: {
			type: Number,
			default: 35
		},
		bottom: {
			type: Number,
			default: 120
		},
		msec: {
			type: Number,
			default: 2000
		}
	},
	data() {
		return {
			barrageList: [],
			// 开关
			flag: true,
			len: 0
		};
	},
	mounted() {
		console.log('重新挂载')
	},
	created() {
		console.log('list 滚动礼物',this.list)
		
		// 定义次数
		let intNum = 0;
		time1 = setInterval(() => {
			if (this.flag) {
				this.len = this.list.length;
			}
			if (intNum == this.len) {
				clearInterval(time1);
				// 然后 进行隐藏弹窗
				this.$emit('showSinBar');
			}
			/** 此处逻辑：
			 * 设定A数组为展示数组（默认3条数据），B数组为源数组（n条数据）
			 * 首次进入页面，因A数组为空，所以根据rows设定每次从B数组头部取1条数据移入A数组尾部
			 * 此后，在每个定时周期内，把A数组头部第1条数据移出来，并移入B数组尾部
			 * 同时把B数组头部第1条数据移出来，并移入A数组尾部
			 * 如此循环即可
			 */
			// 原版
			// console.log('定时器')
			if (this.barrageList.length < this.rows) {
				if (this.barrageList.length < this.len) {
					this.barrageList.push(this.list[0]);
					this.list.splice(0, 1);
				}
			} else {
				let objAFristItem = this.barrageList[0];
				this.barrageList.splice(objAFristItem, 1);
				this.list.push(objAFristItem);
				let objBFirstItem = this.list[0];
				this.list.splice(objBFirstItem, 1);
				this.barrageList.push(objBFirstItem);
			}
			intNum++;
			this.flag = false;
		}, this.msec);
	},
	beforeDestroy() {
		console.log('组件销毁');
		clearInterval(time1);
	}
};
</script>

<style lang="scss">
.barrage-item {
	transition: all 1s;
}

.barrage-enter {
	opacity: 0;
	transform: translateY(30px);
}

.barrage-leave-to {
	opacity: 0;
	transform: translateY(0px);
}

.barrage-enter-active {
	// position: absolute;
}

.barrage-leave-active {
	// transition: all .3s;
}

.barrage {
	position: fixed;
	z-index: 30;
	.barrage-item {
		margin-top: 10rpx;

		color: #ffffff;
		padding: 4rpx 10rpx;
		border-radius: 30rpx;
		background: #000000;
		opacity: 0.8;

		.barrage-image {
			display: inline-block;
			vertical-align: middle;
			width: 60rpx !important;
			height: 60rpx !important;
			margin-right: 10rpx;
			border-radius: 30rpx;
		}

		.barrage-text {
			display: inline-block;
			font-size: 26rpx;
			vertical-align: middle;
			color: #ffffff;
			padding: 10rpx 20rpx;
			border-radius: 30rpx;
			background: #000000;
			opacity: 0.7;
		}
	}
}
</style>

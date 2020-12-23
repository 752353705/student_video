<template>
		<!-- 送礼物的弹窗 -->
		<view class="uni-popup-share">
			<view class="box pa-t20 pa-b20">
				<view class="tit" >
					<view class="tit_le">
						<text >已经连续签到</text>
						<text style="color: red;">{{continuousSignNumber}}天</text>
					</view>
					<!-- 总票数 -->
					<view class="tit_ri">
						总票
						<text style="font-weight: bold;font-size: 40rpx;margin-left: 10rpx;">
							{{goldNumber}}
						</text>
					</view>
				</view>
				<view class="main panel-center item-center wrap">
					<view class="item panel-start item-center"  
						:class="index < continuousSignNumber ? 'act' : ''"
						v-for="(item,index) in sigin_data"
						:key="index"
						@tap="sigin(index)"
						>
						<view class="day text-center w-100">{{item.day}}</view>
						<view class="body text-center">
							<image :src="index < continuousSignNumber ? '/static/dui.png' : '/static/sigin.png' ">
							</image>
							<view class="money">{{item.money}}票</view>
						</view>
					</view>
				</view>
			</view>
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
			// 签到数据
			sigin_data:[
				{
					day:'第 1 天',
					money:1
				},{
					day:'第 2 天',
					money:2
				},{
					day:'第 3 天',
					money:3
				},{
					day:'第 4 天',
					money:4
				},{
					day:'第 5 天',
					money:5
				},{
					day:'第 6 天',
					money:6
				},{
					day:'第 7 天',
					money:7
				},
			],
			// 当前连续签到的天数
			continuousSignNumber:0,
			sigin_statue:false,
			goldNumber:''
		};
	},
	created() {
		// 用户是否进行了签到
		this.siginStatue()
		// 获取当前用户的票数
		this.getUsInfo()
	},
	methods: {
		// 获取用户当前是否进行了签到
		siginStatue(){
			this.api._get('sign',{},(res) => {
				// console.log('签到状态',res)
				if(res.data.status === '0'){
					// 未签到
					this.sigin_statue = false
				}else{
					// 已签到
					this.sigin_statue = true
				}
				// 当前连续签到的天数
				this.continuousSignNumber = res.data.continuousSignNumber
			})
		},
		// 获取当前票数
		getUsInfo() {
			if (uni.getStorageSync('token')) {
				// 如果用户进行了登录操作，获取用户的个人资料
				this.api._get('user/info', {}, res => {
					console.log('获取用户当前的 H币', res);
					this.goldNumber = res.data.goldNumber;
					// this.userInfo = res.data
				});
			}
		},
		// 进行签到
		sigin(index){
			// 当用户点击的与他签到的是同一个则发起请求
			if(index !== this.continuousSignNumber){
				return
			}
			// console.log('用户进行签到操作')
			let _this = this 
			if(!this.sigin_statue){
				// false 表示还没签到
				this.api._post('sign',{
					hGold:this.sigin_data[this.continuousSignNumber].money
				},function(res){
					// console.log('进行签到成功',res)
					_this.sigin_statue = true
					// 改变当前票数
					_this.goldNumber += _this.sigin_data[_this.continuousSignNumber].money
					_this.continuousSignNumber++
				})
			}
		},
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
	width: 698rpx;
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


// 签到框样式
	// 签到选框
		.box{
			width: 99%;
			box-sizing: border-box;
			margin: 59rpx auto 0;
			background-color: white;
			border-radius: 25rpx;
			// 签到提示
			.tit{
				color: black;
				margin:0 20rpx;
				margin-bottom: 10rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.tit_le{
					font-weight: bold;
				}
				.tit_ri{
					
				}
			}
			.main{
				box-sizing: border-box;
				// 当前要签到的样式
				.item{
					position: relative;
					width: 139rpx;
					height: 170rpx;
					background-color: #f1f1f1;
					margin-top: 20rpx;
					margin-right: 20rpx;
					flex-direction: column;
					// 表示已经签到的 对勾
					.dui{
						width: 140rpx;
						height: 83rpx;
						z-index: 20;
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%,-50%);
					}
					.day{
						padding-top: 10rpx;
						height: 40rpx;
						font-weight: bold;
						font-size: 26rpx;
						color: #7d8083;
					}
					.body{
						height: 114rpx;
						image{
							margin-top: 10rpx;
							width: 60rpx;
							height: 60rpx;
						}
						.money{
							color: #b1b1b3;
						}
					}
				}
				// 已经签到的样式
				.act{
					background-color: #f0c054;
					color: white;
					.day{
						color: white;
						background-color: #f0c054;
					}
					.body{
						background-color: #f0c054;
						.money{
							color: white;
						}
					}
				}
				// 未进行签到的样式
				.n_act{
					background-color: #f1f1f1;
					.day{
						color: #848587;
						background-color: #f23030;
					}
					.body{
						.money{
							
						}
					}
				}
				// 取消第三个和第六个的margin
				.item:nth-child(4){
					margin-right: 0rpx;
				}
				.item:nth-child(7){
					margin-right: 0rpx;
					width: 297rpx;
				}
			}
		}

</style>

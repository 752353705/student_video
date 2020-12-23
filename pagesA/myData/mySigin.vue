<template>
	<view class="sigin">
		<!-- 头部背景区 -->
		<view class="bg"></view>
		<!-- 签到头部 -->
		<view class="head">
			<!-- 当前票数 -->
			<view class="ticket">
				<text style="font-size: 32px;margin-right: 20rpx;">
					{{goldNumber || 0}}
				</text>
				票
			</view>
		</view>
		<!-- 签到选框 -->
		<view class="box pa-t20 pa-b20">
			<view class="tit" >
				<text >已经连续签到</text>
				<text style="color: red;">{{continuousSignNumber}}天</text>
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
		<!-- 常规任务 -->
		<view class="common_task">
			<view class="tit">
				常规任务
			</view>
			<view class="task_detail">
				<view class="le">
					<image src="/static/task_gift.png" mode=""></image>
				</view>
				<view class="ri">
					<view class="ri_tit">邀请好友</view>
					<view class="ri_des">每邀请一位新用户，奖励五票</view>
				</view>
				<view class="go_done" @click="goInvite">
					去完成
				</view>
			</view>
			<view class="task_detail">
				<view class="le">
					<image src="/static/renwu.png" mode=""></image>
				</view>
				<view class="ri">
					<view class="ri_tit">浏览文章和作品</view>
					<view class="ri_des">每浏览一篇文章，奖励一票</view>
				</view>
				<view class="go_done" @click="golist">
					去浏览
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
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
				// 当前是否已经进行了签到，
				// 判断用户当前是否进行了签到
				act_btn:false,
				city:'',
				goldNumber:''
			}
		},
		onLoad() {
			this.getUsInfo()
		},
		onShow() {
			let _this = this 
			// console.log('请求签到状态')
			this.api._get('sign',{},function(res){
				// console.log('签到状态',res)
				if(res.data.status === '0'){
					// 未签到
					_this.act_btn = false
				}else{
					// 已签到
					_this.act_btn = true
				}
				// 当前连续签到的天数
				_this.continuousSignNumber = res.data.continuousSignNumber
			})
		},
	
		methods:{
			// 浏览文章
			golist(){
				uni.switchTab({
					url:'/pages/Introduction/Introduction'
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
				console.log('用户进行签到操作')
				let _this = this 
				if(!this.act_btn){
					// false 表示还没签到
					this.api._post('sign',{
						hGold:this.sigin_data[this.continuousSignNumber].money
					},function(res){
						// console.log('进行签到成功',res)
						_this.act_btn = true
						// 改变当前票数
						_this.goldNumber += _this.sigin_data[_this.continuousSignNumber].money
						_this.continuousSignNumber++
						// 本地存储签到标记
						let time = {
							siginTime:Date.parse(new Date()), //签到的时间
							// 当天的24:00 与当前签到的时间相差，多出1分钟浮动 
							overTime:new Date(new Date().toLocaleDateString()).getTime() +24 * 60 * 60 * 1000 - Date.parse(new Date()) + 60 * 1000
						}
						uni.setStorageSync('sigin',JSON.stringify(time))
					})
				}
			},
			// 跳转到邀请页面
			goInvite(){
				uni.navigateTo({
					url:'/pagesA/myData/invite'
				})
			}
		}
	}
</script>

<style>
	page{
		/* color: white; */
		background-color: #f2f3f5;
	}
</style>

<style scoped lang="scss">
	.sigin{
		// 背景板
		.bg{
			position: absolute;
			width: 100%;
			height: 450rpx;
			background-image: linear-gradient(to right,#ec7034,#eb573e);
			z-index: -1;
		}
		// 头部
		.head{
			width: 88%;
			box-sizing: border-box;
			margin: auto;
			padding-top: 65rpx;
			color: white;
			.location{
				
			}
			.ticket{
				margin-top: 30rpx;
			}
		}
		// 签到选框
		.box{
			width: 88%;
			box-sizing: border-box;
			margin: 59rpx auto 0;
			background-color: white;
			border-radius: 25rpx;
			// 签到提示
			.tit{
				margin-left: 20rpx;
				font-weight: bold;
				margin-bottom: 10rpx;
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
		// 常规任务
		.common_task{
			background-color: white;
			width: 88%;
			box-sizing: border-box;
			margin: auto;
			margin-top: 30rpx;
			padding-top: 30rpx;
			padding-right: 30rpx;
			padding-bottom: 30rpx;
			padding-left: 30rpx;
			border-radius: 10rpx;
			.tit{
				font-size: 30rpx;
				font-weight: bold;
				
			}
			.task_detail{
				margin-top: 20rpx;
				position: relative;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.le{
					width: 88rpx;
					height: 88rpx;
					margin-right: 25rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.ri{
					.ri_tit{
						font-size: 30rpx;
						margin-bottom: 10rpx;
					}
					.ri_des{
						font-size: 20rpx;
						color: #7c7f82;
					}
				}
				.go_done{
					width: 122rpx;
					line-height: 47rpx;
					background-color: #eb6a36;
					color: white;
					border-radius: 40rpx;
					position: absolute;
					right: 10rpx;
					top: 9rpx;
					font-size: 27rpx;
					text-align: center;
					

				}
			}
			
		}
	}
	
	button{
		padding-left: 0px;
		padding-right: 0px;
	}
</style>

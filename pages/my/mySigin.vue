<template>
	<view class="sigin">
		<image class="si_bg" src="../../static/si_bg.png" mode=""></image>
		
		<view class="box pa-t20 pa-b20">
			<view class="main panel-center item-center wrap">
				<!-- 判断是否已经进行了签到 -->
				<view class="item panel-start item-center"  
					:class="index < continuousSignNumber ? 'act' : ''"
					v-for="(item,index) in sigin_data"
					:key="index"
					>
					<!-- 遮罩层 处理还没到期的签到 
						判断当前签到没有
						-->
				<!-- 	<view
						:class="index < continuousSignNumber ? '' : !act_btn && index === continuousSignNumber ? '' : 'bg' "
						>
					</view> -->
					<!-- 已签到的图标 -->
					<!-- <block v-if="index < continuousSignNumber ">
						<image class="dui" src="/static/dui.png" mode=""></image>
					</block> -->
					
					<view class="day text-center w-100">{{item.day}}</view>
					<view class="body text-center">
						<!-- 签到的图标 -->
						<!-- <image :src="index < continuousSignNumber ? '/static/n_sigin.png' : '/static/sigin.png' " 
							> -->
						<image :src="index < continuousSignNumber ? '/static/dui.png' : '/static/sigin.png' ">
						</image>
						
						<view class="money">{{item.money}}H币</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 签到按钮 -->
		<view class="btn text-center" 
			:class=" !act_btn ? '' : 'n_act' "
			@tap="sigin"
			>
			{{ !act_btn ? '签到' : '已签到'}}
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
				// 默认没有进行签到,修改签到按钮的样式
				act_btn:false,
			}
		},
		onLoad() {
			
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
			sigin(){
				// console.log('用户进行签到操作')
				let _this = this 
				if(!this.act_btn){
					// false 表示还没签到
					this.api._post('sign',{
						hGold:this.sigin_data[this.continuousSignNumber].money
					},function(res){
						// console.log('进行签到成功',res)
						_this.act_btn = true
						_this.continuousSignNumber ++
					})
				}
			},
		}
	}
</script>

<style scoped lang="less">
	.sigin{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fcd0c5;
		margin: auto;
		.si_bg{
			width: 100%;
			position: absolute;
			z-index: 0;
		}
		.box{
			position: absolute;
			z-index: 10;
			top: 253rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 97%;
			box-sizing: border-box;
			margin: 50rpx auto 0;
			background-color: white;
			border-radius: 50rpx;
			
			.main{
				// flex-wrap: wrap;
				box-sizing: border-box;
				// 当前要签到的样式
				.item{
					position: relative;
					width: 218rpx;
					height: 170rpx;
					background-color: #f1f1f1;
					margin-top: 20rpx;
					margin-right: 20rpx;
					flex-direction: column;
					// 还未到签到时间的遮罩
					// .bg{
					// 	position: absolute;
					// 	top: 0;
					// 	left:0;
					// 	width: 100%;
					// 	height: 100%;
					// 	background-color: #FAFAFA;
					// 	opacity: 0.5;
					// }
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
						// background-color: #f23030;
					}
					.body{
						width: 211rpx;
						height: 114rpx;
						image{
							margin-top: 10rpx;
							width: 60rpx;
							height: 60rpx;
						}
						.money{
							// font-weight: bold;
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
				.item:nth-child(3){
					margin-right: 0rpx;
				}
				.item:nth-child(6){
					margin-right: 0rpx;
				}
			}
		}
		.btn{
			background-image: linear-gradient(to bottom, #ef6a25, #f41c1f);
			width: 80%;
			color: white;
			font-size: 50rpx;
			line-height: 100rpx;
			text-align: center;
			position: fixed;
			bottom: 93rpx;
			border-radius: 30rpx;
			left: 50%;
			transform: translateX(-50%);
		}
		// 已经进行了签到
		.n_act{
			background-image:none;
			background-color: #f0c054;
			color: white;
		}
	}
</style>

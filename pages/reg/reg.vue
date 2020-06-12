<template>
	<view class="reg">
		<!-- logo图 -->
		<view class="img">
			<image src="../../static/logo.jpg" mode=""></image>
		</view>
		
		<!-- 表单 -->
		<form class="form" @submit="formSubmit" @reset="formReset">          
			<view class="phone">
				<view class="icon">
					<image src="../../static/phoneNum.png" mode=""></image>
				</view>
				<input name="phone" placeholder="手机号" maxlength="11">
				</input>
			</view>
			<view class="password">
				<view class="icon">
					<image src="../../static/pw.png" mode=""></image>
				</view>
				<input name="pw" placeholder="密码" password="true" />
			</view>
			<view class="t_c txt">忘记密码？</view>
			<button form-type="submit">立即登录</button>
			<view form-type="submit" class="t_c txt">还没账号？点此注册</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			formSubmit: function(e) {
				console.log('e',e.detail.value)
					// console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
					// var formdata = e.detail.value
					// uni.showModal({
					// 		content: '表单数据内容：' + JSON.stringify(formdata),
					// 		showCancel: false
					// });
					
					// 进行用户填写信息判断，诱导用户进行正确的信息填写
					if(e.detail.value.phone !== 11){
						return  uni.showToast({
											title: '请输入正确手机号',
											icon: 'none',
											duration: 2000
										})
					}
					// 注意对立即登录按钮 点击进行防抖节流 处理防止用户多次点击
					
					//进行用户个人信息的提交
					 
			},
			formReset: function(e) {
					console.log('清空数据')
			}
		}
	}
</script>

<style lang="less">
	.reg{
		color: white;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color:#0d0639;
		.img{
			width:100%;
			height:417rpx;
			position: relative;
			image{
				width:140.27rpx;
				height:197.91rpx;
				position: absolute;
				top:139rpx;
				right: 0;
				left: 0;
				margin: auto;
			}
		}
		.form{
			width: 100%;
			display: flex;
			align-items: center;
			flex-direction: column;
			color: #c3bec5;
			.phone,.password{
				width: 638.19rpx;
				height: 75.69rpx;
				display: flex;
				justify-content: start;
				align-items: center;
				margin-bottom: 37rpx;
				box-sizing: border-box;
				padding-left: 17px;
				padding-top: 6px;
				background-color: #311a8e;
				border-radius: 20rpx;
				input{
					width: 100%;
					height: 100%;
				}
			}
			.icon{
				margin-right: 10rpx;
				width: 40rpx;
				height:40rpx;
				image{
					width:100%;
					height:100%;
				}
			}
			button{
				height: 80.86rpx;
				width: 320.13rpx;
				line-height: 79.13rpx;
				background-image: linear-gradient(to right, #421ea2 , #7352ad);
				color: white;
				border-radius: 40rpx;
				overflow: hidden;
				margin: 38rpx auto;
			}
			.t_c{
				text-align: center;
			}
			.txt{
				color: #5b5487;
			}
		}
	}
</style>

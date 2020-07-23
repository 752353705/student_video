<template>
	<view class="reg">
		<!-- 表单 -->
		<form class="form" @submit="formSubmit" @reset="formReset">          
			<view class="input_box">
				<view class="icon">
					<image src="../../static/pw.png" mode=""></image>
				</view>
				<input :focus="true" type="number" name="username" placeholder="手机号" maxlength="11">
				</input>
			</view>
			<view class="input_box">
				<view class="icon">
					<image src="../../static/phoneNum.png" mode=""></image>
				</view>
				<input name="password" placeholder="密码" password="true" />
			</view>
			<view class="t_c txt" @click="seekWord">忘记密码？</view>
			<button form-type="submit">立即登录</button>
			<view @click="signIn" class="t_c txt">还没账号？点此注册</view>
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
			// 忘记密码
			seekWord(){
				console.log('忘记密码')
				uni.navigateTo({
					url:"/pages/seekWord/seekWord"
				})
			},
			signIn(){
				console.log('进行用户注册')
				uni.navigateTo({
					url:"/pages/signIn/signIn"
				})
			},
			// 提交数据进行账号登录
			formSubmit: function(e) {
				console.log('e',e.detail.value)
					// console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
					// var formdata = e.detail.value
					// uni.showModal({
					// 		content: '表单数据内容：' + JSON.stringify(formdata),
					// 		showCancel: false
					// });
					
					// 进行用户填写信息判断，诱导用户进行正确的信息填写
					// 注意对立即登录按钮 点击进行防抖节流 处理防止用户多次点击
					if(!e.detail.value.username){
						return  uni.showToast({
											title: '请填入用户名',
											icon: 'none',
											duration: 2000
										})
					}
					if(!e.detail.value.password){
						return  uni.showToast({
											title: '请填入密码',
											icon: 'none',
											duration: 2000
										})
					}
					
					//进行用户登录
					 this._post("auth/login",{
					 	"username":e.detail.value.username,
					 	"password":e.detail.value.password,
					 },function(res){
					 	console.log('用户进行登录',res);
					 	// 储存用户的 token
						wx.setStorageSync('token', res.data.token);
						wx.setStorageSync('user_img', res.data.avatarUrl);
						wx.setStorageSync('user_name', res.data.nickName);
						wx.setStorageSync('user_phone', res.data.phone);
						wx.setStorageSync('token', res.data.token);
						
						
						
						// 成功登录后返回相应界面
						uni.navigateBack({
							delta:2
						})
					 })
			},
			formReset: function(e) {
					console.log('清空数据')
			}
		}
	}
</script>

<style lang="less">
	.reg{
		color: black;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		// background-color:#0d0639;
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
			margin-top: 180rpx;
			.input_box{
				// 0.5px的细线
				 position: relative;
				
				
				width: 638.19rpx;
				height: 75.69rpx;
				display: flex;
				justify-content: start;
				align-items: center;
				margin-bottom: 37rpx;
				box-sizing: border-box;
				padding-top: 6px;
				
				input{
					width: 100%;
					height: 100%;
				}
			}
			// 0.5px的细线
			.input_box::after{
				content: " ";
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				height: 1px;
				background: #d6d6d6;
				transform: scaleY(0.5);
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

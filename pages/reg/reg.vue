<template>
	<view class="reg">
		<!-- 表单 -->
		<form class="form" @submit="formSubmit" @reset="formReset">          
			<view class="input_box">
				<!-- <view class="iconfont iconshoujihao icon"></view> -->
				<input :focus="true" type="number" name="username" 
					 placeholder="手机号" maxlength="11" @input="input"
					>
				</input>
				<text v-if="!wxcodeNumStyle" class="test_code" @click="getNum" :class="phone.length == 11 ? 'act' : ''">获取验证码</text>
				<text v-else class="test_code">{{ wxcodeNum }} S</text>
			</view>
			<view class="input_box">
				<!-- <view class="iconfont iconmima icon"></view> -->
				<input name="password" placeholder="请输入验证码"   />
			</view>
			<!-- <view class="t_c txt" @click="seekWord">忘记密码？</view> -->
			<button form-type="submit">立即登录</button>
			<!-- <view @click="signIn" class="t_c txt">还没账号？点此注册</view> -->
		</form>
		<slider-verify :isShow="sliderVerifyFLag" @touchSliderResult="verifyResult" ref="verifyElement"></slider-verify>
	</view>
</template>

<script>
	import sliderVerify from '@/components/slider-verify/slider-verify.vue';
	export default {
		data() {
			return {
				wxcodeNumStyle: false, //判断是否显示倒计时
				wxcodeNum: 60, //获取验证码倒计显示数字
				reset: false,
				sliderVerifyFLag: false, //滑块验证
				phone:'',
			};
		},
		methods:{
			// 判断是否激活获取验证码
			input(e){
				// console.log('e',e)
				this.phone = e.detail.value
			},
			// 进行滑块验证
			getNum() {
				if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phone))) {
					this.sliderVerifyFLag = false;
					return uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none',
						position: 'top',
						duration: 2000
					});
				}
				// 出现滑块进行验证
				this.sliderVerifyFLag = true;
			},
			// 获取验证码
			verifyResult(res) {
				let _this = this;
				if (res) {
					//校验通过
					console.log('校验成功');
					// 验证码发送请求成功后，滑块消失
					_this.sliderVerifyFLag = false;
					// 调用发送验证码 请求
					this.api._post(
						'auth/regCaptcha',
						{
							phone: _this.phone
						},
						function(res) {
							uni.showToast({
								title: '验证码发送',
								duration: 2500,
								success() {
									_this.wxcodeNumStyle = true;
								}
							});
							console.log('获取验证码', res);
							// 验证码发送请求成功,进入倒计时状态
							
							var interval = setInterval(() => {
								if (_this.wxcodeNum !== 1) {
									_this.wxcodeNum--;
								} else {
									// 隐藏倒计时
									_this.wxcodeNumStyle = false;
									// 清除定时器
									clearInterval(interval);
									_this.wxcodeNum = 60;
								}
							}, 1000);
						}
					);
				} else {
					// 校验失败,点击关闭按钮
					console.log('校验失败');
					_this.sliderVerifyFLag = false;
				}
			},
			
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
					 this.api._post("auth/login",{
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
					padding-left: 20rpx;
					width: 100%;
					height: 100%;
				}
				.test_code{
					width: 225rpx;
					color: #c9c9c9;
					&.act{
						color: red;
					}
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
				// width: 40rpx;
				// height:40rpx;
				font-size: 20px;
			}
			button{
				height: 96.86rpx;
				width: 427.13rpx;
				line-height: 94.13rpx;
				background-image: linear-gradient(to right, #421ea2 , #7352ad);
				color: white;
				border-radius: 40rpx;
				overflow: hidden;
				margin: 121rpx auto;
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

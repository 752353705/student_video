<template>
	<view class="siginIn">
		<!-- 表单 -->
		<form class="form" @submit="formSubmit" @reset="formReset">
			<view class="input_box">
				<!-- <image src="../../static/pw.png" mode=""></image> -->
				<input :focus="true" name="username" placeholder="用户名" maxlength="11" />
			</view>
			<view class="input_box">
				<image src="../../static/phoneNum.png" mode=""></image>
				<input name="password" placeholder="密码" password="true" />
			</view>
			<view class="input_box">
				<image src="../../static/phoneNum.png" mode=""></image>
				<input name="password2" placeholder="确认密码" password="true" />
			</view>
			<view class="input_box"><input type="phone" name="phone" placeholder="手机号" :value="phone" @input="changephone" maxlength="11" /></view>
			<view class=" verification">
				<input class="ver_num" name="wxCode" :value="wxCode" @input="changewxCode" placeholder="验证码" />
				<view v-if="!wxcodeNumStyle" @click="getNum" :class="wxcodestyle ? 'getNum act' : 'getNum'">获取验证码</view>
				<view v-else class="getNum">{{ wxcodeNum }} S</view>
			</view>

			<button class="act" form-type="submit">注册</button>
		</form>

		<slider-verify :isShow="sliderVerifyFLag" @touchSliderResult="verifyResult" ref="verifyElement"></slider-verify>
	</view>
</template>

<script>
import sliderVerify from '@/components/slider-verify/slider-verify.vue';
export default {
	data() {
		return {
			wxcodestyle: false, //判断是否开启获取验证码
			wxcodeNumStyle: false, //判断是否显示倒计时
			wxcodeNum: 60, //获取验证码倒计显示数字
			phone: '', //用户的手机号
			wxCode: '', //用户的验证码
			reset: false,
			sliderVerifyFLag: false //滑块验证
		};
	},
	components: {
		sliderVerify
	},
	onHide() {
		console.log('页面进行隐藏');
		clearInterval(interval);
	},
	methods: {
		// 动态改变验证码
		changewxCode(e) {
			console.log('改变验证码', e.detail.value);
			this.wxCode = e.detail.value;
		},
		// 动态改变手机号
		changephone(e) {
			console.log('改变手机号', e.detail.value);
			this.phone = e.detail.value;
			// 当用户的手机号正确时，激活获取验证码的按钮
			if (e.detail.value.length === 11) {
				this.wxcodestyle = true;
			} else {
				this.wxcodestyle = false;
			}
		},

		// 进行滑块验证
		getNum() {
			// console.log('获取验证码')
			// 出现滑块进行验证
			this.sliderVerifyFLag = true;
		},
		verifyResult(res) {
			let _this = this;
			if (this.phone.length !== 11) {
				this.sliderVerifyFLag = false;
				
				return uni.showToast({
					title: '请输入完整手机号',
					icon: 'none',
					position: 'top',
					duration: 2000
				});
			}
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
						console.log('获取验证码', res);
						// 验证码发送请求成功,进入倒计时状态
						_this.wxcodeNumStyle = true;
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
		// 提交数据进行账号登录
		formSubmit: function(e) {
			console.log('e', e.detail.value);
			let _this = this;
			// 进行用户填写信息判断，诱导用户进行正确的信息填写
			// 判断用户的昵称是否相同

			// 判断用户手机号填写是否正确
			if (e.detail.value.phone.length !== 11) {
				return uni.showToast({
					title: '请输入正确手机号',
					icon: 'none',
					duration: 2000
				});
			}
			// 判断用户是否已经填写好密码
			if (!e.detail.value.password && !e.detail.value.password2) {
				return uni.showToast({
					title: '请将密码填写完整',
					icon: 'none',
					duration: 2000
				});
			}
			// 判断两次密码是否一致
			if (e.detail.value.password !== e.detail.value.password2) {
				return uni.showToast({
					title: '请保证两次密码一致',
					icon: 'none',
					duration: 2000
				});
			}

			// 注意对立即登录按钮 点击进行防抖节流 处理防止用户多次点击

			//请求接口  进行用户个人注册
			// 先获取code，然后进行相应的注册操作
			uni.login({
				provider: 'weixin',
				success: loginRes => {
					// 获取用户的  code
					console.log('login获取code', loginRes.code);
					_this.api._post(
						'auth/register',
						{
							username: e.detail.value.username,
							password: e.detail.value.password,
							phone: e.detail.value.phone,
							code: _this.wxCode, //验证码
							wxCode: loginRes.code //登录code
						},
						function(res) {
							console.log('用户进行手机注册', res);
							// 储存用户的 token
							wx.setStorageSync('token', res.data.token);
						}
					);
				},
				fail: () => {
					uni.showToast({ title: '获取 code 失败', icon: 'none' });
					return false;
				}
			});
		}
	}
};
</script>

<style lang="less">
.siginIn {
	.act {
		background-image: linear-gradient(to right, #421ea2, #7352ad);
	}
	color: black;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: #fafafa;
	.form {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		margin: 180rpx 50rpx 0;
		background-color: white;
		border-radius: 31rpx;

		.input_box {
			position: relative;
			height: 75.69rpx;
			display: flex;
			justify-content: start;
			align-items: center;
			margin: 10rpx 30rpx 37rpx 54rpx;
			box-sizing: border-box;
			padding-top: 6px;

			input {
				width: 100%;
				height: 100%;
			}
		}
		.input_box::after {
			content: ' ';
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 1px;
			background: #d6d6d6;
			transform: scaleY(0.5);
		}
		.verification {
			margin-left: 54rpx;
			border: none;
			display: flex;
			justify-content: space-between;
			.ver_num {
				width: 200rpx;
				position: relative;
			}
			.ver_num::after {
				content: ' ';
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				height: 1px;
				background: #d6d6d6;
				transform: scaleY(0.5);
			}
			.getNum {
				width: 200rpx;
				font-size: 32rpx;
				background-color: #999ca1;
				box-sizing: border-box;
				padding: 10rpx 20rpx;
				border-radius: 30rpx;
				text-align: center;
			}
		}
		image {
			margin-right: 10rpx;
			width: 40rpx;
			height: 40rpx;
		}
		button {
			height: 80.86rpx;
			width: 320.13rpx;
			line-height: 79.13rpx;
			// background-image: linear-gradient(to right, #421ea2 , #7352ad);
			background-color: gray;
			color: white;
			border-radius: 40rpx;
			overflow: hidden;
			margin: 38rpx auto;
			&.act {
				// 按钮激活
				background-image: linear-gradient(to right, #421ea2, #7352ad);
			}
		}
	}
}
</style>

<template>
	<view class="uni-popup-message">
		<!-- 个人资料 -->
		<view class="user_msg">
			<view class="tit">个人资料</view>

			<form @submit="submitUserMsg" @reset="">
				<view class="content">
					<view class="input_box">
						<text class="t-icon iconxingming" style="margin-right: 13rpx;"></text>
						<input name="name" type="text" :value="userInfo.userName" placeholder="姓名" />
					</view>
					<view class="input_box">
						<text class="t-icon icongenders" style="margin-right: 13rpx;"></text>
						<!-- <input name="gender" type="text" value="" placeholder="性别" /> -->
						<radio-group name="gender" @change="radioChange" style="display: flex;align-items: center;">
							<label
								v-for="(item, index) in items" :key="item.value"
								style="margin-right: 10rpx;"
								>
								<radio :value="userInfo.gender || 0" 
									:checked="index == current" 
									color="red" class="redio"
									/>
								<text>{{ item.name }}</text>
							</label>
						</radio-group>
					</view>
					<view class="input_box">
						<text class="t-icon iconxuexiao" style="margin-right: 13rpx;"></text>
						<input name="school" type="text" :value="userInfo.schoolName" placeholder="学校" />
					</view>
					<textarea name="area" class="textarea" :value="userInfo.personalProfile" placeholder="请输入简介" />
				</view>
				<button class="btn" form-type="submit">保存</button>
			</form>
		</view>
	</view>
</template>

<script>
/**
 * PopUp 弹出层-消息提示
 * @description 弹出层-消息提示
 * @tutorial https://ext.dcloud.net.cn/plugin?id=329
 * @property {String} type = [success|warning|info|error] 主题样式
 *  @value success 成功
 * 	@value warning 提示
 * 	@value info 消息
 * 	@value error 错误
 * @property {String} message 消息提示文字
 * @property {String} duration 显示时间，设置为 0 则不会自动关闭
 */
import VODUpload from '../aliyun-upload-sdk-1.0.0.min.js';
export default {
	name: 'UniPopupMessage',
	props: {
		// 用户的基础信息
		userInfo:{
			type:Object
		},
		/**
		 * 判断弹出框是哪一种类型
		 * */
		pop_type: {
			type: String,
			default: ''
		},
		/**
		 * 主题 success/warning/info/error	  默认 success
		 */
		type: {
			type: String,
			default: 'success'
		},
		/**
		 * 消息文字
		 */
		message: {
			type: String,
			default: ''
		},
		/**
		 * 显示时间，设置为 0 则不会自动关闭
		 */
		duration: {
			type: Number,
			default: 3000
		}
	},
	inject: ['popup'],
	data() {
		return {
			// 单选按钮
			items: [
				{
					value: '1',
					name: '男'
				},
				{
					value: '2',
					name: '女'
				}
			],
			current:'',
		};
	},
	mounted() {
		// console.log('this.$props.userInfo',this.$props.userInfo)
		setTimeout(()=>{
			this.current = parseInt(this.$props.userInfo.gender || 1 ) - 1 
		},0)
		// this.current = parseInt(this.$props.userInfo.gender || 1 ) - 1
	},
	onReady() {},
	methods: {
		// 单选按钮
		radioChange: function(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
		},
		// 控制弹窗
		open() {
			if (this.duration === 0) return;
			clearTimeout(this.popuptimer);
			this.popuptimer = setTimeout(() => {
				this.popup.close();
			}, this.duration);
		},
		close() {
			clearTimeout(this.popuptimer);
		},
		//提交个人资料
		submitUserMsg(e) {
			console.log('个人资料e', e.detail.value);
			let _this = this;
			let val = e.detail.value;
			// 调用提交个人资料的 接口，成功之后，关闭弹窗
			this.api._put(`user?gender=${val.gender}&userName=${val.name}&schoolName=${val.school}&personalProfile=${val.area}`, {}, function(res) {
				console.log('用户上传简介', res);
				uni.showToast({
					icon: 'none',
					title: '修改信息成功',
					success() {
						// 关闭弹窗
						_this.$emit('closeUsermsg');
					}
				});
			});
		}
	}
};
</script>
<style lang="scss" scoped>
.uni-popup-message {
	.user_msg {
		width: 644.44rpx;
		height: 722.22rpx;
		background-color: white;
		border-radius: 50rpx;
		box-sizing: border-box;
		padding-top: 40rpx;
		padding-left: 40rpx;
		padding-right: 40rpx;
		.tit {
			color: #7f3a35;
			font-size: 40rpx;
			font-weight: bolder;
			text-align: center;
			height: 89rpx;
		}
		.content {
			.input_box {
				height: 70rpx;
				// background-image: linear-gradient(to bottom, #f8c663, #e4a270);
				background-color: #f2f2f2;
				border-radius: 20rpx;
				display: flex;
				justify-content: start;
				align-items: center;
				box-sizing: border-box;
				padding-left: 20rpx;
				margin-bottom: 20rpx;
				input {
					display: inline-block;
					height: 100%;
					border-radius: 20rpx;
					width: 100%;
				}
			}
			.textarea {
				width: 582.63rpx;
				height: 222.22rpx;
				// background-image: linear-gradient(to bottom, #fac663, #e5a172);
				background-color: #f2f2f2;
				margin-top: 20rpx;
				box-sizing: border-box;
				padding: 10rpx 40rpx 10rpx;
				border-radius: 30rpx;
			}
		}
		.btn {
			width: 181.22rpx;
			height: 60.66rpx;
			text-align: center;
			line-height: 60.66rpx;
			background-image: linear-gradient(to bottom, #ef6a25, #f41c1f);
			border-radius: 40rpx;
			color: #db986e;
			font-size: 36rpx;
			font-weight: bolder;
			margin-top: 40rpx;
			margin: 20rpx auto;
		}
	}
}

// 修改单选框的样式
.redio{
	transform: scale(0.7);
}
</style>

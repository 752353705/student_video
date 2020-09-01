<template>
	<view class="uni-popup-message">
		<!-- 个人资料 -->
		<view class="uni-popup-message-text user_msg">
			<view class="tit">个人资料</view>

			<form @submit="submitUserMsg" @reset="">
				<view class="content">
					<view class="input_box">
						<text class="iconfont iconuser-info" style="margin-right: 13rpx;"></text>
						<input name="name" type="text" value="" placeholder="姓名" />
					</view>
					<view class="input_box">
						<text class="iconfont iconxingbie" style="margin-right: 13rpx;"></text>
						<input name="gender" type="text" value="" placeholder="性别" />
					</view>
					<view class="input_box">
						<text class="iconfont iconxuexiao" style="margin-right: 13rpx;"></text>
						<input name="school" type="text" value="" placeholder="学校" />
					</view>
					<textarea name="area" class="user_txt" value="" placeholder="请输入简介" />
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
			video_src: '',
			uploader: '',
			videos: [],
			showCir: false, //进度环是否显示
			percent: 0 //上传进度环的显示
		};
	},
	created() {
		this.popup.childrenMsg = this;
	},
	onReady() {},
	methods: {
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
		}
	}
};
</script>
<style lang="scss" scoped>
.uni-popup-message {
	display: flex;
	flex-direction: column;
	align-items: center;
	.uni-popup-message-text {
		width: 639.58rpx;
		height: 821.52rpx;
		background-color: #f9ba59;
		font-size: 14px;
		border-radius: 50rpx;
		background-image: linear-gradient(to bottom, #fed353, #ea9b70);
		position: relative;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
		.head {
			box-sizing: border-box;
			width: 80%;
			height: 100rpx;
			color: #822c37;
			font-size: 40rpx;
			font-weight: bolder;
			text-align: center;
			box-sizing: border-box;
			margin-bottom: 20rpx;
			position: relative;
			.bg {
				width: 100%;
				height: 333rpx;
				background-color: #fed353;
				border-radius: 50%;
				position: absolute;
				top: -203rpx;
				box-shadow: 0 8px 5px #e9a631;
				.tit {
					position: absolute;
					bottom: 49rpx;
					left: 50%;
					transform: translateX(-50%);
				}
			}
		}
		.content {
			color: white;
			font-size: 30rpx;
			box-shadow: 8px 4px 4px #e9a631;
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
	// 个人资料的弹窗样式
	.user_msg {
		width: 644.44rpx;
		height: 722.22rpx;
		padding-top: 40rpx;
		padding-left: 40rpx;
		padding-right: 40rpx;

		.tit {
			color: #7f3a35;
			font-size: 40rpx;
			font-weight: bolder;
			width: 100%;
			justify-content: start;
			text-align: start;
			height: 89rpx;
			background-color: transparent;
			margin-bottom: 0rpx;
			box-sizing: border-box;
			padding-left: 30rpx;
		}

		.content {
			width: 100%;
			box-shadow: none;
			.input_box {
				height: 70rpx;
				background-image: linear-gradient(to bottom, #f8c663, #e4a270);
				border-radius: 20rpx;
				display: flex;
				justify-content: start;
				align-items: center;
				box-sizing: border-box;
				padding-left: 20rpx;
				input {
					display: inline-block;
					height: 100%;
					border-radius: 20rpx;
					width: 100%;
				}
			}
			.user_txt {
				width: 582.63rpx;
				height: 222.22rpx;
				background-image: linear-gradient(to bottom, #fac663, #e5a172);
				margin-top: 20rpx;
				box-sizing: border-box;
				padding: 10rpx 40rpx 10rpx;
				border-radius: 30rpx;
			}
		}
	}
}
</style>

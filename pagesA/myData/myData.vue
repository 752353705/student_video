<template>
	<view class="my_data">
		<!-- 用户头像 -->
		<view class="user_img"><image :src="userInfo.avatarUrl" mode=""></image></view>
		<!-- 其他信息 -->
		<view class="msg_box">
			<view class="item" @click="changName">
				<view class="le">名字</view>
				<view class="ri">
					<text style="margin-right: 10rpx;">{{ userInfo.userName }}</text>
					<text class="iconfont iconfanhui"></text>
				</view>
			</view>
			<view class="item" @click="changGender">
				<view class="le">性别</view>
				<view class="ri">
					<text style="margin-right: 10rpx;">{{ userInfo.gender == 2 ? '女' : '男' }}</text>
					<text class="iconfont iconfanhui"></text>
				</view>
			</view>
			<view class="item" @click="showPop">
				<view class="le">生日</view>
				<view class="ri">
					<text style="margin-right: 10rpx;">{{ userInfo.birthday }}</text>
					<text class="iconfont iconfanhui"></text>
				</view>
			</view>
			<view class="item" @click="changIntro">
				<view class="le">个人简介</view>
				<view class="ri dis_flex_start item-center">
					<view class="text_right "
						style="width:196px;margin-right: 10rpx;color: #9c9c9c;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;display: inline-block;"
						:style="userInfo.personalProfile ? 'color: #9c9c9c' : ''"
					>
						{{ userInfo.personalProfile || '有趣的简介会吸引更多的粉丝哦' }}
					</view>
					<text class="iconfont iconfanhui"></text>
				</view>
			</view>
			<!-- 出生日期选择器 -->
			<min-popup heightSize="500" 
				:show="show" @close="close"
				>
					<min-picker :endTime="endTime" :startTime="startTime" 
						@cancel="cancel" @sure="sure"
						>
					</min-picker>
			</min-popup>
		</view>
	</view>
</template>

<script>
import minPopup from '@/components/min-picker/min-popup.vue';
import minPicker from '@/components/min-picker/min-picker.vue';
export default {
	data() {
		return {
			// 日期插件 显隐
			startTime: [1940, 1, 1],
			endTime: [2020],
			show: false,
			userInfo: '',
			time: '暂无',
			// 选择器当前的下标
			value: 0
		};
	},
	components: {
		minPopup,
		minPicker
	},
	onLoad() {},
	onShow() {
		// 请求个人资料
		this.getUsInfo();
	},
	methods: {
		// 获取选择的日期
		// 取消事件
		cancel() {
			this.close();
		},
		// 确认事件
		sure(e) {
			// 当用户没有对 picker 进行滚动的时候
			if(!e.a){
				this.userInfo.birthday = this.startTime[0] + '-' + e.b + '-' + e.c;
			}else{
				this.userInfo.birthday = e.a + '-' + e.b + '-' + e.c;
			}
			// 将生日进行提交
			this.http({
				url: 'user',
				method: 'PUT',
				data: {
					birthday: this.userInfo.birthday
				}
			});
		},
		// picker显示
		showPop() {
			this.show = true;
		},
		// 关闭picker
		close() {
			this.show = false;
		},
		// 获取当前用户的个人资料
		getUsInfo() {
			if (uni.getStorageSync('token')) {
				// 如果用户进行了登录操作，获取用户的个人资料
				this.http({
					url: 'user/info'
				}).then(res => {
					this.userInfo = res.data;
				});
			}
		},
		// 跳转到 修改个人名字
		changName() {
			uni.navigateTo({
				url: '/pagesA/myData/myName?name=' + this.userInfo.userName
			});
		},
		// 跳转到 修改个人简介
		changIntro() {
			uni.navigateTo({
				url: '/pagesA/myData/myIntroduction?personalProfile=' + this.userInfo.personalProfile
			});
		},
		// 跳转到 修改性别
		changGender() {
			uni.navigateTo({
				url: '/pagesA/myData/myGender?gender=' + this.userInfo.gender
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.my_data {
	.user_img {
		width: 162rpx;
		height: 162rpx;
		margin: 80rpx auto;
		border-radius: 50%;
		overflow: hidden;
		// iOS端圆角设置失效
		-webkit-backface-visibility: hidden;
		-webkit-transform: translate3d(0, 0, 0);
		image {
			width: 100%;
			height: 100%;
		}
	}
	// 用户信息的展示
	.msg_box {
		box-sizing: border-box;
		padding-left: 44rpx;
		padding-right: 44rpx;
		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1rpx solid #e6e6e6;
			padding-top: 37rpx;
			padding-bottom: 44rpx;
		}
		.item:last-child {
			border: none;
		}
	}
}
</style>

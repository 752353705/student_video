<template>
	<view>
		<view class="fun-box" :class="{'show-fun-box':showFunBtn}">
			<u-grid :col="4"  hover-class="contentType2-hover-class" :border="false" @click="clickGrid">
				<u-grid-item v-for="(item, index) in funList" :index="index" :key="index" bg-color="#eaeaea">
					<u-icon :name="item.icon" :size="52"></u-icon>
					<view class="grid-text">{{ item.title }}</view>
				</u-grid-item>
			</u-grid>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fromUserInfo: {},
				formData: {
					content: '',
					limit: 15,
					index: 1
				},
				messageList: [],
				loading: true, //标识是否正在获取数据
				imgHeight: '1000px',
				mpInputMargin: false, //适配微信小程序 底部输入框高度被顶起的问题
				chatType:"voice",  // 图标类型 'voice'语音 'keyboard'键盘
				voiceTitle: '按住 说话',
				Recorder: uni.getRecorderManager(),
				Audio: uni.createInnerAudioContext(),
				recording: false, //标识是否正在录音
				isStopVoice: false, //加锁 防止点击过快引起的当录音正在准备(还没有开始录音)的时候,却调用了stop方法但并不能阻止录音的问题
				voiceInterval:null,
				voiceTime:0, //总共录音时长
				canSend:true, //是否可以发送
				PointY:0, //坐标位置
				voiceIconText:"正在录音...",
				showFunBtn:false, //是否展示功能型按钮
				AudioExam:null, //正在播放音频的实例
				funList: [
					{ icon:"photo-fill",title:"照片",uploadType:["album"] },
					{ icon:"camera-fill",title:"拍摄",uploadType:["camera"] },
				],
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	
</style>

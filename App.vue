<script>
export default {
	data() {
		return {};
	},
	onLaunch: function() {
		// 小程序强制更新
		console.log('小程序进行强制更新');
		const updateManager = uni.getUpdateManager();
		updateManager.onCheckForUpdate(function(res) {
			// 请求完新版本信息的回调
			console.log('版本是否需要进行更新', res.hasUpdate);
		});
		updateManager.onUpdateReady(function(res) {
			//进行强制更新
			updateManager.applyUpdate();
		});
		updateManager.onUpdateFailed(function(res) {
			// 新的版本下载失败
			uni.showToast({
				title: '小程序更新失败',
				duration: 2000
			});
		});
	},
	onShow: function() {
		// console.log('App Show');
	},
	onHide: function() {
		// console.log('App Hide');
	},
	methods: {}
};
</script>

<style lang="less">
// @import 'uview-ui/index.scss';
// 阿里字体 彩色 图标设置
@import './assets/svg/iconfont-weapp-icon.css';
@import './assets/iconfont/iconfont.css';

// 常用样式的文件
@import './common.less';


// 页面整体颜色
@bg_color:#ff9933;

/*每个页面公共css */
.html,
.body {
	width: 100%;
	height: 100%;
	padding: 0;
	margin: 0;
}
.t_c {
	text-align: center;
}
image {
	will-change: transform;
}
// 隐藏滚动条
::-webkit-scrollbar {
	display: none;
	width: 0 !important;
	height: 0 !important;
	-webkit-appearance: none;
	background: transparent;
}

// 调整多选框的样式
checkbox .wx-checkbox-input {
	border-radius: 50% !important;
	/* color: #ffffff !important; */
}

checkbox .wx-checkbox-input.wx-checkbox-input-checked {
	color: #fff;
	background: red;
}
</style>

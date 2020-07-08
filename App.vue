<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			console.log('小程序进行强制更新')
			
			const updateManager = uni.getUpdateManager();
			
			updateManager.onCheckForUpdate(function (res) {
			  // 请求完新版本信息的回调
			  console.log('版本是否需要进行更新',res.hasUpdate);
			});
			
			updateManager.onUpdateReady(function (res) {
				//进行强制更新
				updateManager.applyUpdate();
			});
			
			updateManager.onUpdateFailed(function (res) {
			  // 新的版本下载失败
				uni.showToast({
				    title: '小程序更新失败',
				    duration: 2000
				});
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	.html,.body{
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
	}
	.t_c{
		text-align: center;
	}
	image{will-change: transform}
</style>

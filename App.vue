<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style>
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

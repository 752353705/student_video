<template>
	<view>
		商城
		
		
		
		<!-- 底部自定义tabber -->
		<tabbar :active="s_active"></tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				s_active:1
			};
		},
		onLoad() {
			uni.hideHomeButton()
		}
	}
</script>

<style lang="less">

</style>

<template>
	<view>
		<!-- 作品列表 -->
		
		<!-- 底部自定义tabber -->
		<tabbar :active="i_active"></tabbar>
	</view>
</template>

<script>
	import tabbar from '../../components/tabbar.vue'
	import uniPopup from '../../components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '../../components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '../../components/uni-popup/uni-popup-dialog.vue'
	export default {
		data() {
			return {
				i_active: 0
			}
		},
		components:{
			tabbar,
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	
</style>

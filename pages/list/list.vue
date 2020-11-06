<template>
	<view class="listPage">
		<!-- 搜索框 -->
		<view class="searchBox height">
			<view class="serach text-center item-center panel-center " @click="goSearch">
				<u-icon size="40" name="search"></u-icon>
				<span>搜索</span>
			</view>
		</view>
		
		<!-- 赛事 类型说明 height -->
		<view class="game_type height panel-between item-center box-boder ma-t30 ma-b20"
			v-if="game_type_state"
			>
			<view class="le panel-start item-center" style="width: 80%;">
				<view class="img_box" @click="goGameDetail" >
					<image class="img" :src="gameMsg.logo" mode="scaleToFill"></image>
				</view>
				<view class="body  panel-center" @click="goGameDetail">
					<view class="name">{{gameMsg.subjectTitle}}</view>
					<view class="desc ma-t20 fo-20">{{gameMsg.introduction}}</view>
				</view>
			</view>
			<!-- <view class="btn fo-20 box-boder" @click="goGame">
				其他大赛
			</view> -->
			<view class="btn fo-20 box-boder" @click="goGameDetail">
				详情
			</view>
		</view>
		
		<!-- 视频分类 -->
		<!-- <swiperTabHead class="height" ref="swipertab" :flex="true" 
			:tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap" 
			:top="top"></swiperTabHead> -->
		<!-- <view class=""></view> -->
		
		<!-- 小喇叭 进行通知 -->
		<!-- <u-notice-bar class="height notice" 
			  mode="horizontal" 
			:is-circular="true" :list="notice"
			>
		</u-notice-bar> -->
		
		<!-- 轮播滑动页面 -->
		<!-- <swiper style="" :style="{height:mescroll_height}" :current="tabIndex" @change="tabChange"> -->
			<!-- <swiper-item :emptyOption="emptyOption" style="box-sizing: border-box;padding: 0 10rpx;" v-for="(tab,i) in tabBars" :key="i"> -->
				<mescroll-item ref="mescroll" :mescrollBot="mescrollBot" 
					:kw="kw" :subjectId="gameMsg.subjectId" @showUseroperation="showUseroperation" 
					@closeUseroperation="closeUseroperation" :waterFullHeight="mescroll_height" 
					:i="i" :index="tabIndex" :tabs="tabBars"
					@getListVideo="getListVideo" 
				>
				</mescroll-item>
			<!-- </swiper-item> -->
		<!-- </swiper> -->
	</view>
</template>

<script>
	// 引入mescroll-mixins.js
	import MescrollItem from "@/components/mescroll-swiper-item.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollEmpty from '@/components/mescroll-uni/components/mescroll-empty.vue';
	// 引入tabHead 切换
	import swiperTabHead from "@/components/swiper-tab-head.vue";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				// 判断是否有赛事展示
				game_type_state:false,
				
				// 视频滚动区域距离底部的距离
				// mescrollBot:'200',
				// 请求数据的关键词
				kw:"listTxt",
				// notice:[
				// 	'寒雨连江夜入吴',
				// 	'平明送客楚山孤',
				// 	'洛阳亲友如相问',
				// 	'一片冰心在玉壶'
				// ],
				// 空布局时自定义提示
				emptyOption:{
					tip:'list空布局提示'
				},
				top:"0rpx",
				// 参赛选手列表
				height:0,
				mescroll_height:'',
				//控制nav切换
				tabIndex:0,// 选中的
				tabBars:[
					// { name:"视频",id:"listVideo" },
					{ name:"图文",id:"listTxt" },
					// { name:"跳蚤市场",id:"listUsed" },
				], 
				// 用户当前浏览的 赛事id logo
				gameMsg:''
			}
		},
		components:{
			MescrollEmpty,
			MescrollItem,
			swiperTabHead,
		},
		onLoad(option) {
			let _this = this
			// 判断当前有没有赛事 信息
			// if(!uni.getStorageSync('gameMsg')){
			// 	// 没有赛事信息
			// 	this.api._get('subject/indexSubject',{},(res) => {
			// 		console.log('大赛参数res',res)
			// 		let gameMsg = {
			// 			subjectId:res.data.subjectId,
			// 			logo:res.data.logoUrl,
			// 			subjectTitle:res.data.subjectTitle,
			// 			introduction:res.data.introduction,
			// 		}
			// 		uni.setStorageSync('gameMsg',JSON.stringify(gameMsg))
			// 	})
			// }else {
			// 	// 有信息
			// 	this.gameMsg = JSON.parse(uni.getStorageSync('gameMsg'))
			// }
			// 设置滚动区域的高度
			uni.getSystemInfo({
				success(res) {
						_this.phoneHeight = res.windowHeight; //获取用户设备的高度
						console.log('用户的设备高度',res.windowHeight);
						// 计算组件的高度
						let view = uni.createSelectorQuery().selectAll('.height');
						view.boundingClientRect(data => {
							// 计算上方各元素的高度总和
							data.forEach((item,index) => {
								// console.log('item',item.height)
								_this.height += parseInt(item.height)
							})
								_this.mescroll_height =  _this.phoneHeight - _this.height ;
								_this.mescroll_height =  _this.mescroll_height +"px";
						}).exec();
				}
			});
		},
		onShow() {
			// 判断内存中是否有赛事缓存
			if(!uni.getStorageSync('gameMsg')){
				// 没有赛事缓存  通过分享首次进入
				this.api._get('subject/indexSubject',{},(res) => {
					console.log('大赛参数res',res)
					let gameMsg = {
						subjectId:res.data.subjectId,
						logo:res.data.logoUrl,
						subjectTitle:res.data.subjectTitle,
						introduction:res.data.introduction,
					}
					uni.setStorageSync('gameMsg',JSON.stringify(gameMsg))
					let now_gameMsg = JSON.parse(uni.getStorageSync('gameMsg'))
					if(now_gameMsg.subjectId !== this.gameMsg.subjectId){
						console.log('赛事id改变 重新更新列表')
						this.gameMsg = now_gameMsg
						this.game_type_state = true
						this.$refs.mescroll.refash();
					}
					return
				})
				// this.game_type_state = false
				// this.$refs.mescroll.refash();
				// return
			}else{
				this.game_type_state = true
			}
			
			let now_gameMsg = JSON.parse(uni.getStorageSync('gameMsg'))
			if(now_gameMsg.subjectId !== this.gameMsg.subjectId){
				console.log('赛事id改变 重新更新列表')
				this.gameMsg = now_gameMsg
				this.$refs.mescroll.refash();
			}
		},
		onReady() {
			
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {
				// 来自页面内转发按钮
				console.log(res.target)
			}else{
				// 分享tabbar页面，直接运用小程序原生菜单中的分享按钮
				uni.showShareMenu({})
			}
			// return {
			// 	title: '首页分享',
			// 	path: '/page/list/list'
			// }
		},
		methods: {
			// 用户点击比赛跳转到大赛详情界面
			goGameDetail(){
				console.log('跳转大赛')
				uni.navigateTo({
					url:`/pages/Introduction/gameDetail?subjectId=${this.gameMsg.subjectId}`
				})
			},
			// 用户重新筛选其他类型大赛
			goGame(){
				uni.switchTab({
					url:'/pages/Introduction/Introduction'
				})
			},
			// 控制 首页 用户操作弹窗的显隐
			showUseroperation(btntop,btnleft){
				// console.log('list 中 按钮显示的位置',"btntop ==>",btntop,"btnleft ==>",btnleft)
				// this.opertop = btntop
				// this.operleft = btnleft
				// this.$refs.popup_useoperation.open()
			},
			
			// 用于关闭弹窗
			closeUseroperation(num){
				this.$refs.popup_useoperation.close()
			},
			//滑动切换导航
			tabChange(e){
			  this.tabIndex = e.detail.current
				// 用户进行 互动操作，修改 kw 进行请求不同类型的数据
				this.kw = this.tabBars[this.tabIndex].id
			},
			//接受子组件传过来的值点击切换导航
			tabtap(index){
				this.tabIndex = index;
				this.kw = this.tabBars[this.tabIndex].id
			},
			// 控制测试的视频列表
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			// 跳转到搜搜页面
			goSearch(){
				uni.navigateTo({
					url:"/pages/find/find"
				})
			},
		}
	}
</script>

<style  scoped lang="scss">
	.listPage{
		background-color: #f5f6fa;
		box-sizing: border-box;
		padding: 0rpx 10rpx 0;
		// 滚动的小喇叭
		// .notice{
		// 	position: fixed;
		// 	top:0;
		// 	top:144rpx;
		// 	width: 100%;
		// 	height: 40px;
		// 	z-index: 90;
		// 	box-sizing: border-box;
		// 	padding-right: 20rpx;
		// }
		.searchBox{
			width: 100%;
			height: 77rpx;
			background-color: white;
			padding: 50rpx 0 20rpx 0;
			position: sticky;
			z-index: 10;
			top: 0;
			left: 0;
			.serach{
				background-color: #f5f5f5;
				border-radius: 33rpx;
				width: 69%;
				height: 100%;
				color: #453a74;
			}
		}
		// 赛事分类
		.game_type{
			background-color: white;
			position: sticky;
			top: 133rpx;
			left: 0;
			z-index: 20;
			height: 168rpx;
			padding: 20rpx;
			.le{
				.img_box{
					image{
						border-radius: 50%;
						width: 100rpx;
						height: 100rpx;
						// iOS端圆角设置失效
						-webkit-backface-visibility: hidden;
						-webkit-transform: translate3d(0, 0, 0);
					}
				}
				.body{
					flex-direction: column;
					padding-left: 20rpx;
					.name{
						width: 380rpx;
						font-size: 30rpx;
						font-weight: bold;
						overflow:hidden;
						white-space:nowrap;
						text-overflow:ellipsis;
					}
					.desc{
						width: 380rpx;
						color: #6d6d6d;
						overflow:hidden;
						white-space:nowrap;
						text-overflow:ellipsis;
					}
				}
			}
			.btn{
				padding: 10rpx 16rpx;
				border: 1px solid black;
				border-radius: 10rpx;
			}
		}
	}
</style>

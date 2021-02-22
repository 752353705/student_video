<template>
	<view class="listPage">
		<view class="head">
			<!-- 返回按钮 -->
			<image @click="back" src="/static/back.png" mode=""></image>
			<!-- 搜索框 -->
			<view class="searchBox height">
				<view class="serach text-center item-center panel-center " @click="goSearch">
					<u-icon size="40" name="search"></u-icon>
					<span>搜索</span>
				</view>
			</view>
		</view>
		<!-- 赛事 类型说明 height -->
		<view class="game_type height panel-between item-center box-boder  ma-b20"
			v-if="game_type_state" @click="goGameDetail"
			>
			<view class="le panel-start item-center" style="width: 80%;">
				<view class="img_box"  >
					<image class="img" :src="gameMsg.logo" mode="scaleToFill"></image>
				</view>
				<view class="body  panel-center">
					<view class="name">{{gameMsg.subjectTitle}}</view>
					<view class="desc ma-t20 fo-20">{{gameMsg.introduction}}</view>
				</view>
			</view>
			<view class="btn fo-20 box-boder">
				详情
			</view>
		</view>
		<view style="padding: 0rpx 10rpx 0;box-sizing: border-box;">
			<!-- 作品 -->
			<mescroll-item  ref="mescroll"
				:kw="kw"
				:waterFullHeight="mescroll_height" 
				:listData="listData" v-on:getData="getListTxt"
			>
			</mescroll-item>
		</view>
		<!-- 快捷报名按钮 game_statue 用来判断是否为 最美学子大赛
				还要增加判断条件，将答题大赛与其他大赛区分开
				-->
		<block v-if="game_statue">
			<view v-if="game_type" style="right: 7rpx;" class="add"  @click="jumpQuestion">
				<image src="/static/answer.png" mode="widthFix"></image>
			</view>
			<view v-else class="add"  @click="jumpPublish">
				<image src="/static/apply.png" mode="widthFix"></image>
			</view>
		</block>
	
	</view>
</template>

<script>
	// 引入mescroll-mixins.js
	import MescrollItem from "@/components/mescroll-swiper-item.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollEmpty from '@/components/mescroll-uni/components/mescroll-empty.vue';
	
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				// 当前大赛的 subjectid
				subjectId:'',
				
				// 列表数据
				listData: [],
				// 判断是否有赛事展示
				game_type_state:false,
				// 请求数据的关键词
				kw:"listTxt",
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
				// 用户当前浏览的 赛事id logo
				gameMsg:'',
				// 判断 大赛的状态 是否还在进行中，否则隐藏上传按钮
				game_statue:true,
				// 将 答题大赛 与 一般大赛区分开
				// true 表示大赛为 答题类型
				game_type:true,
				subjectTypeName:''
			}
		},
		components:{
			MescrollEmpty,
			MescrollItem,
		},
		onLoad(option) {
			let _this = this
			
			console.log('option',option)
			// 将 subjectId 进行赋值
			this.subjectId = option.subjectId
			this.subjectTypeName = option.subjectTypeName
			
			// 根据 options 传递过来的参数，判断是否显示
			// 上传作品图标
			if(option.tab_act == 1){
				this.game_statue = true
			}else if(option.tab_act == 2){
				this.game_statue = false
			}
			// 区分大赛 是 答题大赛 还是 一般大赛
			if(option.subjectTypeName == '答题'){
				this.game_type = true
			}else{
				this.game_type = false
			}
			
			
			
			
			// 用于显示分享到朋友圈
			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			});
			// 设置滚动区域的高度
			uni.getSystemInfo({
				success(res) {
						_this.phoneHeight = res.windowHeight; //获取用户设备的高度
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
				this.byCacheGame()
			}else{
				this.game_type_state = true
			}
			
			let now_gameMsg = JSON.parse(uni.getStorageSync('gameMsg'))
			if(now_gameMsg.subjectId !== this.gameMsg.subjectId){
				this.gameMsg = now_gameMsg
				this.$refs.mescroll.refash();
			}
			// 当该大赛是 最美学子的时候，隐藏 上传作品按钮
			// 判断是 一般大赛还是 答题大赛
			if(this.gameMsg.subjectId == 16){
				this.game_statue = false
			}
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {
				// 来自页面内转发按钮
				console.log('页面内转发按钮',res.target)
			}else{
				// 分享tabbar页面，直接运用小程序原生菜单中的分享按钮
				uni.showShareMenu({})
			}
		},
		methods: {
			// 跳转到 答题页面
			jumpQuestion(){
				uni.navigateTo({
					url:`/pages/questionBank/questionBank?subjectId=${this.subjectId || this.gameMsg.subjectId }`
				})
			},
			// back，返回主页面
			back(){
				uni.switchTab({
					url:'/pages/Introduction/Introduction'
				})
			},
			// 请求获取 列表内容
			getListTxt(msg,callback) {
				this.http({
					url:'article/list',
					data:{
						pageNum: msg.pageNum,
						pageSize: '10',
						subjectId: this.gameMsg.subjectId
					}
				}).then(res => {
					// console.log('list 获取第'+ msg.pageNum + '页数据',res.data.list)
					if (msg.pageNum > 1) {
						this.listData = this.listData.concat(res.data.list);
					} else {
						this.listData = res.data.list
					}
					callback(res.data.list.length)
				}).catch(() => {
					callback(1)
				})
			},
			// 跳转到搜索页面
			goSearch(){
				uni.navigateTo({
					url:"/pages/find/find"
				})
			},
			// 跳转到上传作品页面
			jumpPublish(){
				uni.navigateTo({
					url:'/pages/publish/publishNotice'
				})
			},
			// 通过分享进入的改页面，判断获取哪类大赛作品
			byCacheGame(){
				this.http({
					url:'subject/indexSubject'
				}).then(res => {
					let gameMsg = {
						subjectId:res.data.subjectId,
						logo:res.data.logoUrl,
						subjectTitle:res.data.subjectTitle,
						introduction:res.data.introduction,
					}
					uni.setStorageSync('gameMsg',JSON.stringify(gameMsg))
					let now_gameMsg = JSON.parse(uni.getStorageSync('gameMsg'))
					if(now_gameMsg.subjectId !== this.gameMsg.subjectId){
						this.gameMsg = now_gameMsg
						this.game_type_state = true
						this.$refs.mescroll.refash();
					}
					return
				})
			},
			// 获取对应大赛的作品
			getData(pageNum){
				this.http({
					url:'article/list',
					data:{
						pageNum: pageNum,
						pageSize: '10',
						subjectId: this.gameMsg.subjectId
					}
				}).then(res => {
					if (pageNum > 1) {
						this.listData = this.listData.concat(res.data.list);
					} else {
						this.listData = res.data.list;
						// _this.mescroll.endSuccess(res.data.list.length);
					}
				})
			},
			// 用户点击比赛跳转到大赛详情界面
			goGameDetail(){
				console.log('跳转大赛')
				uni.navigateTo({
					url:`/pages/Introduction/gameDetail?subjectId=${this.gameMsg.subjectId}&subjectTypeName=${this.subjectTypeName}`
				})
			},
			// 用户查看大赛详情
			goGame(){
				uni.switchTab({
					url:'/pages/Introduction/Introduction'
				})
			},
		}
	}
</script>

<style  scoped lang="scss">
	.listPage{
		background-color: #f5f6fa;
		.head{
			width: 100%;
			height: 77rpx;
			padding: 50rpx 0 20rpx 10rpx;
			position: sticky;
			z-index: 10;
			top: 0;
			left: 0;
			background-color: white;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			image{
				margin-right: 10rpx;
				width: 60rpx;
				height: 53rpx;
			}
			.searchBox{
				width: 100%;
				height: 100%;
				.serach{
					background-color: #f5f5f5;
					border-radius: 33rpx;
					width: 69%;
					height: 100%;
					color: #453a74;
				}
			}
		}
		// 赛事分类
		.game_type{
			background-color: white;
			position: sticky;
			top: 145rpx;
			left: 0rpx;
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
		.add{
			position: fixed;
			right: -11rpx;
			bottom: 240rpx;
			width: 173rpx;
			height: 141rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
</style>

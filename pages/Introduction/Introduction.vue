<template>
	<view class="introduction">
		<!-- 筛选按钮 以及标题 -->
		<view class="navigation">
			<!-- 滚动选择赛事的类型 -->
			<picker @change="bindPickerChange" :value="value" :range="game_type" range-key="typeName">
				<view class="screen">
					<text style="font-size: 20px;" class="iconfont iconshaixuan"></text>
					<text style="font-size: 13px;line-height: 20rpx;">筛选</text>
				</view>
			</picker>
			<!-- 标题 -->
			<view class="title">
				大赛简介
			</view>
		</view>
		
		<!-- 赛事轮播展示 -->
		<swiper :indicator-dots="false" :autoplay="true" 
			:interval="3000" :duration="1000" :circular="true"
			>
			<swiper-item v-for="(item,index) in ad" :key="item.adId">
				<image
					style="width: 100%;height: 100%;"
					:src="item.image" 
					mode="widthFix"
					>
				</image>
			</swiper-item>
		</swiper>
		
		<!-- 头部分类 -->
		<view class="tab">
			<view @click='hot(index)' v-for="(item,index) in tab_list" :key='index'
				 class="item"
				 :class="tab_act == index ? 'act' : '' "
				>
					{{item}}
			</view>
		</view>
		
		
		<!-- 赛事列表 -->
			<!-- 如果没有赛事 -->
			<view v-if="game_list.length == 0" style="color: white;text-align: center;margin-top: 30rpx;" >
				—— 暂无赛事 ——
			</view>
		
		<view class="cont" v-else>
			<view class="item" v-for="(item,index) in game_list" :key="index"
				@tap="golist(index)"
				>
				<view class="cricle1"></view>
				<view class="cricle2"></view>
				<view class="cricle3"></view>
				<view class="cricle4"></view>
				<view class="head">
					<view class="type">
						{{item.subjectTypeName}}
					</view>
					<view class="game_name">
						{{item.subjectTitle}}
						
					</view>
				</view>
				<view class="location">
					<view class="le">
						<view style="color: #94faff;" class="iconfont icondidian"></view>
						<view style="color: #c6e0ff; font-size: 23rpx;">
							{{item.subjectAddress}}
						</view>
					</view>
					<view class="iconfont iconfanhui"></view>
				</view>
				<view class="time">
					<view class="le">
						<view style="color: #94faff;font-size: 14px;" class="iconfont iconshijian"></view>
						<view style="color: #c6e0ff;font-size: 23rpx;">
							{{item.beginTime}}-{{item.endTime}}
						</view>
					</view>
					<view class="ri">
						<text style="color: #94faff;" class="iconfont icontianjia"></text>
						<text style="font-size: 23rpx;">报名中</text>
					</view>
				</view>
				<!-- 访问量 -->
				<view class="foot">
					<view v-if="item.hotStatus == 1" class="hot">
						热门
					</view>
					<text class="iconfont iconscan"></text>
					<text style="font-size: 20rpx;margin-right: 13px;">{{item.views}}</text>
					
					<!-- 参赛人数 -->
					<text class="iconfont iconshoujihao"></text>
					<text style="font-size: 20rpx;">{{item.gameUsers}}</text>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				// 默认第一页进行加载
				pageNum: 1,
				// 判断是否有下一页
				nextpage:false,
				// 判断当前tab展示的类型
				tab_act:1,
				// tab 包含类型
				tab_list:[
					'即将开始',
					'进行中',
					'已结束',
				],
				// 赛事列表
				game_list:[],
				// 筛选
				game_type: [],
				value:0,
				// 筛选的类型
				id:'',
				// 轮播图广告图
				ad:'',
			}
		},
		// 用户上拉加载
		onReachBottom(){
			console.log('上拉加载')
			// 用来判断 用什么方式进行 渲染比赛信息数据
			let reach = 1
			// 当当前的数据 条数大于十条的时候，下拉到底部 重新请求数据
			if(this.nextpage){
				if(this.tab_act == 0){
					// 即将开始的大赛
					this.noStart(this.id,reach)
				}else if(this.tab_act == 1){
					// 进行中的大赛
					this.proceed(this.id,reach)
				}else if(this.tab_act == 2){
					// 结束的大赛
					this.end(this.id,reach)
				}
			}
		},
		onLoad() {
			let _this = this 
			this.api._get('subject/type',{},function(res){
				// console.log('请求大赛类型',res)
				_this.game_type = [{id:'',typeName:'全部'}].concat(res.data) 
			})
			// 即将开始的大赛
			this.proceed('')
			// 获取 轮播图广告
			this.getAd()
		},
		methods:{
			// 获取广告位轮播图
			getAd(){
				let _this = this
				this.api._get('subject/ads',{},function(res){
					// console.log('请求轮播图',res)
					_this.ad = res.data
				})
			},
			
			// 筛选大赛类型
			bindPickerChange(e) {
				// console.log('picker发送选择改变，携带值为', e)
				this.value = e.detail.value
				this.id = this.game_type[e.detail.value].id 
				if(this.tab_act == 0){
					// 即将开始的大赛
					this.noStart(this.id)
				}else if(this.tab_act == 1){
					// 进行中的大赛
					this.proceed(this.id)
				}else if(this.tab_act == 2){
					// 结束的大赛
					this.end(this.id)
				}
			},
			
			// 跳转到作品列表
			golist(index){
				let _this = this
				// 触发页面之间的事件
				// console.log('跳转到作品列表')
				uni.switchTab({
					url:`/pages/list/list`
				})
				// _this.subjectId= subjectId
				let gameMsg = {
					subjectId:this.game_list[index].subjectId,
					logo:this.game_list[index].logoUrl,
					subjectTitle:this.game_list[index].subjectTitle,
					introduction:this.game_list[index].introduction,
				}
				uni.setStorageSync('gameMsg',JSON.stringify(gameMsg))
			},
			
			hot(index){
				if(index === this.tab_act) return;
				this.tab_act = index
				if(this.tab_act == 0){
					// 即将开始的大赛
					this.noStart(this.id)
				}else if(this.tab_act == 1){
					// 进行中的大赛
					this.proceed(this.id)
				}else if(this.tab_act == 2){
					// 结束的大赛
					this.end(this.id)
				}
			},
			
	// id 是用于判断是否进行筛选
			// 即将开始的大赛
			noStart(id,reach){
				let _this = this 
				this.api._get('subject/notStart',{
					subjectTypeId:id || '' ,
					pageNum:this.pageNum,
					pageSize:10
				},function(res){
					// console.log('请求即将开始的大赛',res)
					if(reach == 1){
						// 代表用户进行的 上拉加载
						_this.game_list = _this.game_list.concat(res.data.list)
					}else{
						// 用户进行 筛选 
						_this.game_list = res.data.list
					}
					//判断是否有下一页 
					if (res.data.list == 10) {
						_this.pageNum++;
						_this.nextpage = true
					}else{
						_this.nextpage = false
					}
					
				})
			},
			
			// 请求进行中的大赛
			proceed(id,reach){
				let _this = this 
				this.api._get('subject/onGoing',{
					subjectTypeId:id || '' ,
					pageNum:this.pageNum,
					pageSize:10
				},function(res){
					// console.log('请求进行中的大赛',res)
					if(reach == 1){
						// 代表用户进行的 上拉加载
						_this.game_list = _this.game_list.concat(res.data.list)
					}else{
						// 用户进行 筛选 
						_this.game_list = res.data.list
					}
					
					
					// 将进行中的第一个赛事进行本地存储，作为作品中用于展示的部分
					let gameMsg = {
						subjectId:res.data.list[0].subjectId,
						logo:res.data.list[0].logoUrl,
						subjectTitle:res.data.list[0].subjectTitle,
						introduction:res.data.list[0].introduction,
					}
					uni.setStorageSync('gameMsg',JSON.stringify(gameMsg))
					
					//判断是否有下一页 
					if (res.data.list == 10) {
						_this.pageNum++;
						_this.nextpage = true
					}else{
						_this.nextpage = false
					}
					
					
				})
			},
			
			// 请求已结束的大赛
			end(id,reach){
				let _this = this 
				this.api._get('subject/finished',{
					subjectTypeId:id || '' ,
					pageNum:this.pageNum,
					pageSize:10
				},function(res){
					// console.log('请求进行中的大赛',res)
					if(reach == 1){
						// 代表用户进行的 上拉加载
						_this.game_list = _this.game_list.concat(res.data.list)
					}else{
						// 用户进行 筛选 
						_this.game_list = res.data.list
					}
					if (res.data.list == 10) {
						_this.pageNum++;
						_this.nextpage = true
					}else{
						_this.nextpage = false
					}
				})
			},
			
		}
	}
</script>

<style>
	page{
		background-color: #0e171e;
	}
</style>

<style lang="scss" scoped>
	.iconfont{
		margin-right: 10rpx;
	}
	.introduction{
		color: white;
		swiper{
			height: 423rpx;
			margin-top: 103rpx;
			swiper-item {
				position: relative;
				image {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					width: 100%;
				}
			}
		} 
		// 筛选按钮 以及标题
		.navigation{
			width: 100%;
			padding-top: 38rpx;
			line-height: 100rpx;
			position: fixed;
			top: 0;
			left: 0;
			z-index:20;
			background-color: #0e171e;
			.screen{
				display: flex;
				align-items: center;
				position: absolute;
				top: 37rpx;
				left: 0rpx;
				margin-left: 20rpx;
				
			}
			.title{
				color: white;
				text-align: center;
			}
		}
		// 头部分类
		.tab{
			position: sticky;
			top: 132rpx;
			left: 0;
			z-index: 20;
			background-color: #0e171e;
			padding-top: 20rpx;
			padding-bottom: 20rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.item{
				padding-bottom: 18rpx;
				&.act{
					border-bottom: 1rpx solid #419aba;
				}
			}
		}
		.cont{
			box-sizing: border-box;
			padding-left: 20rpx;
			padding-top: 20rpx;
			padding-right: 20rpx;
			padding-bottom: 20rpx;
			.item{
				position: relative;
				box-sizing: border-box;
				padding-left: 40rpx;
				padding-top: 30rpx;
				padding-right: 10rpx;
				padding-bottom: 20rpx;
				border-radius: 20rpx;
				border: 1px solid #2565a2;
				width: 99%;
				// height: 207rpx;
				margin: auto;
				margin-bottom: 30rpx;
				background-color: #274c90;
				// 为每个卡片设置内凹
				.cricle1{
					width: 47rpx;
					height: 40rpx;
					background-color: #0e171e;
					border-radius: 50%;
					position: absolute;
					top: -13rpx;
					left: -18rpx;
				}
				.cricle2{
					width: 47rpx;
					height: 40rpx;
					background-color: #0e171e;
					border-radius: 50%;
					position: absolute;
					top: -13rpx;
					right: -18rpx;
				}
				.cricle3{
					width: 47rpx;
					height: 40rpx;
					background-color: #0e171e;
					border-radius: 50%;
					position: absolute;
					bottom: -13rpx;
					left: -18rpx;
				}
				.cricle4{
					width: 47rpx;
					height: 40rpx;
					background-color: #0e171e;
					border-radius: 50%;
					position: absolute;
					bottom: -13rpx;
					right: -18rpx;
				}
				// 头部类型 以及大赛名称
				.head{
					display: flex;
					margin-bottom: 10rpx;
					.type{
						margin-right: 20rpx;
						font-size: 20rpx;
						color: #9ce0ff;
						border: 1px solid #9ce0ff;
						border-radius: 10rpx;
						padding: 7rpx 14rpx;
					}
					.game_name{
						width: 79%;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
				// 举办地点
				.location{
					display: flex;
					justify-content: space-between;
					margin-bottom: 10rpx;
					.le{
						display: flex;
						align-items: center;
					}
				}
				// 举办时间
				.time{
					display: flex;
					justify-content: space-between;
					.le{
						display: flex;
						align-items: center;
					}
					.ri{
						display: flex;
						align-items: center;
					}
				}
				
				// 浏览人数
				.foot{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					margin-top: 20rpx;
					.hot{
						color: red;
						box-sizing: border-box;
						padding-left: 8rpx;
						padding-top: 4rpx;
						padding-right: 8rpx;
						padding-bottom: 4rpx;
						border: 1rpx solid red;
						margin-right: 20rpx;
						font-size: 20rpx;
						border-radius: 10rpx;
					}
					.see{
						font-size: 20rpx;
					}
				}
			
			}
		}
	}
</style>

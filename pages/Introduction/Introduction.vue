<template>
	<view class="introduction">
		<!-- 筛选按钮 以及标题 -->
		<view class="navigation">
			<!-- 赛事的类型 -->
			<picker @change="bindPickerChange" :value="value" :range="game_type" range-key="typeName">
				<view class="screen">
					<text style="font-size: 20px;" class="iconfont iconshaixuan"></text>
					<text style="font-size: 13px;line-height: 20rpx;">筛选</text>
				</view>
			</picker>
			<!-- 标题 -->
			<view class="title">大赛简介</view>
		</view>
		<!-- 赛事轮播展示 -->
		<swiper class="swiper" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item class="swiper-item" v-for="(item, index) in ad" :key="item.adId" @click="jumpList" :data-subjectId="item.subjectId">
				<image style="width: 100%;height: 100%;" :src="item.image" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<!-- 违规作品 通告 -->
		<!-- <u-notice-bar
			@click="detailNotice"
			mode="horizontal" :list="list"
			color="#ffffff" bg-color="#0e171e"
			no-list-hidden="false" duration="3000"
			>
		</u-notice-bar> -->
		
		<!-- 当前小程序总的浏览量 -->
		<view class="sum_browse">
			<view class="tit">浏览量</view>
			<view class="num">{{num.numType(seeNum)}}</view>
		</view>
		
		<!-- 头部分类 -->
		<view class="tab">
			<view @click="hot(index)" v-for="(item, index) in tab_list" :key="index" class="item" :class="tab_act == index ? 'act' : ''">{{ item }}</view>
		</view>
		<!-- 赛事列表 -->
		<!-- 如果没有赛事 -->
		<view v-if="game_list.length == 0" style="color: white;text-align: center;margin-top: 30rpx;">—— 暂无赛事 ——</view>
		<view class="cont" v-else>
			<view class="item" 
				:class="tab_act == 2 ? 'end_item' : '' "
				v-for="(item, index) in game_list" 
				:key="index" @tap="golist(index)"
				>
				<view class="cricle1"></view>
				<view class="cricle2"></view>
				<view class="cricle3"></view>
				<view class="cricle4"></view>
				<view class="head">
					<view class="type">{{ item.subjectTypeName }}</view>
					<view class="game_name">{{ item.subjectTitle }}</view>
				</view>
				<view class="location">
					<view class="le">
						<view :style=" tab_act == 2 ? '' : 'color: #94faff;' " class="iconfont icondidian"></view>
						<view 
							style="font-size: 23rpx;" 
							:style=" tab_act == 2 ? '' : 'color: #c6e0ff;' "
							>
							{{ item.subjectAddress }}
						</view>
					</view>
					<view class="iconfont iconfanhui"></view>
				</view>
				<view class="time">
					<view class="le">
						<view style="font-size: 14px;" 
							:style=" tab_act == 2 ? '' : 'color: #94faff;' "
							class="iconfont iconshijian"
							></view>
						<view 
							style="font-size: 23rpx;"
							:style=" tab_act == 2 ? '' : 'color: #c6e0ff;' "
							>
							<!-- 有具体时间 -->
							<text v-if="gameTimeStatue.gameTime(item.beginTime,item.endTime)">{{ item.beginTime }} 至 {{ item.endTime }}</text>
							<!-- 待定 -->
							<text v-else>待定</text>
						</view>
					</view>
					<!-- 当前大赛正在进行 -->
					<view v-if="tab_act == 1" class="ri">
						<text style="color: #94faff;" class="iconfont icontianjia"></text>
						<text style="font-size: 23rpx;">报名中</text>
					</view>
					<!-- 当前大赛已结束 -->
					<view v-if="tab_act == 2" class="ri">
						<text style="font-size: 23rpx;">已结束</text>
					</view>
					<!-- 当前大赛未开始 -->
					<view v-if="tab_act == 0" class="ri">
						<text style="font-size: 23rpx;">未开始</text>
					</view>
				</view>
				<!-- 访问量 -->
				<view class="foot">
					<view class="le">
						<view v-if="item.hotStatus == 1" class="hot">热门</view>
						<text class="iconfont iconscan"></text>
						<text style="font-size: 20rpx;margin-right: 13px;">{{ num.numType(item.views)  }}</text>
						<!-- 参赛人数 -->
						<text class="iconfont iconshoujihao"></text>
						<text style="font-size: 20rpx;">{{ item.gameUsers }}</text>
					</view>
					<!-- 倒计时  -->
					<block v-if="time.countDown(item.endTime) && tab_act !== 0">
						<u-count-down
							:timestamp="time.countDown(item.endTime)"
							:show-border="true"
							color="#ff9900"
							border-color="#274c90"
							separator-color="white"
							separator="zh"
							bg-color="#274c90"
							separator-size="24"
							font-size="38"
						></u-count-down>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<!-- 大赛时间是否为待定 -->
<wxs module="gameTimeStatue" src="../../wxs/gameTimeStatue.wxs"></wxs>
<!-- 倒计时 -->
<wxs module="time" src="../../wxs/countDown.wxs" ></wxs>
<!-- 浏览量 -->
<wxs module="num" src="../../wxs/number.wxs" ></wxs>

<script>
export default {
	data() {
		return {
			seeNum:0,
			// 通告内容
			list: ['寒雨连江夜入吴', '平明送客楚山孤', '洛阳亲友如相问', '一片冰心在玉壶'],
			// 默认第一页进行加载
			pageNum: 1,
			// 判断是否有下一页
			nextpage: false,
			// 判断当前tab展示的类型
			tab_act: 1,
			// tab 包含类型
			tab_list: ['即将开始', '进行中', '已结束'],
			// 赛事列表
			game_list: [],
			// 筛选
			game_type: [],
			value: 0,
			// 筛选的类型
			id: '',
			// 轮播图广告图
			ad: ''
		};
	},
	components:{

	},
	// 用户上拉加载
	onReachBottom() {
		console.log('上拉加载');
		// 用来判断 用什么方式进行 渲染比赛信息数据
		let reach = 1;
		// 当当前的数据 条数大于十条的时候，下拉到底部 重新请求数据
		if (this.nextpage) {
			if (this.tab_act == 0) {
				// 即将开始的大赛
				this.noStart(this.id, reach);
			} else if (this.tab_act == 1) {
				// 进行中的大赛
				this.proceed(this.id, reach);
			} else if (this.tab_act == 2) {
				// 结束的大赛
				this.end(this.id, reach);
			}
		}
	},
	onLoad(option) {
		this.getSeeNum()
		// 判断是否是他人邀请进来的
		if(option.inviteID){
			// 是邀请的，邀请人id 为inviteID，给其增加票
			// console.log('是邀请进入的')
			// 跳转到登录页面
			uni.navigateTo({
				url: "/pages/login/login?inviteID=" + option.inviteID
			})
		}
		let _this = this;
		// 用于显示分享到朋友圈
		uni.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline']
		});
		// 获取大赛类型
		this.getGameType()
		// 即将开始的大赛
		this.proceed('');
		// 获取 轮播图广告
		this.getAd();
		// 判断用户是否进行了签到
		this.userSigin()
	},
	onShareAppMessage(res) {
		if (res.from === 'button') {
			// 来自页面内转发按钮
			console.log(res.target);
		} else {
			// 分享tabbar页面，直接运用小程序原生菜单中的分享按钮
			uni.showShareMenu({});
		}
	},
	methods: {
		// 获取浏览次数
		getSeeNum(){
			this.api._get(
				'app/views/find',
				{
				
				},
				(res) => {
					this.seeNum =	res.data.number
				}
			);
		},
		// 判断用户是否进行了签到
		userSigin(){
			console.log('list页面')
			// 先进行判断是否有sigin 值
			if(!uni.getStorageSync('sigin')){
				if(!uni.getStorageSync('token')){
					return
				}
				// 没有值 -  进行签到
				this.api._get('sign',{},(res)=>{
					console.log('没有 sigin',res)
					if(res.data.status === '0'){
						// 未进行签到，弹框提醒是否进行签到
						uni.showModal({
							content:'是否进行签到',
							success(res) {
								if(res.confirm){
									// 用户点击确定按钮
									uni.navigateTo({
										url:'/pagesA/myData/mySigin'
									})
								}else if(res.cancel){
									// 用户点击取消按钮
								}
							},
							fail() {
								console.log('调用失败')
							}
						})
					}
				})
			}else{
				// 有值 进行 判断是否 已经过期
				// 获取当前的时间戳
				let nowTime = new Date().getTime()
				// 当前时间是否超出了
				let time = nowTime - JSON.parse(uni.getStorageSync('sigin')).siginTime > JSON.parse(uni.getStorageSync('sigin')).overTime
				console.log('当前时间和之前签到的差',nowTime - JSON.parse(uni.getStorageSync('sigin')).siginTime)
				console.log('超出时间',JSON.parse(uni.getStorageSync('sigin')).overTime)
				if(time){
					uni.showModal({
						content:'是否进行签到',
						success(res) {
							if(res.confirm){
								// 用户点击确定按钮
								uni.navigateTo({
									url:'/pagesA/myData/mySigin'
								})
							}else if(res.cancel){
								// 用户点击取消按钮
								
							}
						},
						fail() {
							console.log('调用失败')
						}
					})
				}
			}
		},
		// 获取大赛的类型
		getGameType(){
			this.api._get('subject/type', {}, (res) => {
				// console.log('请求大赛类型',res)
				this.game_type = [{ id: '', typeName: '全部' }].concat(res.data);
			});
		},
		// 用户点击通告，进行跳转到 通告详情
		detailNotice(e) {
			console.log('点击通告 点击的index', e);
			// 跳转到 相应的 通告详情中
			uni.navigateTo({
				url: '/pages/notice/notice'
			});
		},
		// 获取广告位轮播图
		getAd() {
			let _this = this;
			this.api._get('subject/ads', {}, function(res) {
				// console.log('请求轮播图',res)
				_this.ad = res.data;
			});
		},
		// 筛选大赛类型
		bindPickerChange(e) {
			// console.log('picker发送选择改变，携带值为', e)
			this.value = e.detail.value;
			this.id = this.game_type[e.detail.value].id;
			if (this.tab_act == 0) {
				// 即将开始的大赛
				this.noStart(this.id);
			} else if (this.tab_act == 1) {
				// 进行中的大赛
				this.proceed(this.id);
			} else if (this.tab_act == 2) {
				// 结束的大赛
				this.end(this.id);
			}
		},
		// 跳转到作品列表
		golist(index) {
			let _this = this;
			// 参加未开始的大赛
			if(this.tab_act == 0){
				uni.navigateTo({
					url:`/pages/Introduction/gameDetail?subjectId=${this.game_list[index].subjectId}`
				})
				return
			}
			// 已结束或者 正在进行中的大赛
			// 本地缓存点击的本次大赛的信息
			let gameMsg = {
				subjectId: this.game_list[index].subjectId,
				logo: this.game_list[index].logoUrl,
				subjectTitle: this.game_list[index].subjectTitle,
				introduction: this.game_list[index].introduction
			};
			uni.setStorageSync('gameMsg', JSON.stringify(gameMsg));
			// 如果当前大赛结束了，则直接跳转到结果页面
			if(this.tab_act == 2){
				// 点击的为 已结束的大赛
				uni.navigateTo({
					url:`/pages/Introduction/gameDetail?subjectId=${this.game_list[index].subjectId}`
				})
				// console.log('已结束的大赛')
				// return;
			}else if(this.tab_act == 1){
				// 正在进行中的大赛
				uni.navigateTo({
					url: `/pages/list/list`
				});
				// _this.subjectId= subjectId
			}
			// console.log('事件完成')
		},
		// 点击轮播图跳转到作品列表
		jumpList(e) {
			// console.log('广告跳转 e',e.currentTarget.dataset.subjectid)
			uni.navigateTo({
				url: `/pages/Introduction/gameDetail?subjectId=${e.currentTarget.dataset.subjectid}`
			});
		},
		
		hot(index) {
			if (index === this.tab_act) return;
			this.tab_act = index;
			if (this.tab_act == 0) {
				// 即将开始的大赛
				this.noStart(this.id);
			} else if (this.tab_act == 1) {
				// 进行中的大赛
				this.proceed(this.id);
			} else if (this.tab_act == 2) {
				// 结束的大赛
				this.end(this.id);
			}
		},
		// id 是用于判断是否进行筛选
		// 即将开始的大赛
		noStart(id, reach) {
			let _this = this;
			this.api._get(
				'subject/notStart',
				{
					subjectTypeId: id || '',
					pageNum: this.pageNum,
					pageSize: 10
				},
				function(res) {
					// console.log('请求即将开始的大赛',res)
					if (reach == 1) {
						// 代表用户进行的 上拉加载
						_this.game_list = _this.game_list.concat(res.data.list);
					} else {
						// 用户进行 筛选
						_this.game_list = res.data.list;
					}
					//判断是否有下一页
					if (res.data.list == 10) {
						_this.pageNum++;
						_this.nextpage = true;
					} else {
						_this.nextpage = false;
					}
				}
			);
		},
		// 请求进行中的大赛
		proceed(id, reach) {
			let _this = this;
			this.api._get(
				'subject/onGoing',
				{
					subjectTypeId: id || '',
					pageNum: this.pageNum,
					pageSize: 10
				},
				function(res) {
					// console.log('请求进行中的大赛',res)
					if (reach == 1) {
						// 代表用户进行的 上拉加载
						_this.game_list = _this.game_list.concat(res.data.list);
					} else {
						// 用户进行 筛选
						_this.game_list = res.data.list;
					}

					// 将进行中的第一个赛事进行本地存储，作为作品中用于展示的部分
					let gameMsg = {
						subjectId: res.data.list[0].subjectId,
						logo: res.data.list[0].logoUrl,
						subjectTitle: res.data.list[0].subjectTitle,
						introduction: res.data.list[0].introduction
					};
					uni.setStorageSync('gameMsg', JSON.stringify(gameMsg));

					//判断是否有下一页
					if (res.data.list == 10) {
						_this.pageNum++;
						_this.nextpage = true;
					} else {
						_this.nextpage = false;
					}
				}
			);
		},
		// 请求已结束的大赛
		end(id, reach) {
			let _this = this;
			this.api._get(
				'subject/finished',
				{
					subjectTypeId: id || '',
					pageNum: this.pageNum,
					pageSize: 10
				},
				function(res) {
					// console.log('请求进行中的大赛',res)
					if (reach == 1) {
						// 代表用户进行的 上拉加载
						_this.game_list = _this.game_list.concat(res.data.list);
					} else {
						// 用户进行 筛选
						_this.game_list = res.data.list;
					}
					if (res.data.list == 10) {
						_this.pageNum++;
						_this.nextpage = true;
					} else {
						_this.nextpage = false;
					}
				}
			);
		}
	}
};
</script>

<style>
page {
	background-color: #0e171e;
}
</style>

<style lang="scss" scoped>
.iconfont {
	margin-right: 10rpx;
}
.introduction {
	color: white;
	.swiper {
		height: 423rpx;
		margin-top: 139rpx;
		.swiper-item {
			height: 100%;
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
	.navigation {
		width: 100%;
		padding-top: 38rpx;
		line-height: 100rpx;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 20;
		background-color: #0e171e;
		.screen {
			display: flex;
			align-items: center;
			position: absolute;
			top: 37rpx;
			left: 0rpx;
			margin-left: 20rpx;
		}
		.title {
			color: white;
			text-align: center;
		}
	}
	// 小程序浏览总量
	.sum_browse{
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 145rpx;
		left: 10rpx;
		z-index: 20;
		.tit{
			font-size: 25rpx;
			color: white;
			margin-right: 19rpx;
		}
		.num{
			font-size: 37rpx;
			font-weight: bolder;
			color: white;
			-webkit-text-stroke: 1px black;
		}
		
	}
	// 头部分类
	.tab {
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
		.item {
			padding-bottom: 18rpx;
			&.act {
				border-bottom: 1rpx solid #419aba;
			}
		}
	}
	.cont {
		box-sizing: border-box;
		padding-left: 20rpx;
		padding-top: 20rpx;
		padding-right: 20rpx;
		padding-bottom: 20rpx;
		.item {
			position: relative;
			box-sizing: border-box;
			padding-left: 40rpx;
			padding-top: 30rpx;
			padding-right: 10rpx;
			padding-bottom: 20rpx;
			border-radius: 20rpx;
			border: 1px solid #2565a2;
			width: 99%;
			margin: auto;
			margin-bottom: 30rpx;
			background-color: #274c90;
			// 为每个卡片设置内凹
			.cricle1 {
				width: 47rpx;
				height: 40rpx;
				background-color: #0e171e;
				border-radius: 50%;
				position: absolute;
				top: -13rpx;
				left: -18rpx;
			}
			.cricle2 {
				width: 47rpx;
				height: 40rpx;
				background-color: #0e171e;
				border-radius: 50%;
				position: absolute;
				top: -13rpx;
				right: -18rpx;
			}
			.cricle3 {
				width: 47rpx;
				height: 40rpx;
				background-color: #0e171e;
				border-radius: 50%;
				position: absolute;
				bottom: -13rpx;
				left: -18rpx;
			}
			.cricle4 {
				width: 47rpx;
				height: 40rpx;
				background-color: #0e171e;
				border-radius: 50%;
				position: absolute;
				bottom: -13rpx;
				right: -18rpx;
			}
			// 头部类型 以及大赛名称
			.head {
				display: flex;
				margin-bottom: 10rpx;
				.type {
					margin-right: 20rpx;
					font-size: 20rpx;
					color: #9ce0ff;
					border: 1px solid #9ce0ff;
					border-radius: 10rpx;
					padding: 7rpx 14rpx;
				}
				.game_name {
					width: 79%;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
			// 举办地点
			.location {
				display: flex;
				justify-content: space-between;
				margin-bottom: 10rpx;
				.le {
					display: flex;
					align-items: center;
				}
			}
			// 举办时间
			.time {
				display: flex;
				justify-content: space-between;
				.le {
					display: flex;
					align-items: center;
				}
				.ri {
					display: flex;
					align-items: center;
				}
			}

			// 浏览人数
			.foot {
				display: flex;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				padding-right: 19rpx;
				margin-top: 20rpx;
				.le {
					display: flex;
					justify-content: flex-start;
					align-items: center;

					.hot {
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
				}
			}
		}
		// 如果大赛已经结束，则背景颜色改变
		.end_item{
			color: white;
			background-color: #666666;
			border: none;
			.head{
				.type{
					color: white;
					border: 1px solid white;
				}
			}
		}
	}
}
</style>

<template>
	<view>
		<view class="list-container">
			<view id="wf-list" class="list" v-for="(list, listIndex) of viewList" :key="listIndex">
				<!-- 每一个作品 -->
				<!-- <view class="item" v-for="(item,index) of list.list" :key="index" -->
				<view class="item" v-for="(item, index) of list.list" :key="item.id" @longpress="longpress">
					<!-- :data-videoId='item.videoId' -->
					<!-- 视频封面 -->
					<u-lazy-load
						@load="handleViewRender(listIndex, index)"
						@error="handleViewRender(listIndex, index)"
						:image="item.coverUrl"
						@click="jumpVideo(item.videoId, item.avatarUrl, item.userName, item.conversation, item.commentNum, item.userId, item.praseCount, item.id,item.forwardCount,item.avatarUrl)"
					></u-lazy-load>
					<!-- 上传视频的简单的简介 转发量 {{ item.forwardCount }} -->
					<view class="introduction">
						{{ item.conversation }}
						<!-- 简单的简介简单的简介简单的简介简单的简介简单的简介简单的简介简单的简介 -->
					</view>
					<!-- 用户的 头像以及点赞数 -->
					<view class="item_foot">
						<view class="left">
							<view class="user_img"><image :src="item.avatarUrl" mode=""></image></view>
							<view class="msg">
								<!-- 姓名 -->
								{{ item.userName }}
							</view>
						</view>
						<view class="right">
							<view class="icon"><image src="/static/my_vote.png" mode=""></image></view>
							<view>
								<!-- 票数 -->
								{{ item.voteNum }}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		list: {
			type: Array //实际请求获取的列表数据
		}
	},
	data() {
		return {
			loadingImg: '/static/loading.png',
			viewList: [{ list: [] }, { list: [] }], //展示到视图的列表数据
			everyNum: 2,
			scrollTop: 0, //懒加载时滚动的距离  动态生成

			// 控制自定义的按钮
			showBtn: false
		};
	},
	components: {
		// uniPopupUseoperation
	},
	methods: {
		// 用户进行长按
		longpress(e) {
			console.log('用户进行长按 e', e);
			// 在 我的作品 页面显示 删除按钮
			this.showBtn = true;
			let btntop;
			let btnleft;
			// 控制弹窗的显示防止 弹窗超出 页面的范围
			if (e.touches[0].clientY + 224 > 667) {
				// btntop = e.detail.y - 224 + 'px'   //224
				btntop = Math.abs(667 - 224 - 60) + 'px'; //224
			} else {
				btntop = e.touches[0].clientY + 'px'; //224
			}

			if (375 - e.touches[0].clientX < 287) {
				// btnleft = Math.abs(e.detail.x - 287) + 'px'  //287
				btnleft = Math.abs(375 - 287 - 20) + 'px'; //287
			} else {
				btnleft = e.touches[0].clientX + 'px'; //287
			}

			// 显示操作弹框
			// 在此触发父级事件 使得 list 中的 操作弹窗进行显示
			this.$emit('showUseroperation', btntop, btnleft);
		},
		// close(num){
		// 	// console.log('关闭')
		// 	// 触发父级中的事件，使得list 中的 操作弹窗进行隐藏
		// 	this.$emit("closeUseroperation")
		// 	// this.$refs.popup_useoperation.close()
		// },

		// 按钮进行了显示之后，用户进行删除等操作，发起请求后，按钮消失
		// 或者点击别处进行消失
		delwateritem() {
			// console.log('进行删除选定的一项');
		},

		init() {
			// console.log('瀑布流组件中进行 初始化组件');
			this.viewList = [{ list: [] }, { list: [] }];
			// setTimeout(() => {
				this.handleViewRender(0, 0);
			// }, 0);
		},
		handleViewRender(x, y) {
			// console.log(x,y);
			// const num = (x+1)*(y+1);
			// console.log(num%(this.everyNum));
			// console.log(num);
			// if((num%(this.everyNum))!==0&&num!==1)return;
			// console.log(num,'----');
			const index = this.viewList.reduce((total, current) => total + current.list.length, 0);
			if (index > this.list.length - 1) {
				// 加载完成触发事件并返回加载过的图片数
				this.$emit('finishLoad', index);
				return;
			}
			const query = uni.createSelectorQuery().in(this);
			let listFlag = 0;
			query
				.selectAll('#wf-list')
				.boundingClientRect(data => {
					// console.log('初始化瀑布流 data', data, 'index', index);

					listFlag = data[0].bottom - data[1].bottom <= 0 ? 0 : 1;

					this.viewList[listFlag].list.push(this.list[index]);
					// this.list.slice(index,index+this.everyNum).forEach((item,index)=>{
					//     const flag = listFlag===0?index&1:Number(!(index&1))
					//     this.viewList[flag].list.push(item)
					// })
				})
				.exec();
			// console.log('viewList ==>',this.viewList)
		},
		jumpVideo(videoId, avatarUrl, userName, conversation, commentNum, userId, praseCount, id, forwardCount,coverUrl) {
			// console.log('瀑布流跳转');
			// 根据点击的id进行跳转到视频播放页面  用来传递每一个视频的 videoId
			uni.navigateTo({
				url: `/pages/playVideo/playVideo?videoId=${videoId}&avatarUrl=${avatarUrl}&userName=${userName}&conversation=${conversation}&commentNum=${commentNum}&userId=${userId}&praseCount=${praseCount}&id=${id}&forwardCount=${forwardCount}&coverUrl=${coverUrl}`
			});
		}
	},
	mounted() {
		// console.log('瀑布流组件进行挂载 list', this.$props.list);
		if (this.list.length) {
			this.init();
		}
	},
	onReady() {
		// console.log('瀑布流组件onready list', this.$props.list);
	}
};
</script>

<style lang="less" scoped>
// 自定义的删除按钮
.waterbtn {
	position: absolute;

	background-color: red;
	z-index: 100;
}
.list-container {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;

	.list {
		width: calc(50% - 8rpx);
		display: flex;
		flex-direction: column;
		.item {
			margin-bottom: 18rpx;
			// height: 200px;
			image {
				display: block;
				width: 100%;
			}

			// 上传视频的 用户简介
			.introduction {
				// width: 100%;
				// // height: 90rpx;
				// box-sizing: border-box;
				padding: 5rpx 20rpx;
				// line-height: 40rpx;
				// font-weight: 200;
				// font-family: Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei';
				// 首行缩进
				// text-indent: 2em;
				// 最多两行，超出省略号显示
				display: -webkit-box;
				overflow: hidden;
				text-overflow: ellipsis;
				word-break: break-all;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}

			// 上传视频的 用户个人信息
			.item_foot {
				width: 100%;
				height: 50rpx;
				display: flex;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 0rpx 20rpx;
				align-items: center;
				// margin-top: 15rpx;
				color: #bebbc4;
				font-size: 24rpx;
				.left {
					display: flex;
					justify-content: space-evenly;
					align-items: center;
					.user_img {
						width: 40rpx;
						height: 40rpx;
						background-color: yellow;
						border-radius: 50%;
						overflow: hidden;
						margin-right: 10rpx;
						image {
							width: 100%;
							height: 100%;
						}
					}
				}
				.right {
					display: flex;
					justify-content: space-evenly;
					align-items: center;
					.icon {
						width: 30rpx;
						height: 30rpx;
						margin-right: 6rpx;
						image {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
	}
}
</style>

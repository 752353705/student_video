<template>
	<view class="myColl">
		<!-- 收藏为空的时候  -->
		<block v-if="colSumList.length == 0"><image class="empty" src="../../static/collect.png" mode=""></image></block>

		<block v-else>
			<!-- 用户编辑操作按钮 -->
			<view v-if="!btnShow" class="operation" @tap.stop="tapChange">编辑</view>
			<view v-else class="operation" @tap.stop="tapChange">取消</view>
			<!-- 底部的操作按钮 -->
			<view v-if="btnShow" class="btn">
				<view class="clear" @tap.stop="clear">一键清空</view>
				<view :class="operList.length != 0 ? '' : 'del'" @tap.stop="del">删除</view>
			</view>
			<!-- 用户收藏的 作品展示 -->
			<checkbox-group class="box" data-id="999" @change="checkboxChange">
				<!-- 多选按钮 用于用户对 自己的收藏进行操作  @tap="clickOper"  -->
				<label class="item" v-for="(item, index) in colSumList" :key="item.id" :data-index="index">
					<checkbox :value="item.collectionId" v-if="btnShow" />

					<!-- 右侧内容 -->
					<view class="cont" style=" " :data-item="item" :data-index="index" data-kw="video" @tap="jumpDetail">
						<!-- 头部 -->
						<view class="head">
							<!-- 收藏的作者的头像 -->
							<image :src="item.avatarUrl || uimg" mode=""></image>
							<view class="">
								<view class="name">{{ item.userName || uname }}</view>
								<view class="time">{{ item.createTime }}</view>
							</view>
						</view>
						<!-- 作品简介 -->
						<view class="txt">{{ item.conversation || item.content || item.goodsDescribe }}</view>
						<!-- 作品的 图片 -->
						<view class="detail_img"><image v-for="(Img_item, Img_index) in img.changeImg(item.images)" :key="index" :src="Img_item" mode=""></image></view>
						<!-- 底部的分享  评论  点赞 -->
						<view class="foot">
							<view class="f_item">
								<text class="iconfont iconforward-null"></text>
								<text style="margin-left: 10rpx;">分享</text>
							</view>
							<view class="f_item">
								<text class="iconfont iconxinxi"></text>
								<text style="margin-left: 10rpx;">{{ item.commentNum }}</text>
							</view>
							<view class="f_item ">
								<text class="iconfont icondianzan"></text>
								<text style="margin-left: 10rpx;">{{ item.praseCount }}</text>
							</view>
						</view>
					</view>
				</label>
			</checkbox-group>
		</block>
	</view>
</template>

<script module="img" lang="wxs">
// 控制 二级评论 的时间格式
function changeimg(img){
	// console.log('img',img)
	if(!img){
		return ''
	}
	// console.log('处理图片的语言',img.split(',').slice(0,4))
	return img.split(',').slice(0,4)
	// return time
}

module.exports = {
	changeImg: changeimg,
}
</script>

<script>
export default {
	data() {
		return {
			// 进行上拉请求加载时
			// 默认第一页进行加载
			pageNum: 1,
			// 默认的头像 和用户名
			uname: '',
			uimg: '',

			// 控制底部按钮、多选框的隐藏
			btnShow: false,
			// 获取的收藏列表
			colSumList: [],
			// 用户要进行选择的数据
			operList: [],
			// 用户点击的 每一项所处的  index
			indexList: [],
			// 判断是否有下一页
			nextpage:false
		};
	},
	onLoad() {
		this.uname = uni.getStorageSync('user_name');
		this.uimg = uni.getStorageSync('user_img');
	},
	onShow() {
		this.getData();
	},
	onPullDownRefresh() {
		console.log('下拉刷新');
		this.getData();
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 0);
	},
	onReachBottom(){
		console.log('上拉加载')
		// 当当前的数据 条数大于十条的时候，下拉到底部 重新请求数据
		if(this.nextpage){
			this.getData()
		}
		
		
	},
	methods: {
		// 请求数据
		getData() {
			this.api._get(
				'collection/list',
				{
					pageNum: this.pageNum,
					pageSize: 10
				},
				res => {
					// console.log('请求收藏列表',res, res.data);
					let val = res.data;

					// 进行判断方式有 null
					// for (let key in val) {
					// 	if (!val[key]) {
					// 		// 该项为空
					// 		val[key] = [];
					// 	}
					// }

					console.log('val', val);

					// 将这三大类进行 拼接
					// this.colSumList = val.videoList.concat(val.articleList).concat(val.secondGoodsList);
					// this.colSumList = val.itemList
					this.colSumList = this.colSumList.concat(val.itemList)

					// 处理 所返回的 图片
					// console.log('colSumList', this.colSumList);

					// 判断返回的 数据条数 用来看是否有下一页
					if (this.colSumList.length == 10) {
						this.pageNum++;
						this.nextpage = true
					}else{
						this.nextpage = false
					}
				}
			);
		},

		// 判断用户点击的 具体操作的 那一项
		clickOper(e) {
			if (this.btnShow) return;
			console.log('点击操作 e', e);
		},

		// 用户点击进入到详情页面
		jumpDetail(e) {
			// console.log('kw',kw,'item',item)
			// console.log('e',e.currentTarget.dataset)
			// 当用户没有点击操作按钮时进行
			if (this.btnShow) {
				console.log('e', e);
				// 储存用户 点击的 那一项 的 index
				this.indexList.push(e.currentTarget.dataset.index);

				return;
			}

			let item = e.currentTarget.dataset.item;
			if (item.conversation) {
				// 跳转到 视频详情页
				uni.navigateTo({
					url: '/pages/playVideo/playVideo?item=' + encodeURIComponent(JSON.stringify(item))
				});
			} else if (item.content) {
				uni.navigateTo({
					url: `/pages/playVideo/txtDetail?txtId=${item.id}`

					// 测试二手 记得修改过来
					// url:`/pages/playVideo/usedDetail?txtId=8`
				});
			} else if (item.goodsDescribe) {
				uni.navigateTo({
					// 测试二手
					url: `/pages/playVideo/usedDetail?usedId=${item.id}`
				});
			}

			console.log('跳转到详情页进行查看');
		},

		// 用户点击编辑按钮
		tapChange() {
			// 显示底部的操作按钮
			this.btnShow = !this.btnShow;
			if (!this.btnShow) {
				// 用户取消操作，将操作数据清空
				this.operList = [];
				this.indexList = [];
			}
		},
		// 用户进行选择 操作
		checkboxChange: function(e) {
			console.log('用户进行选择 多选', e);

			// 获取用户选择的数据
			this.operList = e.detail.value.join(',');

			// var items = this.items,
			// 	values = e.detail.value;
			// for (var i = 0, lenI = items.length; i < lenI; ++i) {
			// 	const item = items[i];
			// 	if (values.includes(item.value)) {
			// 		this.$set(item, 'checked', true);
			// 	} else {
			// 		this.$set(item, 'checked', false);
			// 	}
			// }
		},
		// 用户点击进行删除  ,
		del() {
			this.api._del(`collection?ids=${this.operList}`, {}, res => {
				console.log('删除成功', res.data);

				// 针对用户点击的那一项，将数组中的进行去除
				this.indexList.forEach(item => {
					// 根据每一个的 index 进行删除
					this.colSumList.splice(item, 1);
				});
				this.indexList = [];
			});
		},
		// 清空按钮
		clear() {
			this.api._del(`collection/all`, {}, res => {
				console.log('清空', res.data);
				// 将列表中的数据进行清空
				this.colSumList = [];
			});
		}
	}
};
</script>

<style scoped lang="less">
.myColl {
	// position: fixed;
	// top: 0;
	// bottom: 0;
	// right: 0;
	// left: 0;
	padding-bottom: 50px;
	padding-top: 14px;
	// background-color: #f2f2f2;
	box-sizing: border-box;
	// padding: 0 20rpx;

	// 空布局
	.empty {
		width: 200px;
		height: 200px;
		position: absolute;
		top: 36%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	// 用户进行操作的按钮
	.operation {
		position: absolute;
		top: 21rpx;
		right: 51rpx;
	}
	// 底部的操作按钮
	.btn {
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		z-index: 20;
		width: 100%;
		height: 60px;
		background-color: #eae4e4;
		font-size: 30rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		color: black;
		.clear{
			width: 50%;
		}
		.del {
			color: #cbcbcb;
			width: 50%;
		}
	}
	// 展示盒子
	.box {
		// 每一个收藏作品的 样式
		.item {
			background-color: white;
			padding-top: 40rpx;
			padding-left: 50rpx;
			padding-right: 20rpx;
			padding-bottom: 20rpx;
			display: flex;
			justify-content: flex-start;
			// border-bottom: 1px solid red;
			// 绘制 0.5的 分界线
			.cont {
				width: 100%;
				padding-bottom: 50rpx;
				border-bottom: 1px solid #969696;
			}

			// 内容区
			// 作品详情 头部
			.head {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				image {
					width: 80rpx;
					height: 80rpx;
					// background-color: red;
					border-radius: 50%;
					margin-right: 20rpx;
				}
				// 作者名
				.name {
					font-size: 35rpx;
				}
				// 时间
				.time {
					color: #969696;
					font-size: 22rpx;
				}
			}

			// 作品简介
			.txt {
				// 最多显示4行 多余的...
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 4;
				-webkit-box-orient: vertical;

				margin: 20rpx 0;
			}
			// 作品 图片
			.detail_img {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin-bottom: 24rpx;
				image {
					width: 104px;
					height: 104px;
					// background-color: yellow;
					margin-right: 21rpx;
				}
			}
			// 底部的 分享评论
			.foot {
				display: flex;
				justify-content: space-around;
				align-items: center;
				.f_item {
					display: flex;
					align-items: center;
				}
			}
		}
	}
}

// 调整图标的大小
.iconfont {
	font-size: 50rpx;
}
</style>

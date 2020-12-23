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
				<!-- :class="operList.length != 0 ? '' : 'del'" -->
				<view v-if="operList.length == 0" class="clear del" >
					删除
				</view>
				<view v-else class="clear"  @tap.stop="del">
					删除
				</view>
			</view>
			<!-- 用户收藏的 作品展示 -->
			<checkbox-group class="box"  @change="checkboxChange">
				<!-- 多选按钮 用于用户对 自己的收藏进行操作  @tap="clickOper"  -->
				<label class="item" v-for="(item, index) in colSumList" 
					:key="item.id" 	:data-index="index"
					>
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
								<text class="iconfont iconzhuanfa"></text>
								<text style="margin-left: 10rpx;">分享</text>
							</view>
							<view class="f_item">
								<text class="iconfont iconxinxi"></text>
								<text style="margin-left: 10rpx;">{{ item.commentNum || 0 }}</text>
							</view>
							<view class="f_item ">
								<text class="iconfont icondianzan1"></text>
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
	// 解析收藏的作品图片格式
	function changeimg(img){
		if(!img){
			return ''
		}
		return img.split(',').slice(0,4)
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
			// indexList: [],
			// 判断是否有下一页
			nextpage:false
		};
	},
	onLoad() {
		this.uname = uni.getStorageSync('user_name');
		this.uimg = uni.getStorageSync('user_img');
		this.getData();
	},
	onShow() {
		
	},
	onReachBottom(){
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
					let val = res.data;
					// 将这三大类进行 拼接
					// this.colSumList = val.videoList.concat(val.articleList).concat(val.secondGoodsList);
					// this.colSumList = val.itemList
					this.colSumList = this.colSumList.concat(val.itemList)
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
		// clickOper(e) {
		// 	if (this.btnShow) return;
		// },

		// 用户点击进入到详情页面
		jumpDetail(e) {
			// 当用户没有点击操作按钮时进行
			if (this.btnShow) {
				console.log('e', e);
				// 用户 点击的 那一项 的 index
				// this.indexList.push(e.currentTarget.dataset.index);
				return;
			}

			let item = e.currentTarget.dataset.item;
			if (item.conversation) {
				// 跳转到 视频详情页
				uni.navigateTo({
					url: '/pages/production/playVideo?item=' + encodeURIComponent(JSON.stringify(item))
				});
			} else if (item.content) {
				uni.navigateTo({
					url: `/pages/production/txtDetail?txtId=${item.id}`
				});
			} else if (item.goodsDescribe) {
				uni.navigateTo({
					// 测试二手
					url: `/pages/production/usedDetail?usedId=${item.id}`
				});
			}
		},

		// 用户点击编辑按钮
		tapChange() {
			// 显示底部的操作按钮
			this.btnShow = !this.btnShow;
			if (!this.btnShow) {
				// 用户取消操作，将操作数据清空
				// this.operList = '';
				this.operList = [];
			}
		},
		// 用户进行选择 操作
		checkboxChange: function(e) {
			this.operList = e.detail.value
		},
		
		// 用户点击进行删除  ,
		del() {
			this.api._del(`collection?ids=${this.operList.join(',')}`, {}, res => {
				for(let i=0;i<this.operList.length;i++){
					this.colSumList.forEach((item,index) => {
						console.log('item',item)
						// 如果数据列表中 的  collectionId 和 item相同 则进行删除
						if(item.collectionId == this.operList[i]){
							this.colSumList.splice(index,1)
						}
					});
				}
				this.operList = [];
			});
		},
		
		// 清空按钮
		clear() {
			let _this = this
			uni.showModal({
				title:'确定清空记录?',
				success(res) {
					if (res.confirm) {
						_this.api._del(`collection/all`, {}, delres => {
							console.log('清空', delres.data);
							// 将列表中的数据进行清空
							_this.colSumList = [];
							_this.operList = [];
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			})
		}
	}
};
</script>

<style scoped lang="scss">
.myColl {
	padding-bottom: 50px;
	padding-top: 14px;
	box-sizing: border-box;
	// 空布局
	.empty {
		width: 161px;
		height: 133px;
		position: absolute;
		top: 36%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	// 用户进行操作的按钮
	.operation {
		position: fixed;
		top: 21rpx;
		right: 51rpx;
		// background-color: #eae4e4;
		width: 100%;
		width: 102rpx;
		line-height: 26px;
		text-align: center;
		border-radius: 20rpx;
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
			text-align: center;
			width: 50%;
			&.del {
			color: #cbcbcb;
			// width: 50%;
		}
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
			// 绘制 0.5的 分界线
			.cont {
				width: 100%;
				padding-bottom: 50rpx;
				position: relative;
			}
			.cont:after{
				content: "  ";
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				height: 1px;
				border-bottom:1px solid #ababab;
				-webkit-transform: scaleY(.5);
				transform:scaleY(.5);
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
		
		.item:last-child .cont::after{
			content: "  ";
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 1px;
			border-bottom:1px solid white;
			/* 如果不用 background-color, 使用 border-top:1px solid #f00; 效果是一样的*/
			-webkit-transform: scaleY(.5);
			transform:scaleY(.5);
		}
		
	}
	
}

// 调整图标的大小
.iconfont {
	font-size: 42rpx;
}
</style>

<template>
	<view>
		<!-- 有粉丝 -->
		<block v-if="list.length !=0">
			<view class="fans" v-for="(item,index) in list" :key="index"
				@click="goAuthor(index)"
				>
				<view class="left">
					<view class="img">
						<image :src="item.avatarUrl" mode=""></image>
					</view>
					<view class="name">{{item.userName}}</view>
				</view>
				<view v-if="item.followed" class="focus focuson" @click.stop="focusOn(index)">
					已关注
				</view>
				<view v-else class="focus " @click.stop="focusOn(index)">
					关注
				</view>
			</view>
		</block>
		<!-- 暂无关注 -->
		<block v-else>
			<image class="empty" src="../../static/dingdan.png" mode=""></image>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				focus:true,
				list:[], // 用于渲染的信息内容
				name:'',
				userId:'',
				// 默认第一页进行加载
				pageNum: 1,
				// 判断是否有下一页
				nextpage:false
			};
		},
		onLoad(option) {
			// 渲染 粉丝列表或者关注列表
			this.userId = option.userId
			this.name = option.userName
		},
		onShow() {
			let _this = this 
			this.list = []
			// console.log('myFans onshow')
				// 获取当前 关注我的 列表
				if(this.userId){
					uni.setNavigationBarTitle({
						title: this.name + '的粉丝'
					})
					this.getOtherFans()
				}else{
					uni.setNavigationBarTitle({
						title: uni.getStorageSync('user_name') + '的粉丝'
					})
					this.getMyFans()
				}
		},
		onReachBottom(){
			// console.log('上拉加载')
			// 当当前的数据 条数大于十条的时候，下拉到底部 重新请求数据
			if(!this.nextpage) return;
			if(this.userId){
				this.getOtherFans()
			}else{
				this.getMyFans()
			}
		},
		methods:{
			// 用户跳转到他人 主页面
			goAuthor(index) {
				let item = {
					avatarUrl: this.list[index].avatarUrl,
					userId: this.list[index].userId
				};
				uni.navigateTo({
					url: `/pages/author/author?item=${JSON.stringify(item)}`
				});
			},
			
			// 获取我的粉丝列表
			getMyFans(){
				this.api._get(
					'follow/fans',
					{
						pageNum: this.pageNum,
						pageSize: 10
					},
					(res) => {
						// console.log('获取我的粉丝列表 res ===>', res);
						this.list = this.list.concat(res.data.list);
						if (this.colSumList.length == 10) {
							this.pageNum++;
							this.nextpage = true
						}else{
							this.nextpage = false
						}
					}
				);
			},
			
			// 获取其他人的粉丝
			getOtherFans(){
				this.api._get(
					'follow/otherUserfans',
					{
						userId:this.userId,
						pageNum: this.pageNum,
						pageSize: 10
					},
					(res) => {
						// console.log('获取其他人的粉丝列表 res ===>', res);
						this.list = res.data.list;
					}
				);
			},
			
			focusOn(index){
				let _this = this
				if(!this.list[index].followed){
					// 用户未关注
					this.api._post(
						'follow',
						{
							followedId: _this.list[index].userId //被关注的 作者id
						},
						function(res) {
							// console.log('进行关注成功',res);
							_this.list[index].followed = !_this.list[index].followed;
						}
					);
				}else{
					// 用户已经进行了关注，此时再进行点击表示用户是否要取消关注
					// uni.showModal({
						// content: '确认不在关注',
						// success: function(res) {
						// 	if (res.confirm) {
								// console.log('用户点击确定');
								_this.api._post(
									'follow',
									{
										followedId: _this.list[index].userId //被关注的 作者id
									},
									function(res) {
										// console.log('进行关注成功', res);
										_this.list[index].followed = !_this.list[index].followed;
									}
								);
							// } else if (res.cancel) {
							// 	console.log('用户点击取消');
							// }
						// }
					// });
				}
			},
			
		}
	}
</script>

<style lang="scss">
	// 空布局
	.empty {
		width: 200px;
		height: 200px;
		position: absolute;
		top: 36%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
.fans{
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	padding: 20rpx 40rpx;
	padding-left: 0;
	margin: 20rpx 40rpx;
	position: relative;
	.left{
		display: flex;
		align-items: center;
		.img{
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			margin-right: 40rpx;
			overflow: hidden;
			// iOS端圆角设置失效
					-webkit-backface-visibility: hidden;
					-webkit-transform: translate3d(0, 0, 0);
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	// 关注
	.focus {
		border: 1px solid #ff234f;;
		color: #ff234f;
		padding: 6rpx 35rpx;
		border-radius: 40rpx;
		font-size: 27rpx;
		font-weight: bold;
	}
	// 已关注
	.focuson {
		color: #989898;
		font-weight: bold;
		border: 1px solid #989898;
	}
}
// 绘制0.5px的底线
.fans:after{
	content: "  ";
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 1px;
	border-bottom:1px solid black;
	-webkit-transform: scaleY(.5);
	transform:scaleY(.5);
}
.fans:last-child::after{
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
</style>

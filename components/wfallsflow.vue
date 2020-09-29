<template>
	<view>
		<view class="list-container">
			<view id="wf-list" class="list" v-for="(list, listIndex) of viewList" :key="listIndex">
				<!-- 每一个作品 -->
				<!-- <view class="item" v-for="(item,index) of list.list" :key="index" -->
				<view class="item" v-for="(item, index) of list.list" :key="item.id" 
					:data-index="index" :data-listindex="listIndex"
					@longpress="longpress" @click="jump(item)">
					<!-- :data-videoId='item.videoId' -->
					<!-- 视频封面 -->
					<u-lazy-load @load="handleViewRender(listIndex, index)" 
						@error="handleViewRender(listIndex, index)" 
						:image="item.coverUrl "></u-lazy-load>
					<!-- 上传视频的简单的简介 转发量 {{ item.forwardCount }} -->
					<view class="introduction">
						{{ item.conversation || item.title }}
						<!-- 简单的简介简单的简介简单的简介简单的简介简单的简介简单的简介简单的简介 -->
					</view>
					<!-- 如果渲染的是 商品的话显示 商品的价格 -->
					<view class="price" v-if="item.price" >
						<view>
							￥
							<text class="num"> 
								{{item.price / 100}} 
								<!-- {{price.floatdiv(item.price,100)}} -->
							</text>
						</view>
						<view class="see_num">
							{{item.viewsNum}} 人浏览
						</view>
					</view>
					
					
					<!-- 用户的 头像以及点赞数 -->
					<view class="item_foot">
						<view class="left">
							<view class="user_img"><image :src="item.avatarUrl || avatarUrl " mode=""></image></view>
							<view class="msg">
								<!-- 姓名 *** 如果没有则是来自自己的作品  -->
								{{ item.userName || userName }}
							</view>
						</view>
						<view class="right" @tap.stop="waterLike"  
							:data-index="index" :data-listindex="listIndex"
							>
								<!-- <view style="margin-right: 10rpx;" >
									0人浏览
								</view> -->
								<u-icon  v-if="!item.liked" name="heart" color="#000000" size="34"></u-icon>
								<u-icon  v-else name="heart-fill" color="red" size="34"></u-icon>
							<view style="margin-left: 10rpx;" >
								<!-- 票数 文章点赞数                     -->
								{{ item.praseCount }}
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
		},
		kw:{
			type:String
		}
	},
	data() {
		return {
			// 在 观看我的界面 时没有 头像和名称
			userName:'',
			avatarUrl:'',
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
	mounted() {
		console.log('瀑布流组件进行挂载 list', this.list);
		this.userName = uni.getStorageSync('user_name')
		this.avatarUrl = uni.getStorageSync('user_img')
		
		if (this.list.length) {
			this.init();
		}
	},
	onReady() {
		// console.log('瀑布流组件onready list', this.$props.list);
	},
	methods: {
		// 用户在瀑布流中点击红心进行点赞
		waterLike(e){
			// console.log('用户进行点击',e,'kw',this.kw)
			// 用户进行点击点赞关注
			// 获取点赞目标处于瀑布流中的位置
			let item = this.viewList[e.currentTarget.dataset.listindex].list[e.currentTarget.dataset.index]
			// 改变item 中表示点赞状态的值
			// 发起请求 增加点赞的 接口
			this.kw == 'listVideo' 
				? this.waterVideoLike(item)
				: this.kw == 'listTxt'
				? this.waterTxtLike(item)
				: this.kw == 'listUsed'
				?	this.waterUsedLike(item)
				: ''
		},
		// 用户在 视频 瀑布流中 进行点赞操作
		waterVideoLike(item){
			this.api._post(
				'vod/likeVideo',
				{
					videoId: item.id
				},
				function(res) {
					// console.log('用户进行视频点赞 点亮红心',res)
					item.liked = !item.liked
					if(item.liked){
						// 数量增加
						item.praseCount ++
					}else{
						// 数量减少
						item.praseCount --
					}
				}
			);
		},
		// 用户在 文章 瀑布流中 进行点赞操作
		waterTxtLike(item){
			this.api._post(
				`article/likeArticle/${item.id}`,{},
				function(res) {
					console.log('用户进行文章点赞 点亮红心',res)
					item.liked = !item.liked
					if(item.liked){
						// 数量增加
						item.praseCount ++
					}else{
						// 数量减少
						item.praseCount --
					}
				}
			);
		},
		// 用户在 二手 瀑布流中 进行点赞操作
		waterUsedLike(item){
			this.api._post(
				`secondGoods/likeSecondGoods/${item.id}`,{},
				function(res) {
					console.log('用户进行二手点赞 点亮红心',res)
					item.liked = !item.liked
					if(item.liked){
						// 数量增加
						item.praseCount ++
					}else{
						// 数量减少
						item.praseCount --
					}
				}
			);
		},
		// 用户进行长按
		longpress(e) {
			// console.log('waterfall 用户进行长按 e',e.currentTarget,e.currentTarget.dataset.listindex,e.currentTarget.dataset.index);
			// 在 我的作品 页面显示 删除按钮 this.viewList  e.currentTarget.dataset.index  
			this.showBtn = true;
			let btntop;
			let btnleft;
			// 控制弹窗的显示防止 弹窗超出 页面的范围
			if (e.touches[0].clientY + 35 > 667) {
				// btntop = e.detail.y - 35 + 'px'   //35
				btntop = Math.abs(667 - 35 - 60) + 'px'; //35
			} else {
				btntop = e.touches[0].clientY + 'px'; //35
			}

			if (375 - e.touches[0].clientX < 126) {
				// btnleft = Math.abs(e.detail.x - 126) + 'px'  //126
				btnleft = Math.abs(375 - 126 - 20) + 'px'; //126
			} else {
				btnleft = e.touches[0].clientX + 'px'; //126
			}

			// 显示操作弹框
			// 在此触发父级事件 使得 list 中的 操作弹窗进行显示
			// console.log('item',JSON.stringify(item))
			let location = {}
			location.btntop = btntop
			location.btnleft = btnleft
			location = JSON.stringify(location)
			
			// 将 操作弹框的位置 以及 文章 id 传递过去
			// 然后，用户点击跳转到修改页面，先根据 id 获取文章内容
			// 然后在进行修改
			
			// 获取 用户 在瀑布流中 点击的是 第几列 第几个
			let item = this.viewList[e.currentTarget.dataset.listindex].list[e.currentTarget.dataset.index]
			
			
			this.$emit('showUseroperation',item.id,location);
			// this.$emit('showUseroperation', btntop, btnleft,item);
		},
		close(num) {
			// console.log('关闭')
			// 触发父级中的事件，使得list 中的 操作弹窗进行隐藏
			this.$emit('closeUseroperation');
			// this.$refs.popup_useoperation.close()
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
			// console.log('瀑布流 viewList ==>',this.viewList)
		},
		// 用户点击 进行跳转操作
		jump(item) {
			console.log('进行跳转 item', item);
			if (item.videoId) {
				console.log('跳转到视频界面');
				
				uni.navigateTo({
					url:'/pages/playVideo/playVideo?item=' + encodeURIComponent(JSON.stringify(item))
				})
				
				
			} 
			else if (item.price){
				// 跳转到 二手详情页面
				console.log('跳转到二手详情页');
				uni.navigateTo({
					// 测试二手 
					url:`/pages/playVideo/usedDetail?usedId=${item.id}`
				});
			}
			else if (item.title) {
				// 跳转到文章页面
				console.log('跳转到文章详情页');
				uni.navigateTo({
					url:`/pages/playVideo/txtDetail?txtId=${item.id}`
					
					// 测试二手 记得修改过来
					// url:`/pages/playVideo/usedDetail?txtId=8`
				});
			} 
			
		}
	},
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
				box-sizing: border-box;
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

			// 二手商品的 价格显示
			.price{
				box-sizing: border-box;
				padding: 5rpx 20rpx;
				color: #fc3c3b;
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				.num{
					font-weight: bolder;
					font-size: 38rpx;
				}
				.see_num{
					color: #838383;
					font-size: 23rpx;
				}
				
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

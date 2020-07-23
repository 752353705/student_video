<template>
	<view class="list-container">
		<view id="wf-list" class="list" v-for="(list,listIndex) of viewList" :key="listIndex">
			
			<view class="item" v-for="(item,index) of list.list" :key="index" >
				
				<!-- 视频封面 -->
				<u-lazy-load @load="handleViewRender(listIndex,index)" 
					@error="handleViewRender(listIndex,index)" :image="item.image"
					@click="jumpVideo(videoId)">
				</u-lazy-load>   
				
				<!-- 上传视频的简单的简介 -->
				<view class="introduction">
					 介视频简介视频简介视频简介视频简介视频简介视频简介
				</view>
				
				
				<!-- 用户的 头像以及点赞数 -->
				<view class="item_foot">
					<view class="left">
						<view class="user_img">
							<!-- 头像 -->
						</view>
						<view class="msg">
							<!-- 姓名 -->
							沈博然
						</view>
					</view>
					<view class="right">
						<view class="icon">
							<image src="/static/my_vote.png" mode=""></image>
						</view>
						<view>
							<!-- 票数 -->
							123456
						</view>
					</view>
				</view>
				
			</view>
    </view>
	</view>
</template>

<script>
	// import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue'
	export default {
		props:{
			list:{
				type:Array, //实际请求获取的列表数据
			}	
		},
		data() {
			return {
				loadingImg: '/static/loading.png',
				viewList:[{list:[]},{list:[]}],  //展示到视图的列表数据
				everyNum:2,
				scrollTop:0, //懒加载时滚动的距离  动态生成
			}
		},
		components:{
			
		},
		methods: {
			init(){
				this.viewList = [{list:[]},{list:[]}];
				setTimeout(()=>{
						this.handleViewRender(0,0)
				},0)
			},
			handleViewRender(x,y){
				// console.log(x,y);
				// const num = (x+1)*(y+1);
				// console.log(num%(this.everyNum));
				// console.log(num);
				// if((num%(this.everyNum))!==0&&num!==1)return;
				// console.log(num,'----');
				const index = this.viewList.reduce((total,current)=>total + current.list.length,0)
				if(index>this.list.length-1) {
						// 加载完成触发事件并返回加载过的图片数
						this.$emit('finishLoad',index)
						return
				};
				const query = uni.createSelectorQuery().in(this);
				let listFlag = 0;
				query.selectAll('#wf-list').boundingClientRect(data => {
						listFlag = data[0].bottom - data[1].bottom<=0?0:1;
						this.viewList[listFlag].list.push(this.list[index])
						// this.list.slice(index,index+this.everyNum).forEach((item,index)=>{
						//     const flag = listFlag===0?index&1:Number(!(index&1))
						//     this.viewList[flag].list.push(item)
						// })
				}).exec()
			},
			jumpVideo(videoId){
				console.log('瀑布流跳转')
				// 根据点击的id进行跳转到视频播放页面  用来传递每一个视频的 videoId
				uni.navigateTo({
					url: "/pages/playVideo/playVideo?videoId=" + '842c376a462548f187d8c37df8f2eab7'
				});
			},
		},
		mounted() {
			console.log('瀑布流组件进行挂载 list',this.$props.list)
			if(this.list.length){
					this.init()
			}
		},
		onReady() {
			console.log('瀑布流组件onready list',this.$props.list)
		}
	}
</script>

<style lang="less" scoped>
    .list-container{
			display:flex;
			justify-content:space-between;
			align-items:flex-start;
			// padding :0 24rpx;
			.list{
				width: calc(50% - 8rpx);
				display :flex;
				flex-direction :column;
				.item{
					margin-bottom :18rpx;
					// height: 200px;
					image{
						display: block;
						width :100%;
					}
					
					// 上传视频的 用户简介
					.introduction{
						width: 100%;
						height: 90rpx;
						box-sizing: border-box;
						padding: 10rpx 20rpx;
						line-height: 43rpx;
						// 首行缩进
						// text-indent: 2em;
						// 最多两行，超出省略号显示
						display:-webkit-box;
						overflow:hidden;
						text-overflow:ellipsis;
						word-break: break-all;
						-webkit-box-orient:vertical;
						-webkit-line-clamp:2;
					}
					
					// 上传视频的 用户个人信息
					.item_foot{
					  width: 100%;
					  height: 50rpx;
					  display: flex;
					  justify-content:space-between;
						box-sizing: border-box;
						padding: 0rpx 20rpx;
					  align-items: center;
					  margin-top: 15rpx;
					  color: #bebbc4;
					  font-size: 24rpx;
						.left{
							display: flex;
							justify-content: space-evenly;
							align-items: center;
							.user_img{
								width: 40rpx;
								height: 40rpx;
								background-color: yellow;
								border-radius: 50%;
								margin-right: 10rpx;
							}
						}
						.right{
							display: flex;
							justify-content: space-evenly;
							align-items: center;
							.icon{
								width: 30rpx;
								height: 30rpx;
								margin-right: 6rpx;
								image{
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
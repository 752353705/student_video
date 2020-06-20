<template>
	<view class="list-container">
		<view id="wf-list" class="list" v-for="(list,listIndex) of viewList" :key="listIndex">
            <view class="item" v-for="(item,index) of list.list" :key="index" @click="jumpFind">
               <image 
									@load="handleViewRender(listIndex,index)" 
									@error="handleViewRender(listIndex,index)" 
									:src="item.image ? item.image : '/static/easyLoadimage/loading.gif'" mode="widthFix"
									:lazy-load="true"
									data-src="http://cdn.jirengu.com/book.jirengu.com/img/1.jpg"
								> 
								</image>
								
								<!-- <easy-loadimage 
									mode="widthFix" :scroll-top="scrollTop"
								  :image-src="item.image"
								>
								</easy-loadimage> -->
									
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
	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue'
	export default {
		props:{
			list:{
				type:Array, //实际请求获取的列表数据
			}	
		},
		data() {
			return {
				viewList:[{list:[]},{list:[]}],  //展示到视图的列表数据
				everyNum:2,
				scrollTop:0, //懒加载时滚动的距离  动态生成
			}
		},
		components:{easyLoadimage},
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
			jumpFind(e){
				// 根据点击的id进行跳转到视频播放页面
				uni.navigateTo({
					url: "/pages/playVideo/playVideo"
				});
			},
		},
		mounted() {
			if(this.list.length){
					this.init()
			}
		}
	}
</script>

<style lang="less" scoped>
    .list-container{
			display:flex;
			justify-content:space-between;
			align-items:flex-start;
			padding :0 24rpx;
			.list{
				width: calc(50% - 8rpx);
				display :flex;
				flex-direction :column;
				.item{
					margin-bottom :18rpx;
					image{
						display: block;
						width :100%;
					}
					.item_foot{
					  width: 100%;
					  height: 50rpx;
					  display: flex;
					  justify-content:space-evenly;
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
								background-color: white;
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
								height: 26rpx;
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
<template>
	<view class="list-container">
		<view id="wf-list" class="list" v-for="(list,listIndex) of viewList" :key="listIndex">
			
			<view class="item" v-for="(item,index) of list.list" :key="index" >
				
				<!-- 商品图片 -->
				<u-lazy-load @load="handleViewRender(listIndex,index)" 
					@error="handleViewRender(listIndex,index)" :image="item.image"
					@click="jumpVideo(videoId)">
				</u-lazy-load>   
				
				<!-- 商品的简介 -->
				<view class="shop">
					<!-- 商品名称 -->
					<!-- <view class="shop_tit">
						意大利 时尚休闲
					</view> -->
					
					<!-- 商品简介 -->
					<view class="shop_detail">
						{{item.title}}
						<!-- 限时购限时购限时购限时购限时购限时购限时购限时购限时购 -->
					</view>
					
					<!-- 商品中底部的价格，限时购 -->
					<view class="item_foot">
							<view class="price">
								<!-- 姓名 -->
								￥{{item.price}}
							</view>
							<!-- <view class="icon">
								<image src="/static/my_vote.png" mode=""></image>
							</view> -->
							<view class="label">
								<!-- 票数 -->
								限时购
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
					url: "/pages/shopdetail/shopdetail?shopid=2"
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
					// 商品的样式
					.shop{
						box-sizing: border-box;
						padding: 9rpx 10rpx 10rpx 10rpx;
						// 商品 名称
						.shop_tit{
							font-size: 30rpx;
							color: block;
							font-weight: 550;
						}
						// 商品简介
						// 最多两行
						.shop_detail{
							overflow:hidden;
							text-overflow:ellipsis;
							display:-webkit-box;
							-webkit-line-clamp:2;
							-webkit-box-orient:vertical;
						}
						image{
							display: block;
							width :100%;
						}
						.item_foot{
						  width: 100%;
						  height: 50rpx;
						  // display: flex;
						  // justify-content:space-evenly;
						  // align-items: center;
						  margin-top: 15rpx;
						  color: #bebbc4;
						  font-size: 24rpx;
							.price{
								font-size: 30rpx;
								color:#ff2e42 ;
								display: inline-block;
							}
							.label{
								color: white;
								display: inline-block;
								margin-left: 22rpx;
								background-color: #ff2246;
								border-radius: 10rpx;
								box-sizing: border-box;
								padding:2rpx 12rpx 5rpx;
							}
						}
					}
					
					
				}
			}
		}
</style>
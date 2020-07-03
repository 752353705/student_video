<template>
	<view class="author">
		<!-- 头部 -->
		<view class="head height">
			<view class="userImg">
				
			</view>
			<view class="right">
				<view class="box">
					<!-- 关注 -->
					<view class="focus t_c" @click="goFans">
						<view class="">1</view>
						<view class="">关注</view>
					</view>
					<!-- 粉丝 -->
					<view class="fans t_c" @click="goFans">
						<view class="">1.6万</view>
						<view class="">粉丝</view>
					</view>
					<!-- 获赞与收藏 -->
					<view class="collection t_c">
						<view class="">24.3万</view>
						<view class="">获赞与收藏</view>
					</view>
				</view>
				
				<view class="rightBtm">
					<view v-if="!focus" class="focusBtn t_c" @click="focusOn">关注</view>
					<view v-else class="focusBtn t_c" @click="focusOn">已关注</view>
					
					<image src="../../static/msg.png" mode=""></image>
				</view>
			</view>
			
		</view>
		
		<!-- 作者个人资料  以及个人的描述-->
		<view class="authorMsg height">
			视频作者个人资料以及个人描述
		</view>
		
		<!-- 作者相关的视频 -->
		<view class="content">
			<!-- <view class="title">
				<view @click="changAct(0)"  :class=" act === 0 ? 'active item' : 'item'">作品</view>
				<view @click="changAct(1)" :class=" act === 1 ? 'active item' : 'item'">收藏</view>
			</view> -->
			<swiperTabHead class="height" :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiperTabHead>
			
			
			<!-- 作者作品展示 -->
			<view class="uni-tab-bar">
				<swiper class="swiper-box" :style=scrollviewHigh :current="tabIndex" @change="tabChange">
					<swiper-item v-for="(items,index) in newslist" :key="index">
						<scroll-view scroll-y class="list" 
							:style=scrollviewHigh
							scroll-y="true" 
							enable-flex="true"
							lower-threshold="160"
							@scrolltolower="lower(index)"
						>
								<template v-if="items.list.length > 0">
									<!-- 图文列表 -->
									<block v-for="(item,index1) in items.list" :key="index">
										<!-- 制作瀑布流 -->
										<wfalls-flow class="waterFull" :list="list" ref="wfalls" @finishLoad="getLoadNum"></wfalls-flow>
									</block>
								</template>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	import wfallsFlow from '../../components/wfallsflow.vue'
	const list = require('../../static/data.json').list;
	
	// 引入tabHead 切换
	import swiperTabHead from "../../components/swiper-tab-head.vue";
	export default {
		data() {
			return {
				//控制nav切换
				tabIndex:0,// 选中的
				tabBars:[
					{ name:"作品",id:"guanzhu" },
					{ name:"关注",id:"tuijian" },
				],   
				swiperheight:500,//高度
				scrollviewHigh:'',
				newslist:[
				   {
				     list:[
				       'a'
				       ]
				   },
				   {
						 list:[
						   'b'
						   ]
					 },
				],
				
				height:0,
				act:0,
				// 作者的个人作品
				list:[],
				focus:false
			};
		},
		components:{
			wfallsFlow,
			swiperTabHead
		},
		onLoad() {
			console.log('作者页')
			// 显示正在加载弹窗
			uni.showLoading({
			   title: '加载中'
			});
			// this.list = list;
			// this.$refs.wfalls.init();
			setTimeout(()=>{
			    this.list = list;
					console.log('author',this.$refs.wfalls)
			    this.$refs.wfalls[0].init();
			    this.$refs.wfalls[1].init();
			},1000)
			
		},
		onReady() {
			uni.hideLoading();
			
			let _this = this
			
			// 动态设置scroll-view区域的高度
			uni.getSystemInfo({
				success(res) {
					console.log('页面信息res',res)
						_this.phoneHeight = res.windowHeight; //获取用户设备的高度
						console.log(res.windowHeight);
						// 计算组件的高度
							let view = uni.createSelectorQuery().selectAll('.height');
						view.boundingClientRect(data => {
							// 计算上方各元素的高度总和
							data.forEach((item,index) => {
								console.log('item',item.height)
								_this.height += parseInt(item.height)
							})
							// console.log('高度 data',data,)
								console.log('高度',_this.height);
								_this.scrollviewHigh =  _this.phoneHeight - _this.height;
								// _this.scrollviewHigh = "height:" + _this.scrollviewHigh +"px";
								_this.scrollviewHigh = "height:" + _this.scrollviewHigh +"px";
								
						}).exec();
				}
			});
			
			
			
		},
		onReachBottom() {
			console.log('上拉 触底 加载') //分页 请求数据
			// 请求下一波参赛人员数据
			// 进行模拟
			// this.list.push({},{})
			this.lower()
		},
		methods:{
			// 判断当前用户是否对其进行了关注
			focusOn(){
				let _this = this 
				console.log('关注')
				if(!this.focus){
					//未关注
					this.focus = !this.focus 
				}else{
					// 已关注，再次点击表示是否取消关注
					uni.showModal({
						content:"确认不在关注",
						success:function(res){
							if (res.confirm) {
								console.log('用户点击确定');
								_this.focus = !_this.focus //用户取消关注
							} else if (res.cancel) {
									console.log('用户点击取消');
							}
						}
					})
				}
			},
			
			// 瀑布流分页请求
			lower(index){
				console.log('滚动到底部 ')
				//进行重新请求用户的数据
				// 模拟触底刷新
				console.log('onReachBottom');
				// 加锁，避免在加载更多时用户频繁下拉导致的重复触发而渲染异常
				if(!this.isNewRenderDone) return;   
				this.isNewRenderDone = false
				uni.showLoading({title:'正在加载更多'})
				// 模拟分页请求 (加载更多)
				setTimeout(()=>{
				    const nextData = JSON.parse(JSON.stringify(this.list.slice(0,10)))
				    this.list.push(...nextData);
				    // this.$nextTick(()=>{
				    //     this.$refs.wfalls.handleViewRender();
				    // })
				    // APP上触发不了还是setTimeout万能
				    setTimeout(()=>{
				        this.$refs.wfalls[index].handleViewRender();
				    },0)
				},800)
				
			},
			// 制作瀑布流
			getLoadNum(num){
			    console.log('共加载了:'+num);
			    !this.isNewRenderDone&&uni.hideLoading()
			    this.isNewRenderDone = true
			},
			// 切换作品以及关注
			//滑动切换导航
			tabChange(e){
			  this.tabIndex = e.detail.current
			},
			//接受子组件传过来的值点击切换导航
			tabtap(index){
					this.tabIndex = index;
			},
			goFans(){
				console.log('跳转到粉丝列表')
				// 当进行跳转的时候将，作者的关注列表以及粉丝列表传递过去
				uni.navigateTo({
					url:`/pages/fansList/fansList?list=${3}`
				})
			}
		}
	}
</script>

<style lang="less">
.author{
	width: 100%;
	height: 69.44rpx;
	.head{
		display: flex;
		box-sizing: border-box;
		padding: 40rpx 40rpx;
		.userImg{
			width: 150rpx;
			height: 150rpx;
			background-color: yellow;
			border-radius: 50%;
			
		}
		.right{
			width: 77%;
			margin-left: 30rpx;
			.box{
				display: flex;
				justify-content: space-evenly;
				align-items: center;
			}
			.rightBtm{
				margin-top: 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				image{
					width: 60rpx;
					height: 60rpx;
				}
				.focusBtn{
					width: 80%;
					height: 40rpx;
					border-radius: 40rpx;
					color: white;
					background-color: red;
					padding: 10rpx 0;
				}
			}
		}
	}
	
	.authorMsg{
		width: 100%;
		height: 100rpx;
		background-color: green;
		box-sizing: border-box;
		padding: 0 40rpx;
	}
	.content{
		.uni-tab-bar{
			box-sizing: border-box;
			padding: 10rpx 10rpx;
		}
		// .title{
		// 	display: flex;
		// 	justify-content: center;
		// 	align-items: center;
		// 	position: sticky;
		// 	top: 0;
		// 	left: 0;
		// 	background-color: white;
		// 	z-index: 10;
			
		// 	:nth-child(1),:nth-child(2){
		// 		margin-right: 30rpx;
				
		// 		padding: 20rpx 20rpx;
		// 	}
		// 	.active{
		// 		border-bottom: 4rpx solid red;
		// 	}
		// }
		
		// .authorVideos{
		// 	width: 100%;
		// 	box-sizing: border-box;
		// 	padding: 10rpx 11.5rpx 10rpx;
			
		// }
	}
}
</style>

<template>
	<view class="listPage">
		
		<!-- 搜索框 -->
		<view class="serach height" @click="goSearch">
		  <span>请搜索选手ID</span>
			<image src="/static/search.png" mode=""></image>
		</view>
		
		
		<!--index.wxml-->
		<!-- <view class="head height">
		  <image  @click="open" src="/static/head.png"></image>
		</view> -->
		
		<!-- 内容区 -->
		<view class="cent">
			<!-- 参赛 -->
			 <!-- <view class="sum height">
			    <view 
						class="item" 
						v-for="(item,index) in sum" 
						:key="item.id"
					>
			      <view class="num">
			        {{item.num}}
			      </view>
			      <view class="name">
							<image :src=item.src mode=""></image>
			        <view class="">
			        	{{item.name}}
			        </view>
			      </view>
			    </view>
			  </view> -->
			
			<!-- 滚动视图  参赛选手列表-->
			<!-- :style="height:{{scrollHeight}} px" -->
			<view class="box">
				<scroll-view class="list"
					:style=scrollviewHigh
					scroll-y="true" 
					enable-flex="true"
					lower-threshold="160"
					@scrolltolower="lower"
					@scroll="scroll"
					
					@touchmove="touchMove"
				>
					<!-- 制作瀑布流 -->
					<wfalls-flow class="waterFull" :list="list" ref="wfalls" @finishLoad="getLoadNum"></wfalls-flow>
				</scroll-view>
			</view>
			
		</view>
		<!-- 上传作品弹出层 -->
		<!-- <uploading></uploading> -->
		<uni-popup class="pop" animation="false" ref="popup" type="center" mask-click="false">
			<uni-popup-message type="success" pop_type="game" message="成功消息" duration="0" />
			<view class="imgBox">
				<image class="img" src="/static/close.png" mode="" @click="close"></image>
			</view>
		</uni-popup>
		
		<!-- 底部自定义tabber -->
		<tabbar :active="i_active"></tabbar>
	</view>
</template>

<script>
	import wfallsFlow from '../../components/wfallsflow.vue'
	const list = require('../../static/data.json').list;
	export default {
		data() {
			return {
				// 参赛
				sum:[
					{id:'0',name:'参赛人数',num:1020,src:'../../static/people.png'},
					{id:'1',name:'总投票数',num:27890,src:'../../static/sum.png'},
					{id:'2',name:'总访问量',num:76587,src:'../../static/accessNum.png'}
				],
				// 参赛选手列表
				list:[],
				listNum:0, //进行分页请求时的页数
				i_active: 0,
				phoneHeight:'',
				scrollviewHigh:'',
				height:0
			}
		},
		components:{
			wfallsFlow
		},
		onLoad() {
			console.log('首页 this',this.globalData)
			// 显示正在加载弹窗
			uni.showLoading({
			   title: '加载中'
			});
			// this.list = list;
			// this.$refs.wfalls.init();
			setTimeout(()=>{
			    this.list = list;
			    this.$refs.wfalls.init();
			},1000)
	
		},
		onReady() {
			// 页面加载完毕
			console.log('页面加载完毕')
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
							// 	console.log('高度',_this.height);
								_this.scrollviewHigh =  _this.phoneHeight - _this.height - 80;
								_this.scrollviewHigh = "height:" + _this.scrollviewHigh +"px";
								
						}).exec();
				}
			});
			
			// 给瀑布组件添加拖拽的功能
			// let full = uni.createSelectorQuery().select('.waterFull');
			
			
		},
		onPullDownRefresh(){
			console.log('下拉刷新')
		},
		onReachBottom() {
			console.log('上拉 触底 加载') //分页 请求数据
			// 请求下一波参赛人员数据
			// 进行模拟
			this.list.push({},{})
			
		},
		methods: {
			// 跳转到搜搜页面
			goSearch(){
				uni.navigateTo({
					url:"../find/find"
				})
			},
			touchMove(e){
				console.log('进行移动 e',e)
			},
			
			// 点击列表中每一项，进行跳转到视频播放页
			jumpFind(e){
				// 根据点击的id进行跳转到视频播放页面
				uni.navigateTo({
					url: "/pages/playVideo/playVideo"
				});
			},
			
			// 控制弹出框
			open(){
				this.$refs.popup.open()
			},
			
			close(){
				this.$refs.popup.close()
			},
			//scrollView 区域
			lower(){
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
				        this.$refs.wfalls.handleViewRender();
				    },0)
				},800)
				
				// 进行真正大分页请求时，利用挂载在实例上的方法，发起请求
				
			},
			
			scroll(e){
				console.log('进行滚动 e',e)
				//判断进行下拉加载
				// if(){
					
				// }
				
			},
			// 制作瀑布流
			getLoadNum(num){
			    console.log('共加载了:'+num);
			    !this.isNewRenderDone&&uni.hideLoading()
			    this.isNewRenderDone = true
			}	
			
		}
	}
</script>

<style  scoped lang="less">
	.listPage{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		// background-color: #f6f6f6;
		.serach{
			background-color: #f5f5f5;
			border-radius: 33rpx;
			width: 63%;
			height: 71rpx;
			text-align: center;
			line-height: 71rpx;
			color: #453a74;
			// margin-bottom: 20rpx;
			margin-top: 56rpx;
			margin-left: 20rpx;

			image{
				width: 40rpx;
				height:40rpx ;
				float: right;
				transform: translateY(50%);
				margin-right: 30rpx;
			}
		}
		.head{
		  width: 100%;
		  height: 470rpx;
			// background-color: #0d0737;
		  image{
		    width: 100%;
		    height: 100%;
		  }
		}
		.cent{
			position: relative;
		  // background-color:#0d0737;
		  width: 100%;
			height: 100%;
		  box-sizing: border-box;
		  padding: 11.5rpx;
		  padding-top: 20rpx;
		  .sum{
		    width: 100%;
		    height: 100rpx;
		    // background-color: #2f1b8e;
		    border-radius: 20rpx;
		    display: flex;
		    justify-content: space-evenly;
		    align-items: center;
		    margin-bottom: 20rpx;
		    .item{
		      text-align: center;
					width: 200rpx;
		      .num{
		        font-weight: bolder;
		        color: #ffe34f;
		        font-size: 42rpx;
		      }
		      .name{
						width: 100%;
		        color: #c2bdd1;
		        font-size: 27rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						image{
							width: 30rpx;
							height: 30rpx;
							margin-right: 8rpx;
						}
		      }
		    }
		  }
		  
			.box{
				// background-color: #0d0737;
				width: 100%;
				height: 100%;
				.list{				
					position: relative;
				  display: flex;
				  justify-content: space-between;
				  flex-wrap: wrap;
					.waterFull{
						position: absolute;
						width: 100%;
					}
				}
			}
		}
		.pop{
			.imgBox{
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				.img{
					width: 62.5rpx;
					height: 62.5rpx;
					margin-top: 20rpx;
				}
			}
		}
		
	}
	

</style>

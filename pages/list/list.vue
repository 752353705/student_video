<template>
	<view class="listPage">
		<!--index.wxml-->
		<view class="head">
		  <image  @click="open" src="/static/head.png"></image>
		</view>
		
		<!-- 内容区 -->
		<view class="cent">
			<!-- 参赛 -->
			  <view class="sum">
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
			  </view>
			
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
				i_active: 0,
				phoneHeight:'',
				scrollviewHigh:''
			}
		},
		components:{
			wfallsFlow
		},
		onLoad() {
			console.log('首页')
			// 显示正在加载弹窗
			uni.showLoading({
			   title: '加载中'
			});
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
								let view = uni.createSelectorQuery().select('.head');
								view.boundingClientRect(data => {
										_this.navHeight = data.height;
										console.log(_this.navHeight);
										_this.scrollviewHigh =  _this.phoneHeight - _this.navHeight - 80;
										_this.scrollviewHigh = "height:" + _this.scrollviewHigh +"px";
										
								}).exec();
						}
				});
			
			
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
				
			},
			scroll(){
				// console.log('进行滚动')
				
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
		.head{
		  width: 100%;
		  height: 470rpx;
			background-color: #0d0737;
		  image{
		    width: 100%;
		    height: 100%;
		  }
		}
		.cent{
			position: relative;
		  background-color:#0d0737;
		  width: 100%;
			height: 100%;
		  box-sizing: border-box;
		  padding: 37.5rpx;
		  padding-top: 20rpx;
		  .sum{
		    width: 100%;
		    height: 100rpx;
		    background-color: #2f1b8e;
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
				background-color: #0d0737;
				width: 100%;
				height: 100%;
				.list{
				  display: flex;
				  justify-content: space-between;
				  flex-wrap: wrap;
					.waterFull{
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

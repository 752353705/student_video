	<!-- wx15787d9dfeab4b4a -->
<template>
	<view class="listPage">
		
		<!-- 搜索框 -->
		<view class="serach height" @click="goSearch">
		  <span>搜索</span>
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
		<!-- 	<view class="box">
				<scroll-view class="list"
					:style=scrollviewHigh
					scroll-y="true" 
					scroll-top="20rpx"
					enable-flex="true"
					:throttle="false"
					lower-threshold="160"
					upper-threshold = "50"
					@scrolltolower="lower"
					@scrolltoupper="toupper"
				>
				@touchmove="touchMove"
					制作瀑布流
					<wfalls-flow class="waterFull" :list="list" ref="wfalls" @finishLoad="getLoadNum"></wfalls-flow>
				</scroll-view>
			</view> -->
			
			<!-- 测试下拉刷新 -->
			<mescroll-body ref="mescrollRef" @init="mescrollInit" 
				@down="downCallback" @up="upCallback" 
			>
				<!-- <view v-for="data in list" :key="index"> 数据列表... </view> -->
				<view class="box">
						<scroll-view class="list"
							:style=scrollviewHigh
							scroll-y="true" 
							scroll-top="20rpx"
							enable-flex="true"
							:throttle="false"
							lower-threshold="160"
							upper-threshold = "50"
							@scrolltolower="lower"
							@scrolltoupper="toupper"
						>
						<!-- @touchmove="touchMove"
							制作瀑布流 -->
							<wfalls-flow class="waterFull" :style=scrollviewHigh :list="list" ref="wfalls" @finishLoad="getLoadNum"></wfalls-flow>
						</scroll-view>
					</view>
			</mescroll-body>
			
			
		</view>
		
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
				// sum:[
				// 	{id:'0',name:'参赛人数',num:1020,src:'../../static/people.png'},
				// 	{id:'1',name:'总投票数',num:27890,src:'../../static/sum.png'},
				// 	{id:'2',name:'总访问量',num:76587,src:'../../static/accessNum.png'}
				// ],
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
			
// 当页面加载时，就网络请求进行页面第一批数据的渲染
			
			
			
			// this.list = list;
			this.$refs.wfalls.init();
			setTimeout(()=>{
			    this.list = list;
					console.log('初始化list ref',this.$refs.wfalls)
			    this.$refs.wfalls.init();
			},1000)
	
		},
		onReady() {
			// 页面加载完毕
			console.log('页面加载完毕')
			
			let _this = this
			
			// 动态设置scroll-view区域的高度
			uni.getSystemInfo({
				success(res) {
					// console.log('页面信息res',res)
						_this.phoneHeight = res.windowHeight; //获取用户设备的高度
						// console.log(res.windowHeight);
						// 计算组件的高度
						let view = uni.createSelectorQuery().selectAll('.height');
						view.boundingClientRect(data => {
							// 计算上方各元素的高度总和
							data.forEach((item,index) => {
								// console.log('item',item.height)
								_this.height += parseInt(item.height)
							})
								_this.scrollviewHigh =  _this.phoneHeight - _this.height - 80;
								_this.scrollviewHigh = "height:" + _this.scrollviewHigh +"px";
						}).exec();
				}
			});
			
			// 给瀑布组件添加拖拽的功能
			// let full = uni.createSelectorQuery().select('.waterFull');
			
			uni.hideLoading();
		},
		// onPullDownRefresh(){
		// 	console.log('下拉刷新')
		// },
		// onReachBottom() {
		// 	console.log('上拉 触底 加载') //分页 请求数据
		// 	// 请求下一波参赛人员数据
		// 	// 进行模拟
		// 	this.list.push({},{})
			
		// },
		methods: {
			// 控制测试的视频列表
			/*mescroll组件初始化的回调,可获取到mescroll对象 (此处可删,mixins已默认)*/
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			/*下拉刷新的回调, 有三种处理方式:*/
			downCallback(){
				console.log('downCallback 下拉刷新')
				// 第1种: 请求具体接口
				// uni.request({
				// 	url: 'xxxx',
				// 	success: () => {
				// 		// 请求成功,隐藏加载状态
				// 		this.mescroll.endSuccess()
				// 	},
				// 	fail: () => {
				// 		// 请求失败,隐藏加载状态
				// 		this.mescroll.endErr()
				// 	}
				// })
				// 第2种: 下拉刷新和上拉加载调同样的接口, 那么不用第1种方式, 直接mescroll.resetUpScroll()即可
				// this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				// 第3种: 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
				setTimeout(()=>{
					this.mescroll.endSuccess()
				},3000)
				
				
				// 此处仍可以继续写其他接口请求...
				// 调用其他方法...
			},
			/*上拉加载的回调*/
			upCallback(page) {
				console.log('upCallback 上拉加载')
				// let pageNum = page.num; // 页码, 默认从1开始
				// let pageSize = page.size; // 页长, 默认每页10条
				// uni.request({
				// 	url: 'xxxx?pageNum='+pageNum+'&pageSize='+pageSize,
				// 	success: (data) => {
				// 		// 接口返回的当前页数据列表 (数组)
				// 		let curPageData = data.xxx; 
				// 		// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
				// 		let curPageLen = curPageData.length; 
				// 		// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
				// 		let totalPage = data.xxx; 
				// 		// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
				// 		let totalSize = data.xxx; 
				// 		// 接口返回的是否有下一页 (true/false)
				// 		let hasNext = data.xxx; 
						
				// 		//设置列表数据
				// 		if(page.num == 1) this.dataList = []; //如果是第一页需手动置空列表
				// 		this.dataList = this.dataList.concat(curPageData); //追加新数据
						
				// 		// 请求成功,隐藏加载状态
				// 		//方法一(推荐): 后台接口有返回列表的总页数 totalPage
				// 		this.mescroll.endByPage(curPageLen, totalPage); 
						
				// 		//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
				// 		//this.mescroll.endBySize(curPageLen, totalSize); 
						
				// 		//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
				// 		//this.mescroll.endSuccess(curPageLen, hasNext); 
						
				// 		//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.
				// 		//如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
				// 		//如果传了hasNext,则翻到第二页即可显示无更多数据.
				// 		//this.mescroll.endSuccess(curPageLen);
						
				// 		// 如果数据较复杂,可等到渲染完成之后再隐藏下拉加载状态: 如
				// 		// 建议使用setTimeout,因为this.$nextTick某些情况某些机型不触发
				// 		setTimeout(()=>{
				// 			this.mescroll.endSuccess(curPageLen)
				// 		},20)
						
				// 		//curPageLen必传的原因:
				// 		// 1. 使配置的noMoreSize 和 empty生效
				// 		// 2. 判断是否有下一页的首要依据: 
				// 		// 	 当传的值小于page.size时(说明不满页了),则一定会认为无更多数据;
				// 		// 	 比传入的totalPage, totalSize, hasNext具有更高的判断优先级;
				// 		// 3. 当传的值等于page.size时(满页),才取totalPage, totalSize, hasNext判断是否有下一页
				// 		// 传totalPage, totalSize, hasNext目的是避免方法四描述的小问题
						
				// 		// 提示: 您无需额外维护页码和判断显示空布局,mescroll已自动处理好.
				// 		// 当您发现结果和预期不一样时, 建议再认真检查以上参数是否传正确
				// 	},
				// 	fail: () => {
				// 		//  请求失败,隐藏加载状态
				// 		this.mescroll.endErr()
				// 	}
				// })
				
				// 此处仍可以继续写其他接口请求...
				// 调用其他方法...
			},
			
			
			
			
			
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
				this.$refs.popup_video.open()
			},
			
			close(){
				this.$refs.popup_video.close()
			},
			//scrollView 区域
			toupper(){
				console.log('toupper')
			},
			lower(){
				console.log('滚动到底部 lower')
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
						uni.hideLoading();
				},800)
				
				// 进行真正大分页请求时，利用挂载在实例上的方法，发起请求
				
			},
			
			// scroll(e){
			// 	console.log('进行滚动 e',e)
			// 	//判断进行下拉加载
			// 	// if(){
					
			// 	// }
				
			// },
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
		background-color: #f6f6f6;
		.serach{
			background-color: #cbcbcf;
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

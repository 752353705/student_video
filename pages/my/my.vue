<template>
	<view>
		<view class="my">
		  <view class="head height">
		    <view class="user_img" @click="jump">
					<image :src="user_img" mode=""></image>
				 </view>
		    <view class="user_name">
		      {{user_name || '昵称' }}
		    </view>
		    <view class="user_id">
		      ID：{{ userMsg.user_id || '暂无' }}
		    </view>
		  </view>
		
		  <view class="content height">
		    <view class="list">
		      <view 
						v-for="(item,index) in useList" 
						:key="index"
						@click="open(index)"
						class="list_item" 
					>
		        <view class="left">
		          <view class="left_icon">
		             <image :src=item.icon mode=""></image>
		          </view>
		          <view>
		            {{item.txt}}
		          </view>
		        </view>
		        <view class="right">
		          <image v-if="index!=1" src="/static/right.png" mode=""></image>
		          <view class="tic" v-else>
								{{tic_num}}票
							</view>
		        </view>
		      </view>
		    </view>
			</view>
			
			<!-- 分类展示头 -->
			<swiperTabHead  :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiperTabHead>
			
			<!-- 展示内容 -->
			<view class="uni-tab-bar">
				<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" >
					<swiper class="swiper-box" :style="{height:swiperheight+'px'}" :current="tabIndex" @change="tabChange">
						<swiper-item style="height: 500px;" class="swiper-item" v-for="(items,index) in newslist" :key="index">
							<scroll-view scroll-y class="list" :style=scrollviewHigh scroll-y="true" enable-flex="true" lower-threshold="160"
							 @scrolltolower="lower(index)">
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
				</mescroll-body>
			</view>
		</view>
		<!-- 个人资料填写的弹出框 -->
		<uni-popup class="pop" animation="false" ref="popup_user" type="center" mask-click="false">
			<uni-popup-usermsg type="success"  message="成功消息" duration="0" />
			<view class="imgBox">
				<image class="img" src="/static/close.png" mode="" @click="close"></image>
			</view>
		</uni-popup>
		
		<!-- 上传视频的弹出框 是全局组件 -->
	<!-- 	<uni-popup class="pop" animation="false" ref="popup_video" type="center" mask-click="false">
			<uni-popup-pushvideo type="success"  message="成功消息" duration="0" />
			<view class="imgBox">
				<image class="img" src="/static/close.png" mode="" @click="close"></image>
			</view>
		</uni-popup> -->
		
		<!-- 底部导航栏 -->
		<tabbar :active="m_active"></tabbar>
	</view>
</template>

<script>
	import wfallsFlow from '../../components/wfallsflow.vue'
	const list = require('../../static/data.json').list;
	// 上传个人资料的弹框
	import uniPopupUsermsg from '../../components/uni-popup/uni-popup-usermsg.vue'
	
	// 引入tabHead 切换
	import swiperTabHead from "../../components/swiper-tab-head.vue";
	export default {
		data() {
			return {
				//控制nav切换
				tabIndex:0,// 选中的
				tabBars:[
					{ name:"作品",id:"guanzhu" },
					{ name:"收藏",id:"tuijian" },
				],   
				swiperheight:500,//高度
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
				// 个人作品以及收藏的展示
				list:[],
				colList:[],
				scrollviewHigh:'',
				height:0,
				// 个人展示
				act:0,
				useList:[
					{icon:"/static/my_use1.png",txt:'个人资料'},
					{icon:"/static/my_ticket1.png",txt:'剩余票数（每日限投3票）'},
					{icon:"/static/my_exit1.png",txt:'退出登录'}
				],
				tic_num:3,
				m_active:4,
				
				// 用户信息显示
				user_img:'', //用户头像
				user_name:'',//用户名
				
				src: '',
				danmuList: [
						{
							text: '第 1s 出现的弹幕',
							color: '#ff0000',
							time: 1
						},
						{
							text: '第 3s 出现的弹幕',
							color: '#ff00ff',
							time: 3
						}
				],
				danmuValue: ''
			};
		},
		components:{
			wfallsFlow,
			swiperTabHead,
			uniPopupUsermsg
		},
		onLoad(){
			   // uni.getSystemInfo({
			   //  success:(res)=>{
			   //      let height = res.windowHeight-uni.upx2px(100)
			   //      this.swiperheight = height;
			   //  }
			   // })
			let _this = this
			console.log('我的页面')
			uni.getStorage({
			    key: 'userMsg',
			    success: function (res) {
			        console.log('本地信息',res.data);
							_this.userMsg = JSON.parse(res.data)
			    }
			});
			// this.$refs.popup_video.open()	
			// this.$refs.popup_user.open()
			uni.showLoading({
			   title: '加载中'
			});
			// 渲染作品列表
			setTimeout(()=>{
			    this.list = list;
					console.log('初始化 my ref',this.$refs.wfalls0)
			    this.$refs.wfalls[0].init();
			    this.$refs.wfalls[1].init();
			},1000)
			
			// 发起数据进行请求
			// 请求作品 以及 收藏 分别进行赋值
			
			
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
								console.log('高度',_this.height);
								_this.scrollviewHigh =  _this.phoneHeight - _this.height;
								_this.scrollviewHigh = "height:" + _this.scrollviewHigh +"px";
								
						}).exec();
				}
			});
		},
		onShow() {
			let _this = this
			console.log('onshow')
			// 获取用户名
			uni.getStorage({
			    key: 'user_name',
			    success: function (res) {
			        console.log('本地信息',res.data);
							_this.user_name = res.data
			    }
			});
			// 获取头像
			uni.getStorage({
			    key: 'user_img',
			    success: function (res) {
			        console.log('本地信息',res.data);
							_this.user_img = res.data
			    }
			});
		},
		methods:{
			// 控制测试的视频列表
			/*mescroll组件初始化的回调,可获取到mescroll对象 (此处可删,mixins已默认)*/
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			/*下拉刷新的回调, 有三种处理方式:*/
			downCallback(){
				console.log('downCallback 下拉刷新 1')
				// this.mescroll.endSuccess()
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
				
				console.log('downCallback 下拉刷新 2')
				// 此处仍可以继续写其他接口请求...
				// 调用其他方法...
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				console.log('上拉加载')
				//联网加载数据
			// 	apiGoods(page.num, page.size, this.isGoodsEdit).then(curPageData=>{
			// 		//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
			// 		//mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
			
			// 		//方法一(推荐): 后台接口有返回列表的总页数 totalPage
			// 		//this.mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)
			
			// 		//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
			// 		//this.mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)
			
			// 		//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
			// 		//this.mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)
			
			// 		//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
			// 		this.mescroll.endSuccess(curPageData.length);
			
			// 		//设置列表数据
			// 		if(page.num == 1) this.goods = []; //如果是第一页需手动制空列表
			// 		this.goods=this.goods.concat(curPageData); //追加新数据
			// 	}).catch(()=>{
			// 		//联网失败, 结束加载
			// 		this.mescroll.endErr();
			// 	})
			},
			
			
			
			
			
			
			
			
			
			//滑动切换导航
			tabChange(e){
			  this.tabIndex = e.detail.current
			},
			//接受子组件传过来的值点击切换导航
			tabtap(index){
				this.tabIndex = index;
			},
			// 制作瀑布流
			getLoadNum(num){
			    console.log('共加载了:'+num);
			    !this.isNewRenderDone&&uni.hideLoading()
			    this.isNewRenderDone = true
			},	
			//scrollView 区域
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
						
						//区分是请求哪类数据，并进行添加
						
				    setTimeout(()=>{
							let type = 'this.$refs.wfalls' + index +'[index]'
							console.log('请求list',type)
				      this.$refs.wfalls[index].handleViewRender();
				    },0)
						uni.hideLoading();
				},800)
				
				// 进行真正大分页请求时，利用挂载在实例上的方法，发起请求
				
			},
			// 点击我的视频跳转到视频播放页
			goPlayVideo(){
				uni.navigateTo({
					url: "/pages/playVideo/playVideo"
				})
			},
			// 进行弹窗的控制
			open(num){
				if(num === 9){
				// 显示上传视频
					this.$refs.popup_video.open()
				}else if(num === 0){
					// 显示个人资料
					this.$refs.popup_user.open()
				}else if(num === 2){
					// 显示退出登录
					uni.showModal({
						title:"提示",
						content:"确定退出吗",
						success:function(res){
							if (res.confirm) {
								console.log('用户点击确定');
								// 用户确认退出登录，删除本地用户登录的信息
							} else if (res.cancel) {
								console.log('用户点击取消');
								// 不进行操作弹出框取消即可
								
							}
						},
						fail:function() {
							console.log('调用接口失败')
						}
					})
				}
			},
			close(num){
				// console.log('关闭')
				this.$refs.popup_user.close()
				this.$refs.popup_video.close()
			},
			
			// 获取用户的信息  暂时用不到，
			// 逻辑：跳转到手机登录页面，进行登录然后将返回的信息进行本地存储，在my 页面再次显示时，获取信息
			getUserMsg(){
				let _this = this
				// 获取用户信息
				uni.getUserInfo({
				    // 获取信息成功
				    success(res) {
				        console.log('请求成功',res);
								// 获取个人昵称、头像、ID
								let userMsg = {
									userName:res.userInfo.nickName,
									userImg:res.userInfo.avatarUrl
								}
								_this.userMsg = userMsg
								// 进行本地存储
								uni.setStorage({
								    key: 'userMsg',
								    data: JSON.stringify(userMsg),
								    success: function () {
								        console.log('success');
								    }
								});
				        // 成功后进行登录,获取code
				        uni.login({
				          success (res) {
				             console.log('成功登录',res);
				            if (res.code) {
				              //发起网络请求 请求个人信息
				              // uni.request({
				              //   // 请求路径
				              //   url: 'https://test.com/onLogin',  
				              //   // 请求参数code
				              //   data: {
				              //     code: res.code
				              //   },
				              //   method: 'GET',
				              //   success(res){
				              //       // 请求成功后获取openid和session_key
				              //       console.log(res)
				              //   }
				              // })
				            } else {
				              console.log('登录失败！' + res.errMsg)
				            }
				          }
				        })
				    },
				    fail() {
				        console.log("获取用户信息失败");
				    }
				})
			},
		
			// 跳转到注册页
			jump(){
				console.log('跳转页面')
				uni.navigateTo({
				    url: "/pages/login/login"
				});
			},
			
			// 控制视频组件
			sendDanmu: function() {
					this.videoContext.sendDanmu({
							text: this.danmuValue,
							color: this.getRandomColor()
					});
					this.danmuValue = '';
			},
			videoErrorCallback: function(e) {
				console.log('err',e.target.errMsg)
					uni.showModal({
							content: e.target.errMsg,
							showCancel: false
					})
			},
			getRandomColor: function() {
					const rgb = []
					for (let i = 0; i < 3; ++i) {
							let color = Math.floor(Math.random() * 256).toString(16)
							color = color.length == 1 ? '0' + color : color
							rgb.push(color)
					}
					return '#' + rgb.join('')
			}
		
		}
	}
</script>

<style lang="less">
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
	.my{
	  background-color: #f6f6f6;
	  position: fixed;
	  top: 0;
	  left: 0;
	  right: 0;
	  bottom: 0;
	  box-sizing: border-box;
		color: black;
	  .head{
	    color: white;
	    font-size: 30rpx;
	    display: flex;
	    align-items: center;
	    flex-direction: column;
			box-sizing: border-box;
	    padding-top: 64rpx;
	    // 花个半圆
	    width: 750rpx;
	    height: 310.47rpx;
	    background-image: linear-gradient(to right, #3d1c9e , #7255a5);
	    border-radius:0 0 750rpx 750rpx ;
			// border-radius: 0 0 25% 100% ;
	    .user_img{
	      width: 120rpx;
	      height: 120rpx;
	      background-color: white;
	      border-radius: 50%;
				image{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
	    }
	    .user_name{
	      margin-top: 20rpx;
	    }
	  }
	  .content{
	    box-sizing: border-box;
	    padding: 40rpx;
			padding-bottom: 10rpx;
			font-size: 30rpx;
	    .list{
	      width: 100%;
	      height: 218rpx;
	      background-color: white;
	      border-radius: 20rpx;
	      box-sizing: border-box;
	      padding: 20rpx 45.83rpx;
	      color: #707070;
				
	      .list_item{
					position: relative;
					box-sizing: border-box;
	        display: flex;
	        justify-content: space-between;
	        align-items: center;
	        height: 58rpx;
	        .left{
	          display: flex;
	          justify-content: space-between;
	          align-items: center;
						.left_icon{
							width: 38rpx;
							height: 32rpx;
							margin-right: 20rpx;
							image{
								width: 100%;
								height: 100%;
							}
						}
	        }
					.right{
						width:46.66rpx ;
						height: 37.16rpx;
						.tic{
							width: 48rpx;
							padding-right: 20rpx;
						}
						image{
							width: 100%;
							height: 100%;
						}
					}
					
				}
				// 绘制0.5px的底线
				// .list_item::after {
				// 	content: " ";
				// 	position: absolute;
				// 	left: 0;
				// 	bottom: 0;
				// 	width: 100%;
				// 	height: 1px;
				// 	background: black;
				// 	transform: scaleY(0.5);
				// }
			}
	    .title{
	      // color: white;
	      display: flex;
	      justify-content: start;
				align-items: center;
	      margin: 39rpx 20rpx;
				.title_icon{
					width: 40.77rpx;
					height: 44.77rpx;
					margin-right: 16rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
	    }
	    .video_list{
	      width: 100%;
	      display: flex;
	      justify-content: space-between;
	      flex-wrap: wrap;
	      .video_item{
	        width:314rpx;
	        height:308rpx ;
	        background-color: white;
	        border-radius: 20rpx;
	        box-sizing: border-box;
	        padding-top: 25rpx;
	        .video_box{
	          height: 227rpx;
	          width: 100%;
						#myVideo{
							height: 227rpx;
							width:314rpx;
						}
	        }
	        .msg{
	          display: flex;
	          justify-content: start;
	          font-size: 20rpx;
	          box-sizing: border-box;
	          padding-left: 20rpx;
	          margin-top: 10rpx;
	          color: black;
	          .see{
	            margin-right: 20rpx;
							display: flex;
							justify-content: start;
							align-items: center;
							.see_icon{
								width: 40.77rpx;
								height: 44.77rpx;
								margin-right: 16rpx;
								image{
									width: 100%;
									height: 100%;
								}
							}
	          }
						.say{
							margin-right: 20rpx;
							display: flex;
							justify-content: start;
							align-items: center;
							.say_icon{
								width: 40.77rpx;
								height: 35.77rpx;
								margin-right: 16rpx;
								image{
									width: 100%;
									height: 100%;
								}
							}
						}
	        }
	      
					
				}
				
				.push_video{
					width:314rpx;
					height:308rpx ;
					background-color: white;
					border-radius: 20rpx;
					box-sizing: border-box;
					padding-top: 25rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					// 绘制十字
					.cross {
					  background: #120a43;
					  height: 138.88rpx;
					  position: relative;
					  width: 14rpx;
						margin-bottom: 20rpx;
					}
					.cross:after {
						background-color: #120a43;
						content: "";
						height: 14rpx;
						left: -59.77rpx;
						position: absolute;
						top: 60.77rpx;
						width: 138.88rpx;
					}
					.txt{
						color: black;
						font-size:33rpx;
						font-weight: bolder;
					}
				}
	    }
	  
			
		}
	
		
		.uni-tab-bar{
			box-sizing: border-box;
			padding: 10rpx 10rpx;
		}
		
	}
</style>

<template>
	<view class="life">
		<!-- 首页的图片样式 -->
		<view class="img_box">
			<image src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2319343996,1107396922&fm=26&gp=0.jpg" 
				mode="widthFix">
			</image>
		</view>
		<!-- 商家展示 -->
		<view class="merchant">
			<view class="merchant_box">
				<view class="merchant_item"
					v-for="(item,index) in store"
					:key="item.companyId"
					@click="jumpDetail(item.companyId)"
					>
					<view class="le">
						<image :src="item.companyLogo"
						 mode="widthFix">
						</image>
					</view>
					<view class="ri">
						<view class="head">
							<text class="type">{{item.companyType}}</text>
							<text class="title">{{item.companyName}}</text>
						</view>
						<view class="location">
							<text>{{item.companyAddress || ''}}</text>
						</view>
						<!-- <view class="foot">
							{{item.smartTags[0].text.content || ''}} 
						</view> -->
					</view>
				</view>
			</view>
		</view>
		<!-- 商家入驻 -->
		<view class="tenants" :class="enter_style ? 'tenants_scroll' : '' " @click="goTenants" >
			<image src="/static/ruzhu.png" mode=""></image>
		</view>
		
	</view>
</template>

<script>
	// 导入模拟的 商户数据
	// import store from '@/data/data.js'
	import QQMapWX from '@/components/qqmap-wx-jssdk.js'
	// 获取用户的地理位置
	let qqmapsdk = new QQMapWX({
	  // 申请的key
	  key: 'F4VBZ-MYUL3-QYE3K-YWSDQ-VZTDZ-6NFPZ'
	});
	export default {
		data() {
			return {
				// 商户数据
				store:'',
				// 监听页面滚动控制按钮的位置
				enter_style:false,
				timeout:false,
				// 默认第一页进行加载
				pageNum: 1,
				// 判断是否有下一页
				nextpage:false
			};
		},
		onLoad() {
			uni.getLocation({
			    type: 'wgs84',
			    success: function (res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
			    }
			});
			// 获取商家列表
			this.getStoreList()
			
		},
		onReachBottom() {
			console.log('上拉加载')
			if(!this.nextpage) return;
			// if(this.userId){
			// 	this.getOtherFans()
			// }else{
			// 	this.getMyFans()
			// }
		},
		onPageScroll(){
			// console.log('页面滚动了')
			if(!this.enter_style){
				this.enter_style = true
			}else{
				// 判断是否已经有了定时器
				if(!this.timeout){
					// 没有
					this.timeout = true
					console.log('设置定时器')
					setTimeout(()=>{
						this.enter_style = false
						this.timeout = false
					},5000)
				}else{
					// 有了
					// clearTimeout(timer)
					return
				}
			}
			
		},
		methods:{
			// 获取商家列表
			getStoreList(){
				this.http({
					url:'company/list',
				}).then(res => {
					console.log('获取商家列表',res)
					this.store = res.data
				})
			},
			// 跳转到商家详情页面
			jumpDetail(companyId){
				uni.navigateTo({
					url:'/pages/huiLife/merchant?companyId=' + companyId
				})
			},
			// 跳转到商家入驻页面
			goTenants(){
				uni.navigateTo({
					url:'/pages/huiLife/tenants'
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #f1f5f8;
	}
</style>

<style lang="scss">
	.life{
		.img_box{
			height: 370rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		// 商家
		.merchant{
			box-sizing: border-box;
			position: relative;
			.merchant_box{
				position: absolute;
				top: -90rpx;
				left: 20rpx;
				width: 95%;
				.merchant_item{
					width: 100%;
					// height: 205rpx;
					background-color: #ffffff;
					margin-bottom: 30rpx;
					box-sizing: border-box;
					padding: 20rpx;
					padding-right: 60rpx;
					border-radius: 10rpx;
					display: flex;
					justify-content: flex-start;
					align-items: flex-start;
					.le{
						width: 200rpx;
						height: 100%;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.ri{
						width: 100%;
						height: 100%;
						margin-left: 20rpx;
						// 商家信息
						.head{
							.type{
								background-color: #fcf2f0;
								color: #ec4a3d;
								margin-right: 20rpx;
								padding: 5rpx 13rpx;
								font-size: 23rpx;
								// padding-top: 5rpx;
								// padding-left: 5rpx;
								// padding-right: 5rpx;
								// padding-bottom: 5rpx;
								border-radius: 10rpx;
							}
							.title{
								font-size: 29rpx;
								font-weight: bolder;
							}
						}
						// 商家地点
						.location{
							margin-top: 20rpx;
							display: flex;
							justify-content: space-between;
							color: #525252;
							font-size: 27rpx;
						}
						// 当前热销简介
						.foot{
							margin-top: 21rpx;
							color: #ec4a3d;
							font-size: 27rpx;
						}
					}
				}
			}
		}
		// 商家入驻
		.tenants{
			width: 100rpx;
			height: 100rpx;
			position: fixed;
			bottom: 200rpx;
			right: 0rpx;
			z-index: 10;
			transform: translateX(-30rpx);
			transition: transform 0.4s;
			
			image{
				width: 100%;
				height: 100%;
			}
		}
		.tenants_scroll{
			// right: -44rpx;
			transform: translateX(44rpx);
			transition: transform 0.4s;
		}
	}
</style>

<template>
	<view class="merchant">
		<!-- 当前商家的背景图 :src="store[index].frontImg" -->
		<view class="bg">
			<image 
				src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2668268226,1765897385&fm=26&gp=0.jpg"
				mode="widthFix">
			</image>
		</view>
		
		<!-- 商家的信息以及菜品展示 -->
		<view class="merchant_msg_box">
			<view class="merchant_msg_msg">
				<!-- 商家名称，营业时间等 -->
				<view class="head">
					<text class="title">{{store_msg.companyName}}</text>
					<view class="time">
						<text class="icon iconfont iconshijian"></text>
						<text>营业时间：11:00~15:00、17:00~22:00</text>
					</view>
					<view class="location">
						<text class="icon iconfont icondidian"></text>
						<text>{{store_msg.companyAddress}}</text>
					</view>
					<!-- 当前店铺的商标 -->
					<view class="logo">
						<image :src="store[index].frontImg" 
							mode="widthFix">
						</image>
					</view>
					<!-- 打电话的图标 -->
					<view class="phone">
						<text @click="callPhone" class="t-icon icondianhua"></text>
					</view>
					
				</view>
				<!-- 当前火热的套餐 -->
				<view class="list">
					<view class="li_head">
						<text class="icon t-icon iconcanyin" ></text>
						<text class="tit">到店套餐</text>
					</view>
					<!-- 列表展示 -->
					<view class="li_item" 
						v-for="(item,index) in [1,2,3] "
						:key="index"
						@click="jumpGoodsDetail"
						>
						<view class="le">
							<image src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2319343996,1107396922&fm=26&gp=0.jpg" 
								mode="widthFix">
							</image>
						</view>
						<view class="ri">
							<view class="ri_tit">小锅套餐</view>
							<view class="desc">美蛙鱼2.5斤 3种配菜</view>
							<view class="price">
								<text class="now_price">￥128</text>
								<text class="del">￥168</text>
								<text class="discount">7.6折</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 商户相册 -->
				<view class="photo">
					<view class="photo_tit">
						<text class="icon t-icon iconxiangce"></text>
						<text>商户相册</text>
					</view>
					<!-- 图片展示 -->
						<!-- 头部大图 -->
						<view class="first_img">
							<image data-num='0' @click="previewImage"
								src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2668268226,1765897385&fm=26&gp=0.jpg"
								mode="widthFix">
							</image>
						</view>
						<!-- 底部三张小图 -->
						<view class="photo_btm_img">
							<view class="photo_item" 
								v-for="(item,index) in [1,2,3] "
								:key="index" :data-num="index + 1"
								@click="previewImage"
								>
								<image src="http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg"
									mode="widthFix">
								</image>
							</view>
						</view>
						
						
				</view>
				<!-- 使用说明 -->
				<view class="use_msg">
					<view class="use_tit">
						<text class="icon t-icon iconshiyongbangzhu"></text>
						<text>使用说明</text>
					</view>
					<!-- <view class="use_desc">
						
					</view> -->
				</view>
				
			</view>
		</view>
		<!-- 底部的获取优惠的按钮 -->
		<view v-if="!hasCode" class="btn">
			<view class="get_code"
				@click="getCode"
				>
				获取优惠码
			</view>
		</view>
		
		<view v-else class="btn">
			<view class="get_code"
				@click="showCode"
				>
				到店了出示优惠码
			</view>
		</view>
		<!-- 优惠码弹框 -->
		<uni-popup ref="popupHuicode" type="center" maskAlpha="1">
			<uni-popup-huicode :codesrc="codesrc" title="优惠二维码"></uni-popup-huicode>
		</uni-popup>
	</view>
</template>

<script>
	// 导入模拟的 商户数据
	import store from '@/data/data.js'
	import uniPopupHuicode from '@/components/uni-popup/uni-popup-huicode.vue';
	export default {
		data() {
			return {
				// 商家 id
				companyId:'',
				// 当前商家信息列表
				store_msg:[],
				// 当前商家 商品列表
				goodsList:[],
				
				
				
				
				
				// 商户数据
				store:store.store[0].data.poiList.poiInfos,
				// 当前店铺的照片
				photoList:[
					'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2668268226,1765897385&fm=26&gp=0.jpg',
					'https://img.alicdn.com/imgextra/i3/2888462616/O1CN01ERra5J1VCAbZaKI5n_!!0-item_pic.jpg_430x430q90.jpg',
					'https://gd3.alicdn.com/imgextra/i3/819381730/O1CN01YV4mXj1OeNhQIhQlh_!!819381730.jpg_400x400.jpg',
					'https://img.alicdn.com/imgextra/i4/3470687433/O1CN0124mMQOSERr18L1h_!!3470687433.jpg_430x430q90.jpg',
				],
				// 判断是否获取了优惠码
				hasCode:false,
				// 优惠码地址
				codesrc:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2852594709,2202399704&fm=26&gp=0.jpg',
			}
		},
		components:{
			uniPopupHuicode
		},
		onLoad(options) {
			this.companyId = options.companyId
			this.getGoodsList()
			this.getStoreMsg()
		},
		methods:{
			// 根据商家id 获取其相应的商品
			getGoodsList(){
				this.http({
					url:'product/list',
					data:{
						companyId:7
					}
				}).then(res => {
					console.log('获取相应商家的商品 res',res)
					
				})
			},
			// 根据商家id 获取其详细信息
			getStoreMsg(){
				this.http({
					url:'company/8'
				}).then(res => {
					console.log('商家详情',res)
					this.store_msg = res.data
				})
			},
			// 跳转到商品详情页
			jumpGoodsDetail(){
				uni.navigateTo({
					url:'/pages/huiLife/goodsDetail'
				})
			},
			// 预览商户相册图片
			previewImage(e){
				console.log('图片预览',e.currentTarget.dataset.num)
				var num = e.currentTarget.dataset.num
				// var url = this.photoList[num]; //获取当前页面的轮播图数据
				//uniapp预览轮播图
				uni.previewImage({
					current:num, //预览图片的下标
					urls:this.photoList, //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
					loop:true,
					longPressActions:true
				})
			},
			// 获取优惠码
			getCode(){
				let _this = this 
				uni.showToast({
					title:'领取成功',
					icon:'none',
					success() {
						console.log('获取优惠码')
						// 发起获取优惠码的请求
						_this.hasCode = true
						
					}
				})
			},
			// 展示二维码
			showCode(){
				this.$refs.popupHuicode.open();
			},
			// 用户点击进行拨打电话
			callPhone(){
				uni.makePhoneCall({
				   phoneNumber: '15930245253' 
				});
			},
		}
	}
</script>

<style>
	page{
		background-color: #f1f5f8;
		
	}
</style>

<style scoped lang="scss">
	// 控制图标与 文字之间的距离
	.icon{
		margin-right: 20rpx;
	}
	.t-icon{
		width: 22px;
		height: 22px;
	}
	.merchant{
		// 当前商家的背景图
		.bg{
			width: 100%;
			height: 370rpx;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
		//商家的信息以及菜品展示
		.merchant_msg_box{
			position: relative;
			.merchant_msg_msg{
				padding-bottom: 187rpx;
				position: absolute;
				top: -132rpx;
				left: 20rpx;
				width: 93%;
				// 头部样式
				.head{
					position: relative;
					border-radius: 10rpx;
					box-sizing: border-box;
					padding-top: 24rpx;
					padding-left: 39rpx;
					padding-right: 39rpx;
					padding-bottom: 38rpx;
					background-color: #FFFFFF;
					.title{
						display: inline-block;
						font-size: 32rpx;
						width: 380rpx;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}
					.time{
						margin-top: 50rpx;
						margin-bottom: 20rpx;
						font-size: 27rpx;
						color: #575757;
					}
					.location{
						font-size: 27rpx;
						color: #575757;
					}
					// 当前店的 图标
					.logo{
						width: 200rpx;
						height: 200rpx;
						position: absolute;
						top: -83rpx;
						right: 55rpx;
						image{
							width: 100%;
							height: 100%;
						}
					}
					// 打电话的图标
					.phone{
						position: absolute;
						bottom: 20rpx;
						right: 20rpx;
						.t-icon{
							width: 30px;
							height: 30px;
						}
					}
				}
				// 详情展示
				.list{
					border-radius: 10rpx;
					box-sizing: border-box;
					padding-top: 38rpx;
					padding-left: 39rpx;
					padding-right: 39rpx;
					padding-bottom: 38rpx;
					margin-top: 30rpx;
					background-color: #FFFFFF;
					.li_head{
						display: flex;
						align-items: center;
						justify-content: flex-start;
					}
					.li_item{
						margin-top: 33rpx;
						width: 100%;
						display: flex;
						justify-content: flex-start;
						align-items: flex-start;
						.le{
							width: 200rpx;
							height: 164rpx;
							margin-right: 20rpx;
							image{
								width: 100%;
								height: 100%;
							}
						}
						.ri{
							.ri_tit{
								font-size: 30rpx;
								margin-bottom: 10rpx;
							}
							.desc{
								font-size: 27rpx;
								color: #919191;
								margin-bottom: 6rpx;
							}
							.price{
								.now_price{
									font-size: 34rpx;
									color: #ff5239;
								}
								.del{
									margin:0 10rpx ;
									font-size: 20rpx;
									text-decoration:line-through;
									color: #aeaeae;
								}
								.discount{
									font-size: 20rpx;
									padding-top: 10rpx;
									padding-left: 10rpx;
									padding-right: 10rpx;
									padding-bottom: 10rpx;
									background-color: #fff3f3;
									color: #ea6159;
									border-radius: 10rpx;
								}
							}
						}
					}
				}
				// 商户相册
				.photo{
					box-sizing: border-box;
					padding-top: 38rpx;
					padding-left: 39rpx;
					padding-right: 39rpx;
					padding-bottom: 38rpx;
					margin-top: 20rpx;
					border-radius: 10rpx;
					width: 100%;
					// height: 300rpx;
					background-color: white;
					// 商户相册头部
					.photo_tit{
						display: flex;
						align-items: center;
						justify-content: flex-start;
						margin-bottom: 20rpx;
					}
					// 相片展示
					.first_img{
						width: 100%;
						height: 310rpx;
						margin-bottom: 20rpx;
						border-radius: 20rpx;
						overflow: hidden;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.photo_btm_img{
						display: flex;
						justify-content: space-between;
						align-items: flex-start;
						width: 100%;
						height: 157rpx;
						.photo_item{
							width: 30%;
							height: 100%;
							border-radius: 20rpx;
							overflow: hidden;
							image{
								width: 100%;
								height: 100%;
							}
						}
					}
				}
				// 使用说明
				.use_msg{
					box-sizing: border-box;
					padding-top: 38rpx;
					padding-left: 39rpx;
					padding-right: 39rpx;
					padding-bottom: 38rpx;
					margin-top: 20rpx;
					border-radius: 10rpx;
					width: 100%;
					height: 300rpx;
					background-color: white;
					.use_tit{
						display: flex;
						align-items: center;
						justify-content: flex-start;
					}
				}
			}
		}
		// 底部的回去优惠按钮
		.btn{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 140rpx;
			background-color: white;
			display: flex;
			justify-content: center;
			align-items: center;
			.get_code{
				width: 90%;
				height: 96rpx;
				line-height: 96rpx;
				margin: auto;
				background-color: $bg-color;
				color: white;
				border-radius: 50rpx;
				text-align: center;
			}
		}
	}
	
	
</style>

<template>
	<view class="liveStreaming">
		<!-- 自定义头部导航 -->
		<view class="navigationBar">
			<!-- 分类 -->
			<view class="classify dis_flex_center item_center">
				<!-- 返回按钮 -->
				<view class="back" @click="back">
					<image src="/static/back.png" mode=""></image>
				</view>
				<!-- 三条横线 -->
				<view class="line">
					<image src="/static/huilife/more.png" mode=""></image>
				</view>
				
				<view class="item"
					v-for="(item,index) in classifyData "
					:key="index"
					@click="changeAct(index)"
					>
					<!-- 名称 -->
					<view class="name f_17"
						:class="act ===index ? 'act' : '' "
						>
						{{item}}
					</view>
					<!-- 底部线 -->
					<view :class="act ===index ? 'act_border' : '' "></view>
				</view>
			</view>
		</view>
		<view class="head">
			<!-- 商品图片 -->
			<view class="goods_img box_size">
        <image :src="detail.albumPics" mode=""></image>
      </view>
			<!-- 价格，剩余，倒计时 -->
			<view class="msg f_14 box_size" style="font-weight: 600;">
				商城特卖
			</view>
			<!-- 价格 -->
			<view class="price box_size dis_flex_between item_center" >
				<view class="le dis_flex_center item_center">
					<view class="f_18">￥999</view>
					<view style="margin-left: 12rpx;text-decoration: line-through;" class="f_13 c_6D7278">￥33</view>
				</view>
				
				<!-- <view class="ri dis_flex_center item_center">
					<view style="margin-right: 6rpx;display: inline-block;" class="f_12 c_FF3B30">赚{{detail.secondMoney}}元</view>
					<view class="img_box">
						<image src="/static/fenxiang.png" mode=""></image>
					</view>
				</view> -->
				
			</view>
			<!-- 商品名称 -->
			<view class="goods_name box_size">
				<view class="name f_16 f_w_bold">商品名称</view>
				<view class="features dis_flex_between item_center">
					<view class="le dis_flex_between ">
						<text class="c_6D7278 f_13">好物推荐</text>
						<text style="margin-left: 10rpx;margin-right: 22rpx;" class="c_6D7278 f_13">{{detail.subTitle}}</text>
						<image src="/static/huilife/remai%20(1).png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 配送 -->
		<view class="peisong dis_flex_start item_center box_size">
			<text class="f_13 c_6D7278">配送:</text>
			<view class="pei1 dis_flex_start item_center">
				<image src="/static/huilife/tongchengprisong.png" mode=""></image>
				<text class="f_10">同城配送</text>
			</view>
			<view class="pei2 dis_flex_start item_center">
				<image src="/static/huilife/mianyunfei.png" mode=""></image>
				<text class="f_10">快递免运费</text>
			</view>
		</view>
		<!-- 活动文字 -->
		<!-- <view class="huodong dis_flex_start item_center">
			<view class="item f_11 text_center box_size"
				v-for="(item,index) in [1,2,3] "
				:key="index"
				>
				<view class="bg"></view>
				活动文字
			</view>
		</view> -->
		<!-- 选择个数 -->
		<view class="chooseNum dis_flex_between ">
			<view class="le dis_flex_between item_center">
				<view class="f_13 c_6D7278">选择</view>
				<view class="le_center f_13">
					<text>个数 类型</text>
				</view>
				<view class="le_type text_center f_9">共三种类型可选</view>
			</view>
			<view class="ri">
				<image src="/static/huilife/arrow.png" mode=""></image>
			</view>
		</view>
		<!-- 评价 -->
		
		<view class="comments box_size">
			<view class="c_6D7278 comments_head dis_flex_between item_center">
				<view class="le f_13 ">
					评论(34)
				</view>
				<view class="ri dis_flex_center item_center">
					<text class="f_13" style="margin-right: 14rpx;">好评率97%</text>
					<image src="/static/huilife/arrow.png" mode=""></image>
				</view>
			</view>
			
			<view class="comments_list"
				v-for="(item,index) in [1,2] "
				:key="index"
				>
				<view class="comments_list_item">
					<view class="comments_list_head dis_flex_between item_center">
							<view class="le dis_flex_start item_center">
								<view class="commenter ios_cri">
									
								</view>
								<view class="c_6D7278 f_11">莉莉</view>
							</view>
							<view class="ri c_6D7278 f_11">
								2020.05.23
							</view>
						</view>
						<view class="comments_list_cont box_size">
							<uni-rate :touchable="false" :size="10" :value="4" @change="onChange" />
							<view class="f_11 c_6D7278">
								很推荐，挺好吃的，有点辣
							</view>
						</view>
					
				</view>
			</view>
			
		</view>
		
		<!-- 商品详情 -->
		<view class="goods_detail_list box_size">
			<view class="goods_detail_list_title f_13 c_6D7278">商品详情</view>
			<view class="goods_detail_list">
        <rich-text :nodes="detail.detailDesc"></rich-text>
			</view>
		</view>
		<!-- 底部购物车 -->
		<view class="btm_cart box_size dis_flex_center item_center">
			<!-- <view class="cart_img">
				<image src="/static/mall/gouwuche.png" mode=""></image>
			</view> -->
			<view class="ri dis_flex_center item_center f_16 text_center">
				<!-- <view class="ri1 text_center" @click="goodsType">
					加入购物车
				</view> -->
				<view class="ri2" @click="pay"> 
					立即购买
				</view>
			</view>
		</view>
		
		<!-- 选择商品规格 -->
		<uni-popup ref="popupGoodstype" type="share">
			<uni-popup-goodstype title="投票" @rankPopup="rankPopup" @recharge="recharge" @select="selectgift">
			</uni-popup-goodstype>
		</uni-popup>
	
	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	export default {
		data() {
			return {
				classifyData:[
					'商品',
					'评价',
					'详情'
				],
				act:1,
				// 评论星星
				value: 2,
				count: 4,
        detail:{},
        goodsId:undefined,
        skuList:[]
			};
		},
    onLoad(options) {
      this.goodsId = options.goodsId
      // this.goodsDetail()
    },
		components: {
			uniRate,
			
			// uniPopup,
			// uniPopupMessage,
			// uniPopupDialog,
			// uniPopupGoodstype,
		},
		methods:{
			// 点击导航栏部分的 返回按钮，返回上一页
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			
			// 立即购买进行支付
			pay(){
				uni.navigateTo({
					url:'/pages/huiLife/pay'
				})
			},
			
			changeAct(index){
				this.act = index
			},
			// 选择商品规格
			goodsType(){
				this.$refs.popupGoodstype.open()
			},
      goodsDetail(){
        //this.goodsId = 1318484525134704641
        getGoodsById({id:this.goodsId}).then(res =>{
          let detail= res.data.result
          console.log("获取商品详情")
          console.log(detail)
          detail.albumPics=res.config.baseURL+'/world-mall/'+detail.albumPics
          this.detail=detail
          this.skuList = detail.skuList
        }).catch(err => {
          	console.log('获取商品信息 get fail----');
          	console.log(err);
          });
      }
		}
	}
</script>

<style>
	page{
		background-color: #F5F5F9;
	}
</style>

<style lang="scss">
	image{
		width: 100%;
		height: 100%;
	}
	.liveStreaming{
		margin-bottom: 108rpx;
		.navigationBar{
			padding: 78rpx 0rpx 14rpx 20rpx;
			position: relative;
			background-color: #FFFFFF;
			position: sticky;
			top: 0;
			z-index: 10;
			.classify{
				position: relative;
				.back{
					width: 33rpx;
					height: 34rpx;
					position: absolute;
					left: 0rpx;
					top: 8rpx;
				}
				.line{
					width: 47rpx;
					height: 47rpx;
					position: absolute;
					left: 104rpx;
					top: 2rpx;
				}
				.item{
					position: relative;
					.act{
						color: #358D4D;
					}
					.act_border{
						position: absolute;
						width: 40rpx;
						height: 4rpx;
						background-color: #358D4D;
						bottom: -5rpx;
						left: 50%;
						transform: translateX(-50%);
					}
				}
				 .item:nth-child(4){
					margin-left: 64rpx;
				}
				 .item:nth-child(5){
					margin-left: 64rpx;
				}
			}
		}
		.head{
			height: 714rpx;
			background-color: #FFFFFF;
			.goods_img{
				height: 490rpx;
				background-color: red;
			}
			.msg{
				padding: 14rpx 26rpx 0rpx 20rpx;
				height: 74rpx;
				background: #FCEEE9;	
				color: #EA6636;
			}
			.price{
				padding: 0rpx 40rpx 2rpx 22rpx;
				.le{
					
				}
				.ri{
					.img_box{
						width: 26rpx;
						height: 26rpx;
					}
				}
			}
			.goods_name{
				padding: 0rpx 28rpx 26rpx 20rpx;
				.name{
					width: 702rpx;
					height: 44rpx;
					font-weight: 500;
					color: #333333;
					line-height: 44rpx;
				}
				.features{
					margin-top: 8rpx;
					.le{
						image{
							width: 76rpx;
							height: 32rpx;
						}
					}
					.ri{
						.share_box{
							margin-left: 6rpx;
							width: 26rpx;
							height: 26rpx;
						}
					}
				}
			}
		}
		.peisong{
			margin: 14rpx 0rpx;
			background-color: #FFFFFF;
			padding: 10rpx 0rpx 12rpx 20rpx;
			.pei1{
				image{
					width: 32rpx;
					height: 24rpx;
				}
				color: #276A39;
				margin-left: 42rpx;
			}
			.pei2{
				image{
					width: 32rpx;
					height: 24rpx;
				}
				color: #276A39;
				margin-left: 68rpx;
			}
		}
		.huodong{
			padding: 22rpx 0rpx 22rpx 32rpx;
			position: relative;
			background-color: #FFFFFF;
			height: 74rpx;
			.item{
				width: 110rpx;
				line-height: 38rpx;
				color: #E8541E;
				margin-right: 40rpx;
				.bg{
					position: absolute;
					width: 110rpx;
					height: 38rpx;
					background: #E95A27;
					border-radius: 4rpx;
					opacity: 0.1;
				}
			}
		}
		.chooseNum{
			height: 66rpx;
			padding: 14rpx 20rpx 18rpx 20rpx;
			background-color: #FFFFFF;
			margin-top: 14rpx;
			.le{
				.le_center{
					margin-left: 30rpx;
					margin-right: 40rpx;
				}
				.le_type{
					height: 40rpx;
					width: 138rpx;
					margin-left: 52rpx;
					line-height: 40rpx;
					background: #F2F5F8;
					border-radius: 4rpx;
				}
			}
			.ri{
				width: 16rpx;
				height: 18rpx;
			}
		}
		.comments{
			padding: 8rpx 20rpx 0rpx 22rpx;
			margin-top: 12rpx;
			background-color: #FFFFFF;
			.comments_head{
				.ri{
					image{
						width: 16rpx;
						height: 18rpx;
					}
				}
			}
			
			.comments_list{
				height: 198rpx;
				border-bottom: 1rpx solid #E7ECF1;
				margin-top: 26rpx;
				.comments_list_head{
					.le{
						.commenter{
							margin-right: 18rpx;
							width: 52rpx;
							height: 52rpx;
							border-radius: 50%;
							background-color: red;
						}
					}
				}
				.comments_list_cont{
					padding-left: 35px;
				}
			}
		}
		.goods_detail_list{
			padding: 6rpx 20rpx 0rpx 20rpx;
			background-color: #FFFFFF;
			.goods_detail_list_title{
				margin-top: 12rpx;
				margin-bottom: 16rpx;
			}
			.goods_detail_list{
				background-color: #F1F8FF;
				border-radius: 4rpx;
				height: 352rpx;
				margin-top: 14rpx;
			}
		}
		.btm_cart{
			background-color: white;
			position: fixed;
			left: 0rpx;
			right: 0rpx;
			bottom: 0rpx;
			// padding: 10rpx 14rpx 20rpx 62rpx;
			height: 98rpx;
			.cart_img{
				width: 52rpx;
				height: 52rpx;
			}
			.ri{
				color: #FFFFFF;
				width: 560rpx;
				line-height: 74rpx;
				border-radius: 10rpx;
				.ri1{
					width: 280rpx;
					line-height: 74rpx;
					background-color: #C5E7CE;
					border-radius:10rpx 0rpx 0rpx 10rpx;
					color: #276A39;
				}
				.ri2{
					color: #FFFFFF;
					width: 100%;
					line-height: 74rpx;
					// background: linear-gradient(165deg, #42BB6A 0%, #3FB866 9%, #199039 100%);
					background-color: $bg-color;
					border-radius: 10rpx;
				}
			}
		}
	}
</style>


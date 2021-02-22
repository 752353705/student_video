<template>
	<view class="classify">
		<view class="head ">
			<view class="head_fir dis_flex_between item_center">
				<view class="le dis_flex_start item_center">
					<view class="location_img"><image src="/static/huilife/weizhi%20.png" mode=""></image></view>
					<view class="location">保定</view>
				</view>
				<view class="ri dis_flex_start item_center">
					<view class="search_box"><image src="/static/huilife/search.png" mode=""></image></view>
					<input type="text" value="" placeholder="KTV" />
				</view>
			</view>
			<!-- 分类 -->
			<view class="classify dis_flex_center item_center">
				<view class="classify_item dis_flex_start item_center"
					v-for="(item,index) in head_data "
					:key="index"
					>
					<view class="f_12 c_6D7278">{{item}}</view>
					<view class="triangle"></view>
				</view>
			</view>
		</view>
		<view class="classify_body">
			<view class="item"
			@click="jumpDetail"
				v-for="(item,index) in [1,2,3] "
				:key='index'
				>
				<view class="item_head dis_flex_between item_start">
					<view class="center">
						<view class="tit f_13 f_w_bold">时光真人密室逃脱</view>
						<view style="margin-top: 14rpx;" class="dis_flex_start item_center">
							<uni-rate :touchable="false" :size="10" :value="4" @change="onChange" />
							<text style="margin-left: 22rpx;" class="f_11">￥163/人</text>
						</view>
						<view class="type f_11 dis_flex_between item_center">
							<view class="">河北农大 | 密室逃脱</view>
							<view class="">450m</view>
						</view>
						<view class="xiaofei f_11 text_center ma_t10">
							半年消费3048
						</view>
					</view>
					<view class="le">
						
					</view>
				</view>
				<!-- 团 -->
				<view class="di dis_flex_between item_center">
					<view class="le dis_flex_start item_center">
						<view class="tit text_center f_13">团</view>
						<view  class="c_6D7278 f_11">
							<text style="color: #FA6400;">149</text>元
							<text 
								style="text-decoration: line-through;margin: 0rpx 18rpx;"
								>
								198元
							</text>
						</view>
						<!-- <view class="f_11">
								某某主题单人票
						</view> -->
					</view>
					<!-- <image class="ri " src="/static/huilife/arrow.png" mode=""></image> -->
				</view>
				<view class="more text_center f_11">
					查看更多优惠项目
					<image src="/static/huilife/arrow.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniRate from '@/components/uni-rate/uni-rate.vue'
export default {
	data() {
		return {
			// 头部类型
			head_data:[
				'附近',
				'精选',
				'智能排序',
				'筛选'
			],
			sort:undefined,
			baseURL:'',
			merchantDataList:[]
		};
	},
	components:{
		uniRate
	},
	onLoad(options) {
		// this.sort = options.id
		// this.listData()
	},
	methods: {
		// 跳转到娱乐部分的商家详情
		jumpDetail(){
			uni.navigateTo({
				url:'/pages/huiLife/recreationDetail'
			})
		},
		listData(){
			getMerchantBySortId(this.sort).then(res=>{
				console.log('获取商户成功')
				console.log(res)
				this.baseURL = res.config.baseURL+"/world-mall/"
				this.merchantDataList = res.data.result.records
			}).catch(err=>{
				console.log('获取商户失败')
				console.error(err)
			})
		},
		goInfoPage(item){
			uni.navigateTo({
				url:'yuleMsg?data='+JSON.stringify(item)
			})
		}
	}
};
</script>

<style>
page {
	background-color: #F5F5F9;
}
</style>

<style lang="scss" scoped>
image {
	width: 100%;
	height: 100%;
}
.classify {
	box-sizing: border-box;
	.head {
		position: sticky;
		top: 0rpx;
		padding: 0rpx 20rpx 22rpx 22rpx;
		background-color: #ffffff;
		.head_fir{
			.le {
				.location_img {
					width: 38rpx;
					height: 46rpx;
				}
				.location {
					margin-left: 8rpx;
				}
			}
			.ri {
				width: 584rpx;
				height: 66rpx;
				background-color: #f2f5f8;
				border-radius: 8rpx;
				box-sizing: border-box;
				padding-left: 20rpx;
				.search_box {
					width: 50rpx;
					height: 46rpx;
					margin-right: 6rpx;
				}
			}
		}
		.classify{
			padding: 18rpx 36rpx 0rpx 0rpx;
			.classify_item{
				margin-right: 73rpx;
				.triangle{
					margin-left: 14rpx;
					border-left: 5px solid transparent;
					border-right: 5px solid transparent;
					border-top: 5px solid #D8D8D8;
				}
			}
			.classify_item:last-child{
				margin-right: 0rpx;
			}
		}
	}
	.classify_body {
		margin: 20rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		.item {
			padding: 18rpx 24rpx 24rpx 24rpx;
			border-bottom: 2rpx solid #E7ECF1;
			.item_head{
				.le{
					width: 184rpx;
					height: 184rpx;
					background-color: #F1F8FF;
					border-radius: 2rpx;
				}
				.center{
					.tit{
						width: 388rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.type{
						margin-top: 24rpx;
					}
					.xiaofei{
						width: 164rpx;
						height: 36rpx;
						background: #FCEFEA;
						color: #FA7358;
					}
				}
			}
			.di{
				margin-top: 14rpx;
				.tit{
					width: 40rpx;
					line-height: 40rpx;
					background-color: #FEDBCF;
					color: #FA6400;
					margin-right: 16rpx;
				}
				.ri{
					width: 14rpx;
					height: 22rpx;
				}
			}
			.more{
				margin-top: 33rpx;
				color: #8F969D;
				image{
					margin-left: 14rpx;
					width: 14rpx;
					height: 14rpx;
				}
			}
		}
		.item:last-child{
			border: none;
		}
	}
}
</style>

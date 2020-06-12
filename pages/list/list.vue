<template>
	<view>
		<!--index.wxml-->
		<view class="head">
		  <image  @click="open" src="../../static/head.png"></image>
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
			
			<!-- 参赛列表 -->
			  <view class="list">
					<!-- 在进行跳转时 携带用户 id -->
			    <view 
						class="list_item" 
						v-for="(item,index) in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
						:key="index"
						@click="jumpFind"
					>
			      <view class="item_head">
			        <view class="user_img">
			          
			        </view>
			        <view class="msg">
			          <view>
			            沈博然
			          </view>
			          <view>
			            ID:1324654879
			          </view>
			        </view>
			      </view>
			      <view class="item_body">
			        <!-- 图片-->
			      </view>
			      <view class="item_foot">
							<view class="icon">
								<image src="../../static/see.png" mode=""></image>
							</view>
			        <view>
			          248133
			        </view>
							<view class="icon">
								<image src="../../static/my_vote.png" mode=""></image>
							</view>
			        <view>
			          123456
			        </view>
			      </view>
			    </view>
			  </view>	
		
		</view>
		
		
		
		<!-- 上传作品弹出层 -->
		<!-- <uploading></uploading> -->
		<uni-popup class="pop" animation="false" ref="popup" type="center" mask-click="false">
			<uni-popup-message type="success" pop_type="game" message="成功消息" duration="0" />
			<view class="imgBox">
				<image class="img" src="../../static/close.png" mode="" @click="close"></image>
			</view>
		</uni-popup>
		
		<!-- 底部自定义tabber -->
		<tabbar :active="i_active"></tabbar>
	</view>
</template>

<script>
	import tabbar from '../../components/tabbar.vue'
	import uniPopup from '../../components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '../../components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '../../components/uni-popup/uni-popup-dialog.vue'
	export default {
		data() {
			return {
				sum:[
					{id:'0',name:'参赛人数',num:1020,src:'../../static/people.png'},
					{id:'1',name:'总投票数',num:27890,src:'../../static/sum.png'},
					{id:'2',name:'总访问量',num:76587,src:'../../static/accessNum.png'}
				],
				i_active: 0,
			}
		},
		components:{
			tabbar,
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		onLoad() {
			console.log('首页')
			// this.$refs.popup.open()
			
			// 显示正在加载弹窗
			// uni.showLoading({
			//    title: '加载中'
			// });
			
			// // 关闭弹窗
			// setTimeout(function () {
			//     uni.hideLoading();
			// }, 2000);
		},
		onPullDownRefresh(){
			console.log('下拉刷新')
		},
		onReachBottom() {
			console.log('上拉 触底 加载') //分页 请求数据
			
		},
		methods: {
			// 点击列表中每一项，进行跳转到搜索作品页
			jumpFind(e){
				// 根据点击的id进行跳转到个人页面
				uni.navigateTo({
					url: "/pages/find/find"
				});
			},
			
			// 控制弹出框
			open(){
				this.$refs.popup.open()
			},
			
			close(){
				this.$refs.popup.close()
			}
			
			// 触底 分页请求 选手数据
			
		}
	}
</script>

<style  scoped lang="less">
	
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
	  background-color:#0d0737;
	  width: 100%;
	  box-sizing: border-box;
	  padding: 37.5rpx;
	  padding-top: 20rpx;
		padding-bottom: 100rpx;
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
	  .list{
	    display: flex;
	    justify-content: space-between;
	    flex-wrap: wrap;
	    .list_item{
	      width: 322rpx;
	      height: 420rpx;
	      background-color: #2f1b8e;
	      margin-bottom: 20rpx;
	      border-radius: 42rpx;
	      .item_head{
	        width: 100%;
	        height: 60rpx;
	        margin-top: 20rpx;
	        margin-bottom: 10rpx;
	        display: flex;
	        justify-content: start;
	        box-sizing: border-box;
	        padding-left: 20rpx;
	        font-size: 20rpx;
	        color: #bebbc4;
	        .user_img{
	          width: 60rpx;
	          height: 60rpx;
	          background-color: white;
	          border-radius: 50%;
	        }
	        .msg{
	          margin-left: 15rpx;
	        }
	      }
	      .item_body{
	        width: 100%;
	        height: 260rpx;
	        background-color: yellow;
	      }
	      .item_foot{
	        width: 100%;
	        height: 50rpx;
	        display: flex;
	        justify-content: space-evenly;
	        align-items: center;
	        margin-top: 15rpx;
	        color: #bebbc4;
	        font-size: 24rpx;
					.icon{
						width: 30rpx;
						height: 26rpx;
						image{
							width: 100%;
							height: 100%;
						}
					}
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


</style>

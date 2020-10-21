<template>
	<view class="csp">
			
		<!-- 数据渲染区 -->
		<view class="cont">
			<!-- 当前无消费记录 -->
			<block v-if="hisList.length == 0" >
				<image class="empty" src="../../static/dingdan.png" mode=""></image>
			</block>
			<!-- 当前有消费记录 -->
			<view class="item" v-else v-for="(item,index) in hisList"
				:key="index"
				>
				<view class="left">
					<!-- <view class="name">{{item.getRoute}}</view> -->
					<view class="time">{{item.createTime}}</view>
				</view>
				<view class="right">
					+{{time.changetime(item.money,100)}}元
					<!-- +{{item.money}}元 -->
				</view>
			</view>
		</view>
	</view>
</template>

<script module="time" lang="wxs">
	// 控制 二级评论 的时间格式 
	function changetime(arg1, arg2){
		var t1 = 0,
			t2 = 0,
			r1, r2;
			
			console.log('11',arg1.toString().split("."))
			
			// t1 = arg1.toString().split(".")[1].length
			// t2 = arg2.toString().split(".")[1].length
		r1 = Number(arg1.toString().replace(".", ""));
		r2 = Number(arg2.toString().replace(".", ""));
		return (r1 / r2) * Math.pow(10, t2 - t1);
	}
	
	module.exports = {
		changetime: changetime,
	}
</script>



<script>
	// 引入tabHead 切换
	export default{
		data(){
			return {
				hisList:[],
				// 进行上拉请求加载时
				// 默认第一页进行加载
				pageNum: 1,
				// 判断是否有下一页
				nextpage:false
			}
		},
		components:{

		},
		onLoad() {
			this.getHgold()
		},
		onReachBottom(){
			console.log('上拉加载')
			// 当当前的数据 条数大于十条的时候，下拉到底部 重新请求数据
			if(this.nextpage){
				this.getHgold()
			}
		},
		methods:{
			// 获取 记录 的接口
			getHgold(){
				this.api._get('user/rechargeList',{
					 pageNum:this.pageNum,
					 pageSize:10,
				},(res)=>{
					console.log('获取充值记录的接口')
					this.hisList = this.hisList.concat(res.data.list)
					// 判断返回的 数据条数 用来看是否有下一页
					if (this.hisList.length == 10) {
						this.pageNum++;
						this.nextpage = true
					}else{
						this.nextpage = false
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.csp{
		// 空布局
		.empty {
			width: 200px;
			height: 200px;
			position: absolute;
			top: 36%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
		// 内容样式
		.cont{
			.item{
				box-sizing: border-box;
				margin-left: 40rpx;
				margin-top: 37rpx;
				margin-right: 40rpx;
				padding-bottom: 32rpx;
				border-bottom: 1px solid #e4e4e4;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 100rpx;
				
				.left{
					.name{
						font-size: 35rpx;
					}
					
					.time{
						font-size: 34rpx;
					}
				}
				.right{
					font-size: 37rpx;
				}
				
			}
		}
		.item:last-child{
			border-bottom: 1px solid white;
		}
	}	
</style>

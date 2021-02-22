<template>
	<view class="csp">
		<!-- 头部 -->
		<swiperTabHead :flex="true" :tabBars="tabBars"
			:tabIndex="tabIndex" @tabtap="tabtap"></swiperTabHead>
		
		<!-- 数据渲染区 -->
		<view  class="cont">
			<!-- 当前无消费记录 -->
			<block v-if="hisList.length == 0" >
				<image class="empty" src="/static/dingdan.png" mode=""></image>
			</block>
			<!-- 当前有消费记录 -->
			<view class="item" v-else v-for="(item,index) in hisList"
				:key="index"
				>
				
				<!-- 获取记录 -->
				<block v-if="item.getRoute">
					<view class="left">
						<view class="name">{{item.getRoute}}</view>
						<view class="time">{{item.createTime}}</view>
					</view>
					<view class="right">
						+{{item.hgoldNumber}} 票
					</view>
				</block>
				
				<!-- 消费记录 -->
				<block v-else>
					<view class="left">
						<view style="font-size: 33rpx;" >{{item.createTime}}</view>
					</view>
					<view class="right">
						 -{{item.goldNumber}}  票
					</view>
				</block>
				
			</view>
		</view>
	</view>
</template>

<script>
	// 引入tabHead 切换
	import swiperTabHead from "@/components/swiper-tab-head.vue";
	export default{
		data(){
			return {
				tabIndex: 0, // 当前tab的下标
				tabBars:[
					{ name:"获取记录",id:"0" },
					{ name:"消费记录",id:"1" },
				], 
				hisList:[],
				// 进行上拉请求加载时
				// 默认第一页进行加载
				g_pageNum: 1,
				d_pageNum: 1,
				// 判断是否有下一页
				nextpage:false
			}
		},
		components:{
			swiperTabHead,
		},
		onLoad() {
			this.getHgold()
		},
		onReachBottom(){
			// 当当前的数据 条数大于十条的时候，下拉到底部 重新请求数据
			if(this.nextpage){
				if(this.tabIndex == 0){
					this.getHgold()
				}else{
					this.delHgold()
				}
			}
		},
		methods:{
			//接受子组件传过来的值点击切换导航
			tabtap(index){
				if(index === this.tabIndex){
					// 防止不必要的请求
					return
				}
				this.tabIndex = index;
				
				// 当用户进行来回的切换时 保证请求的页码还是1
				this.g_pageNum = 1
				this.d_pageNum = 1
				
				// console.log('点击的 id',this.tabBars[this.tabIndex].id)
				// 根据用户点击的 不同的 按钮id 来渲染 不同的数据
				this.hisList = []
				if(this.tabBars[this.tabIndex].id == '0'){
					// 请求获取记录的接口，渲染数据
					this.getHgold()
				}else if(this.tabBars[this.tabIndex].id == '1') {
					// 请求 消费记录的接口 渲染数据
					this.delHgold()
				}
			},
			
			// 获取 记录 的接口
			getHgold(){
				this.http({
					url:'hgold/get/list',
					data:{
						pageNum:this.g_pageNum,
						pageSize:10,
					}
				}).then(res => {
					this.hisList = this.hisList.concat(res.data.list)
					// 判断返回的 数据条数 用来看是否有下一页
					if (res.data.list == 10) {
						this.g_pageNum++;
						this.nextpage = true
					}else{
						this.nextpage = false
					}
				})
			},
			
			//消费记录的接口
			delHgold(){
				// 请求消费记录的接口
				// 目前是充值接口 需要改
				this.http({
					url:'hgold/lose/list',
					data:{
						pageNum:this.d_pageNum,
						pageSize:10,
					}
				}).then(res => {
					this.hisList = this.hisList.concat(res.list)
					// 判断返回的 数据条数 用来看是否有下一页
					if (res.list.length == 10) {
						this.d_pageNum++;
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
						font-size: 25rpx;
						color:#8f8f8f ;
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

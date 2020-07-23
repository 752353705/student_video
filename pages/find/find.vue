<template>
	<view>
		<view class="find">
		  <view class="search">
		    <view class="left">
		    	<input :focus="isfocus" type="text"  
						:value="val" :confirm-type="search"
						placeholder="请搜索" @input="searchVal" 
						@confirm="search"
					/>
		    	<image src="/static/search.png" mode=""></image>
		    </view>
				<view class="searchBtn" @click="search" bindconfirm="testserch">
					搜索
				</view>
		  </view>
			
			<!-- v-if="showHis" -->
			<view class="his_box" v-if="history.length !== 0"> 
				<!-- 历史记录 -->
				<view class="his_head">
					<view class="title">历史记录</view>
					<image @click="cleraHis" src="../../static/trash.png" style="width: 23px;height: 23px;" mode=""></image>
				</view>
				<!-- 循环用户本地储存的搜索记录 -->
				<view class="his_list">
					<view class="his_item" :data-val="item" v-for="(item,index) in  history" :key="index"  @click="search">
						{{item}}
					</view>
				</view>
			</view>
			
			<!-- 显示最近 比较火的 -->
			<view class="hot_title">搜索发现</view>
			<view class="hot_box">
				<view class="hot_cont" v-for="(item,index) in [1,2,3,4,5]" :key="index" :data-val="item" @click="search">
					当前火热的小视频
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	const list = require('../../static/data.json').list;
	export default {
		data() {
			return {
				isfocus:true,
				danmuValue: '',
				//历史记录
				history:[],
				showHis:false,
				val:'',
			};
		},
		components:{

		},
		onLoad(){
			
		},
		onShow() {
			if(!uni.getStorageSync('storHisVal')){
				return
			}
			let history = JSON.parse(uni.getStorageSync('storHisVal'))
			// 页面每次显示都跟新历史记录
			if(history.length !== 0){
				this.history = history
				this.showHis = true
			}
			
		},
		onReady: function(res) {
			
		},
		onHide() {
			// 进行搜索之后清除数据
			this.val = ''
		},
		methods:{
			// 点击垃圾箱，清除历史记录
			cleraHis(){
				uni.removeStorageSync('storHisVal');
				this.history = []
			},
			searchVal(e){
				this.val = e.detail.value;  
			},
			// 向后台传递搜索的关键词
			// 用户点击小键盘上的 回车按钮 也会触发
			search(e){
				let _this = this
				console.log('进行搜索记录 ',this.val !== '' && this.val.trim())
				//判断是点击历史记录来进行搜索的还是通过输入来进行的
				if(e.target.dataset.val){
					console.log('点击的历史记录',e.target.dataset.val)
					// 进行页面的挑战 传递参数
					uni.navigateTo({
						url:`/pages/findList/findList?kw=${e.target.dataset.val}`
					})
					
					
				}else if(this.val !== '' && this.val.trim()){
					// if(this.val === '' || !this.val.trim()) return
					
					console.log('点击的搜索按钮',this.val)
					// 点击的搜索按钮
					
					// 搜索成功之后将搜索记录放到本地存储中
					this.history.push(this.val)
					// 对历史记录中进行去重
					this.history = [...new Set(this.history)]
					uni.setStorage({
						key:'storHisVal',
						data:JSON.stringify(_this.history),
						success:function(){
							console.log('存储成功')
						}
					})
					
					// 进行页面的挑战 传递参数
					uni.navigateTo({
						url:"/pages/findList/findList"
					})
					
				}
			},
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
.find{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	box-sizing: border-box;
	padding: 33rpx 30rpx 0;
	.search{
		color: black;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 19rpx;
		.left{
			background-color:#f5f5f5 ;
			border-radius: 20rpx;
			width: 85%;
			input{
				width: 89%;
				height: 70rpx;
				display: inline-block;
			}
			image{
				width: 40rpx;
				height:40rpx ;
				float: left;
				transform: translateY(45%);
				margin-right: 12rpx;
				margin-left: 10rpx;
			}
		}
		
		.searchBtn{
			color: black;
			margin-right: 20rpx;
		}
	}
	
	.his_box{
		width: 100%;
		color: black;
		.his_head{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.title{
				font-size: 30rpx;
				font-weight: bolder;
				margin-bottom: 20rpx;
				margin-top: 20rpx;
			}
		}
		
		
		.his_list{
			display: flex;
			align-items: center;
			justify-content: flex-start;
			flex-wrap: wrap;
			margin-bottom: 20rpx;
			.his_item{
				padding: 9rpx;
				border-radius: 20rpx;
				border: 1rpx solid #f6f6f6;
			}
		}
	}
	
	
	.hot_title{
		font-size: 30rpx;
		font-weight: bolder;
		margin-bottom: 20rpx;
	}
	.hot_box{
		display: flex;
		flex-wrap: wrap;
		.hot_cont{
			width: 49%;
			margin-bottom: 20rpx;
			color: black;
		}
	}
}
</style>

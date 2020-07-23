<template>
	<view>
		<!-- 搜索框 -->
		<view class="index-search-box">
			<navigator class="index-search" hover-class="none" openType="navigate" url="/packageA/pages/search/index">
				<view class="index-cont-search t-c">
					<icon size="15" class="text-center" type="search"></icon>
					<text>搜索商品</text>
				</view>
			</navigator>
		</view>
		<!-- 分类样式：二级分类 20 -->
		<view class="content" v-if="list.length > 0 ">
		
			<!-- 左侧 一级分类 -->
			<scroll-view class="left_scroll" scroll-y=true>
				<view class="type-nav" v-for="(item,index) in list" :key="item.id" 
					:class=" curNav == index ? 'act' : ' ' " 
					@click="changeNav(index)"
				>
					{{ item.name }}
				</view>
			</scroll-view>
		
			<!-- 右侧 二级分类 -->
			<scroll-view class="right_scroll"  scroll-y="true" >
				<view class="shop_item"  v-for=" (item,index) in shopList  " :key="index">
					<!-- 每一项商品 -->
					<navigator>
						<view class="img" >
							<image src="https://quanres.hanhoukeji.com/2019111515231019eb04623.jpg-150X150"></image>
						</view>
						<text>保温杯</text>
					</navigator>
				</view>
			</scroll-view>
		</view>
	
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 模拟右侧的商品分类
				list:[
					{id:0,name:"女装"},
					{id:1,name:"男装"},
					{id:2,name:"数码家电"},
					{id:3,name:"美妆个护"},
					{id:4,name:"食品"},
				],
				// 右侧商品详细数据
				shopList:[
					{id:0,name:"女装"},
					{id:1,name:"男装"},
					{id:2,name:"数码家电"},
					{id:3,name:"美妆个护"},
				],
				// 当前选中的类别
				curNav:0,//默认第一项为选中项
				
				
			};
		},
		methods:{
			// 判断当前点击目标
			changeNav(index){
				this.curNav = index
			}
		}
	}
</script>

<style lang="less">
/* 搜索框 */
.index-search-box {
  padding: 13rpx 13rpx 18rpx 13rpx;
	.index-search {
	  border-bottom: 0;
	  background: #f7f7f7;
	  border-radius: 50rpx;
	  overflow: hidden;
	  position: relative;
	  font-size: 28rpx;
	  color: #4a4a4a;
	  box-sizing: border-box;
	  line-height: 64rpx;
		text-align: center;
		
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
}


// tab 切换区域
.content{
	display: flex;
	
	
	// 左侧一级分类
	.left_scroll{
		width: 154rpx;
		height: 840rpx;
		background-color: #F7F7F7;
		
		// 每一项选择按钮的大小
		.type-nav{
			width: 154rpx;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
		}
		// 当前选中的
		.act{
			background: #fff;
			color: #ff495e;
			border-right: none;
			font-size: 28rpx;
		}
	}
	
	// 右侧二级分类
	.right_scroll{
		height: 920rpx;
		.shop_item{
			float: left;
			height: 231rpx;
			width: 195rpx;
			text-align: center;
			.img{
				padding: 13rpx 10rpx 4rpx 10rpx;
				image{
					width: 100%;
					height: 150rpx;
				}
			}
			
		}
	}
	
	
	
	
}



</style>

<template>
	<view class="listPage">
		<!-- 搜索框 -->
		<view class="searchBox height">
			<view class="serach " @click="goSearch">
				<u-icon size="40" name="search"></u-icon>
				<span>搜索</span>
			</view>
		</view>
		<!-- 文化分类 -->
		<swiperTabHead class=" height" ref="swipertab" 
			:tabBars="tabBars" :tabIndex="tabIndex" 
			@tabtap="tabtap" :top="top"
			:flex="flex"
			>
		</swiperTabHead>
		<!-- 小喇叭 进行通知 -->
		<!-- <u-notice-bar style="margin-top:-19px ;" color="#ff9900" class=" height" :flex="true" mode="horizontal" :is-circular="true" :list="notice"></u-notice-bar> -->
		
		<swiper :style="{height:mescroll_height}"  :current="tabIndex" @change="tabChange">
			<swiper-item :emptyOption="emptyOption" 
				style="box-sizing: border-box;padding: 0 10rpx;" 
				v-for="(tab,i) in tabBars" :key="i"
				>
				<mescroll-item 
					:kw="kw" :waterFullHeight="mescroll_height" 
					:i="i" :index="tabIndex" 
					:listData="listData" @getData="getNews"
				>
				</mescroll-item>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	// 引入mescroll-mixins.js
	import MescrollItem from "@/components/mescroll-swiper-item.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollEmpty from '@/components/mescroll-uni/components/mescroll-empty.vue';
	import MescrollMoreItemMixin from '@/components/mescroll-uni/mixins/mescroll-more-item.js';
	// 引入tabHead 切换
	import swiperTabHead from "@/components/swiper-tab-head.vue";
	export default {
		mixins: [MescrollMixin,MescrollMoreItemMixin], // 使用mixin
		data() {
			return {
				// tabHead 是否开启flex 布局
				flex:false,
				kw:"baoding",
				listData:[],
				// 小喇叭提示
				notice:[
					'寒雨连江夜入吴',
					'平明送客楚山孤',
					'洛阳亲友如相问',
					'一片冰心在玉壶'
				],
				// 空布局时自定义提示
				emptyOption:{
					tip:'list空布局提示'
				},
				top:"142rpx",
				// 参赛选手列表
				goods:[],
				height:0,
				// 控制滚动区域的高度
				phoneHeight:'',
				mescroll_height:'',
				
				//控制nav切换
				tabIndex:0,// 选中的
				tabBars:[
					{ name:"保定文化",id:"baoding" },
					{ name:"校园文化",id:"nongda" },
				], 
				// 请求获取的 数据
				listData:[],
			}
		},
		components:{
			MescrollEmpty,
			MescrollItem,
			swiperTabHead,
		},
		onLoad() {
			// 请求头部展示的 内容分类
			if( this.tabBars.length < 6 ) {
				// 开启弹性布局
				this.flex = true
			}else {
				this.flex = false
			}
			let _this = this 
			// 设置滚动区域的高度
			uni.getSystemInfo({
				success(res) {
					// console.log('res',res)
					_this.phoneHeight = res.windowHeight; //获取用户设备的高度
					// 计算组件的高度
					let view = uni.createSelectorQuery().selectAll('.height');
					view.boundingClientRect(data => {
						// 计算上方各元素的高度总和
						data.forEach((item,index) => {
							// console.log('item',item.height)
							_this.height += parseInt(item.height)
						})
							_this.mescroll_height =  _this.phoneHeight - _this.height ;
							_this.mescroll_height =  _this.mescroll_height +"px";
					}).exec();
				}
			}); 
		},
		onReady() {
			// 页面加载完毕
			// console.log('页面加载完毕')
		},
		methods: {
			// 获取农大的文化信息
			getNews(msg,callback) {
				this.http({
					url:`news/list?newsType=${this.kw}`,
					data:{
						pageNum: msg.pageNum,
						pageSize: 10
					},
				}).then(res => {
					this.listData = res.data;
					// console.log('获取文化版块的文章 this.listData',this.listData)
					// 对作品列表进行操作，添加一个参数
					// 用于 检测 其 图片在页面中是否完全加载出来
					this.listData.forEach((item) => {
						item.imgState = false
					})
					// console.log('获取文化版块的文章 this.listData',this.listData)
					callback(1)
				}).catch(err => {
					callback(1)
				})
			},
			//滑动切换导航
			tabChange(e){
			  this.tabIndex = e.detail.current
				// 当 tabIndex 到 4  的时候触发 swiper 的滚动效果
				// 触发 滚动头部 到左侧的距离
				this.$refs.swipertab.changeLeft(this.tabIndex)
				// console.log('滚动内容区域 tabIndex ==》',this.tabIndex)
				this.kw = this.tabBars[this.tabIndex].id
				// 重新渲染文化信息
				this.getNews(1,()=>{})
			},
			//接受子组件传过来的值点击切换导航
			tabtap(index){
				// console.log('点击 tabIndex ==》',this.tabIndex)
				this.tabIndex = index;
				this.kw = this.tabBars[index].id
				// 重新渲染文化信息
				this.getNews(1,()=>{})
			},
			// 跳转到搜搜页面
			goSearch(){
				uni.navigateTo({
					url:"/pages/find/find"
				})
			},
		}
	}
</script>

<style  scoped lang="less">
	.listPage{
		box-sizing: border-box;
		padding: 0rpx 10rpx 0;
		.searchBox{
			width: 100%;
			height: 77rpx;
			background-color: white;
			padding: 50rpx 0 20rpx 0;
			position: sticky;
			z-index: 10;
			top: 0;
			left: 0;
			.serach{
				background-color: #f5f5f5;
				border-radius: 33rpx;
				width: 69%;
				height: 100%;
				text-align: center;
				color: #453a74;
				
				display: flex;
				align-items: center;
				justify-content: center;
				image{
					width: 40rpx;
					height:40rpx ;
					margin-right: 13rpx;
				}
			}
		}
		
		.head{
		  width: 100%;
		  height: 470rpx;
			// background-color: #0d0737;
		  image{
		    width: 100%;
		    height: 100%;
		  }
		}
		.cent{
			position: relative;
		  // background-color:#0d0737;
		  width: 100%;
			height: 100%;
		  box-sizing: border-box;
		  padding: 11.5rpx;
		  padding-top: 20rpx;
		  .sum{
		    width: 100%;
		    height: 100rpx;
		    // background-color: #2f1b8e;
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
		  
			.box{
				// background-color: #0d0737;
				
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
		
	}
	

</style>

<template>
	<view class="fa_goods">
		<view class="head">
			<view class="left">
				<view class="iconfont iconsousuo" 
					style="margin-right: 20rpx;" 
					>
				</view>
				<input
					style="width: 100%;"
					type="text" value=""
					placeholder="从哪里发物品"
					@input="input"
					/>
			
			</view>
			<view class="">
				{{goods_loc_msg.city}}
			</view>
		</view>
		<!-- 用户进行输入的时候的 提示信息 -->
		<cover-view v-if="suggestion.length != 0" class="in_msg">
			<cover-view class="in_item"
				v-for="(item,index) in suggestion " :key="item.id" 
				@tap="jump" :data-msg='item'
				>
				<cover-view class="in_item1">{{item.title}}</cover-view>
				<cover-view class="in_item2">{{item.addr}}</cover-view>
			</cover-view>
		</cover-view>
		
		<!-- 头部 -->
		<view class="type">
			<view class="ty_item" :class=" statue == 0 ? 'act' : '' " @tap="change(0)">附近的点</view>
			<view class="ty_item" :class=" statue == 1 ? 'act' : '' " @tap="change(1)">常用地址</view>
		</view>
		<!-- 当点击的是附近的点的时候 -->
		<block v-if="statue == 0"   >
			<!-- 地图 -->
			<map id="001" style="width: 100%; height: 300px;"
				:latitude="goods_loc_msg.latitude" 
				:longitude="goods_loc_msg.longitude"
				:markers="covers" show-location="true" 
				:polyline="polyline"
				></map>
			
			<view class="cont">
				<!-- 附近 位置展示 -->
				<view class="f_loc" 
					v-for="(item,index) in near_msg" :key="item.id" 
					@tap="jump"  :data-msg='item'
					>
					<view class="f_loc_d">{{item.title}}</view>
					<view class="f_loc_j">{{item.address}}</view>
				</view>
			</view>
			
		</block>
		<!-- 当点击的是常用地址的时候 -->
		<block v-else>
			<!-- 当为空的时候 -->
			<block v-if="true">
				<image class="empty" src="../../static/history.png" mode=""></image>
				</block>
		</block>
		
		
		
		
	</view>
</template>

<script>
	// 腾讯地图的 SDK
	import QQMapWX from '@/map_sdk/qqmap-wx-jssdk.js';
	var qqmapsdk = new QQMapWX({
		// 申请的key
		key: 'F4VBZ-MYUL3-QYE3K-YWSDQ-VZTDZ-6NFPZ'
	});
	export default{
		data() {
			return {
				// 用户切换附近的点和常用地址
				statue:0, //0 表示附近的点 1表示常用地址
				// 用户搜索的提示信息
				suggestion:[],
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				// 起点终点坐标
				covers: [
					{
						id: 0,
						latitude: 39.909,
						longitude: 116.39742,
						title: '起点',
						iconPath: '../../static/qi.png'
					},
				],
				// 用户当前定位的 地理位置
				// location:[],
				// 用户附近的 地点信息
				near_msg:[],
				// jdk 获取到的用户的基本信息
				goods_loc_msg:{
					city:'定位中..',
					latitude: 39.909,
					longitude: 116.39742,
				},
				type:''
			};
		},
		onLoad(option) {
			console.log('fagoods页面的 option',option)
			// 发货还是收货
			this.type = option.type
			
			if(this.type == 'fa'){
				uni.setNavigationBarTitle({
					title:`请补充发货地址`
				})
			}else{
				uni.setNavigationBarTitle({
					title:`请补充收货地址`
				})
			}
			
			// 当有参数传递过来的时候赋值
			if(JSON.parse(decodeURIComponent(option.goods_loc_msg))){
				console.log('参数传递')
				this.goods_loc_msg = JSON.parse(decodeURIComponent(option.goods_loc_msg))
			}
			
			this.getLocation();
			
		},
		onShow() {
		
		},
		methods: {
			input(e){
				let _this = this 
				// 根据用户输入的 内容自动进行地址的补充
				// console.log('输入的内容',e.detail.value)
				// 使用sdk 根据用户输入的 内容自动进行只能补充
				qqmapsdk.getSuggestion({
					keyword: e.detail.value,
					region:_this.goods_loc_msg.city,
					success(res){
						// console.log('智能补充返回结果',res)
						// 放到一个数组中，进行显示
						var sug = [];
						for (var i = 0; i < res.data.length; i++) {
							sug.push({ // 获取返回结果，放到sug数组中
								title: res.data[i].title,
								id: res.data[i].id,
								addr: res.data[i].address,
								city: res.data[i].city,
								district: res.data[i].district,
								latitude: res.data[i].location.lat,
								longitude: res.data[i].location.lng
							});
						}
						_this.suggestion = sug
						
					},
					fail(error){
						// console.log('智能补充失败 error',error)
						_this.suggestion = []
					},
					complete(res){
						// console.log('智能补充完成')
					},
				})
				
			},
			// 获取当前用户的地理位置，并在地图上显示
			//获取经纬度
			getLocation(e) {
				let _this = this;
				uni.getLocation({
					success: function(res) {
						console.log('用户的地理位置', res);
						// 用户当前的位置 显示到地图中
					_this.goods_loc_msg.latitude = res.latitude
					_this.goods_loc_msg.longitude = res.longitude
						// 起点的位置自动为 当前位置
						// _this.covers[0].latitude = res.latitude;
						// _this.covers[0].longitude = res.longitude;
						// 使用腾讯地图的 sdk
						qqmapsdk.reverseGeocoder({
							// 位置坐标，默认是当前位置
							// location: {
							// 	latitude: res.latitude,
							// 	longitude: res.longitude
							// },
							// 是否返回周边POI列表
							get_poi: 1,
							success: function(res) {
								// 将用户当前的地理位置赋值到页面
								console.log('腾讯jsd',res); //获取成功
								_this.near_msg = _this.near_msg.concat(res.result.pois)
								_this.goods_loc_msg.city = res.result.address_component.city
								
								// // 将当前用户信息赋值到数据中
								// _this.goods_loc_msg = res.result
								// console.log(res.result.address_component.province); //当前位置省会
								// console.log(res.result.address_component.city); //当前位置城市
								// console.log(res.result.address_component.district); //当前位置区域
							}
						});
					}
				});
			},
			// 用户切换 附近的点 和 常用地址
			change(num){
				this.statue = num
			},
			// 用户点击跳转到 上一页
			jump(e){
				let msg = e.currentTarget.dataset.msg
				
				// 点击跳转到上一页，获取页面栈 改变上一级的数据
				// let pages = getCurrentPages();
				// let prePage = getCurrentPages()[pages.length - 2];
				
				// console.log('点击的地点信息',e.currentTarget.dataset.msg)
				// console.log('msg.city',msg.city)
				// console.log('prePage',prePage)
				
				if(!msg.hasOwnProperty('city')){
					// console.log('点击的附近')
					// prePage.setData({
						this.goods_loc_msg = {
							city : msg.ad_info.city,
							district : msg.ad_info.district,
							formatted_addresse : msg.title, 
							latitude : msg.location.lat,
							longitude : msg.location.lng,
							province : msg.ad_info.province,
							street_number : msg.address,
						}
					// })
				}else{
					console.log('点击的搜索')
					
					// prePage.setData({
						this.goods_loc_msg = {
							city : msg.city,
							district : msg.district,
							formatted_addresse : msg.title, 
							latitude : msg.latitude,
							longitude :msg.longitude,
							province : '',
							street_number : msg.addr,
						}
					// })
					
					
					// prePage.data.goods_loc_msg.city = msg.city
					// prePage.data.goods_loc_msg.district =  msg.district
					// prePage.data.goods_loc_msg.formatted_addresse = msg.title
					// prePage.data.goods_loc_msg.latitude = msg.latitude
					// prePage.data.goods_loc_msg.longitude = msg.longitude
					// prePage.data.goods_loc_msg.province = ''
					// prePage.data.goods_loc_msg.street_number = msg.addr
				}
				
				
				// console.log('prePage 已修改',prePage)
				this.goods_loc_msg.type = 
				// 触发上一级页面的函数进行数据的传递
				this.$eventHub.$emit('myGoodsLoc',JSON.stringify(this.goods_loc_msg));
				
				
				// 返回上一级页面
			setTimeout(function(){
				wx.navigateBack({
					delta: 1
				})
			},1000)
				
				
				
				
				
				
				// goods_loc_msg:{
				// 	title	:	'客都时代超市',
				// 	id	:	8108555958269571224,
				// 	addr	:	'河北省保定市清苑区迎宾中街301正东方向140米',
				// 	city	:	'保定市',
				// 	district	:	'清苑区',
				// 	latitude	:	38.764620854,
				// 	longitude	:	115.491700427,
				// },
				// let new_e = e.currentTarget.dataset.msg
				
				// // console.log('进行跳转 获取地址',e.currentTarget.dataset.msg)
				// let msg = {
				// 	title	:	new_e.title,
				// 	id	:	new_e.id,
				// 	address	:	new_e.address ? new_e.address : new_e.addr,
				// 	latitude	:	new_e.location ? new_e.location.lat : new_e.latitude,
				// 	longitude	:	new_e.location ? new_e.location.lng : new_e.longitude,
				// }
				// // console.log('msg ==>',msg)
				// uni.redirectTo({
				// 	url:`/pages/myRun/myGoodsLoc?type=${this.type}&fa_msg=` + encodeURIComponent(JSON.stringify(msg))
				// })
			},
			
		}
	} 
</script>

<style scoped lang="less">
	.fa_goods{
		box-sizing: border-box;
		padding-left:20rpx ;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		padding-right: 40rpx;
		// 空布局
		.empty {
			width: 200px;
			height: 200px;
			position: absolute;
			top: 36%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
		// 头部
		.head{
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: fixed;
			top: 20rpx;
			left: 20rpx;
			right: 40rpx;
			
			z-index: 20;
			.left{
				width: 84%;
				height: 60rpx;
				border-radius: 20rpx;
			
				display: flex;
				align-items: center;
				background-color: #f8f8f8;
				box-sizing: border-box;
				padding-left:20rpx ;
			}
		}
		// 用户的输入提示
		.in_msg{
			background-color: white;
			// width: 100%;
			position: absolute ;
			left: 20rpx;
			right:40rpx;
			top: 82rpx;
			z-index: 10;
			.in_item{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;
				box-sizing: border-box;
				padding-top:20rpx ;
				padding-left: 20rpx;
				padding-right: 20rpx;
				padding-bottom: 20rpx;
				.in_item1{
					font-size: 38rpx;
				}
				.in_item2{
					margin-top: 5rpx;
					font-size: 27rpx;
					color: #cecece;
				}
			}
		}
		// 类型选择
		.type{
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			box-sizing: border-box;
			padding-top: 79rpx;
			padding-bottom: 17rpx;
			.ty_item{
				box-sizing: border-box;
				padding-bottom: 20rpx;
			}
			// 当前选中的部分 显示激活状态
			.act{
				border-bottom: 2px solid red;
			}
		}
		.cont{
			height: 411rpx;
			overflow: auto;
			// 附近的位置显示
			.f_loc{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;
				box-sizing: border-box;
				padding-top: 27rpx;
				padding-bottom: 40rpx;
				// 0.5px 底边框
				position: relative;
				.f_loc_d{
					font-size: 36rpx;
				}
				.f_loc_j{
					color: #cecece;
					font-size: 27rpx;
					margin-top: 5rpx;
				}
			}
			.f_loc::after {
				content: " ";
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				height: 1px;
				background: #ebebeb;
				// background: red;
				transform: scaleY(0.5);
			}
		}
		// 去除最后一个的底边框
		.cont .f_loc:last-child::after {
				content: " ";
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				height: 1px;
				background: white;
				transform: scaleY(0.5);
			}
		
		
	}
	
	
</style>

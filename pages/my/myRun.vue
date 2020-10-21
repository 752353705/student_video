<template>
	<view class="run">
		<!-- 地图显示 -->
		<map
			id="map"
			style="width: 100%; height: 300px;"
			:latitude="startAddress.latitude"
			:longitude="startAddress.longitude"
			:markers="markers"
			show-location="true"
			:polyline="polyline"
		></map>
		<view class="cont">
			<!-- 发货地址 -->
			<view class="loction">
				<view class="f_loc" @tap="jump('fa')">
					<view class="right">
						<view class="tit">发</view>
						<view class="detail">
							<view class="d_loc">{{ startAddress.formatted_addresse }}</view>
							<view class="phone">15930245253</view>
						</view>
					</view>
					<view class="left">常用</view>
				</view>
				<!-- 收获地址 -->
				<view class="f_loc s_loc" @tap="jump('shou')">
					<view class="right">
						<view class="tit">收</view>
						<view class="detail">
							<view class="d_loc">{{ endAddress.formatted_addresse || '要送到哪里' }}</view>
						</view>
					</view>
					<view class="left">常用</view>
				</view>
				<!-- <view class="s_loc">收货地址</view> -->
			</view>
			<!-- 物品信息 -->
			<view class="goods_msg" @click="goodsMsg">
				<view class="left">
					<text class="iconfont iconwupinxinxiguanli"></text>
					<text style="margin-left: 10rpx;">物品信息</text>
				</view>
				<view class="right">
					<text>{{ goodsmsg }}</text>
					<text class="iconfont iconfanhui"></text>
				</view>
			</view>
			<!-- 送货详情 -->
			<view class="goods_detail">
				<view class="gd" >
					<text class="t-icon iconjianchakuaidisongda"></text>
					<text>立即送货</text>
				</view>
				<view class="gd">
					<text class="t-icon icondancheng-xuanzhong "></text>
					<text>无需返程</text>
				</view>
				<view class="gd">
					<text class="t-icon iconbaowenxiang"></text>
					<text>无保温箱</text>
				</view>
			</view>
			<!-- 订单备注 -->
			<view class="dingdan">
				<view class="item">
					<text class="iconfont iconyouhuijine"></text>
					<view class="right">
						<view style="font-size: 17px;">订单金额</view>
						<view class="rl">
							<view class="">暂无可用优惠券</view>
							<text class="iconfont iconfanhui"></text>
						</view>
					</view>
				</view>
				<view class="item">
					<text class="iconfont iconbaojiayugu"></text>
					<view class="right">
						<view style="font-size: 17px;">订单保价</view>
						<view class="rl">
							<text class="">贵重物品建议保价</text>
							<text class="iconfont iconfanhui"></text>
						</view>
					</view>
				</view>
				<view class="item" @tap="jumpnote">
					<text class="iconfont iconbeizhu"></text>
					<view class="right">
						<view style="font-size: 17px;">订单备注</view>
						<view class="rl">
							<view class="">备注说点什么</view>
							<text class="iconfont iconfanhui"></text>
						</view>
					</view>
				</view>
			</view>

			<!-- 温馨提示 -->
			<view class="prompt">根据相关法律法规的要求，将在取货时对您的物品进行检查，请不要将物品外包装封口， 感谢您的配合！</view>

			<!-- 底部的支付按钮 -->
			<view class="btn">
				<view class="q_price">起步价 10.00元</view>
				<view class="k_f">客户付</view>
				<view class="z_f">自己付</view>
			</view>
		</view>

		<!-- 选择送货时间 -->
	<!-- 	<view class="uni-title uni-common-pl">时间选择器</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">当前选择</view>
				<view class="uni-list-cell-db">
					<picker mode="time" :value="time" start="09:01" end="21:01" @change="bindTimeChange">
						<view class="uni-input">{{ time }}</view>
					</picker>
				</view>
			</view>
		</view> -->
		<!-- 弹出框 -->
		<!-- 物品类型的弹出框 -->
		<uni-popup type="bottom" class="pop" animation="false" ref="popup_goodsmsg" mask-click="false">
			<uni-popup-goodsmsg @closeGoodsmsg="closeGoodsmsg" message="成功消息" duration="0" btn_msg="0" />
		</uni-popup>
	</view>
</template>

<script>
// 弹出框
import uniPopupGoodsmsg from '@/components/uni-popup/uni-popup-goodsmsg.vue';

// 插件市场中的地图插件
// import route from '@/components/js_sdk/draw-map.js';
// 腾讯地图的 SDK
import QQMapWX from '@/map_sdk/qqmap-wx-jssdk.js';
var qqmapsdk = new QQMapWX({
	// 申请的key
	key: 'F4VBZ-MYUL3-QYE3K-YWSDQ-VZTDZ-6NFPZ'
});
export default {
	data() {
		return {
			// 选择送货时间
			chooseTime:[
				['今天','明天','后天'],
				['立即送货','11时','3'],
				['0分','10分','20分'],
			],

			goodsmsg: '请选择物品信息',
			id: 0, // 使用 marker点击事件 需要填写id
			title: 'map',
			
			// 路线
			polyline: [],
			// 起点终点坐标
			markers: [{
				iconPath: "/static/qi.png",
				id: 0,
				latitude: 23.099994,
				longitude: 113.324520,
				width: 50,
				height: 50
			},{
				iconPath: "/static/zhong.png",
				id: 1,
				latitude: '',
				longitude: '',
				width: 50,
				height: 50
    }],
			// 发货地点
			startAddress:{
				latitude: 23.099994,
				longitude: 113.324520,
				formatted_addresse:'',
			},
			// 收货地点
			endAddress: {},
			// 两点之间的距离
			distance: '',
			// 订单备注
			note: ''
		};
	},
	components: {
		uniPopupGoodsmsg
	},
	onLoad(option) {
		// 进行自我的定位
		this.getLocation()
		
		
		// this.$refs.popup_goodsmsg.open();
		// console.log('myrun 中的 option', option);
		// // 传递过来订单的备注
		// if (option.note) {
		// 	console.log('note参数传递过来', JSON.parse(decodeURIComponent(option.note)));
		// 	// 获取当前位置的经纬度
		// 	this.note = JSON.parse(decodeURIComponent(option.note));
		// }

		// if (!option.type) {
		// 	console.log('没有参数传递过来');
		// 	// 获取当前位置的经纬度
		// 	this.getLocation();
		// 	return;
		// }

		// // 获取用户选择的 发货地址
		// if (option.type == 'fa') {
		// 	console.log('选择的发货地址', JSON.parse(decodeURIComponent(option.mg_fa_detail)));
		// 	let fa = JSON.parse(decodeURIComponent(option.mg_fa_detail));

		// 	// 储存到本地存储中 包含坐标 名称
		// 	uni.setStorageSync('fa', JSON.stringify(fa));
		// }
		// if (option.type == 'shou') {
		// 	// 用户选择的 收货地址
		// 	console.log('选择的收货地址', JSON.parse(decodeURIComponent(option.mg_shou_detail)));
		// 	let shou = JSON.parse(decodeURIComponent(option.mg_shou_detail));
		// 	// 储存到本地存储中
		// 	uni.setStorageSync('shou', JSON.stringify(shou));
		// }

		// 绘制 路线
		// route.drawRoute(this, this.fa, this.shou);

		// // 不进行判断
		// let fa = JSON.parse(decodeURIComponent(option.mg_fa_detail))
		// // 储存到本地存储中
		// uni.setStorageSync('fa',JSON.stringify(fa))

		// let shou = JSON.parse(decodeURIComponent(option.mg_shou_detail))
		// // 储存到本地存储中
		// uni.setStorageSync('shou',JSON.stringify(shou))
	},
	onShow() {
		let _this = this 
		this.$eventHub.$on('myRun', function (data) {
		 	console.log('myRun '+ data);
			// 然后针对 传递过来的参数进行赋值
			let msg = JSON.parse(data)
			if(msg.type == 'shou'){
				_this.endAddress = msg
			}else{
				_this.startAddress = msg
			}
			
			
			// 监听完成之后进行取消
			this.$eventHub.$off('myRun');
		});
		
		
		// let fa = JSON.parse(uni.getStorageSync('fa'));
		// let shou = JSON.parse(uni.getStorageSync('shou'));
		// // 发货地址
		// this.fa = {
		// 	title: fa.title || '',
		// 	id: fa.id || '',
		// 	address: fa.address ? fa.address : fa.addr,
		// 	latitude: fa.location ? fa.location.lat : fa.latitude,
		// 	longitude: fa.location ? fa.location.lng : fa.longitude
		// };

		// // 收货地址
		// this.shou = {
		// 	title: shou.title || '',
		// 	id: shou.id || '',
		// 	address: shou.address ? shou.address : shou.addr,
		// 	latitude: shou.location ? shou.location.lat : shou.latitude,
		// 	longitude: shou.location ? shou.location.lng : shou.longitude
		// };
		// // 地图坐标
		// this.covers = [
		// 	// 起点
		// 	{
		// 		id: 0,
		// 		latitude: fa.location ? fa.location.lat : fa.latitude,
		// 		longitude: fa.location ? fa.location.lng : fa.longitude,
		// 		title: '起点',
		// 		iconPath: '../../static/qi.png'
		// 		// width:30,
		// 		// height:30,
		// 	},
		// 	{
		// 		id: 1,
		// 		latitude: shou.location ? shou.location.lat : shou.latitude,
		// 		longitude: shou.location ? shou.location.lng : shou.longitude,
		// 		title: '起点',
		// 		iconPath: '../../static/zhong.png'
		// 		// width:30,
		// 		// height:30,
		// 	}
		// ];
		// this.stance();
		// // 规划路线
		// this.getPolyline();
	},
	methods: {
		// 用户选择送货到达的时间
		confirm(e) {
			console.log('送货到达的时间', e);
		},

		// 用户进行选择 物品信息
		goodsMsg() {
			console.log('物品信息');
			this.$refs.popup_goodsmsg.open();
		},
		// 关闭选择物品类型的弹窗
		closeGoodsmsg(type) {
			this.$refs.popup_goodsmsg.close();
			console.log('物品的类型', type);
			this.goodsmsg = type;
		},
		// 用户填写订单备注
		jumpnote() {
			uni.navigateTo({
				url: '/pages/myRun/goodsnote'
			});
		},

		// 获取当前用户的地理位置，并在地图上显示
		//获取经纬度
		getLocation(e) {
			let _this = this;
			uni.getLocation({
				success: function(res) {
					// console.log('获取当前地址', res);
					_this.startAddress.latitude = res.latitude
					_this.startAddress.longitude = res.longitude
					qqmapsdk.reverseGeocoder({
						success: function(res) {
							// 默认起点坐标为 当前的位置
							// _this.startAddress = {
							// 	street_number: res.result.address_component.street_number,
							// 	formatted_addresse:res.result.formatted_addresses.recommend,
							// 	province:res.result.address_component.province,
							// 	city:res.result.address_component.city,
							// 	district:res.result.address_component.district,
							// 	phone:'',
							// 	latitude:res.result.location.lat,
							// 	longitude:res.result.location.lng,
							// }
							_this.startAddress.street_number = res.result.address_component.street_number
							_this.startAddress.formatted_addresse = res.result.formatted_addresses.recommend
							_this.startAddress.province = res.result.address_component.province
							_this.startAddress.city = res.result.address_component.city
							_this.startAddress.district = res.result.address_component.district
							_this.startAddress.phone = ''
							_this.startAddress.latitude = res.result.location.lat
							_this.startAddress.longitude = res.result.location.lng
							
							// 标记位置
							_this.markers[0].latitude = res.result.location.lat
							_this.markers[0].longitude = res.result.location.lng
						}
					});
				}
			});
		},
		jump(str) {
			
				// uni.navigateTo({
				// 	url: `/pages/myRun/myGoodsLoc?type=${str}&fa_msg=` + encodeURIComponent(JSON.stringify(this.startAddress))
				// });
			
			if (str == 'fa') {
				console.log('fa ==>', this.fa);
				// 用户点击的是发货地址
				uni.navigateTo({
					url: `/pages/myRun/myGoodsLoc?type=${str}&fa_msg=` + encodeURIComponent(JSON.stringify(this.startAddress))
				});
			} else {
				console.log('shou ==>', this.shou);
				// 用户点击的是收货地址
				uni.navigateTo({
					url: `/pages/myRun/myGoodsLoc?type=${str}&fa_msg=` + encodeURIComponent(JSON.stringify(this.endAddress))
				});
			}
		},
		// 获取起点和终点的距离
		stance() {
			console.log('获取起点和终点的距离');
			// 配置起点与终点坐标
			let _this = this;
			let fo = {
				latitude: _this.fa.latitude,
				longitude: _this.fa.longitude
			};
			let to = [
				{
					latitude: _this.shou.latitude,
					longitude: _this.shou.longitude
				}
			];

			console.log('fo ==>', fo, 'to ==>', to);

			// let fo = {
			// 	latitude: 38.764620854,
			// 	// longitude: 115.491700427
			// 	longitude: 38.764620854
			// }
			// let to = [{
			// 	latitude: 38.877598,
			// 	longitude: 115.459396
			// }]

			qqmapsdk.calculateDistance({
				//mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
				//from参数不填默认当前地址
				//获取表单提交的经纬度并设置from和to参数（示例为string格式）
				from: fo || '', //若起点有数据则采用起点坐标，若为空默认当前地址
				to: to, //终点坐标
				success: function(res) {
					//成功后的回调
					console.log('两点之间距离 res', res);
					// _this.distance = res.result.elements[0].distance;
				},
				fail: function(error) {
					console.error(error);
				},
				complete: function(res) {
					console.log(res);
				}
			});
		},
		// 规划路线
		getPolyline() {
			console.log('获取路线');
			let _this = this;
			let fo = {
				latitude: _this.fa.latitude,
				longitude: _this.fa.longitude
			};
			let to = {
				latitude: _this.shou.latitude,
				longitude: _this.shou.longitude
			};

			// let fo = {
			// 	latitude: 38.764620854,
			// 	// longitude: 115.491700427
			// 	longitude: 38.764620854
			// }
			// let to = {
			// 	latitude: 38.877598,
			// 	longitude: 115.459396
			// }

			qqmapsdk.direction({
				mode: 'driving', //可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
				//from参数不填默认当前地址
				from: fo,
				to: to,
				success: function(res) {
					console.log('获取规划路线 res', res);
					// 将路线的距离进行赋值
					_this.distance = res.result.routes[0].distance;

					var ret = res;
					var coors = ret.result.routes[0].polyline,
						pl = [];
					//坐标解压（返回的点串坐标，通过前向差分进行压缩）
					var kr = 1000000;
					for (var i = 2; i < coors.length; i++) {
						coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
					}
					//将解压后的坐标放入点串数组pl中
					for (var i = 0; i < coors.length; i += 2) {
						pl.push({ latitude: coors[i], longitude: coors[i + 1] });
					}
					console.log('p1==>', pl);
					// p1.push({
					// 	latitude:_this.shou.latitude,
					// 	longitude:_this.shou.longitude
					// })
					// p1.unshift({
					// 	latitude:_this.fa.latitude,
					// 	longitude:_this.fa.longitude
					// })
					//设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
					_this.polyline = [
						{
							// latitude:pl[0].latitude,
							// longitude:pl[0].longitude,
							// polyline: [{
							points: pl,
							color: '#FF0000DD',
							width: 4,
							borderColor: '#000',
							arrowLine: true,
							borderWidth: 6
							// }]

							// points: pl,
							// color: "#aaff00",
							//  width: 2,
							//  dottedLine: false,
							//  borderColor:"#000",
							//  arrowLine: true,
							//  borderWidth:5
						}
					];
				},
				fail: function(error) {
					console.error(error);
				},
				complete: function(res) {
					console.log(res);
				}
			});
		}
	}
};
</script>

<style scoped lang="scss">
.run {
	// position: fixed;
	// top: 0;
	// left: 0;
	// right: 0;
	// bottom: 0;
	background-color: #f0f0f0;
	box-sizing: border-box;
	padding-bottom: 80px;
	// 内容区
	.cont {
		margin: 0 20rpx;

		.loction {
			// height: 60rpx;
			// line-height: 60rpx;
			box-sizing: border-box;
			padding-top: 47rpx;
			padding-left: 34rpx;
			padding-right: 34rpx;
			padding-bottom: 23rpx;
			background-color: white;
			border-radius: 10rpx;
			.f_loc {
				// background-color: white;
				display: flex;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				// padding-top: 47rpx;
				// padding-left: 34rpx;
				// padding-right: 34rpx;
				padding-bottom: 23rpx;
				.right {
					display: flex;
					justify-content: flex-start;
					align-items: flex-start;
					.tit {
						width: 44rpx;
						height: 44rpx;
						text-align: center;
						line-height: 44rpx;
						margin-right: 20rpx;
						// margin-top: 10rpx;
						background-color: black;
						border-radius: 50%;
						color: white;
					}
					.detail {
						.d_loc {
							width: 473rpx;
							font-size: 37rpx;
							// 单行文本文字溢出省略号
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
						.phone {
							color: #9b9b9b;
							font-size: 28rpx;
						}
					}
				}
				.left {
					box-sizing: border-box;
					// padding-top: 47rpx;
					// padding-left: 34rpx;
					// padding-right: 34rpx;
					// padding-bottom: 23rpx;
					padding: 8rpx 16rpx;
					background-color: #f0f0f0;
					border-radius: 27rpx;
				}
			}
			// 设置收获地址
			.s_loc {
				.right {
					.tit {
						background-color: #ff9322;
					}
				}
			}
		}
		// 物品信息
		.goods_msg {
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: white;
			box-sizing: border-box;
			padding-top: 31rpx;
			padding-left: 34rpx;
			padding-right: 34rpx;
			padding-bottom: 31rpx;
			.left {
			}
			.right {
				color: #9a9a9a;
			}
		}
		// 送货详情
		.goods_detail {
			padding-top: 31rpx;
			padding-left: 34rpx;
			padding-right: 34rpx;
			padding-bottom: 31rpx;
			margin-top: 20rpx;
			background-color: white;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.gd {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}
		// 订单备注
		.dingdan {
			box-sizing: border-box;
			padding-top: 31rpx;
			padding-left: 34rpx;
			padding-right: 7rpx;
			padding-bottom: 31rpx;
			background-color: white;
			margin-top: 30rpx;
			.item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.right {
					box-sizing: border-box;
					padding-top: 15rpx;
					padding-left: 34rpx;
					// padding-right: 34rpx;
					padding-bottom: 16rpx;
					width: 89%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					// 绘制0.5px 的底边框
					//  width: 200px;
					// height: 200px;
					margin: 0 auto;
					position: relative;

					.rl {
						width: 58%;
						color: #9a9a9a;
						display: flex;
						justify-content: flex-end;
					}
				}
				// 绘制0.5px的底边框
				.right::after {
					content: ' ';
					position: absolute;
					left: 0;
					bottom: 0;
					width: 100%;
					height: 1px;
					background: #e7e7e7;
					transform: scaleY(0.5);
				}
			}
		}
		.dingdan .item:last-child {
			.right::after {
				background: white;
			}
		}
		// 温馨提示
		.prompt {
			margin-top: 20rpx;
			font-size: 24rpx;
			color: #999999;
		}
		// 底部的按钮
		.btn {
			width: 80%;
			height: 80rpx;
			position: fixed;
			bottom: 30rpx;
			left: 50%;
			transform: translateX(-50%);
			background-color: red;
			display: flex;
			// align-items: center;
			border-radius: 30rpx;
			overflow: hidden;
			.q_price {
				height: 80rpx;
				width: 54%;
				background-color: #1a1a1a;
				color: white;
				text-align: center;
				line-height: 80rpx;
				font-size: 35rpx;
			}
			.k_f {
				height: 80rpx;
				width: 23%;
				background-color: #444444;
				color: #f89744;
				text-align: center;
				line-height: 80rpx;
			}
			.z_f {
				height: 80rpx;
				width: 23%;
				background-color: #ff932a;
				color: white;
				text-align: center;
				line-height: 80rpx;
			}
		}
	}
}
.t-icon {
	width: 26px;
	height: 26px;
}
.iconfont {
	font-size: 39rpx;
}
</style>

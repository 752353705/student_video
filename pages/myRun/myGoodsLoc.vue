<template>
	<view class="">
		<from class="loc_page" @submit="sbt" >
			<view class="cont">
				<!-- 填写详细的地址信息 -->
				<view class="loction" @tap="jump">
						<view class="iconfont iconicon-dingwei"></view>
						<view class="right">
							<view class="le_det">
								<!-- 当没有具体的地址时 -->
								<!-- <block v-if="Object.keys(goods_loc_msg).length === 0 "> -->
								<block v-if="!goods_loc_msg.formatted_addresse">
									<view style="color: #c8c8c8;" class="de_loc">点击选择地址</view>
								</block>
								<!-- 具体地址 -->
								<view class="de_loc">{{goods_loc_msg.formatted_addresse}}</view>
								<!-- 街道号 -->
								<view class="">{{goods_loc_msg.street_number}}</view>
							</view>
						<view class="iconfont iconfanhui"></view>
					</view>
				</view>
				<!-- 填写具体的门牌号 -->
				<view class="jiedao">
					<view class="iconfont iconlouceng"></view>
					<view class="right">
						<input name="code" type="text" value="" 
							placeholder="请补充具体的楼层门牌号" 
							/>
					</view>
				</view>
				<!-- 电话 -->
				<view class="jiedao">
					<view class="iconfont icondianhua"></view>
					<view class="right">
						<input name="phone" type="text" :value="phoneVal" 
							placeholder="请输入手机号(必填)" 
							/>
					</view>
				</view>
				<!-- 电话 -->
				<view class="jiedao">
					<view class="iconfont iconshoujihao"></view>
					<view class="right">
						<input name="name" type="text" value="" 
							placeholder="请填写联系人姓名" 
							/>
					</view>
				</view>
			</view>
			<!-- 确定按钮 form-type="submit"  -->
			<button class="btn" @tap="sbt" >
				确定
			</button>
		
		</from>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				// 用户选择的地址信息
				goods_loc_msg:{
					// latitude	:	38.87757,
					// longitude	:	115.45875,
					// formatted_addresse	:	'中共保定市竞秀区委员会(五四西路南)',
					// street_number	:	'五四西路318号',
					// province	:	'河北省',
					// city	:	'保定市',
					// district	:	'竞秀区',
					// phone	:	'',
				},
				phoneVal:'15930245253',
				// 判断是 发货 还是 收货
				type:'',
				
			};
		},
		onLoad(option) {
			console.log('mgGoodsLoc页面的 option',option)
				// uni.setNavigationBarTitle({
				// 	title:`请补充收货地址`
				// })
				this.type = option.type
				this.goods_loc_msg = JSON.parse(decodeURIComponent(option.fa_msg))
			if(option.type == 'shou'){
				// console.log('mgGoodsLoc页面的 shou option',option)
				this.type = option.type
				uni.setNavigationBarTitle({
					title:'请补充收货地址'
				})
				// this.goods_loc_msg = JSON.parse(decodeURIComponent(option.fa_msg))
			}
			if(option.type == 'fa'){
				// console.log('mgGoodsLoc页面的 fa option',JSON.parse(decodeURIComponent(option.fa_msg)))
				this.type = option.type
				uni.setNavigationBarTitle({
					title:'请补充发货地址'
				})
				// 从发货地址过来
				// this.goods_loc_msg = JSON.parse(decodeURIComponent(option.fa_msg))
				// console.log('点击发货地址 信息',this.goods_loc_msg)
				
			}
			// // 从选择地点页面跳转过来
			// if(option.fg_fa){
			// 	console.log('具体地址',JSON.parse(decodeURIComponent(option.fg_fa)))
			// 	this.goods_loc_msg = {
			// 		fa:JSON.parse(decodeURIComponent(option.fg_fa))
			// 	}
			// }
			
			
		},
		onShow() {
			let _this = this 
			// 获取 选择地址页面传递过来的参数
			this.$eventHub.$on('myGoodsLoc', function (data) {
			 	console.log('myGoodsLoc '+ JSON.parse(data));
				
				// 将传递过来的参数，进行赋值
				_this.goods_loc_msg = JSON.parse(data)
				
				// console.log('this.goods_loc_msg',this.goods_loc_msg)
				
				// 监听完成之后进行取消
				this.$eventHub.$off('myGoodsLoc');
			});
			
			
			
		},
		methods: {
			jump(){
				console.log('跳转')
				uni.navigateTo({
					url:`/pages/myRun/fagoods?type=${this.type}&goods_loc_msg=` + encodeURIComponent(JSON.stringify(this.goods_loc_msg)) 
				})
			},
			sbt(e){
				let _this = this 
				// 提交个人填写的信息
				console.log('提交个人填写的信息 type',this.type,this.goods_loc_msg)
				
				this.goods_loc_msg.type = this.type
				this.$eventHub.$emit('myRun',JSON.stringify(this.goods_loc_msg));
				
				setTimeout(function(){
					wx.navigateBack({
						delta: 1
					})
				},1000)
				
				// this.$eventHub.$emit('fire',_this.goods_loc_msg);
				// this.$eventHub.$emit('fire',JSON.stringify({
				// 	latitude	:	38.87757,
				// 	longitude	:	115.45875,
				// 	formatted_addresse	:	'中共保定市竞秀区委员会(五四西路南)',
				// 	street_number	:	'五四西路318号',
				// 	province	:	'河北省',
				// 	city	:	'保定市',
				// 	district	:	'竞秀区',
				// 	phone	:	'',
				// }));
				
				
				// 将 发货地址的坐标  传递到 首页
				// if(this.type == 'fa'){
				// 	// 选择的发货地址
				// 	// 根据页面栈 修改参数 然后 返回上一页
				// 	let pages = getCurrentPages();
				// 	let prePage = getCurrentPages()[pages.length - 2];
					
				// 	console.log('prePage',prePage)
					
				// 	prePage.setData({
				// 		startAddress:{
				// 			city : _this.goods_loc_msg.city,
				// 			district : _this.goods_loc_msg.district,
				// 			formatted_addresse : _this.goods_loc_msg.formatted_addresse, 
				// 			latitude : _this.goods_loc_msg.lat,
				// 			longitude : _this.goods_loc_msg.lng,
				// 			province : _this.goods_loc_msg.province,
				// 			street_number : _this.goods_loc_msg.address,
				// 		}
				// 	})
					
				// 	// uni.navigateBack({
				// 	// 	delta:1
				// 	// })
					
					
				// 	// uni.navigateTo({
				// 	// 	url:`/pages/my/myRun?type=${this.type}&mg_fa_detail=`+encodeURIComponent(JSON.stringify(this.goods_loc_msg)) 
				// 	// })
				// }else if(this.type == 'shou'){
				// 	uni.navigateTo({
				// 		url:`/pages/my/myRun?type=${this.type}&mg_shou_detail=`+encodeURIComponent(JSON.stringify(this.goods_loc_msg)) 
				// 	})
				// }
				
				
				
			}
		}
	};
</script>

<style scoped lang="less" >
	.loc_page{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #f8f8f8;
		.cont{
			background-color: white;
			box-sizing: border-box;
			padding-left: 36rpx;
			padding-top: 39rpx;
			padding-right: 20rpx;
			padding-bottom: 30rpx;
			// 详细的地址信息
			.loction{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.right{
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-left: 30rpx;
					box-sizing: border-box;
					padding-bottom: 36rpx;
					// 绘制0.5px 的边框线
					// border-bottom: 1px solid #000000;
					// margin: 0 auto;
					position: relative;
					.le_det{
						
					}
				}
				.right::after {
					content: " ";
					position: absolute;
					left: 0;
					bottom: 0;
					width: 100%;
					height: 1px;
					background: #ebebeb;
					transform: scaleY(0.5);
				}
			}
			// 门牌号 电话 联系人姓名
			.jiedao{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.right{
					width: 100%;
					height: 100%;
					margin-left: 30rpx;
					box-sizing: border-box;
					padding-top: 36rpx;
					padding-bottom: 36rpx;
					// 绘制0.5px 的底边框
					// border-bottom: 1px solid #000000;
					position: relative;
				}
				.right::after {
					content: " ";
					position: absolute;
					left: 0;
					bottom: 0;
					width: 100%;
					height: 1px;
					background: #ebebeb;
					transform: scaleY(0.5);
				}
			}
		}
		// 确定按钮
		.btn{
			background-color: black;
			color: white;
			font-weight: bolder;
			font-size: 30rpx;
			position: fixed;
			bottom: 50rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 80%;
			line-height: 80rpx;
			height: 80rpx;
			text-align: center;
			border-radius: 30rpx;
			overflow: hidden;
		}
	}
	
	// 去除最后一个的底边框
	.cont .jiedao:last-child .right::after{
		background: white;
	}
</style>

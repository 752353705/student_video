<template>
	<view class="tenants">
		<!-- 头部的邀请入驻图 -->
		<view class="head_img">
			<image src="https://img.alicdn.com/imgextra/i4/3470687433/O1CN0124mMQOSERr18L1h_!!3470687433.jpg_430x430q90.jpg" 
				mode="widthFix">
			</image>
		</view>
		<!-- 入驻填写的详细内容 -->
		<view class="body">
			<form @submit="submit">
				<!-- 商户名称 -->
				<view class="name">
					<view class="name_tit">商户名称:*</view>
					<view class="name_input">
						<text class="t-icon iconshangjia"></text>
						<input name="name_input" type="text" value="" />
					</view>
				</view>
				<!-- 营业类目 -->
				<view class="type">
					<view class="type_tit">营业类型:*</view>
					<!-- @change="radioChange" -->
					<radio-group name="type_radio" 
						
						>
						<label
							v-for="(item,index) in type_list "
							:key="index"
							>
							<radio :value="item.value" color="#ff9933" />
							<text>{{item.name}}</text>
						</label>
					</radio-group>
				</view>
				<!-- 联系人姓名 -->
				<view class="user_name">
					<view class="user_name_tit">联系人姓名*</view>
					<view class="user_name_input">
						<text class="t-icon iconmine-red"></text>
						<input name="user_name_input" type="text" value="" />
					</view>
				</view>
				<!-- 联系人手机 -->
				<view class="user_phone">
					<view class="user_phone_tit">联系人手机*</view>
					<view class="user_phone_input">
						<text class="t-icon iconshoujichongzhi"></text>
						<input name="user_phone_input"
							value="" maxlength="11" type="number" 
						/>
					</view>
				</view>
				<button form-type="submit"
					plain="true" hover-class='none'
					>
					提交
				</button>
			</form>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 营业类型
				type_list:[
					{
						value:1,
						name:'餐饮美食'
					},{
						value:2,
						name:'亲子乐园'
					},{
						value:3,
						name:'休闲玩乐'
					},{
						value:4,
						name:'丽人美发'
					},{
						value:5,
						name:'其他'
					}
				]
			}
		},
		methods:{
			// 提交商户信息
			submit(e){
				console.log('提交信息',e)
				let regs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/
				/**
				 * 商户名称  e.detail.value.name_input
				 * 营业类型  e.detail.value.type_radio
				 * 联系人姓名  e.detail.value.user_name_input
				 * 联系人电话  e.detail.value.user_phone_input
				 * */
				
				// 对用户进行填写的内容进行判断
				if(e.detail.value.name_input.length === 0){
					return uni.showToast({
						title:'请填写商户名称',
						icon:'none'
					})
				}else if(!e.detail.value.type_radio){
					return uni.showToast({
						title:'请选择营业类型',
						icon:'none'
					})
				}else if(e.detail.value.user_name_input.length === 0){
					return uni.showToast({
						title:'请填写联系人姓名',
						icon:'none'
					})
				}else if(!regs.test(e.detail.value.user_phone_input)){
					return uni.showToast({
						title:'请填写正确手机号',
						icon:'none'
					})
				}
					
				// 一切填好进行提交
				 uni.showToast({
				 	title:'入驻成功',
					icon:'none'
				 })
			}
		}
	}
</script>

<style>
	page{
		background-color: #fbfbfb;
	}
</style>

<style scoped lang="scss">
	// 提交按钮的样式
	button{
		border: none;
		background-color: $bg-color;
		border-radius: 30rpx;
		position: fixed;
		bottom: 30rpx;
		left: 50%;
		transform: translateX(-50%);
		color: white;
		width: 80%;
	}
	// 图标的大小
	.t-icon{
		width: 23px;
		height: 21px;
		margin-left: 10rpx;
	}
	
	.tenants{
		.head_img{
			width: 100%;
			height: 400rpx;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.body{
			box-sizing: border-box;
			padding-top: 20rpx;
			padding-right: 49rpx;
			padding-bottom: 20rpx;
			padding-left: 43rpx;
			// 商户名称
			.name{
				margin-bottom: 20rpx;
				.name_tit{
					color: #ec6045;
					font-weight: bold;
				}
				.name_input{
					width: 100%;
					height: 60rpx;
					margin-top: 10rpx;
					border: 1px solid #d0d0d0; 
					display: flex;
					justify-content: flex-start;
					align-items: center;
					input{
						padding-left: 20rpx;
						width: 100%;
						height: 100%;
					}
				}
			}
			// 营业类型
			.type{
				margin-bottom: 20rpx;
				.type_tit{
					color: #ec6045;
					font-weight: bold;
				}
				radio-group{
					margin-top: 23rpx;
					display: flex;
					justify-content: flex-start;
					align-items: flex-start;
					flex-wrap: wrap;
					label{
						margin-bottom: 10rpx;
						width: 50%;
					}
				}
			}
			// 联系人姓名
			.user_name{
				margin-bottom: 20rpx;
				.user_name_tit{
					color: #ec6045;
					font-weight: bold;
				}
				.user_name_input{
					width: 100%;
					height: 60rpx;
					margin-top: 10rpx;
					border: 1px solid #d0d0d0; 
					display: flex;
					justify-content: flex-start;
					align-items: center;
					input{
						padding-left: 20rpx;
						width: 100%;
						height: 100%;
					}
				}
			}
			// 联系人手机
			.user_phone{
				.user_phone_tit{
					color: #ec6045;
					font-weight: bold;
				}
				.user_phone_input{
					width: 100%;
					height: 60rpx;
					margin-top: 10rpx;
					border: 1px solid #d0d0d0; 
					display: flex;
					justify-content: flex-start;
					align-items: center;
					input{
						padding-left: 20rpx;
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
</style>

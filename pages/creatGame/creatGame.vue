<template>
	<view class="creat_game">
		<form @submit="publish" @reset="">
			
			<!-- 大赛设置 -->
			<view class="game_set">
				<!-- 标题 -->
				<view class="head">
					<view class="tag"></view>
					<text class="text">大赛设置</text>
				</view>
				<!-- 大赛主题 -->
				<view class="game_theme">
					<!-- 标题 -->
					<view class="game_theme_hint">
						<text class="must">*</text>
						<text>大赛主题图</text>
						<text class="hint">(建议尺寸750*450)</text>
					</view>
					<!-- 图片 -->
					<view class="game_theme_img">
						<image 
							:src="game_theme_img" 
							mode="">
						</image>
						<!-- 更换图片 -->
						<view class="chang_theme_img" @click="changeThemeImg">
							更换
						</view>
					</view>
					<!-- 大赛名称 -->
					<view class="game_name">
						<view class="le">
							<text class="must">*</text>
							<text>活动名称</text>
						</view>
						<view class="ri">
							<input type="text" value=""
								@input="inputName"
								name="game_name"
								maxlength="30"
								placeholder="请输入(限30字)"
								placeholder-class="place_style"
								/>
						</view>
					</view>
					<!-- 分享标题 -->
			<!-- 		<view class="game_name">
						<view class="le">
							<text>分享标题</text>
						</view>
						<view class="ri">
							<input type="text" value=""
								dir='rtl'
								maxlength="30"
								placeholder="请输入(限30字)"
								placeholder-class="place_style"
								/>
						</view>
					</view> -->
					<!-- 举办地点 -->
					<view class="game_location">
						<view class="le">
							<text class="must">*</text>
							<text>举办地点</text>
						</view>
						<view class="ri">
							<input type="text" value=""
								@input="inputLoction"
								name="game_location"
								dir='rtl'
								maxlength="30"
								placeholder="请输入(限30字)"
								placeholder-class="place_style"
								/>
						</view>
					</view>
					<!-- 主办方 -->
					<view class="game_host">
						<view class="le">
							<text class="must">*</text>
							<text>主办方</text>
						</view>
						<view class="ri">
							<input type="text" value=""
								@input="inputHost"
								name="game_host"
								dir='rtl'
								maxlength="30"
								placeholder="请输入(限30字)"
								placeholder-class="place_style"
								/>
						</view>
					</view>
					<!-- 开始时间 -->
					<view class="game_start_time" @click="showPop"
						data-type='start'
						>
						<view class="le">
							<text class="must">*</text>
							<text>大赛开始时间</text>
						</view>
						<view class="ri">
							<text style="margin-right: 10rpx;">{{game_start_time}}</text>
						</view>
					</view>
					<!-- 结束时间 -->
					<view class="game_end_time" @click="showPop"
						data-type='end'
						>
						<view class="le">
							<text class="must">*</text>
							<text>大赛结束时间</text>
						</view>
						<view class="ri">
							<text style="margin-right: 10rpx;">{{game_end_time}}</text>
						</view>
					</view>
					
					
				</view>
			</view>
			
			<!-- 大赛简介 -->
			<view class="detail_game">
				<!-- 标题 -->
				<view class="head">
					<view class="tag"></view>
					<text class="text">大赛简介</text>
				</view>
				<!-- 大赛简介填写 -->
				<view class="textarea">
					<!-- <textarea value="" 
						placeholder="输入大赛简介" 
						maxlength="-1"
						/> -->
					<jinEdit ref="jinEdit" placeholder="请输入内容" @editOk="editOk" 
						uploadFileUrl="/#"
						>
					</jinEdit>
					<!-- 	<editor id="editor" class="ql-container" 
							placeholder="输入大赛详情" @ready="onEditorReady"
							>
						</editor> -->
				</view>
			</view>
			
			<!-- 机构信息 -->
			<!-- <view class="institution">
				标题
				<view class="head">
					<view class="tag"></view>
					<text class="text">机构信息</text>
				</view>
				机构详情
				<view class="institution_detail">
					机构名称
					<view class="institution_name">
						<view class="le">
							<text class="must">*</text>
							<text>机构名称</text>
						</view>
						<view class="ri">
							<input type="text" value=""
								dir='rtl'
								maxlength="30"
								placeholder="请输入机构名称"
								placeholder-class="place_style"
								/>
						</view>
					</view>
					机构电话
					<view class="institution_phone">
						<view class="le">
							<text>机构电话</text>
						</view>
						<view class="ri">
							<input type="text" value=""
								dir='rtl'
								maxlength="30"
								placeholder="请输入联系电话"
								placeholder-class="place_style"
								/>
						</view>
					</view>
					机构地址
					<view class="institution_location">
						<view class="le">
							<text>机构地址</text>
						</view>
						<view class="ri">
							<input type="text" value=""
								dir='rtl'
								maxlength="30"
								placeholder="请输入(限30字)"
								placeholder-class="place_style"
								/>
						</view>
					</view>
				</view>
			</view> -->
			
			<!-- 底部按钮 -->
			<view class="btm_btn">
				<view class="preview" @click="jumpPreview">
					预览
				</view>
				<!-- <view class="draft">
					存草稿
				</view> -->
				<button class="release" form-type="submit">
					发布
				</button>
			</view>
		</form>
		<!-- 时间选择器 -->
		<min-popup heightSize="500" :show="show" @close='close'>
		    <min-picker 
		    :endTime="endTime"
		    :startTime="startTime"
		    @cancel="cancel"
		    @sure="sure"
		    >
		    </min-picker>
		</min-popup>
	</view>
</template>

<script>
	import jinEdit from '@/components/jin-edit/jin-edit.vue'
	import minPopup from '@/components/min-picker/min-popup.vue'
	import minPicker from '@/components/min-picker/min-picker.vue'
	export default {
		data() {
			return {
				// 当前进行的状态
				picker_type:'',
				
				// 日期插件 显隐
				startTime:[2020,11,1],
				endTime:[2050],
				show:false,
				time:'暂无',
				// 选择器当前的下标
				value:0,
				// 大赛主体图片
				game_theme_img:'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg',
				// 大赛的简介
				detail_game:{},
				// 开始时间
				game_start_time:'',
				// 结束时间
				game_end_time:'',
				// 活动名称
				game_name:'',
				// 举办地点
				game_location:'',
				// 主办方
				game_host:'',
			};
		},
		components:{
			minPopup,
			minPicker,
			jinEdit,
		},
		methods:{
			// 赛事预览
			jumpPreview(){
				this.$refs.jinEdit.release(true)
				setTimeout(()=>{
					console.log('this.detail_game.html',this.detail_game.html)
					let game_detail = {
						image:this.game_theme_img,
						subjectAddress:this.game_location,
						beginTime:this.game_start_time,
						subjectSponsorName:this.game_host,
						subjectContent:this.detail_game.html
					}
					
					// let game_detail = {
					// 	subjectContent:'11'
					// }
					// 要传递的文章详情
					uni.navigateTo({
						// url:'/pages/creatGame/gamePreview?item=' + JSON.stringify(game_detail)
						url:'/pages/creatGame/gamePreview?item=' + encodeURIComponent(JSON.stringify(game_detail))
					})
				},100)
			},
			// 点击保存富文本中文章详情
			editOk(res) {
			  console.log('文章详情',res)
				this.detail_game = res
			},
			// 更换大赛主题图
			changeThemeImg(){
				// console.log('进行更换主题图')
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album','camera'], //从相册或相机选择
				    success:  (res) => {
							// console.log(res.tempFilePaths);
							this.game_theme_img = res.tempFilePaths[0]
				    }
				});
			},
			// 用户输入活动名称
			inputName(e){
				this.game_name = e.detail.value
			},
			// 用户输入举办地点
			inputLoction(e){
				this.game_location = e.detail.value
			},
			// 用户输入主办方
			inputHost(e){
				this.game_host = e.detail.value
			},
			// 用户进行发布操作
			publish(e){
				console.log('e',e)
				// 还要进行一下富文本中内容的huoqv
				this.$refs.jinEdit.release(true)
				
				if(e.detail.value.game_host == '' || 
					e.detail.value.game_location == '' || 
					e.detail.value.game_name == ''|| 
					this.game_start_time == '' || 
					this.game_end_time == '' 
				){
					return uni.showToast({
						title:'请填写完整',
						icon:'none'
					})
				}
				
				
				
				// 赛事的详细信息都有了
				
				
				
			},
			// 获取选择的日期
			// 取消事件
			cancel(){
			  this.close()
			},
			// 确认事件
			sure(e){
			  // console.log(e)
			  if(this.picker_type == 'start'){
					this.game_start_time = e.a + '-' + e.b + '-' + e.c 
 				}else{
					this.game_end_time = e.a + '-' + e.b + '-' + e.c 
				}
				
			},
			// picker显示
			showPop(e){
			  this.show = true
				// console.log('e',e)
				this.picker_type = e.currentTarget.dataset.type
			},
			// 关闭picker
			close(){
			  this.show = false
			},
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
		padding-bottom: 135rpx;
	}
</style>

<style lang="scss">
	// * 必填样式
	.must{
		color: red;
		margin-right: 10rpx;
	}
	
	// 调整button样式
	button{
		border-radius: 0;
	}
	
	.creat_game{
		// 大赛设置
		.game_set{
			margin-top: 30rpx;
			box-sizing: border-box;
			padding-top: 30rpx;
			padding-right: 30rpx;
			// padding-bottom: 30rpx;
			padding-left: 30rpx;
			background-color: white;
			// 标题
			.head{
				display: flex;
				align-items: center;
				justify-content: flex-start;
				.tag{
					width: 10rpx;
					height: 40rpx;
					background-color: #ff8800;
					border-radius: 10rpx;
				}
				.text{
					margin-left: 20rpx;
					font-weight: bolder;
					font-size: 30rpx;
				}
			}
			// 大赛主题图
			.game_theme{
				margin-top: 40rpx;
				.game_theme_hint{
					margin-bottom: 30rpx;
					.hint{
						color: #b7b7b7;
						font-size: 26rpx;
						margin-left: 10rpx;
					}
				}
				// 图片展示
				.game_theme_img{
					width: 100%;
					height: 396rpx;
					position: relative;
					image{
						width: 100%;
						height: 100%;
					}
					// 更换按钮
					.chang_theme_img{
						position: absolute;
						bottom: 0;
						right: 0;
						background-color: #332400;
						color: white;
						padding-top: 6rpx;
						padding-right: 8rpx;
						padding-bottom: 8rpx;
						padding-left: 9rpx;
						border-radius: 14rpx 0 0 0;
						font-size: 28rpx;
					}
				}
				// 大赛名称
				.game_name{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 20rpx;
					padding-bottom: 20rpx;
					border-bottom: 1rpx solid #f7f7f7;
					.ri{
						width: 32%;
						.place_style{
							text-align: right;
						}
					}
				}
				// 举办地点
				.game_location{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 20rpx;
					padding-bottom: 20rpx;
					border-bottom: 1rpx solid #f7f7f7;
					.ri{
						width: 33%;
						.place_style{
							text-align: right;
						}
					}
				}
				// 主办方
				.game_host{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 20rpx;
					padding-bottom: 20rpx;
					border-bottom: 1rpx solid #f7f7f7;
					.ri{
						width: 33%;
						.place_style{
							text-align: right;
						}
					}
				}
				// 大赛开始时间
				.game_start_time{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 20rpx;
					padding-bottom: 20rpx;
					border-bottom: 1rpx solid #f7f7f7;
					.ri{
						width: 67%;
						text-align: right;
					}
				}
				// 大赛结束时间
				.game_end_time{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 20rpx;
					padding-bottom: 20rpx;
					.ri{
						width: 67%;
						text-align: right;
					}
				}
				
				
			}
		}
		// 大赛简介
		.detail_game{
			margin-top: 30rpx;
			box-sizing: border-box;
			padding-top: 30rpx;
			padding-right: 30rpx;
			padding-bottom: 30rpx;
			padding-left: 30rpx;
			background-color: white;
			// 标题
			.head{
				display: flex;
				align-items: center;
				justify-content: flex-start;
				.tag{
					width: 10rpx;
					height: 40rpx;
					background-color: #ff8800;
					border-radius: 10rpx;
				}
				.text{
					margin-left: 20rpx;
					font-weight: bolder;
					font-size: 30rpx;
				}
			}
			// 大赛简介
			.textarea{
				position: relative;
				textarea{
					margin-top: 30rpx;
					box-sizing: border-box;
					padding-top: 30rpx;
					padding-right: 30rpx;
					padding-bottom: 30rpx;
					padding-left: 30rpx;
					width: 100%;
					background-color: #f4f5f9;
				}
				
			}
			
			
		}
		// 机构信息
		.institution{
			margin-top: 30rpx;
			box-sizing: border-box;
			padding-top: 30rpx;
			padding-right: 30rpx;
			// padding-bottom: 30rpx;
			padding-left: 30rpx;
			background-color: white;
			// 标题
			.head{
				display: flex;
				align-items: center;
				justify-content: flex-start;
				.tag{
					width: 10rpx;
					height: 40rpx;
					background-color: #ff8800;
					border-radius: 10rpx;
				}
				.text{
					margin-left: 20rpx;
					font-weight: bolder;
					font-size: 30rpx;
				}
			}
			// 机构详情
			.institution_detail{
				margin-top: 40rpx;
				// 机构名称
				.institution_name{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 20rpx;
					padding-bottom: 20rpx;
					border-bottom: 1rpx solid #f7f7f7;
					.ri{
						width: 33%;
						.place_style{
							text-align: right;
						}
					}
				}
				// 机构电话
				.institution_phone{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 20rpx;
					padding-bottom: 20rpx;
					border-bottom: 1rpx solid #f7f7f7;
					.ri{
						width: 33%;
						.place_style{
							text-align: right;
						}
					}
				}
				// 机构地址
				.institution_location{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 20rpx;
					padding-bottom: 20rpx;
					// border-bottom: 1rpx solid #f7f7f7;
					.ri{
						width: 33%;
						.place_style{
							text-align: right;
						}
					}
				}
				
			}
		}
		
		// 底部按钮
		.btm_btn{
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			display: flex;
			height: 100rpx;
			
			// 预览
			.preview{
				background-color: #ffffff;
				text-align: center;
				width: 40%;
				line-height: 100rpx;
				border-top:1rpx solid  #f8f8f8;
				border-right:1rpx solid  #f8f8f8 ;
			}
			// 草稿
			.draft{
				background-color: #ffffff;
				text-align: center;
				width: 20%;
				line-height: 100rpx;
				border-top:1rpx solid  #f8f8f8;
			}
			// 发布
			.release{
				text-align: center;
				width: 60%;
				color: white;
				background-color: #ff8b02;
				line-height: 100rpx;
			}
		}
	}
</style>

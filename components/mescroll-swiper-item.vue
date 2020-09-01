<template>
	<!-- 
	swiper中的transfrom会使fixed失效,此时用height="100%"固定高度; 
	swiper中无法触发mescroll-mixins.js的onPageScroll和onReachBottom方法,只能用mescroll-uni,不能用mescroll-body
	-->
	<mescroll-uni
		:safearea="true"
		ref="mescrollRef"
		@init="mescrollInit"
		height="100%"
		top="400"
		:bottom="mescrollBot"
		:down="downOption"
		@down="downCallback"
		:up="upOption"
		@up="upCallback"
	>
		<!-- 普通界面 -->
		<block v-if="showType == 0">
			<!-- <mescroll-empty v-if="goods.length === 0"></mescroll-empty> -->
			<mescroll-empty @emptyclick="emptyClick" v-if="goods.length === 0" :option="emptyOption"></mescroll-empty>
			<block v-else>
				<!-- 渲染 视频的 瀑布流 -->
				<wfalls-flow @showUseroperation="showUseroperation" @closeUseroperation="closeUseroperation" style="{height:400px}" :list="goods"></wfalls-flow>
			</block>
		</block>
		<!-- 商品的瀑布流 -->
		<block v-if="showType == 2">
			<mescroll-empty @emptyclick="emptyClick" v-if="goods.length === 0" :option="emptyOption"></mescroll-empty>
			<block v-else><shop-waterfall style="{height:400px}" :list="goods"></shop-waterfall></block>
		</block>
	</mescroll-uni>
</template>

<script>
import MescrollEmpty from '@/components/mescroll-uni/components/mescroll-empty.vue';
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import MescrollMoreItemMixin from '@/components/mescroll-uni/mixins/mescroll-more-item.js';

import wfallsFlow from '@/components/wfallsflow.vue';
import shopWaterfall from '@/components/shop-waterfall.vue';

export default {
	mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
	components: {
		MescrollEmpty,
		wfallsFlow,
		shopWaterfall
	},
	data() {
		return {
			video_src: '',
			// 下拉
			downOption: {
				// bgColor:'red',
				auto: false // 不自动加载 (mixin已处理第一个tab触发downCallback)
			},
			option: {},
			// 空布局时的样式
			// 上拉
			upOption: {
				auto: false, // 不自动加载
				noMoreSize: 4 //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
			},
			goods: [] //列表数据
		};
	},
	props: {
		// 视频列表
		// videolist:{
		// 	type:Array
		// },
		// 关键词
		kw: {
			type: String,
			default: 'listVideo'
		},

		// 空布局时的提示
		emptyOption: {
			type: Object,
			default: {
				tip: '~~空空如也~~',
				btnText: '重新加载'
			}
		},
		showType: Number,
		i: Number, // 每个tab页的专属下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
		// 自定义显示 上拉加载时 距离页面底部的 位置
		mescrollBot: {
			type: Number,
			default() {
				return 0;
			}
		},
		index: {
			// 当前tab的下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
			type: Number,
			default() {
				return 0;
			}
		},
		waterFullHeight: {
			type: Number
		},
		tabs: {
			// 为了请求数据,演示用,可根据自己的项目判断是否要传
			type: Array,
			default() {
				return [];
			}
		}
	},
	computed: {
		// console.log('swiper item 进行挂载',this.$props.videolist)

		// 将空页面的布局 对 data中 的数据进行赋值
		changeEmpty() {
			// console.log('swiper item 进行挂载',this.$props.videolist)
			// console.log('mescroll-swiper-item 滚动 初加载');
			this.option = this.$props.emptyOption;
		}
	},
	methods: {
		// 控制用户操作弹窗的显隐
		showUseroperation(btntop, btnleft) {
			this.$emit('showUseroperation', btntop, btnleft);
		},

		// 用于关闭弹窗
		closeUseroperation(num) {
			// console.log('关闭')
			this.$emit('closeUseroperation');
			// this.$refs.popup_video.close()
		},

		// 显示上传视频
		open(num) {
			if (num == 0) {
				// 打开上传图片的弹框
				this.$refs.popup_img.open();
			} else if (num == 1) {
				// 打开上传视频的弹框
				this.$refs.popup_video.open();
			}
		},
		close(num) {
			// this.$refs.popup_user.close();
			if (num == 0) {
				// 关闭上传图片的弹框
				this.$refs.popup_img.close();
			} else if (num == 1) {
				// 关闭上传视频的弹框
				this.$refs.popup_video.close();
			}
		},
		/*下拉刷新的回调 */
		downCallback(page) {
			console.log('进行下拉操作');
			// let _this = this;
			// this.mescroll.resetUpScroll(true);
			this.mescroll.resetUpScroll();
		},
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback(page) {
			console.log('进行上拉操作', this.kw,page);
			let _this = this;
			if (page.num == 1) {
				_this.goods = [];
			}
			//联网加载数据  判断用户当前所在的 tabber 名，分别进行不同的网络请求
			if (this.$props.kw == 'listVideo') {
				console.log('上拉请求视频 this ==>',this)
				// 请求首页的视频
				this.api._get(
					'vod/list',
					{
						pageNum: page.num,
						pageSize: '10'
					},
					function(res) {
						console.log('请求首页的数据 成功', res);
					
						_this.goods = _this.goods.concat(res.list);
						_this.mescroll.endSuccess(res.list.length);
						// 如果进行网络请求出错，则 取消当前 正在加载的 提示
						_this.mescroll.endSuccess(1);
						// setTimeout(()=>{
						// 	console.log('定时器想视频列表中添加数据')
						// 	_this.goods = _this.goods.concat(res.list);
						// },6000)
					},
					function() {
						console.log('请求首页的数据 失败');
						_this.mescroll.endSuccess(1);
					}
				);
			}else if (this.$props.kw == 'listTxt') {
			// 请求 首页 文章列表
				this.api._get(
					'article/list',
					{
						pageNum: page.num,
						pageSize: '10'
					},
					function(res) {
						console.log('请求首页的文章 成功', res.data);
						if (page.num == 1) {
							_this.goods = [];
						}
						_this.goods = _this.goods.concat(res.data.list);
						_this.mescroll.endSuccess(res.data.list.length);
						// 如果进行网络请求出错，则 取消当前 正在加载的 提示
					},
					function() {
						console.log('请求首页的数据 失败');
						_this.mescroll.endSuccess(1);
					}
				);
			} else if(this.$props.kw == 'listUsed'){
				// 请求首页二手
				this.api._get(
					'secondGoods/list',
					{
						pageNum: page.num,
						pageSize: '10'
					},
					function(res) {
						console.log('请求首页的二手列表 成功', res.data);
						if (page.num == 1) {
							_this.goods = [];
						}
						_this.goods = _this.goods.concat(res.data.list);
						_this.mescroll.endSuccess(res.data.list.length);
						// 如果进行网络请求出错，则 取消当前 正在加载的 提示
					},
					function() {
						console.log('请求首页的数据 失败');
						_this.mescroll.endSuccess(1);
					}
				);
			}else if (this.$props.kw == 'myTxt') {
				// 请求我的 文章
				this.api._get(
					'article/user',
					{
						pageNum: page.num,
						pageSize: '10'
					},
					function(res) {
						console.log('请求我的文章 成功', res.data);
						if (page.num == 1) {
							_this.goods = [];
						}
						// 由于 获得的 自己的文章中没有 头像和姓名  将其添加上

						_this.goods = _this.goods.concat(res.data.list);
						_this.mescroll.endSuccess(res.data.list.length);
						// 如果进行网络请求出错，则 取消当前 正在加载的 提示
					},
					function() {
						console.log('请求首页的数据 失败');
						_this.mescroll.endSuccess(1);
					}
				);
			}else if(this.$props.kw == 'myVideo'){
				// 请求我的视频
				this.api._get(
					'article/user',
					{
						pageNum: page.num,
						pageSize: '10'
					},
					function(res) {
						console.log('请求我的文章 成功', res.data);
						if (page.num == 1) {
							_this.goods = [];
						}
						// 由于 获得的 自己的文章中没有 头像和姓名  将其添加上
				
						_this.goods = _this.goods.concat(res.data.list);
						_this.mescroll.endSuccess(res.data.list.length);
						// 如果进行网络请求出错，则 取消当前 正在加载的 提示
					},
					function() {
						console.log('请求首页的数据 失败');
						_this.mescroll.endSuccess(1);
					}
				);
				
				
				
			}else if(this.$props.kw == 'myUsed'){
				// 请求我的二手
				this.api._get(
					'secondGoods/user',
					{
						pageNum: page.num,
						pageSize: '10'
					},
					function(res) {
						console.log('请求我的二手 成功', res.data);
						if (page.num == 1) {
							_this.goods = [];
						}
						// 由于 获得的 自己的文章中没有 头像和姓名  将其添加上
				
						_this.goods = _this.goods.concat(res.data.list);
						_this.mescroll.endSuccess(res.data.list.length);
						// 如果进行网络请求出错，则 取消当前 正在加载的 提示
					},
					function() {
						console.log('请求首页的数据 失败');
						_this.mescroll.endSuccess(1);
					}
				);
			}
		},
		//点击空布局按钮的回调
		emptyClick() {
			// uni.showToast({
			// 	icon: 'none',
			// 	title: '点击了按钮,具体逻辑自行实现'
			// });

			// 重新进行网络请求
			this.downCallback();
		}
	}
};
</script>

<style lang="less">
.pop {
	.imgBox {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		.img {
			width: 62.5rpx;
			height: 62.5rpx;
			margin-top: 20rpx;
		}
	}
}

.box {
	display: flex;
	justify-content: space-evenly;
	.push_video,
	.push_img {
		width: 314rpx;
		height: 308rpx;
		background-color: #d8d3d1;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding-top: 25rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		// 绘制十字
		.cross {
			background: #f0eaf0;
			height: 138.88rpx;
			position: relative;
			width: 14rpx;
			margin-bottom: 20rpx;
		}
		.cross:after {
			background-color: #f0eaf0;
			content: '';
			height: 14rpx;
			left: -59.77rpx;
			position: absolute;
			top: 60.77rpx;
			width: 138.88rpx;
		}
		.txt {
			color: #616060;
			font-size: 33rpx;
			font-weight: bolder;
		}
	}
}
</style>

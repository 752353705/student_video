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
			<block v-if="goods.length === 0"></block>
			<!-- <mescroll-empty @emptyclick="emptyClick" v-if="goods.length === 0" 
				:option="emptyOption"></mescroll-empty> -->
			<block v-else>
				<!-- 渲染 视频的 瀑布流 -->
				<wfalls-flow @showUseroperation="showUseroperation" @closeUseroperation="closeUseroperation" 
					style="{height:400px}" :list="goods" :kw="kw" 
					@jump="jump"></wfalls-flow>
			</block>
		</block>

		<!-- 商品的瀑布流 -->
		<block v-if="showType == 2">
			<!-- <mescroll-empty @emptyclick="emptyClick" v-if="goods.length === 0" :option="emptyOption"></mescroll-empty> -->
			<block v-if="goods.length === 0"></block>
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
				// use:false,
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
		// 请求其他作者信息的 uid
		uId:{
			type:String,
			
		},
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
	mounted() {
		console.log('swiper item 进行挂载 this.uId',this.uId)
	},
	computed: {
		

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
			this.$emit('closeUseroperation');
		},
		/*下拉刷新的回调 */
		downCallback(page) {
			// console.log('进行下拉操作', this.kw,this.uId);
			this.mescroll.resetUpScroll();
		},
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback(page) {
			
			if (page.num == 1) {
				this.goods = [];
			}
			//联网加载数据  判断用户当前所在的 tabber 名，分别进行不同的网络请求
			setTimeout(()=>{
				console.log('进行上拉操作', this.kw,page.num);
				this.$props.kw == 'listVideo'
					? this.getListVideo(page.num)
					: this.$props.kw == 'listTxt'
					? this.getListTxt(page.num)
					: this.$props.kw == 'listUsed'
					? this.getListUsed(page.num)
					: this.$props.kw == 'myTxt'
					? this.getMyTxt(page.num)
					: this.$props.kw == 'myVideo'
					? this.getMyVideo(page.num)
					: this.$props.kw == 'myUsed'
					? this.getMyUsed(page.num)
					: this.$props.kw == 'otherVideo'
					? this.getOtherVideo(page.num)
					: this.$props.kw == 'otherTxt'
					? this.getOtherTxt(page.num)
					: this.$props.kw == 'otherUsed'
					? this.getOtherUsed(page.num)
					: ''
			},0)
		},
		// 下拉加载发起请求
		// 请求首页的 视频数据
		getListVideo(pageNum) {
			console.log('首页',pageNum)
			let _this = this;
			this.api._get(
				'vod/list',
				{
					pageNum: pageNum,
					pageSize: '10'
				},
				function(res) {
					console.log('请求首页的数据 成功', res);
					_this.goods = _this.goods.concat(res.list);
					_this.mescroll.endSuccess(res.list.length);
					console.log('_this.goods',_this.goods);
					// 如果进行网络请求出错，则 取消当前 正在加载的 提示
					_this.mescroll.endSuccess(1);
				},
				function(res) {
					console.log('请求首页的数据 失败',res);
					_this.mescroll.endSuccess(1);
				}
			);
		},
		// 请求 首页文章 数据
		getListTxt(pageNum) {
			let _this = this;
			this.api._get(
				'article/list',
				{
					pageNum: pageNum,
					pageSize: '10'
				},
				function(res) {
					console.log('请求首页的文章 成功', res.data);
					_this.goods = _this.goods.concat(res.data.list);
					
					console.log('请求首页的文章 _this.goods', _this.goods);
					
					_this.mescroll.endSuccess(res.data.list.length);
				},
				function() {
					console.log('请求首页的数据 失败');
					_this.mescroll.endSuccess(1);
				}
			);
		},
		// 请求 首页 二手的数据
		getListUsed(pageNum) {
			let _this = this;
			// 请求首页二手
			this.api._get(
				'secondGoods/list',
				{
					pageNum: pageNum,
					pageSize: '10'
				},
				function(res) {
					console.log('请求首页的二手列表 成功', res.data);
					_this.goods = _this.goods.concat(res.data.list);
					_this.mescroll.endSuccess(res.data.list.length);
					// 如果进行网络请求出错，则 取消当前 正在加载的 提示
				},
				function() {
					console.log('请求首页的数据 失败');
					_this.mescroll.endSuccess(1);
				}
			);
		},
		//请求 我的 视频 数据
		getMyVideo(pageNum){
			let _this = this;
			console.log('请求我的 视频 数据')
			this.api._get(
				'vod/user',
				{
					pageNum: pageNum,
					pageSize: '10'
				},
				function(res) {
					console.log('请求我的文章 成功', res.data);
					_this.goods = _this.goods.concat(res.data.list);
					_this.mescroll.endSuccess(res.data.list.length);
					// 如果进行网络请求出错，则 取消当前 正在加载的 提示
				},
				function() {
					console.log('请求首页的数据 失败');
					_this.mescroll.endSuccess(1);
				},
				function(){
					_this.mescroll.endSuccess(1);
				}
			);
		},
		// 请求 我的 文章数据
		getMyTxt(pageNum) {
			let _this = this;
			this.api._get(
				'article/user',
				{
					pageNum: pageNum,
					pageSize: '10'
				},
				function(res) {
					console.log('请求我的文章 成功', res.data);
					_this.goods = _this.goods.concat(res.data.list);
					_this.mescroll.endSuccess(res.data.list.length);
					// 如果进行网络请求出错，则 取消当前 正在加载的 提示
				},
				function() {
					console.log('请求首页的数据 失败');
					_this.mescroll.endSuccess(1);
				},
				function(){
					_this.mescroll.endSuccess(1);
				}
			);
		},
		// 请求 我的 二手数据
		getMyUsed(pageNum) {
			let _this = this;
			this.api._get(
				'secondGoods/user',
				{
					pageNum: pageNum,
					pageSize: '10'
				},
				function(res) {
					console.log('请求我的二手 成功', res.data);
					_this.goods = _this.goods.concat(res.data.list);
					_this.mescroll.endSuccess(res.data.list.length);
					// 如果进行网络请求出错，则 取消当前 正在加载的 提示
				},
				function() {
					console.log('请求首页的数据 失败');
					_this.mescroll.endSuccess(1);
				},
				function(){
					_this.mescroll.endSuccess(1);
				}
			);
		},
		// 请求 其他作者的 视频
		getOtherVideo(pageNum){
			let _this = this;
			this.api._get(
				'vod/otherUser',
				{
					userId:_this.$props.uId,
					pageNum: pageNum,
					pageSize: '10'
				},
				function(res) {
					console.log('请求其他人视频 成功', res.data);
					_this.goods = _this.goods.concat(res.data.list);
					_this.mescroll.endSuccess(res.data.list.length);
					// 如果进行网络请求出错，则 取消当前 正在加载的 提示
				},
				function() {
					console.log('请求首页的数据 失败');
					_this.mescroll.endSuccess(1);
				}
			);
		},
		// 请求 其他作者的 图文
		getOtherTxt(pageNum){
			let _this = this;
			this.api._get(
				'article/otherUser',
				{
					userId:_this.$props.uId,
					pageNum: pageNum,
					pageSize: '10'
				},
				function(res) {
					console.log('请求其他人的图文 成功', res.data);
					_this.goods = _this.goods.concat(res.data.list);
					_this.mescroll.endSuccess(res.data.list.length);
					// 如果进行网络请求出错，则 取消当前 正在加载的 提示
				},
				function() {
					console.log('请求首页的数据 失败');
					_this.mescroll.endSuccess(1);
				}
			);
		},
		// 请求其他作者的 二手
		getOtherUsed(pageNum){
			let _this = this;
			this.api._get(
				'secondGoods/otherUser',
				{
					userId:_this.$props.uId,
					pageNum: pageNum,
					pageSize: '10'
				},
				function(res) {
					console.log('请求其他人的二手 成功', res.data);
					_this.goods = _this.goods.concat(res.data.list);
					_this.mescroll.endSuccess(res.data.list.length);
					// 如果进行网络请求出错，则 取消当前 正在加载的 提示
				},
				function() {
					console.log('请求首页的数据 失败');
					_this.mescroll.endSuccess(1);
				}
			);
		},
		
		
		
		//点击空布局按钮的回调
		emptyClick() {
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

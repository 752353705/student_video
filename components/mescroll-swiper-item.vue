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
		<!-- 渲染 大赛图文作品 瀑布流 -->
		<block v-if="kw == 'listTxt' || kw == 'myTxt'">
			<block v-if="listData.length === 0"></block>
			<block v-else>
				<wfalls-flow
					ref="waterflow"
					@showUseroperation="showUseroperation"
					@closeUseroperation="closeUseroperation"
					style="{height:400px}"
					:list="listData"
					:kw="kw"
					@jump="jump"
				></wfalls-flow>
			</block>
		</block>
		<!-- 渲染我的 作品 -->
		<block v-if="kw == 'otherTxt'">
			<block v-if="listData.length === 0"></block>
			<block v-else>
				<wfalls-flow
					ref="waterflow"
					@showUseroperation="showUseroperation"
					@closeUseroperation="closeUseroperation"
					style="{height:400px}"
					:list="listData"
					:kw="kw"
					@jump="jump"
				></wfalls-flow>
			</block>
		</block>
		<!-- 渲染保定 农大作品 -->
		<block v-if="kw == 'baoding' || kw == 'nongda'">
			<mescroll-empty @emptyclick="emptyClick" v-if="listData.length == 0" :option="emptyOption"></mescroll-empty>
			<block v-else><news-water :newsList="listData"></news-water></block>
		</block>
	</mescroll-uni>
</template>

<script>
import MescrollEmpty from '@/components/mescroll-uni/components/mescroll-empty.vue';
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import MescrollMoreItemMixin from '@/components/mescroll-uni/mixins/mescroll-more-item.js';

// 作品展示列表
import wfallsFlow from '@/components/wfallsflow.vue';
// 文化宣传列表
import newsWater from '@/components/newsWater.vue';
// import newsWaterNong from '@/components/newsWaterNong.vue';

export default {
	mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
	components: {
		MescrollEmpty,
		wfallsFlow,
		newsWater,
	},
	data() {
		return {
			item_data: [], //列表数据
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
				noMoreSize: 4 ,//如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
				offset: 200
			},
		};
	},
	props: {
		listData: {
			type: Array
		},
		// 定义高度
		waterFullHeight: {
			type: Number
		},
		// 关键词
		kw: {
			type: String
		},
		// 赛事	id
		subjectId: {
			type: String,
			default: ''
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
		// 自定义显示 上拉加载时 距离页面底部的 位置
		mescrollBot: {
			type: Number,
			default() {
				return 0;
			}
		}
	},
	mounted() {
		// console.log('kw', this.kw);
	},
	computed: {
		// 将空页面的布局 对 data中 的数据进行赋值
		changeEmpty() {
			this.option = this.$props.emptyOption;
		}
	},
	methods: {
		// 控制用户操作弹窗的显隐
		showUseroperation(btntop, btnleft) {
			this.$emit('showUseroperation', btntop, btnleft);
		},
		// 触发瀑布流中删除的方法
		swiperDelArticle(txtid) {
			// 删除当前 listData中 相同id 的文章
			// this.$refs.waterflow.delArticle(column,row)
			this.listData.forEach((item, index) => {
				if (item.id === txtid) {
					this.listData.splice(index, 1);
				}
			});
		},
		// 控制页面数据进行主动刷新
		refash() {
			this.mescroll.resetUpScroll(false);
		},
		// 用于关闭弹窗
		closeUseroperation(num) {
			this.$emit('closeUseroperation');
		},
		/*下拉刷新的回调 */
		downCallback(page) {
			// console.log('下拉刷新')
			this.mescroll.resetUpScroll();
		},
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback(page) {
			// console.log('上拉加载')
			//联网加载数据  判断用户当前所在的 tabber 名，分别进行不同的网络请求
			setTimeout(() => {
					this.$emit(
						'getData',
						{
							pageNum : page.num,
						},
						(res) => {
							// console.log('mescroll-item 上拉listData',this.listData)
							this.mescroll.endSuccess(res);
						})
			}, 0);
		},
		//点击空布局按钮的回调
		emptyClick() {
			// 重新进行网络请求
			this.downCallback();
		}
	}
};
</script>

<style lang="scss">
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

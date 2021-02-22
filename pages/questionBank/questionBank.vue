<template>
	<view class="question">
		<!-- 答题完毕 显示 结束答题界面  -->
		<solt-end v-if="show_act == question_list.length"></solt-end>
		<!-- 渲染题目  -->
		<form v-if="show_act < question_list.length + 1" class="list" @submit="formSubmit">
			<view class="item" v-for="(item, index) in question_list" :key="index" v-if="index == show_act">
				<!-- 题目 -->
				<view class="tit text_left ">
					<!-- 表明题目类型 -->
					<text class="type text_center f_10" v-if="item.quitType == 0">单选题</text>
					<text class="type text_center f_10" v-if="item.quitType == 1">多选题</text>
					<text class="type text_center f_10" v-if="item.quitType == 2">判断题</text>
					<!-- <view class="">{{item.quizQuestion}}</view> -->
					{{ item.quizQuestion }}
				</view>

				<!-- 单选 以及 判断 选项 -->
				<radio-group name="radio" v-if="item.quitType == 0 || item.quitType == 2" @change="radioChange">
					<label class="ma_t10 uni-list-cell uni-list-cell-pd dis_flex_start item-center " 
						v-for="(item2, index2) in item.quizChoice" :key="item2.value"
						v-if="item2.value"
						>
						<radio color="#ff9933" :value="item2.index" />
						<view>{{ item2.value }}</view>
					</label>
				</radio-group>

				<!-- 多选 -->
				<checkbox-group name="checkbox" v-if="item.quitType == 1" @change="checkboxChange">
					<label class="ma_t10 dis_flex_start item-center" v-for="(item2, index2) in item.quizChoice" :key="item2.value">
						<checkbox :value="item2.index" />
						<view>{{ item2.value }}</view>
					</label>
				</checkbox-group>

				<!-- 当为多选的时候 显示 确认答案按钮 -->
				<button v-if="item.quitType == 1" form-type="submit">确认答案</button>

				<!-- 当用户选错 答案之后对其进行提示 -->
				<view v-if="result_state" class="result text_center">回答错误,请在仔细想想哦~</view>
			</view>
		</form>
	</view>
</template>

<script>
import soltEnd from './end.vue';
export default {
	data() {
		return {
			subjectId:'',
			// 题库信息
			question_list: [''],
			// 当前展示第几题
			show_act: 0,
			// 控制 判断用户当前问题 回答的 对 或 错
			result_state: false
		};
	},
	components: {
		soltEnd
	},
	onLoad(options) {
		this.subjectId = options.subjectId
		// 获取答题信息
		this.getQuestionList();
	},
	methods: {
		// 获取 相关 题目信息
		getQuestionList() {
			this.http({
				url: 'question/list',
				data:{
					subjectId: this.subjectId || 18,
					pageNum: 1,
					pageSize: 10
				}
			}).then(res => {
				// console.log('获取res', res.data.list);
				// 对 返回结果进行改造
				let data = res.data.list
				data.forEach((item,index) => {
					data[index].quizAnswer = item.quizAnswer.split(',')
					data[index].quizChoice = JSON.parse(item.quizChoice)
				})
				this.question_list = data;
			});
		},
		// 单选
		radioChange(e) {
			// console.log('单选框 e', e.detail.value);
			let radio_val = e.detail.value;
			let answer = this.question_list[this.show_act].quizAnswer[0];
			// 将当前 单选选中的值 与 正确答案做对比
			if (radio_val == answer) {
				// 争取 跳转到下一题
				this.result_state = false;
				this.show_act++;
			} else {
				this.result_state = true;
			}
		},

		// 多选
		checkboxChange(e) {
			// console.log('多选框 e', e);
			// 多选框的 值
			let checkbox_value = e.detail.value;
		},
		// 多选进行 确认答案
		formSubmit(e) {
			// 多选框选中的答案
			let checkbox_value = e.detail.value.checkbox;
			let answer = this.question_list[this.show_act].quizAnswer;
			console.log('多选', checkbox_value, answer);
			// 当多选的内容 与 正确答案一致的时候，进行下一题
			if (this.arrayIsEqual(checkbox_value, answer)) {
				this.result_state = false;
				this.show_act++;
			} else {
				this.result_state = true;
			}
		},
		// 将多选框的数组与 正确答案进行对比
		arrayIsEqual(a1, a2) {
			// 状态
			let status = true;

			// 长度相同
			if (a1.length !== a2.length) {
				return false;
			}
			// 值相同
			a1.forEach((item, index) => {
				if (a2.indexOf(item) == -1) {
					status = false;
				}
			});
			return status;
		}
	}
};
</script>

<style>
checkbox .wx-checkbox-input {
	border-radius: 50% !important;
	/* color: #ffffff !important; */
}

checkbox .wx-checkbox-input.wx-checkbox-input-checked {
	color: #fff;
	background: #ff9933;
}

/* .wx-checkbox-input.wx-checkbox-input-checked {
				border: none !important;
			} */
</style>

<style lang="scss" scoped>
// 去除 button 的默认样式
button::after {
	border: none;
}
button {
	background-color: $bg-color;
	border-radius: 10rpx;
	margin-top: 60rpx;
	color: #ffffff;
}

.question {
	padding: 16rpx 20rpx;
	.list {
		.item {
			.tit {
				.type {
					display: inline-block;
					line-height: 40rpx;
					color: #ffffff;
					background-color: #3399ff;
					border-radius: 10rpx 10rpx 0rpx 10rpx;
					padding: 0rpx 20rpx;
					margin-right: 20rpx;
				}
			}
			.result {
				color: red;
				margin-top: 100rpx;
			}
		}
	}
}
</style>
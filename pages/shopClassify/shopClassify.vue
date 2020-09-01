<template>
	<view class="content">
		<scroll-view scroll-y class="left-aside">
			<view v-for="item in flist" :key="item.id" class="f-item b-b" :class="{active: item.id === currentId}" @click="tabtap(item)">
				{{item.name }}{{item.id}}
			</view>
		</scroll-view>
		<scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop">
			<view v-for="item in slist" :key="item.id" class="s-list" :id="'main-'+item.id">
				<text class="s-item">{{item.name}}</text>
				<view class="t-list">
					<view @click="navToList(item.id, titem.id)" v-if="titem.pid === item.id" class="t-item" v-for="titem in tlist" :key="titem.id">
						<image :src="titem.picture"></image>
						<text>{{titem.name}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import Json from '../../Json.js' //测试用数据
	export default {
		data() {
			return {
				sizeCalcState: false,
				tabScrollTop: 0,
				currentId: 1,
				flist: [],
				slist: [],
				tlist: [],
			}
		},
		onLoad(){
			this.loadData();
		},
		onReady() {
			// this.calcSize(); 
		},
		methods: {
			// 模拟异步请求数据
			getgoods(type){
				return new Promise(resolve=>{
					setTimeout(()=>{
						resolve(Json[type]);
					}, 500)
				})
			},
			async loadData(){
				let list = await this.getgoods('cateList');
				list.forEach(item=>{
					if(!item.pid){
						this.flist.push(item); //左侧的分类
					}else if(!item.picture){
						this.slist.push(item); //商品每一类的名称 没有图的是2级分类
					}else{
						this.tlist.push(item); // 没意见详细 的 商品
					}
				})
				 
				console.log('this.flist ==>',this.flist) 
				console.log('this.slist ==>',this.slist) 
				console.log('this.tlist ==>',this.tlist) 
				
			},
			//一级分类点击
			tabtap(item){
				console.log('点击一级分类')
				if(!this.sizeCalcState){
					this.calcSize();
				} 
				
				this.currentId = item.id;
				let index = this.slist.findIndex(sitem=>sitem.pid === item.id);
				console.log('index',index)
				this.tabScrollTop = this.slist[index].top;
			},
			//右侧栏滚动
			asideScroll(e){
				// console.log('右侧栏进行滚动')
				if(!this.sizeCalcState){
					this.calcSize();
				}
				let scrollTop = e.detail.scrollTop;
				let tabs = this.slist.filter(item=>item.top <= scrollTop).reverse();
				console.log('tabs ==》',tabs,'this.slist.filter(item=>item.top <= scrollTop)',this.slist.filter(item=>item.top <= scrollTop))
				if(tabs.length > 0){
					this.currentId = tabs[0].pid;
					console.log('this.currentId',this.currentId)
				}
			},
			//计算右侧栏每个tab的高度等信息
			calcSize(){
				let h = 0;
				this.slist.forEach(item=>{
					let view = uni.createSelectorQuery().select("#main-" + item.id);
					view.fields({
						size: true
					}, data => {
						item.top = h;
						h += data.height;
						item.bottom = h;
						// console.log('计算每一项的高度 data',data)
					}).exec();
				})
				this.sizeCalcState = true;
			},
			navToList(sid, tid){
				console.log('跳转到一大品类的 商品展示区')
				// uni.navigateTo({
				// 	url: `/pages/product/list?fid=${this.currentId}&sid=${sid}&tid=${tid}`
				// })
			}
		}
	}
</script>

<style lang='scss'>
	page,
	.content {
		height: 100%;
		background-color: #f8f8f8;
	}

	.content {
		display: flex;
	}
	.left-aside {
		flex-shrink: 0;
		width: 200upx;
		height: 100%;
		background-color: #fff;
	}
	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
		color: #606266;
		position: relative;
		&.active{
			color: #fa436a;
			background: #f8f8f8;
			&:before{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				background-color: #fa436a;
				border-radius: 0 4px 4px 0;
				opacity: .8;
			}
		}
	}

	.right-aside{
		flex: 1;
		overflow: hidden;
		padding-left: 20upx;
	}
	.s-item{
		display: flex;
		align-items: center;
		height: 70upx;
		padding-top: 8upx;
		font-size: 28upx;
		color: #303133;
	}
	.t-list{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background: #fff;
		padding-top: 12upx;
		&:after{
			content: '';
			flex: 99;
			height: 0;
		}
	}
	.t-item{
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 176upx;
		font-size: 26upx;
		color: #666;
		padding-bottom: 20upx;
		
		image{
			width: 140upx;
			height: 140upx;
		}
	}
</style>

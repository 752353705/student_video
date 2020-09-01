<template>
	<view class="container">
		<!-- 商品 轮播图 -->
		<swiper class="goodsimgs" indicator-dots circular="true" duration="400" autoplay="true">
			<swiper-item class="swiper-item" v-for="(item, index) in goods.gallery" :key="index">
				<view class="image-wrapper"><image :src="item" class="loaded" background-size="cover"></image></view>
			</swiper-item>
		</swiper>
		
		<!-- 商品分享 -->
		<view class='goods_name'>
		  <view class='goods_name_left jhx_f10'>{{goods.name}}</view>
		  <view class="goods_name_right iconfont icon-fenxiang" @tap="shareFriendOrCircle">分享</view>
		</view>
		<view class="share-pop-box" :hidden="!openShare">
		  <view class="share-pop">
		    <view class="close" @tap="closeShare">
		      <image class="icon" src="/static/images/icon_close.png"></image>
		    </view>
		    <view class='share-info'>
		      <button class="sharebtn" open-type="share" v-if="!isGroupon">
		        <image class='sharebtn_image' src='/static/weixin.png'></image>
		        <view class='sharebtn_text'>分享给好友</view>
		      </button>
		      <!-- <button  class="savesharebtn" open-type="openSetting" bindopensetting="handleSetting" v-if="(!isGroupon) && (!canWrite)" >
		        <image class='sharebtn_image' src='/static/images/friend.png'></image>
		        <view class='sharebtn_text'>发朋友圈</view>
		      </button>
		      <button class="savesharebtn" @tap="saveShare" v-if="!isGroupon && canWrite">
		        <image class='sharebtn_image' src='/static/images/friend.png'></image>
		        <view class='sharebtn_text'>发朋友圈</view>
		      </button> -->
		    </view>
		  </view>
		</view>
		
		
		<!-- 商品详情 -->
		<view class="goods-info">
		  <view class="c">
		    <text class="desc jhx_f11">{{goods.brief}}</text>
		    <view class="price">
		      <view class="retailPrice jhx_f8">￥{{checkedSpecPrice}}</view>
		      <view class="counterPrice jhx_f9">￥{{goods.counterPrice}}</view>
		    </view>
		
		    <view class="brand" v-if="brand.name">
		      <navigator hover-class="none" :url=" '../brandDetail/brandDetail?id=' + brand.id">
		        <text>{{brand.name}}</text>
		      </navigator>
		    </view>
		  </view>
		</view>
		
		<!-- 规格数量选择 -->
		<view class="section-nav section-attr" @click="switchAttrPop">
		  <view class="t jhx_f4">{{checkedSpecText}}</view>
		  <image class="i jhx_f6" src="/static/images/address_right.png" background-size="cover"></image>
		</view>
		
		<!-- 商品参数 -->
		<view class="goods-attr">
		  <view class="t jhx_f4">商品参数</view>
		  <view class="l">
		    <view class="item" v-for="(item) in attribute" :key="item.name">
		      <text class="left">{{item.attribute}}</text>
		      <text class="right">{{item.value}}</text>
		    </view>
		  </view>
		</view>
		
		<!-- 商品详情图片 -->
		<!-- <view class="detail">
		  <import src="/lib/wxParse/wxParse.wxml" />
		  <template is="wxParse" :data-wxParseData="goodsDetail.nodes" />
		</view> -->
		
		
		<!-- 规格选择界面 -->
		<view class="attr-pop-box" v-if="openAttr" >
		  <view class="attr-pop">
		    <view class="close" @tap="closeAttr">
		      <image class="icon" src="/static/images/icon_close.png"></image>
		    </view>
		    <view class="img-info">
		      <image class="img" :src="checkSpecificationUrl || goods.picUrl"></image>
		      <view class="info">
		        <view class="c">
		          <view class="p">价格：￥{{checkedSpecPrice}}</view>
		          <view class="a">{{tmpSpecText}}</view>
		        </view>
		      </view>
		    </view>
		    <view class="spec-con">
		     <view class="spec-item" v-for=" (item,index) in specificationList" :key="item.name">
		        <view class="name">{{item.name}}</view>
		        <view class="values">
		          <view :class="[vitem.checked ? 'selected value' : 'value']" @tap="clickSkuValue" 
								v-for=" (vitem) in item.valueList" :key="index" :data-value-id="vitem.id" :data-name="vitem.specification">
							{{vitem.value}}
						</view>
		        </view>
		      </view>
		     <view class="spec-con" v-if="groupon.length > 0">
		        <view class="spec-item">
		          <view class="name">团购立减</view>
		          <view class="values">
		            <view class="[ vitem.checked ? 'selected value' : 'value']" @tap="clickGroupon" 
									v-for="(vitem) in groupon"  :key="vitem.id" :data-value-id="vitem.id" :data-name="vitem.specification"
									>
									￥{{vitem.discount}} ({{vitem.discountMember}}人)</view>
		          </view>
		        </view>
		      </view>
		     <view class="number-item">
		        <view class="name">数量</view>
		        <view class="selnum">
		          <view class="cut" @tap="cutNumber">-</view>
		          <input :value="number" class="number" disabled="true" type="number" />
		          <view class="add" @tap="addNumber">+</view>
		        </view>
		      </view>
		    </view>
		  </view>
		</view>
		
		<!-- 底部按钮 -->
		<view class="bottom-btn">
		  <view class="l l-collect" @tap="addCollectOrNot" v-if="!isGroupon">
		    <image class="icon" :src="collectImage"></image>
		  </view>
		  <view class="l l-cart" v-if="!isGroupon">
		    <view class="box">
		      <text class="cart-count">{{cartGoodsCount}}</text>
		      <image @tap="openCartPage" class="icon" src="/static/images/ic_menu_shoping_nor.png"></image>
		    </view>
		  </view>
		  <view class="r" @tap="addToCart" v-if="!soldout && !isGroupon" >加入购物车</view>
		  <view class="c" @tap="addFast" v-if="!soldout">{{isGroupon?'参加团购':'立即购买'}}</view>
		  <view class="n" v-if="soldout">商品已售空</view>
		</view>
	</view>
</template>

<script>
var WxParse = require('../../lib/wxParse/wxParse.js');
export default {
	components: {},
	data() {
		return {
			id: 23851,
			goods: {},
			groupon: [], //该商品支持的团购规格
			grouponLink: {}, //参与的团购
			attribute: [],
			issueList: [],
			comment: [],
			brand: {},
			specificationList: [],
			productList: [],
			relatedGoods: [],
			cartGoodsCount: 0,
			userHasCollect: 0,
			number: 1,
			checkedSpecText: '规格数量选择',
			tmpSpecText: '请选择规格数量',
			checkedSpecPrice: 0,
			openAttr: false,
			openShare: false,
			noCollectImage: '/static/images/icon_like.png',
			hasCollectImage: '/static/images/icon_like_checked.png',
			collectImage: '/static/images/icon_like.png',
			shareImage: '',
			isGroupon: false, //标识是否是一个参团购买
			soldout: false,
			canWrite: false //用户是否获取了保存相册的权限
		};
	},
	onLoad(options) {
		console.log('shopdetail', options);
		// 测试
		this.getGoodsInfo();

		// 页面初始化 options为页面跳转所带来的参数
		if (options.id) {
			// this.setData({
			//   id: parseInt(options.id)
			// });
			this.id = parseInt(options.id);
			this.getGoodsInfo();
		}

		if (options.grouponId) {
			// this.setData({
			//   isGroupon: true,
			// });
			this.isGroupon = true;
			this.getGrouponInfo(options.grouponId);
		}
		let that = this;
		wx.getSetting({
			success: function(res) {
				console.log(res);
				//不存在相册授权
				if (!res.authSetting['scope.writePhotosAlbum']) {
					wx.authorize({
						scope: 'scope.writePhotosAlbum',
						success: function() {
							// that.setData({
							//     canWrite: true
							// })
							that.canWrite = true;
						},
						fail: function(err) {
							// that.setData({
							//     canWrite: false
							// })
							that.canWrite = false;
						}
					});
				} else {
					// that.setData({
					//     canWrite: true
					// });
					that.canWrite = true;
				}
			}
		});
	},

	onShow() {
		let that = this
		// 获取当前 购物车之中 商品数量
		this.api._get('cart/goodscount',{
			id:that.id
		},function( res ){
			// console.log('res',res)
			that.cartGoodsCount = res.data
		})
	},
	// 页面分享
	onShareAppMessage: function() {
	  let that = this;
	  let userInfo = wx.getStorageSync('userInfo');
	  let shareUserId = 1;
	  if (userInfo) {
	    shareUserId = userInfo.userId;
	  }
	  // console.log('分享地址：' + '/pages/index/index?goodId=' + this.id + '&shareUserId=' + shareUserId);
	  return {
	    title: that.goods.name,
	    desc: '好货分享',
	    path: '/pages/index/index?goodId=' + this.id + '&shareUserId=' + shareUserId
	  }
	},
	methods: {
		shareFriendOrCircle: function() {
		  //var that = this;
		  if (this.openShare === false) {
		    this.openShare = !this.openShare
		  } else {
		    return false;
		  }
		},
		
		
		//立即购买（先自动加入购物车）
		addFast: function() {
		  var that = this;
		  if (this.openAttr == false) {
		    //打开规格选择窗口
		    this.openAttr = !this.openAttr
		  } else {
		
		    //提示选择完整规格
		    if (!this.isCheckedAllSpec()) {
		      wx.showToast({
		        image: '/static/images/icon_error.png',
		        title: '请选择完整规格'
		      });
		      return false;
		    }
		
		    //根据选中的规格，判断是否有对应的sku信息
		    let checkedProductArray = this.getCheckedProductItem(this.getCheckedSpecKey());
		    if (!checkedProductArray || checkedProductArray.length <= 0) {
		      //找不到对应的product信息，提示没有库存
		      wx.showToast({
		        image: '/static/images/icon_error.png',
		        title: '没有库存'
		      });
		      return false;
		    }
		
		    let checkedProduct = checkedProductArray[0];
		    //验证库存
		    if (checkedProduct.number <= 0) {
		      wx.showToast({
		        image: '/static/images/icon_error.png',
		        title: '没有库存'
		      });
		      return false;
		    }
		
		    //验证团购是否有效
		    let checkedGroupon = this.getCheckedGrouponValue();
		
		    //立即购买
				this.api._post('cart/fastadd',{
					goodsId: this.goods.id,
					number: this.number,
					productId: checkedProduct.id
				},function(res) {
		        if (res.errno == 0) {
					
							
		          // 如果storage中设置了cartId，则是立即购买，否则是购物车购买
		          try {
		            wx.setStorageSync('cartId', res.data);
		            wx.setStorageSync('grouponRulesId', checkedGroupon.id);
		            wx.setStorageSync('grouponLinkId', that.grouponLink.id);
								
		            uni.navigateTo({
		              url: '/pages/order/creatOrder'
		            })
		          } catch (e) {}
		
		        } else {
		          wx.showToast({
		            image: '/static/images/icon_error.png',
		            title: res.errmsg,
		            mask: true
		          });
		        }
		      })
				
		  }
		
		
		},
		//添加或是取消收藏
		addCollectOrNot: function() {
		  let that = this;
			
			this.api._post('collect/addordelete',{
				type: 0,
				valueId: this.id
			},function(res) {
		      let _res = res;
		      if (_res.errno == 0) {
		        if (_res.data.type == 'add') {
		          that.collectImage = that.hasCollectImage
		        } else {
		          that.collectImage = that.noCollectImage
		        }
		
		      } else {
		        wx.showToast({
		          image: '/static/images/icon_error.png',
		          title: _res.errmsg,
		          mask: true
		        });
		      }
		
		    })
			
		
		},
		//获取选中的团购信息
		getCheckedGrouponValue: function() {
		  let checkedValues = {};
		  let _grouponList = this.groupon;
		  for (let i = 0; i < _grouponList.length; i++) {
		    if (_grouponList[i].checked) {
		      checkedValues = _grouponList[i];
		    }
		  }
		
		  return checkedValues;
		},
		
		// 获取商品信息
		getGoodsInfo: function() {
			let that = this;
			this.api._get(
				'goods/detail',
				{
					id: that.id
				},
				function(res) {
					if (res.errno === 0) {
						let _specificationList = res.data.specificationList;
						// 如果仅仅存在一种货品，那么商品页面初始化时默认checked
						if (_specificationList.length == 1) {
							if (_specificationList[0].valueList.length == 1) {
								_specificationList[0].valueList[0].checked = true;

								// 如果仅仅存在一种货品，那么商品价格应该和货品价格一致
								// 这里检测一下
								let _productPrice = res.data.productList[0].price;
								let _goodsPrice = res.data.info.retailPrice;
								if (_productPrice != _goodsPrice) {
									console.error('商品数量价格和货品不一致');
								}

								// that.setData({
								// 	checkedSpecText: _specificationList[0].valueList[0].value,
								// 	tmpSpecText: '已选择：' + _specificationList[0].valueList[0].value
								// });
								that.checkedSpecText = _specificationList[0].valueList[0].value;
								that.tmpSpecText = '已选择：' + _specificationList[0].valueList[0].value;
							}
						}

						that.goods = res.data.info;
						that.attribute = res.data.attribute;
						that.issueList = res.data.issue;
						that.comment = res.data.comment;
						that.brand = res.data.brand;
						that.specificationList = res.data.specificationList;
						that.productList = res.data.productList;
						that.userHasCollect = res.data.userHasCollect;
						that.shareImage = res.data.shareImage;
						that.checkedSpecPrice = res.data.info.retailPrice;
						that.groupon = res.data.groupon;

						//如果是通过分享的团购参加团购，则团购项目应该与分享的一致并且不可更改
						if (that.isGroupon) {
							let groupons = that.groupon;
							for (var i = 0; i < groupons.length; i++) {
								if (groupons[i].id != that.grouponLink.rulesId) {
									groupons.splice(i, 1);
								}
							}
							groupons[0].checked = true;
							//重设团购规格
							// that.setData({
							// 	groupon: groupons
							// });
							that.groupon = groupons;
						}

						if (res.data.userHasCollect == 1) {
							// that.setData({
							// 	collectImage: that.data.hasCollectImage
							// });
							that.collectImage = that.hasCollectImage;
						} else {
							// that.setData({
							// 	collectImage: that.data.noCollectImage
							// });
							that.collectImage = that.noCollectImage;
						}

						WxParse.wxParse('goodsDetail', 'html', res.data.info.detail, that);
						//获取推荐商品
						// that.getGoodsRelated();
					}
				}
			);
		},

		//从分享的团购进入
		getGrouponInfo: function(grouponId) {
			let that = this;
			util
				.request(api.GroupOnJoin, {
					grouponId: grouponId
				})
				.then(function(res) {
					if (res.errno === 0) {
						that.setData({
							grouponLink: res.data.groupon,
							id: res.data.goods.id
						});
						//获取商品详情
						that.getGoodsInfo();
					}
				});
		},
	
		// 打开规格数量选择
		switchAttrPop: function() {
		  if (this.openAttr == false) {
		    this.openAttr = !this.openAttr
		  }
		},
		closeAttr: function() {
		  this.openAttr = false
		},
		
		// 规格选择
		clickSkuValue: function(event) {
		  let that = this;
		  let specName = event.currentTarget.dataset.name;
		  let specValueId = event.currentTarget.dataset.valueId;
		
		  //判断是否可以点击
		
		  //TODO 性能优化，可在wx:for中添加index，可以直接获取点击的属性名和属性值，不用循环
		  let _specificationList = this.specificationList;
		  for (let i = 0; i < _specificationList.length; i++) {
		    if (_specificationList[i].name === specName) {
		      for (let j = 0; j < _specificationList[i].valueList.length; j++) {
		        if (_specificationList[i].valueList[j].id == specValueId) {
		          //如果已经选中，则反选
		          if (_specificationList[i].valueList[j].checked) {
		            _specificationList[i].valueList[j].checked = false;
		          } else {
		            _specificationList[i].valueList[j].checked = true;
		            //选择了，则判断当前是否有图片，且图片内容不能为空，不能为默认lazy图片，则替换
		            that.setSpecificationUrl(_specificationList[i].valueList[j].picUrl);
		          }
		        } else {
		          _specificationList[i].valueList[j].checked = false;
		        }
		      }
		    }
		  }
		  this.specificationList = _specificationList
		  //重新计算spec改变后的信息
		  this.changeSpecInfo();
		
		  //重新计算哪些值不可以点击
		},
		//获取选中的规格信息
		getCheckedSpecValue: function() {
		  let checkedValues = [];
		  let _specificationList = this.specificationList;
		  for (let i = 0; i < _specificationList.length; i++) {
		    let _checkedObj = {
		      name: _specificationList[i].name,
		      valueId: 0,
		      valueText: ''
		    };
		    for (let j = 0; j < _specificationList[i].valueList.length; j++) {
		      if (_specificationList[i].valueList[j].checked) {
		        _checkedObj.valueId = _specificationList[i].valueList[j].id;
		        _checkedObj.valueText = _specificationList[i].valueList[j].value;
		      }
		    }
		    checkedValues.push(_checkedObj);
		  }
		
		  return checkedValues;
		},
		setSpecificationUrl: function (picUrl){
		  if (picUrl && picUrl.length > 1 && picUrl.indexOf("lazyload.png") == -1)
		  this.checkSpecificationUrl = picUrl
		},
		// 规格改变时，重新计算价格及显示信息
		changeSpecInfo: function() {
		  let checkedNameValue = this.getCheckedSpecValue();
		
		  //设置选择的信息
		  let checkedValue = checkedNameValue.filter(function(v) {
		    if (v.valueId != 0) {
		      return true;
		    } else {
		      return false;
		    }
		  }).map(function(v) {
		    return v.valueText;
		  });
		  if (checkedValue.length > 0) {
		    this.tmpSpecText = checkedValue.join('　')
		  } else {
		    this.tmpSpecText = '请选择规格数量'
		  }
		
		  if (this.isCheckedAllSpec()) {
		    this.checkedSpecText = this.tmpSpecText
		
		    // 规格所对应的货品选择以后
		    let checkedProductArray = this.getCheckedProductItem(this.getCheckedSpecKey());
		    if (!checkedProductArray || checkedProductArray.length <= 0) {
		      this.soldout = true
		      console.error('规格所对应货品不存在');
		      return;
		    }
		
		    let checkedProduct = checkedProductArray[0];
		    if (checkedProduct.number > 0) {
		      this.checkedSpecPrice = checkedProduct.price
		       this.soldout = false
		    } else {
		      this.checkedSpecPrice = this.goods.retailPrice,
		        this.soldout = true
		    }
		
		  } else {
		    this.checkedSpecText = '规格数量选择',
		      this.checkedSpecPrice = this.goods.retailPrice,
		      this.soldout = false
		  }
		
		},
	
		//判断规格是否选择完整
		isCheckedAllSpec: function() {
		  return !this.getCheckedSpecValue().some(function(v) {
		    if (v.valueId == 0) {
		      return true;
		    }
		  });
		},
		getCheckedSpecKey: function() {
		  let checkedValue = this.getCheckedSpecValue().map(function(v) {
		    return v.valueText;
		  });
		  return checkedValue;
		},
		// 获取选中的产品（根据规格）
		getCheckedProductItem: function(key) {
		  return this.productList.filter(function(v) {
		    console.log(key.toString() + "--" + v.specifications.toString());
		    if (v.specifications.toString() == key.toString()) {
		      return true;
		    } else {
		      return false;
		    }
		  });
		},
	
		addNumber: function() {
		  this.number = this.number + 1
		},
		
		//添加到购物车
		addToCart: function() {
		  var that = this;
		  if (this.openAttr == false) {
		    //打开规格选择窗口
		    this.openAttr = !this.openAttr
		  } else {
		    //提示选择完整规格
		    if (!this.isCheckedAllSpec()) {
		      wx.showToast({
		        image: '/static/images/icon_error.png',
		        title: '请选择完整规格'
		      });
		      return false;
		    }
		
		    //根据选中的规格，判断是否有对应的sku信息
		    let checkedProductArray = this.getCheckedProductItem(this.getCheckedSpecKey());
		    if (!checkedProductArray || checkedProductArray.length <= 0) {
		      //找不到对应的product信息，提示没有库存
		      wx.showToast({
		        image: '/static/images/icon_error.png',
		        title: '没有库存'
		      });
		      return false;
		    }
		
		    let checkedProduct = checkedProductArray[0];
		    //验证库存
		    if (checkedProduct.number <= 0) {
		      wx.showToast({
		        image: '/static/images/icon_error.png',
		        title: '没有库存'
		      });
		      return false;
		    }
		
		    //添加到购物车
				this.api._post('cart/add',{
					goodsId: this.goods.id,
					number: this.number,
					productId: checkedProduct.id
				},function(res) {
		        let _res = res;
		        if (_res.errno == 0) {
		          wx.showToast({
		            title: '添加成功'
		          });
								that.openAttr = !that.openAttr,
		            that.cartGoodsCount = _res.data
		          if (that.userHasCollect == 1) {
		            that.collectImage = that.hasCollectImage
		          } else {
		            that.collectImage = that.noCollectImage
		          }
		        } else {
		          wx.showToast({
		            image: '/static/images/icon_error.png',
		            title: _res.errmsg,
		            mask: true
		          });
		        }
		
		      })			
		  }
		
		},
	
		cutNumber: function() {
		  this.number = (this.number - 1 > 1) ? this.number - 1 : 1
		},
		openCartPage: function() {
		  uni.navigateTo({
		    url: '/pages/shopcar/shopcar'
		  });
		},
		
		closeShare: function() {
		  this.openShare = false
		},
	}
};
</script>

<style lang="scss">
.container {
	margin-bottom: 100rpx;
}

.goodsimgs {
	width: 750rpx;
	height: 750rpx;
}

.goodsimgs image {
	width: 750rpx;
	height: 750rpx;
}

.commodity_screen {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background: #000;
	opacity: 0.2;
	overflow: hidden;
	z-index: 1000;
	color: #fff;
}

.commodity_attr_box {
	width: 100%;
	overflow: hidden;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 2000;
	background: #fff;
	padding-top: 20rpx;
}

.goods-info {
	width: 750rpx;
	height: 300rpx;
	overflow: hidden;
	background: #fff;
}

.goods-info .c {
	display: block;
	width: 718.75rpx;
	height: 100%;
	margin-left: 31.25rpx;
	padding: 18rpx 31.25rpx 38rpx 0;
	border-bottom: 1px solid #f4f4f4;
}

.goods-info .c text {
	display: block;
	width: 687.5rpx;
	text-align: left;
}

.goods_name {
	/* border: 1px solid black; */
	height: 90rpx;
	line-height: 86rpx;
	border-bottom: 1px solid #fafafa;
}

.goods_name_left {
	/* border: 1px solid #757575; */
	float: left;
	height: 90rpx;
	line-height: 86rpx;
	margin-left: 25rpx;
	width: 76%;
	letter-spacing: 1rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.goods_name_right {
	float: right;
	font-weight: 550;
	margin-top: 28rpx;
	width: 18%;
	height: 90rpx;
	line-height: 85rpx;
	padding: 0;
	margin: 0;
	margin-right: 0rpx;
	text-align: center;
	font-size: 30rpx;
	color: #f4f4f4;
	border-top-left-radius: 50rpx;
	border-bottom-left-radius: 50rpx;
	border-top-right-radius: 0rpx;
	border-bottom-right-radius: 0rpx;
	letter-spacing: 3rpx;
	/* background-image: linear-gradient(to right, #ff7701 100%); */
	background-image: linear-gradient(to right, #f3d10e 0%, #f48f18 100%);
}

.goods-info .desc {
	height: 43rpx;
	margin-bottom: 41rpx;
	line-height: 36rpx;
}

.goods-info .price {
	height: 70rpx;
	align-content: center;
}

.goods-info .counterPrice {
	padding-left: 5%;
	text-decoration: line-through;
}

.goods-info .retailPrice {
	float: left;
	padding-left: 0rpx;
}

.goods-info .brand {
	margin-top: 23rpx;
	min-height: 40rpx;
	text-align: left;
}

.goods-info .brand text {
	display: inline-block;
	width: auto;
	padding: 2px 30rpx 2px 10.5rpx;
	line-height: 35.5rpx;
	border: 1px solid #f48f18;
	font-size: 26rpx;
	color: #f48f18;
	border-radius: 4px;
	background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAASCAMAAABVab95AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABFUExURUdwTPSPGPSPGPSPGPSPGPSPGPSPGPSPGPSPGPSPGPSPGPSPGPSPGPSPGPSPGPSPGPSPGPSPGPSPGPSPGPSPGPSPGPSPGPYJSdIAAAAWdFJOUwAWD/DBJz/LB/iy5Omi0N0eMpVL01IOd4F9AAAAVUlEQVQI113OUQ6AIAwDUIbIRBBUtPc/qiZuzriv97G0dXysTo7RRiExstoHlE08BQxRPX+8IHXNuX2qdxRjtoeuESn+wqzOM8ozguo7p6Lp4MAkugBtDwOjtuSdGAAAAABJRU5ErkJggg==')
		95% center no-repeat;
	background-size: 10.75rpx 18.75rpx;
}

.section-nav {
	width: 750rpx;
	height: 108rpx;
	background: #fff;
	margin-bottom: 20rpx;
}

.section-nav .t {
	float: left;
	width: 600rpx;
	height: 108rpx;
	line-height: 108rpx;
	margin-left: 31.25rpx;
}

.section-nav .i {
	float: right;
	width: 52rpx;
	height: 52rpx;
	margin-right: 16rpx;
	margin-top: 28rpx;
}

.section-act .t {
	float: left;
	display: flex;
	align-items: center;
	width: 600rpx;
	height: 108rpx;
	overflow: hidden;
	line-height: 108rpx;
	margin-left: 31.25rpx;
}

.section-act .label {
	color: #999;
}

.section-act .tag {
	display: flex;
	align-items: center;
	padding: 0 10rpx;
	border-radius: 3px;
	height: 37rpx;
	width: auto;
	color: #f48f18;
	overflow: hidden;
	border: 1px solid #f48f18;
	font-size: 25rpx;
	margin: 0 10rpx;
}

.section-act .text {
	display: flex;
	align-items: center;
	height: 37rpx;
	width: auto;
	overflow: hidden;
	color: #f48f18;
	font-size: 29rpx;
}

.comments {
	width: 100%;
	height: auto;
	padding-left: 30rpx;
	background: #fff;
	margin: 20rpx 0;
}

.comments .h {
	height: 102.5rpx;
	line-height: 100.5rpx;
	width: 718.75rpx;
	padding-right: 16rpx;
	border-bottom: 1px solid #dfdfdf;
}

.comments .h .t {
	display: block;
	float: left;
	width: 50%;
}

.comments .h .i {
	display: block;
	float: right;
	width: 164rpx;
	height: 100.5rpx;
	line-height: 100.5rpx;
	background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAAAAAA7VNdtAAAA4klEQVRIx+2VPQuCABCG/bVvmgiCfVM0CH2SQdBiEERDNNbk5laTkzREkEMQBRIEhaFprQ0RvNDo7c9w9z53J7zoElIkRT6rVT2xSBfankQCA4pL9hKNIK3I9pM5MhY7MSuDeUIOeS3BjMhcXAVGQEbpadCvZPqnMipnUpirjpxHOhb0oGxILSMTWYc0OZmhQCLPMUoc8hhAdink1oS6o9r3aygeqSEf8qhfqCi3Kto3ShhHxjCktLRFTGJK/iWwoFYsnkK0qUUOh1/M+oncO1C33FFqIH8gT19f99OXlCL/Q97bCIp/pz2QqAAAAABJRU5ErkJggg==')
		right center no-repeat;
	background-size: 52rpx;
}

.comments .b {
	height: auto;
	width: 720rpx;
}

.comments .item {
	height: auto;
	width: 720rpx;
	overflow: hidden;
}

.comments .info {
	height: 117rpx;
	width: 100%;
	padding: 15rpx 0 15rpx 0;
}

.comments .user {
	float: left;
	width: 40%;
	height: 87rpx;
	line-height: 87rpx;
	font-size: 0;
}

.comments .user image {
	display: block;
	float: left;
	width: 67rpx;
	height: 67rpx;
	margin-right: 27rpx;
	border-radius: 50%;
	overflow: hidden;
}

.comments .user text {
	display: block;
	width: auto;
	height: 66rpx;
	overflow: hidden;
	font-size: 29rpx;
	line-height: 66rpx;
}

.comments .time {
	display: block;
	float: right;
	width: auto;
	height: 67rpx;
	line-height: 67rpx;
	color: #999;
	font-size: 28rpx;
	margin-right: 30rpx;
}

.comments .content {
	width: 720rpx;
	padding-right: 30rpx;
	line-height: 45.8rpx;
	font-size: 28rpx;
	margin-bottom: 15rpx;
}

.comments .imgs {
	width: 720rpx;
	height: auto;
	margin-bottom: 25rpx;
}

.comments .imgs .img {
	height: 150rpx;
	width: 150rpx;
	margin-right: 28rpx;
}

.comments .spec {
	width: 720rpx;
	padding-right: 30rpx;
	line-height: 30rpx;
	font-size: 24rpx;
	color: #999;
	margin-bottom: 30rpx;
}

.goods-attr {
	width: 750rpx;
	height: auto;
	overflow: hidden;
	padding: 0 31.25rpx 25rpx 31.25rpx;
	box-sizing: border-box;
	background: #fff;
}

.goods-attr .t {
	width: 687.5rpx;
	height: 104rpx;
	line-height: 104rpx;
}

.goods-attr .item {
	width: 687.5rpx;
	height: 65rpx;
	padding: 10rpx 20rpx;
	box-sizing: border-box;
	margin-bottom: 3rpx;
	background: #f7f7f7;
}

.goods-attr .left {
	float: left;
	font-size: 28rpx;
	width: 134rpx;
	height: 45rpx;
	line-height: 45rpx;
	overflow: hidden;
	color: #666;
	font-weight: bold;
}

.goods-attr .right {
	float: left;
	font-size: 28rpx;
	margin-left: 35rpx;
	width: 465rpx;
	height: 45rpx;
	line-height: 45rpx;
	overflow: hidden;
	color: #666;
}

.detail {
	width: 750rpx;
	height: auto;
	overflow: hidden;
}

.detail image {
	width: 750rpx;
	display: block;
}

.common-problem {
	width: 750rpx;
	height: auto;
	overflow: hidden;
}

.common-problem .h {
	position: relative;
	height: 145.5rpx;
	width: 750rpx;
	padding: 56.25rpx 0;
	background: #fff;
	text-align: center;
}

.common-problem .h .line {
	display: inline-block;
	position: absolute;
	top: 72rpx;
	left: 0;
	z-index: 2;
	height: 1px;
	margin-left: 225rpx;
	width: 300rpx;
	background: #ccc;
}

.common-problem .h .title {
	display: inline-block;
	position: absolute;
	top: 56.125rpx;
	left: 0;
	z-index: 3;
	height: 33rpx;
	margin-left: 285rpx;
	width: 180rpx;
	background: #fff;
}

.common-problem .b {
	width: 750rpx;
	height: auto;
	overflow: hidden;
	padding: 0rpx 30rpx;
	background: #fff;
}

.common-problem .item {
	height: auto;
	overflow: hidden;
	padding-bottom: 25rpx;
}

.common-problem .question-box .spot {
	float: left;
	display: block;
	height: 8rpx;
	width: 8rpx;
	background: #b4282d;
	border-radius: 50%;
	margin-top: 11rpx;
}

.common-problem .question-box .question {
	float: left;
	line-height: 30rpx;
	padding-left: 8rpx;
	display: block;
	font-size: 26rpx;
	padding-bottom: 15rpx;
	color: #303030;
}

.common-problem .answer {
	line-height: 36rpx;
	padding-left: 16rpx;
	font-size: 26rpx;
	color: #787878;
}

.related-goods {
	width: 750rpx;
	height: auto;
	overflow: hidden;
	padding-bottom: 80rpx;
}

.related-goods .h {
	position: relative;
	height: 145.5rpx;
	width: 750rpx;
	padding: 56.25rpx 0;
	background: #fff;
	text-align: center;
	border-bottom: 1px solid #f4f4f4;
}

.related-goods .h .line {
	display: inline-block;
	position: absolute;
	top: 72rpx;
	left: 0;
	z-index: 2;
	height: 1px;
	margin-left: 225rpx;
	width: 300rpx;
	background: #ccc;
}

.related-goods .h .title {
	display: inline-block;
	position: absolute;
	top: 56.125rpx;
	left: 0;
	z-index: 3;
	height: 33rpx;
	margin-left: 285rpx;
	width: 180rpx;
	background: #fff;
}

.related-goods .b {
	width: 750rpx;
	height: auto;
	overflow: hidden;
}

.related-goods .b .item {
	float: left;
	background: #fff;
	width: 375rpx;
	height: auto;
	overflow: hidden;
	text-align: center;
	padding: 15rpx 31.25rpx;
	border-right: 1px solid #f4f4f4;
	border-bottom: 1px solid #f4f4f4;
}

.related-goods .item .img {
	width: 311.45rpx;
	height: 311.45rpx;
}

.related-goods .item .name {
	display: block;
	width: 311.45rpx;
	height: 35rpx;
	margin: 11.5rpx 0 15rpx 0;
	text-align: center;
	overflow: hidden;
	font-size: 30rpx;
	color: #333;
}

.related-goods .item .price {
	display: block;
	width: 311.45rpx;
	height: 30rpx;
	text-align: center;
	font-size: 30rpx;
	color: #b4282d;
}

.bottom-btn {
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 10;
	width: 750rpx;
	height: 100rpx;
	display: flex;
	background: #fff;
}

.bottom-btn .l {
	float: left;
	height: 100rpx;
	width: 162rpx;
	border: 1px solid #f4f4f4;
	display: flex;
	align-items: center;
	justify-content: center;
}

.bottom-btn .l.l-collect {
	border-right: none;
	border-left: none;
	text-align: center;
	width: 90rpx;
}

.bottom-btn .l.l-kefu {
	position: relative;
	height: 54rpx;
	width: 63rpx;
}

.bottom-btn .l.l-cart .box {
	position: relative;
	height: 60rpx;
	width: 60rpx;
}

.bottom-btn .l.l-cart .cart-count {
	height: 28rpx;
	width: 28rpx;
	z-index: 10;
	position: absolute;
	top: 0;
	right: 0;
	background: #b4282d;
	text-align: center;
	font-size: 18rpx;
	color: #fff;
	line-height: 28rpx;
	border-radius: 50%;
}

.bottom-btn .l.l-cart .icon {
	position: absolute;
	top: 10rpx;
	left: 0;
}

.bottom-btn .l.l-kefu .kefu-count {
	height: 28rpx;
	width: 28rpx;
	z-index: 10;
	position: absolute;
	top: 0;
	right: 0;
	/* background: #b4282d; */
	text-align: center;
	font-size: 18rpx;
	color: #fff;
	line-height: 28rpx;
	border-radius: 50%;
}

.bottom-btn .l.l-kefu .icon {
	position: absolute;
	top: 10rpx;
	left: 0;
}

.bottom-btn .l .icon {
	display: block;
	height: 44rpx;
	width: 44rpx;
}

.bottom-btn .c {
	float: left;
	background: #b4282d;
	height: 100rpx;
	line-height: 96rpx;
	flex: 1;
	text-align: center;
	color: #fff;
	/* border-top: 2px solid #f4f4f4; */ /* border-bottom: 2px solid #f4f4f4;  */
}

.bottom-btn .r {
	border: 1px solid #f48f18;
	background: #f48f18;
	float: left;
	height: 100rpx;
	line-height: 96rpx;
	flex: 1;
	text-align: center;
	color: #fff;
}

.bottom-btn .n {
	border: 1px solid #c0b8ae;
	background: #c0b8ae;
	float: left;
	height: 100rpx;
	line-height: 96rpx;
	flex: 1;
	text-align: center;
	color: #fff;
}

// @import "../../lib/wxParse/wxParse.wxss";

.attr-pop-box {
	width: 100%;
	height: 100%;
	position: fixed;
	background: rgba(0, 0, 0, 0.5);
	z-index: 8;
	bottom: 0;
	/* display: none; */
}

.attr-pop {
	width: 100%;
	height: auto;
	max-height: 780rpx;
	padding: 31.25rpx;
	box-sizing: border-box;
	background: #fff;
	position: fixed;
	z-index: 9;
	bottom: 100rpx;
	border-top-left-radius: 20rpx;
	border-bottom-left-radius: 0rpx;
	border-top-right-radius: 20rpx;
	border-bottom-right-radius: 0rpx;
}

.attr-pop .close {
	position: absolute;
	width: 48rpx;
	height: 48rpx;
	right: 31.25rpx;
	overflow: hidden;
	top: 31.25rpx;
}

.attr-pop .close .icon {
	width: 48rpx;
	height: 48rpx;
}

.attr-pop .img-info {
	width: 687.5rpx;
	height: 177rpx;
	overflow: hidden;
	margin-bottom: 41.5rpx;
}

.attr-pop .img {
	float: left;
	height: 177rpx;
	width: 177rpx;
	background: #f4f4f4;
	margin-right: 31.25rpx;
}

.attr-pop .info {
	float: left;
	height: 177rpx;
	display: flex;
	align-items: center;
}

.attr-pop .p {
	font-size: 33rpx;
	color: #333;
	height: 33rpx;
	line-height: 33rpx;
	margin-bottom: 10rpx;
}

.attr-pop .a {
	font-size: 29rpx;
	color: #333;
	height: 40rpx;
	line-height: 40rpx;
}

.spec-con {
	width: 100%;
	height: auto;
	overflow: hidden;
}

.spec-con .name {
	height: 32rpx;
	line-height: 32rpx;
	margin-bottom: 22rpx;
	font-size: 29rpx;
	color: #333;
}

.spec-con .values {
	height: auto;
	margin-bottom: 31.25rpx;
	font-size: 0;
}

.spec-con .value {
	display: inline-block;
	height: 62rpx;
	padding: 0 15rpx;
	line-height: 56rpx;
	text-align: center;
	margin-right: 25rpx;
	margin-bottom: 16.5rpx;
	border: 1px solid #999;
	border-radius: 6rpx;
	font-size: 25rpx;
	color: #999;
}

.spec-con .value.disable {
	border: 1px solid #ccc;
	color: #ccc;
}

.spec-con .value.selected {
	border: 1px solid #f0070e;
	color: #fff;
	background: #f0070e;
}

.number-item .selnum {
	width: 322rpx;
	height: 71rpx;
	border: 1px solid #ccc;
	display: flex;
}

.number-item .cut {
	width: 93.75rpx;
	height: 100%;
	text-align: center;
	line-height: 65rpx;
}

.number-item .number {
	flex: 1;
	height: 100%;
	text-align: center;
	line-height: 68.75rpx;
	border-left: 1px solid #ccc;
	border-right: 1px solid #ccc;
	float: left;
}

.number-item .add {
	width: 93.75rpx;
	height: 100%;
	text-align: center;
	line-height: 65rpx;
}

.contact {
	height: 80rpx;
	width: 80rpx;
	border-radius: 100%;
	position: fixed;
	bottom: 106rpx;
	right: 10rpx;
	font-size: 20rpx;
	box-sizing: border-box;
	background: url('data:image/png;base64,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')
		no-repeat center 11rpx;
	background-size: 55rpx auto;
}

.share-pop-box {
	width: 100%;
	height: 100%;
	position: fixed;
	background: rgba(0, 0, 0, 0.5);
	z-index: 8;
	bottom: 0;
	/* display: none; */
}

// 设置分享 弹窗的 样式
.share-pop {
	width: 100%;
	height: auto;
	max-height: 780rpx;
	box-sizing: border-box;
	// padding: 31.25rpx;
	background: #fff;
	position: fixed;
	z-index: 9;
	bottom: 100rpx;
}

.share-pop .close {
	position: absolute;
	width: 48rpx;
	height: 48rpx;
	right: 31.25rpx;
	top: 31.25rpx;
}

.share-pop .close .icon {
	width: 48rpx;
	height: 48rpx;
}

.share-pop .share-info {
	width: 100%;
	height: 225rpx;
	overflow: hidden;
	margin-bottom: 41.5rpx;
}

.sharebtn {
	top: 75rpx;
	background: none !important;
	font-size: 32rpx;
	color: #fff !important;
	border-radius: 0%;
	width: 175rpx;
	height: 150rpx;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	float: left;
	background: #fff;
	border-bottom: 0px solid #fafafa;
	margin-left: 5%;
}

.sharebtn::after {
	border: none;
	border-radius: 0%;
}

.savesharebtn {
	top: 75rpx;
	background: none !important;
	font-size: 32rpx;
	color: #fff !important;
	border-radius: 0%;
	width: 175rpx;
	height: 150rpx;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	float: right;
	background: #fff;
	border-bottom: 0px solid #fafafa;
	margin-right: 15%;
}

.savesharebtn::after {
	border: none;
	border-radius: 0%;
}

.sharebtn_image {
	/* border: 1px solid #757575; */
	width: 98rpx;
	height: 102rpx;
}

.sharebtn_text {
	/* border: 1px solid #757575; */
	width: 150rpx;
	margin-bottom: 2rpx;
	height: 20rpx;
	line-height: 20rpx;
	font-size: 20rpx;
	color: #555;
}

.separate {
	background: #e0e3da;
	width: 100%;
	height: 6rpx;
}
</style>

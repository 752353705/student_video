/*
本地模拟接口请求, 仅demo演示用.
实际项目以您服务器接口返回的数据为准,无需本地处理分页.
请参考官方写法: http://www.mescroll.com/uni.html?v=20200210#tagUpCallback
* */

// 获取消息列表(共5页消息)
export function apiMsgList(pageNum, pageSize) {
	return new Promise((resolute, reject)=>{
		//延时一秒,模拟联网
		setTimeout(function() {
			try {
				let list = [];
				//模拟下拉加载更多记录
				for (let i = 0; i < pageSize; i++) {
					let msgId = (pageNum - 1) * pageSize + i + 1;
					let newObj = {
						id: msgId,
						title: "【消息" + msgId + "】",
						content: "内容: 下拉获取聊天记录"
					};
					// 此处模拟只有5页的消息 (第5页只有3条)
					if(pageNum>=5 && i>=3){}else{
						list.unshift(newObj);
					}
				}
				console.log("page.num=" + pageNum + ", page.size=" + pageSize + ", curPageData.length=" + list.length);
				//模拟接口请求成功
				resolute(list);
			} catch (e) {
				//模拟接口请求失败
				reject(e);
			}
		}, 1000)
	})
}
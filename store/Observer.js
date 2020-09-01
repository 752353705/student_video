export default class Observer{
	constructor() {
		this.subscribers = {}  // 订阅模式
	}
	add (key, obj) {
		if (!this.subscribers[key]) this.subscribers[key] = []
		this.subscribers[key].push(obj)
	}
	delete (){
		
	}
	// 通知更新
	notify(key, value) {
		this.subscribers[key].forEach( item => {
			if (item.update && typeof item.update == 'function' )  item.update(key, value)
		})
	}
}

Observer.globalDataObserver = new Observer();
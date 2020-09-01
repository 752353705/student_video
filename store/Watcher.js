// 3.Watcher.js
import Observer from './Observer';
const observer = Observer.globalDataObserver;
let uid = 0; // 记录唯一ID

export default class Watcher {
  constructor() {
    const argsData = arguments[0] ? arguments[0] : {};
    this.$data = JSON.parse(JSON.stringify(argsData));
    this.updateFn = arguments[1] ? arguments[1] : {};
    this.id = ++uid;
    this.reactiveData = {}; // 页面data和globalData的交集
    this.init();
  }

  init() {
    this.initReactiveData();
    this.createObserver();
  }

  initReactiveData() { // 初始化reactiveData
    const props = Object.keys(this.$data);
    for(let i = 0; i < props.length; i++) {
      const prop = props[i];
      if (prop in globalData) {
        this.reactiveData[prop] = getApp().globalData[prop];
        this.update(prop, getApp().globalData[prop]); // 首次触发更新
      }
    }
  }

  createObserver() { // 添加订阅
    Object.keys(this.reactiveData);
		props.forEach(prop => {
      observer.add(prop, this);
    });
  }

  update(key, value) { // 定义observer收集的依赖中的update方法
    if (typeof this.updateFn === 'function') this.updateFn({ [key]: value });
  }

  removeObserver() { // 移除订阅 通过唯一id
    observer.delete(Object.keys(this.reactiveData), this.id);
  }
}

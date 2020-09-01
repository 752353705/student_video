// 2.patcherWatcher.js
// 相当于mixin了Page和Component的一些生命周期方法
import Watcher from './Watcher';
function noop() {}

const prePage = Page;
Page = function() {
  const obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const _onLoad = obj.onLoad || noop;
  const _onUnload = obj.onUnload || noop;

  obj.onLoad = function () {
    const updateMethod = this.setState || this.setData; // setState可以认为是diff后的setData
    const data = obj.data || {};
    // 页面初始化添加watcher 传入方法时别忘了绑定this指向
    this._watcher = this._watcher || new Watcher(data, updateMethod.bind(this));
    return _onLoad.apply(this, arguments);
  };
  obj.onUnload = function () {
    // 页面销毁时移除watcher
    this._watcher.removeObserver();
    return _onUnload.apply(this, arguments);
  };
  return prePage(obj);
};
// 。。。下面省略了Component的写法，基本上和Page差不多

// 4.reactive.js
import Observer from './Observer';
const isObject = val => val !== null && typeof val === 'object';

function reactive(target) {
  const handler = {
    get: function(target, key) {
      const res = Reflect.get(target, key);
      return isObject(res) ? reactive(res) : res; // 深层遍历
    },
    set: function(target, key, value) {
      if (target[key] === value) return true;
      trigger(key, value);
      return Reflect.set(target, key, value);
    }
  };
  const observed = new Proxy(target, handler);
  return observed;
}

function trigger(key, value) { // 有更改记录时触发更新 => 会调用所有Watcher中update方法
  Observer.globalDataObserver.notify(key, value);
}

export { reactive };

import { creatDrawer } from "./AsyncDialog";
// import Vue from "vue";
// Vue.component("async-form", () => import("../views/Form.vue"));
let asyncForm = import("../views/Form.vue");
let hht = () => {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      // 向 `resolve` 回调传递组件定义
      resolve({
        render(h) {
          return h("div", "你好");
        },
      });
    }, 1000);
  });
};
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: asyncForm,
  // 异步组件加载时使用的组件
  loading: {
    render(h) {
      return h("div", "加载中");
    },
  },
  // 加载失败时使用的组件
  error: {
    render(h) {
      return h("div", "加载错误");
    },
  },
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000,
});

export function asDialog(componentName, options) {
  let dialogComponent = creatDrawer(AsyncComponent, options);
  return dialogComponent;
}

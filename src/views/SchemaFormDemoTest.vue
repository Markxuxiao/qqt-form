<template>
  <div>
    <div>动态测试</div>
    <button @click="handleChange('_test_fetch')">表单数据初始化</button>
    <button @click="handleChange('_test_fn1')">异步字典初始化</button>
    <button @click="handleChange('_test_fn2')">显示隐藏【描述】字段</button>
    <button draggable="true" data-comp-snippet="abck">输入组件</button>
    <button draggable="true" data-comp-snippet="sdfsf">选择组件</button>
  </div>
</template>
<script>
export default {
  methods: {
    handleChange(fnName, payload) {
      this.$emit("emit", { fnName, payload });
    },
  },
};
</script>
<template>
  <div>
    <div v-if="groups.length && schema.type === 'collapse'">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item :title="item.title" :name="item.name">
          <slot :name="item.name"></slot>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div v-if="groups.length && schema.type === 'tabs'">
      <el-tabs v-model="activeName">
        <el-tab-pane
          v-for="item in groups"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
          <slot :name="item.name"></slot>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    schema: {
      default() {
        return {
          groups: [],
        };
      },
    },
  },
  computed: {
    groups() {
      return this.schema.groups;
    },
    activeNames() {
      return this.groups.map((item) => item.name);
    },
  },
};
</script>
<template>
  <div
    class="input-with-select el-input--small el-input el-input-group el-input-group--append"
  >
    <div class="el-input__inner el-input--small">
      <el-tag
        v-for="(tag, index) in list"
        :key="index"
        :closable="true"
        @close="handleDel(tag)"
        size="small"
        style="margin-right: 10px"
      >
        {{ tagName(tag) }}
      </el-tag>
    </div>
    <div class="el-input-group__append">
      <button
        type="button"
        class="el-button el-button--small"
        @click="$emit('click')"
      >
        <slot> <i class="el-icon-search"></i></slot>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
type Tag = {
  [key: string]: string | number;
};
type Tags = Tag[];

import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "TagSearch",
})
export default class extends Vue {
  @Prop({ default: [] }) value!: Tags;
  @Prop({ default: "name" }) showFlag!: string;

  public list: Tags = [];

  @Watch("value", { immediate: true })
  onMyListChange(newVal: Tags) {
    this.list = newVal;
  }

  public tagName(tag: Tag) {
    return tag[this.showFlag];
  }
  public handleDel(tag: Tag) {
    this.list.splice(this.list.indexOf(tag), 1);
    this.$emit("delete", tag);
    this.$emit("input", this.list);
  }
}
</script>

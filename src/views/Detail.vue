<template>
  <el-descriptions :column="3" border>
    <el-descriptions-item :label="'订单编号'">
      <qqt-text :value="Form.user | isBool"></qqt-text>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts">
import QqtText from "@/components/show/QqtText.vue";
import { Component, Vue } from "vue-property-decorator";
import MetaData from "./mate";
export const isBool = (val) => {
  switch (val) {
    case true:
      return "是";

    case false:
      return "否";
    default:
      return val;
  }
};

@Component({
  name: "Detail",
  components: {
    QqtText,
  },
  filters: {
    isBool,
  },
})
export default class extends Vue {
  MetaData = MetaData;
  Form;
  created() {
    this.Form = { user: true };
    console.log("🚀 ~ this.Form:", this);
  }
}
</script>

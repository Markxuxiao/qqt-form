<template>
  <div v-if="formData">
    <el-form
      :ref="formSchema.ref || 'schemaForm'"
      :model="formData"
      :rules="formSchema.rules"
      label-width="80px"
    >
      <el-row>
        <el-col v-for="filed in formSchema.fileds" :key="filed.name" :span="8">
          <el-form-item :label="filed.title" :prop="filed.name">
            <slot
              v-if="filed.type === 'slot' && !filed.hidden"
              :name="filed.name"
              :formData="formData"
              :schema="filed"
            />
            <component
              v-else-if="!filed.hidden"
              :ref="`schemaForm_${filed.name}`"
              v-model="formData[filed.name]"
              :is="filed.type"
              v-bind="filed.props"
              v-on="filed.on"
            />
            <span v-else>error!</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  props: ["formSchema", "data"],
  watch: {
    data: {
      handler: function (val) {
        if (val) {
          this.formData = val;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      formData: {},
    };
  },
};
</script>
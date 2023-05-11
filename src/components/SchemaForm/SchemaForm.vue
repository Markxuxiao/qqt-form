<template>
  <div v-if="formData">
    <el-form
      :ref="formRef"
      :model="formData"
      :rules="formSchema.rules"
      label-width="80px"
    >
      <el-row>
        <template v-for="filed in formSchema.fileds">
          <el-col v-if="!filed.hidden" :key="filed.name" :span="filed.col || 8">
            <el-form-item :prop="filed.name">
              <template #label>
                {{ filed.title }}
                <el-tooltip v-if="filed.tip" placement="top" effect="light">
                  <div slot="content">{{ filed.tip }}</div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </template>
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
              <span v-else>表单参数错误!</span>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>
<script>
/**
 * 本文件作用：负责Form相关样式和功能
 */

/**
 * props.formSchema.ref
 * props.formSchema.rules 表单验证
 * props.formSchema.fileds 表单字段
 * props.data 初始化表单
 */
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
  computed: {
    formRef() {
      return this.formSchema.ref || "schemaForm";
    },
  },
  data() {
    return {
      formData: {},
    };
  },
  methods: {
    validate(fn) {
      return this.$refs[this.formRef].validate(fn);
    },
    resetFields() {
      return this.$refs[this.formRef].resetFields();
    },
  },
};
</script>

<template>
  <div v-if="formData">
    <el-form
      :ref="formSchema.ref || 'schemaForm'"
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
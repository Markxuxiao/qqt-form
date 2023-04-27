<template>
  <div>
    <section style="display: flex; align-items: start">
      <SchemaFormDemoTest @emit="handleTestChange" style="width: 300px" />
      <section>
        <SchemaForm ref="SchemaForm" :formSchema="formSchema" :data="formData">
          <template #status="{ formData, schema }">
            <el-select v-model="formData[schema.name]" placeholder="请选择">
              <el-option
                v-for="item in formInitData.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </SchemaForm>
        <div style="text-align: center">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </div>
      </section>
    </section>
    <section>
      {{ JSON.stringify(this.formData) }}
    </section>
  </div>
</template>
<script>
import SchemaForm from "../components/SchemaForm/SchemaForm.vue";
import SchemaFormDemoTest from "./SchemaFormDemoTest.vue";
import SchemaFormDemoTestMixin from "./SchemaFormDemoTestMixin";
export default {
  mixins: [SchemaFormDemoTestMixin],
  components: { SchemaForm, SchemaFormDemoTest },
  data() {
    return {
      formSchema: {
        ref: "ruleForm",
        rules: {
          name: [
            { required: true, message: "请输入活动名称", trigger: "blur" },
            {
              min: 3,
              max: 5,
              message: "长度在 3 到 5 个字符",
              trigger: "blur",
            },
          ],
          date: [
            {
              required: true,
              message: "请选择日期",
              trigger: "change",
            },
          ],
          desc: [
            { required: true, message: "请填写活动形式", trigger: "blur" },
          ],
        },
        fileds: [
          {
            name: "code",
            title: "编号",
            type: "el-input",
            props: {
              placeholder: "sdfsfsfsfs",
              disabled: true,
            },
          },
          {
            name: "name",
            title: "名称",
            type: "el-input",
            tip: "请填写5-10个字",
          },
          {
            name: "desc",
            title: "描述",
            type: "el-input",
            col: 24,
            props: {
              rows: 2,
              type: "textarea",
            },
          },
          {
            name: "price",
            title: "金额",
            type: "el-input-number",
            on: {
              change: (val) => {
                console.log(val);
              },
            },
          },
          {
            name: "number",
            title: "数量",
            type: "el-input-number",
          },
          {
            name: "date",
            title: "日期",
            type: "el-date-picker",
            props: {
              type: "date",
              "value-format": "yyyy-MM-dd",
            },
          },
          {
            name: "status",
            title: "状态",
            type: "slot",
          },
          {
            name: "isUse",
            title: "是否启用",
            type: "el-switch",
            props: {
              "active-text": "启用",
              "inactive-text": "禁用",
            },
          },
        ],
      },

      formData: {
        number: 0,
        price: 0,
      },
      formInitData: {
        options: [],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs.SchemaForm.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs.SchemaForm.$refs[formName].resetFields();
    },
  },
};
</script>
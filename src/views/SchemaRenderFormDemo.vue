<template>
  <div>
    <section style="display: flex; align-items: start">
      <SchemaFormDemoTest @emit="handleTestChange" style="width: 300px" />
      <section>
        <SchemaRenderForm
          ref="SchemaForm"
          :formSchema="formSchema"
          :data="formData"
        >
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
        </SchemaRenderForm>
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
import SchemaRenderForm from "../components/SchemaForm/SchemaRenderForm.vue";
// start 测试相关代码
import SchemaFormDemoTest from "./SchemaFormDemoTest.vue";
import SchemaFormDemoTestMixin from "./SchemaFormDemoTestMixin";
import simulator from "../components/Schema/simulator";
import { onEvent } from "../components/Schema/simulator/event";
// end 测试相关代码
export default {
  mixins: [SchemaFormDemoTestMixin],
  components: { SchemaRenderForm, SchemaFormDemoTest },
  mounted() {
    new simulator();

    onEvent("simulator-comp-click", function (e) {
      console.log("simulator-comp-click", e);
    });
    onEvent("simulator-comp-btn-click", function (e) {
      console.log("simulator-comp-btn-click", e);
    });
    onEvent("simulator-comp-move", function (e) {
      console.log("simulator-comp-move", e);
    });
    onEvent("simulator-comp-add", function (e) {
      console.log("simulator-comp-add", e);
    });
  },
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
            on: {
              change: (val) => {
                if (val > 3) {
                  this.formData.status = "1";
                }
              },
            },
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
            on: {
              change: (val) => {
                if (!val) {
                  this.formSchemaFileds.status.hidden = true;
                } else {
                  this.formSchemaFileds.status.hidden = false;
                }
                console.log(val);
              },
            },
          },
        ],
      },
      formData: {
        number: 0,
        price: 0,
        status: "",
      },
      formInitData: {
        options: [],
      },
    };
  },
  computed: {
    /**
     * formSchem.fileds 转换为对象便于使用
     */
    formSchemaFileds() {
      let obj = {};
      this.formSchema.fileds.forEach((item) => {
        obj[item.name] = item;
      });
      return obj;
    },
  },
  methods: {
    submitForm() {
      this.$refs.SchemaForm.validate((valid) => {
        if (valid) {
          console.log("🚀 ~  this.formData:", this.formData);
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.SchemaForm.resetFields();
    },
  },
};
</script>

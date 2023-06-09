<template>
  <div>
    <section style="display: flex; align-items: start">
      <SchemaFormDemoTest @emit="handleTestChange" style="width: 300px" />
      <section id="cavas" style="position: relative; min-width: 900px">
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
      <section style="width: 500px">
        <Setter :compSchema="compSchema" />
      </section>
    </section>
    <section>
      <div>formData</div>
      {{ JSON.stringify(this.formData) }}
    </section>
    <section>
      <div>formSchema</div>
      {{ JSON.stringify(this.formSchema) }}
    </section>
  </div>
</template>
<script>
import SchemaRenderForm from "../components/SchemaForm/SchemaRenderForm.vue";
// start 测试相关代码
import SchemaFormDemoTest from "./SchemaFormDemoTest.vue";
import SchemaFormDemoTestMixin from "./SchemaFormDemoTestMixin";
import simulator, { EVENT_NAMES } from "../components/Schema/simulator";
import { onEvent } from "../components/Schema/simulator/event";
import Setter from "../components/Schema/setter";
import { treeClass } from "../components/Schema/model";
// end 测试相关代码
export default {
  mixins: [SchemaFormDemoTestMixin],
  components: { SchemaRenderForm, SchemaFormDemoTest, Setter },
  mounted() {
    let treeModel = new treeClass(this.formSchema);
    new simulator(document.getElementById("cavas"));
    let that = this;
    onEvent(EVENT_NAMES.compClick, (e) => {
      console.log("simulator-comp-click", e);
      let elementId = e.elementId;
      that.compSchema = that.formSchema.children.filter(
        (item) => item.id == elementId
      )[0];
    });
    onEvent(EVENT_NAMES.compBtnClick, function (e) {
      console.log("simulator-comp-btn-click", e);
    });
    onEvent(EVENT_NAMES.compMove, function (e) {
      console.log("simulator-comp-move", e);
      treeModel.insertBefore(e.fromElementId, e.toElementId);
    });
    onEvent(EVENT_NAMES.compAdd, function (e) {
      console.log("simulator-comp-add", e);
    });
  },
  data() {
    return {
      compSchema: null,
      formSchema: {
        id: "1",
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
        children: [
          {
            id: "2",
            name: "code",
            title: "编号",
            $comp: "el-input",
            type: "form",
            props: {
              placeholder: "sdfsfsfsfs",
              disabled: true,
            },
          },
          {
            id: "3",
            name: "name",
            title: "名称",
            $comp: "el-input",
            type: "form",
            tip: "请填写5-10个字",
          },
          {
            id: "4",
            name: "desc",
            title: "描述",
            $comp: "el-input",
            type: "form",
            col: 24,
            props: {
              rows: 2,
              type: "textarea",
            },
          },
          {
            id: "5",
            name: "price",
            title: "金额",
            $comp: "el-input-number",
            type: "form",
            on: {
              change: (val) => {
                console.log(val);
              },
            },
          },
          {
            id: "6",
            name: "number",
            title: "数量",
            $comp: "el-input-number",
            type: "form",
            on: {
              change: (val) => {
                if (val > 3) {
                  this.formData.status = "1";
                }
              },
            },
          },
          {
            id: "7",
            name: "date",
            title: "日期",
            $comp: "el-date-picker",
            type: "form",
            props: {
              type: "date",
              "value-format": "yyyy-MM-dd",
            },
          },
          {
            id: 8,
            name: "status",
            title: "状态",
            type: "slot",
          },
          {
            id: "9",
            name: "isUse",
            title: "是否启用",
            $comp: "el-switch",
            type: "form",
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
      this.formSchema.children.forEach((item) => {
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

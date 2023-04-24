<template>
  <div>
    <button @click="fn1">改变data的值</button>
    <button @click="fn2">改变fileds的值</button>
    <SchemaForm ref="SchemaForm" :formSchema="formSchema" :data="fromData">
      <template #status="{ formData, schema }">
        <el-select v-model="formData[schema.name]" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </template>
    </SchemaForm>
    <div>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >立即创建</el-button
      >
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </div>
    {{ JSON.stringify(this.fromData) }}
  </div>
</template>
<script>
import SchemaForm from "../components/SchemaForm/SchemaForm.vue";
export default {
  components: { SchemaForm },
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
          },
          {
            name: "desc",
            title: "描述",
            type: "el-input",
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

      fromData: {},
      options: [
        {
          value: "1",
          label: "通过",
        },
        {
          value: "2",
          label: "审核中",
        },
        {
          value: "3",
          label: "拒绝",
        },
      ],
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      setTimeout(() => {
        this.fromData = {
          code: 2,
          name: null,
          desc: "sdfsdfsfsfs",
          price: null,
          number: 55,
          date: "",
          status: "1",
          isUse: false,
        };
      }, 500);
    },
    fn1() {
      this.fromData.status = "2";
    },
    fn2() {
      this.formSchema.fileds.splice(0, 1);
    },
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
<script>
import renderItem from "../Schema/renderItem";
import renderLayout from "../Schema/renderLayout";
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
  beforeUpdate() {
    console.log(this.formSchema);
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
      console.log(this);
      return this.$refs[this.formRef].validate(fn);
    },
    resetFields() {
      return this.$refs[this.formRef].resetFields();
    },
  },
  render(h) {
    return h("div", [
      h(
        "el-form",
        {
          ref: this.formRef,
          props: {
            labelWidth: "80px",
            rules: this.formSchema.rules || [],
            model: this.formData,
          },
        },
        [
          h("el-row", [
            this.formSchema.fileds.map((filed) =>
              h("el-col", { props: { span: filed.col || 8 } }, [
                renderItem(h, this, filed, renderLayout),
              ])
            ),
          ]),
        ]
      ),
    ]);
  },
};
</script>

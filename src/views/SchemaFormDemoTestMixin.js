export default {
  methods: {
    handleTestChange({ fnName, payload }) {
      try {
        this[fnName](payload)
      } catch (err) {
        throw new Error(err)
      }
    },
    _test_fn1() {
      this.formInitData.options = [
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
      ];
    },
    _test_fn2() {
      let filed = this.formSchema.fileds.find((item) => item.name == "desc");
      !filed.hidden ? this.$set(filed, "hidden", true) : this.$set(filed, "hidden", false);
    },
    _test_fetch() {
      setTimeout(() => {
        this.formData = {
          code: 2,
          name: null,
          desc: "sdfsdfsfsfs",
          price: 9,
          number: 55,
          date: "",
          status: "1",
          isUse: false,
        };
      }, 500);
    },
  }
}
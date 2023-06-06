const Col = {
  render() {
    return (
      <el-row gutter="20">
        <el-col span="6">333</el-col>
        <el-col span="6">333</el-col>
        <el-col span="6">333</el-col>
        <el-col span="6">333</el-col>
      </el-row>
    );
  },
};
export default {
  components: {
    Col,
  },
  data() {
    return {
      form: {
        name: "23432",
        age: 0,
      },
      fileds: [
        {
          comp: "Col",
          name: "Col",
        },
        {
          name: "name",
          title: "姓名",
          comp: "el-input",
          props: {
            disabled: true,
          },
          on: {
            input: (e) => {
              console.log(e);
            },
          },
        },
        {
          name: "age",
          title: "年龄",
          comp: "el-input-number",
          props: {
            disabled: true,
          },
          on: {
            change: (e) => {
              console.log(e);
            },
          },
        },
        {
          name: "age2",
          title: "年龄2",
          comp: "el-input-number",
          props: {
            disabled: true,
          },
          on: {
            change: (e) => {
              console.log(e);
            },
          },
        },
      ],
    };
  },
  render() {
    return (
      <el-form>
        {this.fileds.map((item) => {
          const Comp = (
            <item.comp
              ref={item.name}
              value={this.form[item.name]}
              onInput={(value) => (this.form[item.name] = value)}
              props={item.props}
              on={item.on}
            />
          );
          return <el-form-item label={item.title}>{Comp}</el-form-item>;
        })}
      </el-form>
    );
  },
};

<!-- eslint-disable @typescript-eslint/explicit-module-boundary-types -->
<template>
  <div style="width: 500px">
    <el-form ref="form" :model="form" :rules="rules" label-width="180px">
      <el-form-item label="字符串" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="长字符串" prop="desc">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="金额(2位小数)">
        <el-input-number
          v-model="form.money"
          :precision="2"
          :min="0"
          :max="9999999999"
          :controls="false"
        ></el-input-number>
      </el-form-item>
      <el-form-item prop="name">
        <template #label>
          带帮助信息的 文本
          <el-tooltip placement="top" effect="light">
            <div slot="content">帮助信息帮助信息帮助信息。</div>
            <i class="el-icon-question"></i>
          </el-tooltip>
        </template>
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="数量（整数）">
        <el-input-number
          v-model="form.number"
          :precision="0"
          :min="0"
          :max="9999999999"
          :controls="false"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="选择列表">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期时间">
        <el-date-picker
          v-model="form.date1"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="日期-时间">
        <el-col :span="11">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
        <el-col style="text-align: center" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.date2"
            placeholder="选择时间"
            style="width: 100%"
          ></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="开关">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="多选">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="单选">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="可扩展弹窗多选">
        <TagsSelectVue
          v-model="form.tages"
          showFlag="name222"
          @click="handleTagesSelect"
        />
      </el-form-item>
      <el-form-item label="数字 单选 多选 区间选">
        <NumberPick v-model="value1" type="single" />
        <NumberPick v-model="value2" type="multiple" />
        <NumberPick v-model="value3" type="range" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
        <el-button @click="$emit('submit')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Form } from "element-ui";

import TagsSelectVue from "../components/TagsSelect.vue";
import NumberPick from "@/components/NumberPick/NumberPick.vue";
import { asDialog } from "../components/asDialog.js";

@Component({
  components: {
    NumberPick,
    TagsSelectVue,
  },
})
export default class Home extends Vue {
  Dialog = null;
  value1 = 2;
  value2 = [2, 3];
  value3 = [2, 3];
  form = {
    name: "",
    money: 0,
    number: 0,
    region: "",
    date1: "",
    date2: "",
    delivery: false,
    type: [],
    resource: "",
    desc: "",
    tages: [],
  };
  rules = {
    name: [
      { required: true, message: "请输入活动名称", trigger: "blur" },
      { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
    ],
    region: [{ required: true, message: "请选择活动区域", trigger: "change" }],
    date1: [
      {
        type: "date",
        required: true,
        message: "请选择日期",
        trigger: "change",
      },
    ],
    date2: [
      {
        type: "date",
        required: true,
        message: "请选择时间",
        trigger: "change",
      },
    ],
  };
  beforeDestroy() {
    console.log("🚀 ~ beforeDestroy:");
  }

  handleTagesSelect() {
    this.Dialog = asDialog("async-form", () => this.onSubmit("form"));
    this.Dialog.open();
    console.log("🚀 ~ Dialog:", this.Dialog);
    let list = this.form.tages as unknown as { id: number; name222: string }[];
    // 模拟从弹窗选出来的数据
    let res = [
      {
        id: new Date().getTime(),
        name222: "tag" + new Date().getTime(),
      },
    ];
    // 数组去重复
    let arr = list.concat(res);
    const result = arr.filter((item, index, self) => {
      return self.findIndex((t) => t.id === item.id) === index;
    });
    (this.form.tages as unknown) = result;
  }
  onSubmit(formName: string) {
    (this.$refs[formName] as Form).validate((valid) => {
      if (valid) {
        alert("submit!");
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }
}
</script>

<template>
  <div class="calendar-body">
    <div class="calendar-days">
      <a
        v-for="i in days"
        @click.stop="handleClick(i)"
        :class="daysClass(i)"
        :key="i"
        >{{ i }}</a
      >
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Array,
      require: true,
    },
    type: {
      type: String, //"single" | "multiple" | "range"
      require: true,
    },
    days: {
      type: Array,
      default: () => {
        return [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        ];
      },
    },
  },
  data() {
    return {
      lock: false,
      datas: [],
    };
  },
  watch: {
    value: {
      handler(val) {
        this.init(val);
      },
      immediate: true,
    },
  },
  methods: {
    init(val) {
      if (val) {
        this.datas = val.map((item) => item);
      } else {
        this.datas = [];
      }

      this.lock = false;
    },
    daysClass(i) {
      let daysClass = ["calendar-date"];
      switch (this.type) {
        case "range":
          if (i === this.datas[0] || i === this.datas[1]) {
            daysClass.push("calendar-date-selected");
          }
          if (
            this.datas[0] &&
            this.datas[1] &&
            i > this.datas[0] &&
            i < this.datas[1]
          ) {
            daysClass.push("calendar-date-on");
          }
          break;
        default:
          if (this.datas.includes(i)) {
            daysClass.push("calendar-date-selected");
          }
          break;
      }
      return daysClass;
    },
    handleClick(i) {
      switch (this.type) {
        case "single":
          this.datas = [i];
          break;
        case "multiple":
          // eslint-disable-next-line no-case-declarations
          let index = this.datas.findIndex((item) => item === i);
          if (index !== -1) {
            this.datas.splice(index, 1);
          } else {
            this.datas.push(i);
          }
          break;
        case "range":
          this._computerrange(i);
          break;
        default:
          break;
      }
      this.$emit("input", this.datas);
      this.$emit("click", this.datas);
    },
    _computerrange(i) {
      if (this.datas.length === 2) {
        this.datas[0] = i;
        this.datas.splice(1, 1);
      } else if (this.datas.length === 1) {
        if (this.datas[0] > i) {
          this.datas[1] = this.datas[0];
          this.datas[0] = i;
        } else {
          this.datas[1] = i;
        }
      } else {
        this.datas[0] = i;
      }
    },
  },
};
</script>
<style scoped>
.calendar-body {
  position: relative;
  width: 196px;
  height: 196px;
}

.calendar-days {
  width: 100%;
  height: 100%;
}

.calendar-date {
  cursor: pointer;
  font-weight: normal;
  width: 14.28%;
  height: 28px;
  line-height: 28px;
  text-align: center;
  box-sizing: border-box;
  overflow: hidden;
  float: left;
}
.calendar-date:before {
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.calendar-date-out {
  color: #ccc;
}

.calendar-date:hover,
.calendar-date-on {
  background: #eaf8fe;
}
.calendar-date-selected,
.calendar-date-selected:hover {
  color: #fff;
  font-weight: bold;
  background: #1284e7;
}
</style>

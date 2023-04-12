<template>
  <div
    class="datepicker"
    :class="{
      datepicker__clearable: clearable && text && !disabled,
    }"
    @click="onClick"
  >
    <input
      readonly
      :value="text"
      :class="[show ? 'focus' : '']"
      :disabled="disabled"
      :placeholder="placeholder"
      v-if="type !== 'inline'"
    />
    <a class="datepicker-close" @click.stop="cls"></a>
    <transition name="datepicker-anim">
      <div class="datepicker-popup" tabindex="-1" v-if="show">
        <DataPick v-model="datas" :type="type" @click="handleClick"></DataPick>
      </div>
    </transition>
  </div>
</template>

<script>
import DataPick from "./DataPick.vue";
export default {
  components: {
    DataPick,
  },
  props: {
    value: {
      type: [Array, Number, String],
      require: true,
    },
    type: {
      type: String, //"single" | "multiple" | "range"
      require: true,
    },
    rangeSeparator: {
      type: String,
      default: "~",
    },
    disabled: [Boolean],
    clearable: {
      type: Boolean,
      default: true,
    },
    placeholder: [String],
  },
  mounted() {
    document.addEventListener("click", this.dc, true);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.dc, true);
  },

  data() {
    return {
      show: false,
      datas: [],
    };
  },
  computed: {
    text() {
      if (this.type === "single") {
        return this.datas;
      } else if (this.type === "multiple") {
        return this.datas.join(",");
      } else if (this.type === "range") {
        return this.datas.join(` ${this.rangeSeparator} `);
      } else {
        return "";
      }
    },
  },
  created() {
    this.init();
  },
  watch: {
    datas: {
      handler(val) {
        if (this.type === "single") {
          this.$emit("input", val[0] || "");
        } else {
          this.$emit("input", val);
        }
      },
    },
  },
  methods: {
    init() {
      if (this.type === "single") {
        this.datas = this.value ? [this.value] : [];
      } else if (this.type === "multiple" || this.type === "range") {
        if (this.value && this.value.length) {
          this.datas = this.value.map((item) => item);
        } else {
          this.datas = [];
        }
      } else {
        throw new Error("type定义错误！");
      }
    },
    handleClick() {
      if (this.type === "single") {
        this.show = false;
      }
    },
    cls() {
      this.datas = [];
      this.show = false;
      this.$emit("clear");
      if (this.type === "single") {
        this.$emit("input", this.datas[0] || "");
      } else {
        this.$emit("input", this.datas);
      }
    },
    onClick() {
      if (!this.disabled) {
        this.show = true;
      }
    },
    dc(e) {
      if (!this.$el.contains(e.target)) {
        this.show = false;
        if (this.type === "range") {
          if (this.datas.length === 1) {
            this.datas = [];
            this.$emit("input", this.datas);
          }
        }
      }
      // this.show = this.$el.contains(e.target) && !this.disabled;
    },
  },
};
</script>
<style scoped>
.datepicker {
  display: inline-block;
  position: relative;
}

.datepicker:before {
  content: "";
  display: block;
  position: absolute;
  width: 34px;
  height: 100%;
  top: 0;
  right: 0;
  background: url("data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPjxwYXRoIGQ9Ik01NjQgMTgwLjJINDQ4Yy04LjMgMC0xNS02LjctMTUtMTVzNi43LTE1IDE1LTE1aDExNmM4LjIgMCAxNSA2LjcgMTUgMTVzLTYuOCAxNS0xNSAxNXoiIGZpbGw9IiM5ODk4OTgiLz48cGF0aCBkPSJNOTQ1IDk1Mi4ySDgxLjJjLTguMiAwLTE1LTYuNy0xNS0xNVYxNjIuOGMwLTguMyA2LjgtMTUgMTUtMTVIMjk0YzguMiAwIDE1IDYuNyAxNSAxNXMtNi44IDE1LTE1IDE1SDk2LjJ2NzQ0LjRIOTMwVjE3Ny44SDcxMy42Yy04LjMgMC0xNS02LjctMTUtMTVzNi43LTE1IDE1LTE1SDk0NWM4LjIgMCAxNSA2LjcgMTUgMTV2Nzc0LjRjMCA4LjMtNi44IDE1LTE1IDE1eiIgZmlsbD0iIzk4OTg5OCIvPjxwYXRoIGQ9Ik0zMzMuMyA1NTFIMjE2Yy04LjIgMC0xNS02LjgtMTUtMTVzNi44LTE1IDE1LTE1aDExNy4zYzguMyAwIDE1IDYuNiAxNSAxNXMtNi43IDE1LTE1IDE1em0yMzAuMyAwSDQ0Ni4zYy04LjMgMC0xNS02LjgtMTUtMTVzNi43LTE1IDE1LTE1aDExNy4zYzguMiAwIDE1IDYuNiAxNSAxNXMtNi44IDE1LTE1IDE1em0yMzAuMiAwSDY3Ni42Yy04LjMgMC0xNS02LjgtMTUtMTVzNi43LTE1IDE1LTE1aDExNy4yYzguMyAwIDE1IDYuNiAxNSAxNXMtNi43IDE1LTE1IDE1ek0zMzMuMyA3NDBIMjE2Yy04LjIgMC0xNS02LjgtMTUtMTVzNi44LTE1IDE1LTE1aDExNy4zYzguMyAwIDE1IDYuNiAxNSAxNXMtNi43IDE1LTE1IDE1em0yMzAuMyAwSDQ0Ni4zYy04LjMgMC0xNS02LjgtMTUtMTVzNi43LTE1IDE1LTE1aDExNy4zYzguMiAwIDE1IDYuNiAxNSAxNXMtNi44IDE1LTE1IDE1em0yMzAuMiAwSDY3Ni42Yy04LjMgMC0xNS02LjgtMTUtMTVzNi43LTE1IDE1LTE1aDExNy4yYzguMyAwIDE1IDYuNiAxNSAxNXMtNi43IDE1LTE1IDE1ek0zNzAuOCAyNTguNmMtOC4zIDAtMTUtNi43LTE1LTE1Vjg2LjhjMC04LjIgNi43LTE1IDE1LTE1czE1IDYuOCAxNSAxNXYxNTYuOGMwIDguMy02LjcgMTUtMTUgMTV6bTI3MC4yIDBjLTguMyAwLTE1LTYuNy0xNS0xNVY4Ni44YzAtOC4yIDYuNy0xNSAxNS0xNXMxNSA2LjggMTUgMTV2MTU2LjhjMCA4LjMtNi43IDE1LTE1IDE1ek05NDUgMzcyLjJIODEuMmMtOC4yIDAtMTUtNi43LTE1LTE1czYuOC0xNSAxNS0xNUg5NDVjOC4yIDAgMTUgNi43IDE1IDE1cy02LjggMTUtMTUgMTV6IiBmaWxsPSIjOTg5ODk4Ii8+PC9zdmc+")
    no-repeat 50% 50%;
}

.datepicker-close {
  display: none;
  position: absolute;
  width: 34px;
  height: 100%;
  top: 0;
  right: 0;
  cursor: pointer;
}

.datepicker-close:before {
  display: block;
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  left: 50%;
  top: 50%;
  margin-left: -8px;
  margin-top: -8px;
  text-align: center;
  background: #ccc;
  color: #fff;
  border-radius: 50%;
  background: #ccc
    url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3IDciIHdpZHRoPSI3IiBoZWlnaHQ9IjciPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik01LjU4LDVsMi44LTIuODFBLjQxLjQxLDAsMSwwLDcuOCwxLjZMNSw0LjQxLDIuMiwxLjZhLjQxLjQxLDAsMCwwLS41OC41OGgwTDQuNDIsNSwxLjYyLDcuOGEuNDEuNDEsMCwwLDAsLjU4LjU4TDUsNS41OCw3LjgsOC4zOWEuNDEuNDEsMCwwLDAsLjU4LS41OGgwWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEuNSAtMS40OCkiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4NCg==")
    no-repeat 50% 50%;
}

.datepicker__clearable:hover:before {
  display: none;
}
.datepicker__clearable:hover .datepicker-close {
  display: block;
}

.datepicker-close:hover:before {
  background-color: #afafaf;
}

.datepicker > input {
  color: #666;
  transition: all 200ms ease;
  border: 1px solid #e5e5e5;
  height: 34px;
  box-sizing: border-box;
  outline: none;
  padding: 0 34px 0 12px;
  font-size: 14px;
  width: 100%;
  user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
}

.datepicker > input.focus {
  border-color: #3bb4f2;
  -webkit-box-shadow: 0 0 5px rgba(59, 180, 242, 0.3);
  box-shadow: 0 0 5px rgba(59, 180, 242, 0.3);
}

.datepicker > input:disabled {
  cursor: not-allowed;
  background-color: #ebebe4;
  border-color: #e5e5e5;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.datepicker-popup {
  position: absolute;
  transition: all 200ms ease;
  opacity: 1;
  transform: scaleY(1);
  transform-origin: center top;
  font-size: 12px;
  background: #fff;
  border: 1px solid #d9d9d9;
  box-shadow: 0 1px 6px rgba(99, 99, 99, 0.2);
  margin-top: 2px;
  outline: 0;
  padding: 5px;
  overflow: hidden;
  z-index: 999;
}

.datepicker-anim-enter-active {
  transform-origin: 0 0;
  animation: datepicker-anim-in 0.2s cubic-bezier(0.23, 1, 0.32, 1);
}

.datepicker-anim-leave-active {
  transform-origin: 0 0;
  animation: datepicker-anim-out 0.2s cubic-bezier(0.755, 0.05, 0.855, 0.06);
}

@keyframes datepicker-anim-in {
  0% {
    opacity: 0;
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
}

@keyframes datepicker-anim-out {
  0% {
    opacity: 1;
    transform: scaleY(1);
  }
  to {
    opacity: 0;
    transform: scaleY(0.8);
  }
}
</style>

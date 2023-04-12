import { Drawer, Button } from "element-ui";
import Vue from "vue";
import router from "@/router";
const golink = Vue.extend({
  router,
  props: ["name", "params"],
  beforeDestroy() {
    console.log("🚀 ~ link beforeDestroy:");
  },
  render: function (h) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    var self = this;
    return h(
      Button,
      {
        on: {
          click() {
            self.$alert("1312313");
            // self.$router.push({ name: self.name, params: self.params })
          },
        },
      },
      "链接"
    );
  },
});

export function creatDrawer(comp, closeCallback) {
  var DrawerVm = Vue.extend({
    name: "DrawerVm",
    components: {
      golink,
    },
    created() {
      console.log("creatDrawer created");
    },
    data() {
      return {
        name: comp.name || "",
        params: {},
        isShow: false,
      };
    },
    methods: {
      open() {
        if (!this.isMount) {
          document.body.appendChild(this.$el);
          this.isMount = true;
        }
        this.isShow = true;
      },
      close() {
        this.isShow = false;
        this.$nextTick(function () {
          setTimeout(() => {
            this.$el.remove();
            this.$destroy();
            closeCallback && closeCallback();
          }, 200);
        });
}
    },
    render: function (h) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      var self = this;
      return h(
        Drawer, // 标签名称
        {
          props: {
            visible: this.isShow,
            destroyOnClose: true,
            modal: false,
            modalAppendToBody: false,
          },
          on: {
            close() {
              self.close();
            },
          },
        },
        [
          h("div", [
            h(golink, {
              props: {
                name: this.name,
                params: this.params,
              },
            }),
            h(comp, {
              props: {
                params: this.params,
              },
              on: {
                submit(res) {
                  // 基于约定 触发事件
                  self.isShow = false;
                  console.log(res);
                },
              },
            }),
          ]),
        ]
      );
    },
  });
  var component = new DrawerVm({
    el: document.createElement("div"),
  });
  return component;
}

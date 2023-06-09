function renderItem(h, vm, config, renderLayout) {
  // 编辑组件
  const editRender = () =>
    !config.hidden
      ? h(
          "el-form-item",
          {
            ref: `form-item-${config.name}`,
            attrs: {
              "data-comp-id": `${config.id}`,
            },
            props: { prop: config.name },
          },
          [
            h("template", { slot: "label" }, [
              h("span", config.title),
              config.tip
                ? h(
                    "el-tooltip",
                    {
                      props: {
                        placement: "top",
                        effect: "light",
                        content: config.tip,
                      },
                    },
                    [h("i", { class: "el-icon-question" })]
                  )
                : null,
            ]),
            h(config.$comp, {
              props: { value: vm.formData[config.name] },
              on: {
                input: function (value) {
                  vm.$set(vm.formData, config.name, value);
                },
              },
            }),
          ]
        )
      : null;
  // 插槽组件
  const slotRender = (slotName) =>
    vm.$scopedSlots[slotName]({
      formData: vm.formData,
      schema: config,
    });
  // 布局组件
  const layoutRender = () => renderLayout(h, config, renderItem);

  // 渲染
  if (config.type == "layout") {
    return layoutRender();
  } else if (config.type == "slot") {
    return slotRender(config.name);
  } else if (config.type == "form") {
    return editRender();
  }
}
export default renderItem;

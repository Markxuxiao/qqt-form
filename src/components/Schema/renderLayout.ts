function tabsLayout(h, vm, config, randerItem) {
  return h(
    "el-tabs",
    { props: { value: config.name } },
    config.tabs &&
      config.tabs.map((item) =>
        h(
          "el-tabs-pane",
          { props: { title: item.title, name: item.name, key: item.name } },
          item.children &&
            item.children.map((child) => randerItem(h, vm, child, renderLayout))
        )
      )
  );
}
const renderLayout = tabsLayout;
export default renderLayout;

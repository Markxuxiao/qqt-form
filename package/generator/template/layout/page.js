import * as fs from "node:fs";
import ejs from "ejs";
import inputComp from "../comp/input.js";
let templ = fs.readFileSync(
  "./src/generator/template/layout/page.ejs",
  "utf-8"
);
export default class page {
  constructor({ properties, handle }) {
    this.properties = properties;
    this.handle = handle;
    this.$chunks = [];
    this.createChunks();
  }

  template = templ;
  createChunks() {
    this.properties.forEach((item) => {
      this.$chunks.push(new inputComp({ title: item, filed: item }));
    });
  }
  $hook(hookName) {
    let hookText = "";
    this.$chunks.forEach((element) => {
      const hookRender = element[`${hookName}_render`];
      if (hookRender) {
        hookText += hookRender.call(element);
      }
    });

    return hookText;
  }
  render() {
    return ejs.render(this.template, this);
  }
}

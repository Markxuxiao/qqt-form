import PageComp from "./template/layout/page.js";

export function generator(schema) {
  let properties = Object.keys(schema.properties);
  let handle = schema.handle;
  let page = new PageComp({ properties, handle });
  let text = page.render();
  return text;
}

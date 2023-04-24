import ejs from "ejs";
export default class input {
  constructor({ title, filed }) {
    this.title = title;
    this.filed = filed;
  }

  template = `<%= title %><input placehoder="<%= filed %>">`;
  scriptTemp = `scriptTemp`;
  html_render() {
    return ejs.render(this.template, this);
  }
  script_render() {
    return ejs.render(this.scriptTemp, this);
  }
}

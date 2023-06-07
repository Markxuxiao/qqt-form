export default class simulator {
  highlightElement; // 组件元素的框
  currentElement; // 当前点击的组件元素
  dropLineElement; // 拖拽瞄准线
  canvas; // 画布
  constructor(canvas) {
    this.canvas = canvas || document.body;
    this.highlightElement = null;
    this.currentElement = null;
    this.dropLineElement = null;
    this.bindingEvent();
  }

  bindingEvent() {
    this._createHighlightElement();
    this._createDropLineElement();
    this.bindingElementClick();
    this.bindingCanvasChange();
  }
  bindingElementClick() {
    const clickableElements = document.querySelectorAll("[data-comp]");
    clickableElements.forEach((element) => {
      element.addEventListener("dragover", (event: any) => {
        const compElement = event.target.closest("[data-comp]");
        if (compElement) {
          this.setDropLineElementShow(compElement);
        }
        event.preventDefault();
        // console.log("🚀 ~ dragover:", event);
      });
      element.addEventListener("dragleave", (event: any) => {
        const compElement = event.target.closest("[data-comp]");
        if (compElement) {
          this.setDropLineElementHidden();
        }
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      element.addEventListener("drop", (event: any) => {
        event.preventDefault();

        const compElement = event.target.closest("[data-comp]");
        if (compElement) {
          const fromElementId = event.dataTransfer.getData("text");
          document.dispatchEvent(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            new CustomEvent("elementDrop", {
              detail: {
                fromElementId,
                toElementId: compElement.getAttribute("data-comp"),
              },
            })
          );
          event.dataTransfer.clearData();
          this.setDropLineElementHidden();
        }
        // console.log("🚀 ~ dragover:", event);
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      element.addEventListener("click", (event: any) => {
        const compElement = event.target.closest("[data-comp]");

        if (compElement) {
          // 重复点击
          if (compElement.hasAttribute("data-active")) return false;
          if (this.currentElement) {
            this.currentElement.removeAttribute("data-active");
          }
          compElement.setAttribute("data-active", "true");
          this.currentElement = compElement;

          const rect = this.currentElement.getBoundingClientRect();
          this.highlightElement.style.left = `${rect.left}px`;
          this.highlightElement.style.top = `${rect.top}px`;
          this.highlightElement.style.width = `${rect.width}px`;
          this.highlightElement.style.height = `${rect.height}px`;
          this.highlightElement.style.display = "block";

          // 派发事件给编辑器使用
          const elementId = this.getComponentId();
          document.dispatchEvent(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            new CustomEvent("elementClick", {
              detail: {
                elementId,
              },
            })
          );

          event.preventDefault();
          return false;
        }
      });
    });
  }
  _createDropLineElement() {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = `0px`;
    div.style.top = `0px`;
    div.style.width = `0px`;
    div.style.height = `0px`;
    div.style.border = "1px solid blue";
    div.style.display = "none";
    div.style.zIndex = "1";
    this.dropLineElement = div;
    document.body.appendChild(this.dropLineElement);
  }
  setDropLineElementShow(element) {
    const rect = element.getBoundingClientRect();
    this.dropLineElement.style.left = `${rect.left}px`;
    this.dropLineElement.style.top = `${rect.top}px`;
    this.dropLineElement.style.width = `${rect.width}px`;
    this.dropLineElement.style.height = `1px`;
    this.dropLineElement.style.display = "block";
  }
  setDropLineElementHidden() {
    this.dropLineElement.style.display = "none";
  }
  _createHighlightElement() {
    const div = document.createElement("div");

    div.setAttribute("data-comp-highlight", ""); // 标记已经高亮的元素
    div.style.position = "absolute";
    div.style.left = `0px`;
    div.style.top = `0px`;
    div.style.width = `0px`;
    div.style.height = `0px`;
    div.style.border = "1px solid red";
    div.style.display = "none";
    div.style.zIndex = "1";
    div.draggable = true;
    div.innerHTML = `
      <div style="position: absolute;top: -26px;right: 0;display: flex;">
        <button data-btn="btn1" draggable="true">按钮1</button>
        <button data-btn="btn2">按钮2</button>
      </div>
    `;
    this.highlightElement = div;
    document.body.appendChild(this.highlightElement);

    this.highlightElement.addEventListener("dragstart", (event) => {
      console.log("dragstart", event);
      event.dataTransfer.setData("text/plain", this.getComponentId());
    });
    // 绑定事件
    const btns = this.highlightElement.querySelectorAll("[data-btn]");

    btns.forEach((element) => {
      element.addEventListener("dragstart", (event) => {
        console.log("dragstart", event);
        event.dataTransfer.setData("text/plain", this.getComponentId());
      });
      element.addEventListener("drag", (event) => {
        // console.log("drag", event);
      });
      element.addEventListener("click", (event) => {
        btnEvent.call(this, event);
      });
    });

    function btnEvent(event) {
      const elementId = this.getComponentId();
      const btnId = event.target.getAttribute("data-btn");
      document.dispatchEvent(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        new CustomEvent("elementBtnClick", {
          detail: {
            elementId,
            btnId,
          },
        })
      );
    }
  }
  getComponentId() {
    return this.getCurrentElement().getAttribute("data-comp");
  }
  getCurrentElement() {
    return this.currentElement;
  }
  /**
   * 组件框跟随画布大小、滚动改变定位
   */
  bindingCanvasChange() {
    // 画布
    const parent = this.canvas;
    window.addEventListener("resize", () => {
      const div = this.highlightElement;
      if (div) {
        const rect = this.currentElement.getBoundingClientRect();
        div.style.left = `${rect.left}px`;
        div.style.top = `${rect.top}px`;
        div.style.width = `${rect.width}px`;
        div.style.height = `${rect.height}px`;
      }
    });

    // 监听画布滚动事件
    parent.addEventListener("scroll", () => {
      const child = this.highlightElement;
      if (child) {
        child.style.top = `${parent.scrollTop}px`;
        child.style.left = `${parent.scrollLeft}px`;
      }
    });
  }
}

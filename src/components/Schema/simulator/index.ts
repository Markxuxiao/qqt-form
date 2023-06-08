import { IDropInfo } from "./simulator-type";
import { dispatchEvent } from "./event";
import {
  CANVAS_COMPONENT_TAG,
  MENU_COMPONENT_TAG,
  CANVAS_COMPONENT_BTN_TAG,
} from "./config";

function setDragData(event, data) {
  const val = {
    detail: data,
  };
  event.dataTransfer.setData("text/plain", JSON.stringify(val));
}
function getDragData(event) {
  const data = JSON.parse(event.dataTransfer.getData("text")).detail;
  event.dataTransfer.clearData();
  return data;
}

export default class simulator {
  highlightElement; // 组件元素的框
  currentElement; // 当前点击的组件元素
  dropLineElement; // 拖拽瞄准线
  canvas; // 画布
  hoverElement; // 待选中指示框
  currentHoverElement; // 待选中指示框选中的下层组件元素
  constructor(canvas) {
    this.canvas = canvas || document.body;
    this.highlightElement = null;
    this.currentElement = null;
    this.dropLineElement = null;
    this.hoverElement = null;
    this.currentHoverElement = null;
    this.bindingEvent();
  }

  bindingEvent() {
    this._createHighlightElement();
    this._createDropLineElement();
    this._createHoverElement();
    this.bindingElementClick();
    this.bindingCanvasChange();
    this.bindingCompSnippetDragstart();
  }
  bindingElementClick() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.canvas.addEventListener("dragover", (event: any) => {
      const compElement = event.target.closest(`[${CANVAS_COMPONENT_TAG}]`);
      this.setDropLineElementShow(compElement);
      event.preventDefault();
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.canvas.addEventListener("drop", (event: any) => {
      event.preventDefault();
      const compElement = event.target.closest(`[${CANVAS_COMPONENT_TAG}]`);
      this.onDrop(compElement);
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.canvas.addEventListener("dragleave", (event: any) => {
      const compElement = event.target.closest(`[${CANVAS_COMPONENT_TAG}]`);
      if (compElement) {
        this.setDropLineElementHidden();
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.canvas.addEventListener("mouseover", (event: any) => {
      const compElement = event.target.closest(`[${CANVAS_COMPONENT_TAG}]`);
      if (event.target.closest(`[data-comp-highlight]`)) {
        this.hoverElement.style.display = "none";
        return false;
      }
      this.onHover(compElement);
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.canvas.addEventListener("mouseleave", (event: any) => {
      console.log("mouseout");

      this.hoverElement.style.display = "none";
    });
  }
  onClick(compElement) {
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
      dispatchEvent("simulator-comp-click", {
        elementId,
      });
    }
  }
  onHover(compElement) {
    if (compElement) {
      this.currentHoverElement = compElement;
      const rect = compElement.getBoundingClientRect();
      this.hoverElement.style.left = `${rect.left}px`;
      this.hoverElement.style.top = `${rect.top}px`;
      this.hoverElement.style.width = `${rect.width}px`;
      this.hoverElement.style.height = `${rect.height}px`;
      this.hoverElement.style.display = "block";
    }
  }
  onDrop(compElement) {
    if (compElement) {
      const dropInfo: IDropInfo = getDragData(event);
      console.log("🚀 ~ dropInfo:", dropInfo);

      switch (dropInfo.type) {
        case "comp":
          dispatchEvent("simulator-comp-move", {
            fromId: dropInfo.id,
            toId: compElement.getAttribute(CANVAS_COMPONENT_TAG),
          });
          break;
        case "comp-snippet":
          dispatchEvent("simulator-comp-add", {
            fromId: dropInfo.id,
            toId: compElement.getAttribute(CANVAS_COMPONENT_TAG),
          });
          break;
        default:
          break;
      }

      this.setDropLineElementHidden();
    }
  }
  _createDropLineElement() {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = `0px`;
    div.style.top = `0px`;
    div.style.width = `0px`;
    div.style.height = `4px`;
    div.style.background = "#66b1ff";
    div.style.display = "none";
    div.style.zIndex = "1";
    this.dropLineElement = div;
    document.body.appendChild(this.dropLineElement);
  }
  setDropLineElementShow(element) {
    if (element) {
      const rect = element.getBoundingClientRect();
      this.dropLineElement.style.left = `${rect.left}px`;
      this.dropLineElement.style.top = `${rect.top}px`;
      this.dropLineElement.style.width = `${rect.width}px`;
      this.dropLineElement.style.display = "block";
    }
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
      setDragData(event, {
        type: "comp",
        id: this.getComponentId(),
      });
    });

    // 绑定事件
    const btns = this.highlightElement.querySelectorAll(
      `[${CANVAS_COMPONENT_BTN_TAG}]`
    );

    btns.forEach((element) => {
      element.addEventListener("click", (event) => {
        btnEvent.call(this, event);
      });
    });

    function btnEvent(event) {
      const elementId = this.getComponentId();
      const btnId = event.target.getAttribute(CANVAS_COMPONENT_BTN_TAG);

      dispatchEvent("simulator-comp-btn-click", {
        elementId,
        btnId,
      });
    }
  }
  _createHoverElement() {
    const div = document.createElement("div");

    div.setAttribute("data-comp-hover", ""); // 标记已经高亮的元素
    div.style.position = "absolute";
    div.style.left = `0px`;
    div.style.top = `0px`;
    div.style.width = `0px`;
    div.style.height = `0px`;
    div.style.border = "1px dashed blue";
    div.style.background = "#c4defa63";
    div.style.display = "block";
    div.style.zIndex = "1";
    this.hoverElement = div;
    document.body.appendChild(this.hoverElement);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.hoverElement.addEventListener("click", (event: any) => {
      event.stopPropagation();
      event.preventDefault();
      this.onClick(this.currentHoverElement);
      this.hoverElement.style.display = "none";
    });
  }
  getComponentId() {
    return this.getCurrentElement().getAttribute(CANVAS_COMPONENT_TAG);
  }
  getCurrentElement() {
    return this.currentElement;
  }
  bindingCompSnippetDragstart() {
    const compSnippetBtns = document.querySelectorAll(
      `[${MENU_COMPONENT_TAG}]`
    );
    compSnippetBtns.forEach((element) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      element.addEventListener("dragstart", (event: any) => {
        setDragData(event, {
          type: "comp-snippet",
          id: element.getAttribute(MENU_COMPONENT_TAG),
        });
      });
    });
  }
  /**
   * 组件框跟随画布大小、滚动改变定位
   * 设计态的辅助 UI 需要根据渲染态的视图变化而变化，比如渲染容器滚动了，此时通过 OffsetObserver 做一个动态的监听。
   */
  bindingCanvasChange() {
    // todo 画布改变大小不一定是窗口改变大小
    // 画布
    const canvas = this.canvas;
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

    // todo 画布滚动不一定是窗口滚动
    // 监听画布滚动事件
    canvas.addEventListener("scroll", () => {
      const child = this.highlightElement;
      if (child) {
        child.style.top = `${canvas.scrollTop}px`;
        child.style.left = `${canvas.scrollLeft}px`;
      }
    });
  }
}

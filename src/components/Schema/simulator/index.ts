import { IDropInfo } from "./simulator-type";
import { dispatchEvent } from "./event";
import { CANVAS_COMPONENT_TAG, MENU_COMPONENT_TAG } from "./config";
import { set } from "vue/types/umd";

/**
 * 画布被选中组件操作按钮标识
 */
export const CANVAS_COMPONENT_BTN_TAG = "data-btn";
export enum EVENT_NAMES {
  compClick = "simulator-comp-click",
  compBtnClick = "simulator-comp-btn-click",
  compMove = "simulator-comp-move",
  compAdd = "simulator-comp-add",
}

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
  currentElementId;
  dropLineElement; // 拖拽瞄准线
  canvas; // 画布
  hoverElement; // 待选中指示框
  currentHoverElement; // 待选中指示框选中的下层组件元素
  canvasPosition; // 画布位置
  constructor(canvas) {
    this.canvas = canvas || document.body;
    this.highlightElement = null;
    this.currentElement = null;
    this.currentElementId = null;
    this.dropLineElement = null;
    this.hoverElement = null;
    this.currentHoverElement = null;
    this.bindingEvent();
    this.computedCanvasPosition();
  }
  computedCanvasPosition() {
    this.canvasPosition = this.canvas.getBoundingClientRect();
  }
  _setElementPosition(toolElement, compElement) {
    const rect = compElement.getBoundingClientRect();
    toolElement.style.left = `${rect.left - this.canvasPosition.left}px`;
    toolElement.style.top = `${rect.top - this.canvasPosition.top}px`;
    toolElement.style.width = `${rect.width}px`;
    toolElement.style.height = `${rect.height}px`;
    toolElement.style.display = "block";
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
      // if (compElement.hasAttribute("data-active")) return false;
      // if (this.currentElement) {
      //   this.currentElement.removeAttribute("data-active");
      // }
      // compElement.setAttribute("data-active", "true");
      this.currentElement = compElement;
      this.currentElementId = this.getComponentId();
      this._setElementPosition(this.highlightElement, this.currentElement);

      // 派发事件给编辑器使用
      const elementId = this.getComponentId();
      dispatchEvent(EVENT_NAMES.compClick, {
        elementId,
      });
    }
  }
  setCurrentElementById(id) {
    this.currentElement = document.querySelectorAll(
      `[${CANVAS_COMPONENT_TAG}="${id}"]`
    )[0];
  }
  onHover(compElement) {
    if (compElement) {
      this.currentHoverElement = compElement;
      this._setElementPosition(this.hoverElement, this.currentHoverElement);
    }
  }
  onDrop(compElement) {
    if (compElement) {
      const dropInfo: IDropInfo = getDragData(event);
      console.log("🚀 ~ dropInfo:", dropInfo);

      switch (dropInfo.type) {
        case "comp":
          dispatchEvent(EVENT_NAMES.compMove, {
            fromElementId: dropInfo.id,
            toElementId: compElement.getAttribute(CANVAS_COMPONENT_TAG),
          });
          break;
        case "comp-snippet":
          dispatchEvent(EVENT_NAMES.compAdd, {
            fromElementId: dropInfo.id,
            toElementId: compElement.getAttribute(CANVAS_COMPONENT_TAG),
          });
          break;
        default:
          break;
      }

      this.setDropLineElementHidden();

      // fix vue渲染后重新定位当前选中组件
      setTimeout(() => {
        // vue重新渲染后 内存里的currentElement数据居然会变。这里根据id重新取一次 todo那就不应该存储这个dom值，而是存id
        this.setCurrentElementById(this.currentElementId);
        this._setElementPosition(this.highlightElement, this.currentElement);
      }, 50);
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
    this.canvas.appendChild(this.dropLineElement);
  }
  setDropLineElementShow(element) {
    if (element) {
      const rect = element.getBoundingClientRect();
      this.dropLineElement.style.left = `${
        rect.left - this.canvasPosition.left
      }px`;
      this.dropLineElement.style.top = `${
        rect.top - this.canvasPosition.top
      }px`;
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
    this.canvas.appendChild(this.highlightElement);

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

      dispatchEvent(EVENT_NAMES.compBtnClick, {
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
    this.canvas.appendChild(this.hoverElement);

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
    const resetToolPosition = () => {
      if (this.currentElement) {
        this.computedCanvasPosition();
        this._setElementPosition(this.highlightElement, this.currentElement);
      }
    };
    const canvas = this.canvas;
    window.addEventListener("resize", () => {
      resetToolPosition();
    });

    // todo 画布滚动不一定是窗口滚动
    // 监听画布滚动事件
    canvas.addEventListener("scroll", () => {
      resetToolPosition();
    });
  }
  /**
   * 添加投放感应区
   */
  addSensor() {}
  /**
   *
   * @returns 移除投放感应
   */
  removeSensor() {}
}

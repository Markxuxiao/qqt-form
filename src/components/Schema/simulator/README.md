# 组件拖拽编辑插件
拖拽页面组件的dom节点，触发相应事件。可监听相应事件，对组件树进行编排操作。

## 特点
对源代码侵入非常小，接入成本低
以原生方式编写，不依赖框架。可接入Vue React 等框架

## 原理
- 使用dom上的'data-*'属性传递组件id信息，根据不同操作把操作类型和组件信息以事件方式传递出去。
- 监听程序可进行其他操作，比如编排组件树。

## 接入配置
因为是原生dom操作，所以需要根据关键属性对以下节点进行识别。
| 功能 | 标识 | 值描述 | 接入位置 |
| ------ | ------ | ------ | ------ |
| 组件 | CANVAS_COMPONENT_TAG | 组件ID 例：name | 渲染器 |
| 布局组件可拖入区域 | CANVAS_COMPONENT_SLOT_TAG | 组件ID-插槽ID 例：name-abc | 渲染器 |
| 可拖入组件 | MENU_COMPONENT_TAG | 组件ID 例：name | 编辑器文件 |

> 组件Id为全局唯一,可以是字段名或数字


## 使用
```
mounted() {
    new simulator(document.getElementById("cavas"));
}
```

## 事件
| 事件名 | 功能 | 参数 | 
| ------ | ------ | ------ |
| "simulator-comp-click" | 选中画布中的组件 | { elementId } |
| "simulator-comp-btn-click" | 画布组件选中器上的按钮点击 | { elementId, btnId } |
| "simulator-comp-add" | 可拖入组件拖入画布时 | { fromElementId, toElementId } |
| "simulator-comp-move" | 画布中的组件拖拽移动后释放时 | { fromElementId, toElementId } |


export interface IDropInfo {
  type: "comp" | "comp-snippet" | unknown;
  id: string;
}

export type IEventName =
  | "simulator-comp-click"
  | "simulator-comp-btn-click"
  | "simulator-comp-add"
  | "simulator-comp-move";

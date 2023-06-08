import { IEventName } from "./simulator-type";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function dispatchEvent(eventName: IEventName, data: any) {
  const val = { detail: data };
  document.dispatchEvent(new CustomEvent(eventName, val));
}
export function onEvent(eventName: IEventName, fn) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document.addEventListener(eventName, (e: any) => {
    fn(e.detail);
  });
}

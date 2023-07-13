import { GeneratedItem } from "@/types/history";
import bwipjs from "bwip-js";

export default function HistoryItem(props: { item: GeneratedItem }) {
  function genBarcode() {
    try {
      // The return value is the canvas element
      let canvas = bwipjs.toCanvas("code", props.item);
    } catch (e) {
      // `e` may be a string or Error object
      console.error(e);
    }
  }
  genBarcode();
  return (
    <div className="p-5 m-2 bg-white dark:bg-slate-800 shadow-md">
      <canvas className="max-w-[150px]" id="code"></canvas>
    </div>
  );
}

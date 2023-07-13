import { GeneratedItem } from "@/types/history";
import bwipjs from "bwip-js";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function HistoryItem(props: { item: GeneratedItem }) {
  const [url, setURL] = useState("");
  function genBarcode() {
    try {
      // The return value is the canvas element
      let canvas = bwipjs.toCanvas("code", props.item);
      setURL(canvas.toDataURL());
    } catch (e) {
      // `e` may be a string or Error object
      console.error(e);
    }
  }
  useEffect(() => {
    genBarcode();
  }, []);
  return (
    <div className="p-5 m-2 bg-white dark:bg-slate-800 shadow-md rounded-md flex items-center">
      <canvas className="hidden" id="code"></canvas>
      <span>
        <Image
          width={150}
          height={150}
          className="max-w-[150px]"
          src={url}
          alt={props.item.text}
        />
      </span>
    </div>
  );
}

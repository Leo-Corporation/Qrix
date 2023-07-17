import { GeneratedItem } from "@/types/history";
import bwipjs from "bwip-js";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  Copy16Regular,
  Delete16Regular,
  Save16Regular,
} from "@fluentui/react-icons";
import saveAs from "file-saver";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import useTranslation from "next-translate/useTranslation";
import { GetSettings } from "@/lib/browser-storage";

export default function HistoryItem(props: {
  item: GeneratedItem;
  index: number;
  deleteEvent: Function;
}) {
  const { t } = useTranslation("common");
  const settings = GetSettings();
  const [url, setURL] = useState("");
  function genBarcode() {
    try {
      // The return value is the canvas element
      let canvas = bwipjs.toCanvas(
        `code-${props.item.text}-${props.index}`,
        props.item
      );
      setURL(canvas.toDataURL());
    } catch (e) {
      // `e` may be a string or Error object
      console.error(e);
    }
  }
  useEffect(() => {
    genBarcode();
  }, []);
  function copyCanvasContentsToClipboard(
    canvas: HTMLCanvasElement,
    onDone: () => void,
    onError: (err: Error) => void
  ) {
    canvas.toBlob((blob) => {
      // check for null blob
      if (blob) {
        let data = [new ClipboardItem({ [blob.type]: blob })];
        navigator.clipboard.write(data).then(
          () => {
            onDone();
          },
          (err) => {
            onError(err);
          }
        );
      } else {
        // handle null blob case
        onError(new Error("Blob is null"));
      }
    });
  }
  function copyBtn() {
    let canvas: HTMLCanvasElement = document.getElementById(
      `code-${props.item.text}-${props.index}`
    ) as HTMLCanvasElement;
    copyCanvasContentsToClipboard(
      canvas,
      () => {
        console.log("Copied successfully");
      },
      (err) => {
        console.error(err);
      }
    );
  }
  function saveBtn() {
    let canvas = document.getElementById(
      `code-${props.item.text}-${props.index}`
    ) as HTMLCanvasElement;
    canvas.toBlob(function (blob) {
      if (blob) {
        saveAs(blob, `${props.item.text}.${settings.format}`);
      }
    });
  }
  function deleteBtn() {
    props.deleteEvent(
      props.index,
      props.item.bcid == "qrcode" ? "qrcode" : "barcode"
    );
  }
  return (
    <div className="p-3 m-2 bg-white dark:bg-slate-800 shadow-md rounded-md flex flex-col justify-center items-center w-[230px]">
      <canvas
        className="hidden"
        id={`code-${props.item.text}-${props.index}`}
      ></canvas>
      <span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Image
                width={150}
                height={150}
                className="max-w-[150px]"
                src={url}
                alt={props.item.text}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{props.item.text}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </span>
      <div className="flex space-x-2 m-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                onClick={copyBtn}
                variant="outline"
                className="h-auto px-2 py-1"
              >
                <Copy16Regular />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("copy")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                onClick={saveBtn}
                variant="outline"
                className="h-auto px-2 py-1"
              >
                <Save16Regular />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("save")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                onClick={deleteBtn}
                variant="outline"
                className="h-auto px-2 py-1"
              >
                <Delete16Regular />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("delete")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {props.item.bcid == "qrcode" ? (
        <p className="text-center text-wrap mt-2">
          {props.item.text.length > 30
            ? props.item.text.substring(0, 27) + "..."
            : props.item.text}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}

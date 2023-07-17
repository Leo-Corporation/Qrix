import useTranslation from "next-translate/useTranslation";
import { Layout } from "@/components/layout";
import Head from "next/head";
import { PageContent } from "@/components/page";
import {
  Calendar3Day20Regular,
  Copy16Regular,
  QrCode20Regular,
  Save16Regular,
  Settings20Regular,
} from "@fluentui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import bwipjs from "bwip-js";
import { SetStateAction, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddHistory, GetSettings } from "@/lib/browser-storage";
import saveAs from "file-saver";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Settings } from "@/types/settings";

export default function BarcodePage() {
  const { t, lang } = useTranslation("common");
  const settings: Settings = GetSettings();

  const [content, setContent] = useState("");

  const [fg, setFg] = useState(settings.qrFg);
  const [bg, setBg] = useState(settings.qrBg);
  const [vis, setVis] = useState(false);
  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setContent(event.target.value);
  };
  function genBarcode() {
    try {
      // The return value is the canvas element
      let canvas = bwipjs.toCanvas("qrcode", {
        bcid: "qrcode", // Barcode type
        text: content, // Text to encode
        scale: 3, // 3x scaling factor
        //height: 20, // Bar height, in millimeters
        includetext: true, // Show human-readable text
        textxalign: "center", // Always good to set this
        backgroundcolor: bg.substring(1),
        barcolor: fg.substring(1),
        textcolor: fg.substring(1),
      });
      AddHistory(
        {
          bcid: "qrcode", // Barcode type
          text: content, // Text to encode
          scale: 3, // 3x scaling factor
          //height: 20, // Bar height, in millimeters
          includetext: true, // Show human-readable text
          textxalign: "center", // Always good to set this

          backgroundcolor: bg.substring(1),
          barcolor: fg.substring(1),
          textcolor: fg.substring(1),
        },
        "qrcode"
      );
      setVis(true);
    } catch (e) {
      // `e` may be a string or Error object
      console.error(e);
    }
  }
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
      "qrcode"
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
    let canvas = document.getElementById("qrcode") as HTMLCanvasElement;
    canvas.toBlob(function (blob) {
      if (blob) {
        saveAs(blob, `${content}.${settings.format}`);
      }
    });
  }
  return (
    <Layout>
      <Head>
        <title>Qrix</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContent page="qrcode">
        <section className="mb-2 flex items-center space-x-2">
          <QrCode20Regular primaryFill="#8B2DF0" className="text-white" />

          <p className="ml-2 font-bold">{t("qrcode")}</p>
        </section>
        <section className="flex w-full flex-col items-center">
          <div className="m-5 flex w-full space-x-2">
            <div className="shadow-md w-full rounded-md">
              <Input
                onChange={handleInputChange}
                type="text"
                id="prompt-txt"
                placeholder={t("enter-content-qr")}
                className="h-auto min-w-[150px] border-0 bg-white px-2 py-1 dark:bg-slate-800 focus:shadow-sm"
              />
            </div>
            <Button
              onClick={genBarcode}
              variant="default"
              className="h-auto px-2 py-1"
            >
              {t("create")}
            </Button>
          </div>
          {vis ? <></> : <p>{t("qr-placeholder")}</p>}
          <canvas
            className={vis ? "max-w-full" : "hidden"}
            id="qrcode"
          ></canvas>
          <div className={vis ? "flex space-x-2 m-4" : "hidden"}>
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
          </div>
        </section>
        <section className="mb-2 flex items-center space-x-2">
          <Settings20Regular primaryFill="#8B2DF0" className="text-white" />

          <p className="ml-2 font-bold">{t("options")}</p>
        </section>
        <section className="w-full space-y-2">
          <div className="flex space-x-2 items-center">
            <p>{t("foreground-color")}</p>
            <input
              defaultValue={fg}
              className="border-0 rounded-full h-8 w-8 outline-0 colorpicker"
              type="color"
              name="fg"
              id="foreground-color"
              onChange={(e) => setFg(e.target.value)}
            />
          </div>
          <div className="flex space-x-2 items-center">
            <p>{t("background-color")}</p>
            <input
              defaultValue={bg}
              className="border-0 rounded-full h-8 w-8 outline-0 colorpicker"
              type="color"
              name="bg"
              id="background-color"
              onChange={(e) => setBg(e.target.value)}
            />
          </div>
        </section>
      </PageContent>
    </Layout>
  );
}

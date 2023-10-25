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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { TextXAlign } from "@/types/text-x-align";
import { TextYAlign } from "@/types/text-y-align";

export default function BarcodePage() {
  const { t, lang } = useTranslation("common");
  const settings: Settings = GetSettings();

  const [content, setContent] = useState("");

  const [fg, setFg] = useState(settings.qrFg);
  const [bg, setBg] = useState(settings.qrBg);
  const [vis, setVis] = useState(false);
  const [textxalign, setTextXAlign] = useState<TextXAlign>(
    settings.qrTextxalign,
  );
  const [textyalign, setTextYAlign] = useState<TextYAlign>(
    settings.qrTextyalign,
  );
  const [fontSize, setFontSize] = useState(settings.qrTextsize);
  const [alt, setAlt] = useState("");
  const [showText, setShowText] = useState(settings.qrShowText);
  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setContent(event.target.value);
  };
  const handleAltChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setAlt(event.target.value);
  };
  const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setFontSize(newValue);
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
        backgroundcolor: bg.substring(1),
        barcolor: fg.substring(1),
        textcolor: fg.substring(1),
        alttext: showText ? (alt ? alt : content) : "",
        textsize: fontSize,
        textyalign: textyalign,
        textxalign: textxalign,
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
          alttext: showText ? content : "",
        },
        "qrcode",
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
    onError: (err: Error) => void,
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
          },
        );
      } else {
        // handle null blob case
        onError(new Error("Blob is null"));
      }
    });
  }
  function copyBtn() {
    let canvas: HTMLCanvasElement = document.getElementById(
      "qrcode",
    ) as HTMLCanvasElement;
    copyCanvasContentsToClipboard(
      canvas,
      () => {
        console.log("Copied successfully");
      },
      (err) => {
        console.error(err);
      },
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
  function toTextYAlign(s: string): TextYAlign {
    switch (s) {
      case "above":
        return "above";
      case "below":
        return "below";
      default:
        return "center";
    }
  }
  function toTextAlign(s: string): TextXAlign {
    switch (s) {
      case "offleft":
        return "offleft";
      case "left":
        return "left";
      case "right":
        return "right";
      case "offright":
        return "offright";
      case "justify":
        return "justify";
      default:
        return "center";
    }
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
            <div className="w-full rounded-md shadow-md">
              <Input
                onChange={handleInputChange}
                type="text"
                id="prompt-txt"
                placeholder={t("enter-content-qr")}
                className="h-auto min-w-[150px] border-0 bg-white px-2 py-1 focus:shadow-sm dark:bg-slate-800"
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
          <div className={vis ? "m-4 flex space-x-2" : "hidden"}>
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
        <section className="grid grid-cols-[auto,1fr] grid-rows-6 items-center gap-2">
          <p>{t("foreground-color")}</p>
          <input
            defaultValue={fg}
            className="colorpicker h-8 w-8 rounded-full border-0 outline-0"
            type="color"
            name="fg"
            id="foreground-color"
            onChange={(e) => setFg(e.target.value)}
          />
          <p>{t("background-color")}</p>
          <input
            defaultValue={bg}
            className="colorpicker h-8 w-8 rounded-full border-0 outline-0"
            type="color"
            name="bg"
            id="background-color"
            onChange={(e) => setBg(e.target.value)}
          />
          <Label htmlFor="show-text">{t("show-text")}</Label>
          <Switch
            id="show-text"
            defaultChecked={showText}
            onCheckedChange={(v) => setShowText(v)}
          ></Switch>
          <p>{t("text-x-align")}</p>
          <Select
            defaultValue={textxalign}
            onValueChange={(e) => {
              setTextXAlign(toTextAlign(e));
            }}
          >
            <SelectTrigger className="h-auto w-[150px] p-1">
              <SelectValue placeholder={t("text-x-align")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="offleft">{t("offleft")}</SelectItem>
              <SelectItem value="left">{t("left")}</SelectItem>
              <SelectItem value="center">{t("center")}</SelectItem>
              <SelectItem value="right">{t("right")}</SelectItem>
              <SelectItem value="offright">{t("offright")}</SelectItem>
              <SelectItem value="justify">{t("justify")}</SelectItem>
            </SelectContent>
          </Select>
          <p>{t("text-y-align")}</p>
          <Select
            defaultValue={textyalign}
            onValueChange={(e) => {
              setTextYAlign(toTextYAlign(e));
            }}
          >
            <SelectTrigger className="h-auto w-[150px] p-1">
              <SelectValue placeholder={t("text-y-align")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="above">{t("above")}</SelectItem>
              <SelectItem value="center">{t("center")}</SelectItem>
              <SelectItem value="below">{t("below")}</SelectItem>
            </SelectContent>
          </Select>
          <p>{t("font-size")}</p>
          <div className="w-[50px] rounded-md bg-white shadow-md dark:bg-slate-800">
            <Input
              onChange={handleFontSizeChange}
              min={1}
              max={120}
              defaultValue={fontSize}
              className="h-[28px] border-0 p-2"
              type="number"
            />
          </div>
          <p>{t("alt-text")}</p>
          <div className="w-[150px] rounded-md shadow-md">
            <Input
              onChange={handleAltChange}
              type="text"
              placeholder={t("alt-text")}
              className="h-auto w-[150px] border-0 bg-white px-2 py-1 dark:bg-slate-800"
            />
          </div>
        </section>
      </PageContent>
    </Layout>
  );
}

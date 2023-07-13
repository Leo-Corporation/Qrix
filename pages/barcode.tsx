import useTranslation from "next-translate/useTranslation";
import { Layout } from "@/components/layout";
import Head from "next/head";
import { PageContent } from "@/components/page";
import { Calendar3Day20Regular } from "@fluentui/react-icons";
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
import { AddHistory } from "@/lib/browser-storage";

export default function BarcodePage() {
  const { t, lang } = useTranslation("common");

  const [content, setContent] = useState("");
  const [type, setType] = useState("code128");
  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setContent(event.target.value);
  };
  function genBarcode() {
    try {
      // The return value is the canvas element
      let canvas = bwipjs.toCanvas("barcode", {
        bcid: type, // Barcode type
        text: content, // Text to encode
        scale: 3, // 3x scaling factor
        height: 10, // Bar height, in millimeters
        includetext: true, // Show human-readable text
        textxalign: "center", // Always good to set this
        backgroundcolor: "FFFFFF",
      });

      AddHistory(
        {
          bcid: type, // Barcode type
          text: content, // Text to encode
          scale: 3, // 3x scaling factor
          height: 10, // Bar height, in millimeters
          includetext: true, // Show human-readable text
          textxalign: "center", // Always good to set this
          backgroundcolor: "FFFFFF",
        },
        "barcode"
      );
    } catch (e) {
      // `e` may be a string or Error object
      console.error(e);
    }
  }
  return (
    <Layout>
      <Head>
        <title>Qrix</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContent page="barcode">
        <div className="mb-2 flex items-center space-x-2">
          <Calendar3Day20Regular primaryFill="#8B2DF0" className="text-white" />

          <p className="ml-2 font-bold">{t("barcode")}</p>
        </div>
        <div className="flex w-full flex-col items-center">
          <div className="m-5 flex w-full space-x-2">
            <div className="shadow-md w-full rounded-md">
              <Input
                onChange={handleInputChange}
                type="text"
                id="prompt-txt"
                placeholder={t("enter-content")}
                className="h-auto min-w-[150px] border-0 bg-white px-2 py-1 dark:bg-slate-800"
              />
            </div>
            <div className="shadow-md rounded-md">
              <Select defaultValue="code128" onValueChange={setType}>
                <SelectTrigger className="w-[180px] bg-white dark:bg-slate-800 border-0 h-auto px-2 py-1">
                  <SelectValue defaultValue="code128" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="" value="code128">
                    Code128
                  </SelectItem>
                  <SelectItem className="" value="code11">
                    Code11
                  </SelectItem>
                  <SelectItem className="" value="upca">
                    UPC-A
                  </SelectItem>
                  <SelectItem className="" value="msi">
                    MSI
                  </SelectItem>
                  <SelectItem className="" value="isbn">
                    ISBN
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={genBarcode}
              variant="default"
              className="h-auto px-2 py-1"
            >
              {t("create")}
            </Button>
          </div>
          <canvas className="max-w-full" id="barcode"></canvas>
        </div>
      </PageContent>
    </Layout>
  );
}

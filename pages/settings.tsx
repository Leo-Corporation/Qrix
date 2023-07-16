import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Save16Regular, Settings20Regular } from "@fluentui/react-icons";
import { DialogClose } from "@radix-ui/react-dialog";
import { useTheme } from "next-themes";
import setLanguage from "next-translate/setLanguage";
import useTranslation from "next-translate/useTranslation";

import { Layout } from "@/components/layout";
import { PageContent } from "@/components/page";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChangeEventHandler, useState } from "react";
import { Settings } from "@/types/settings";
import { GetSettings, SetSettings } from "@/lib/browser-storage";
export default function SettingsPage() {
  const { t, lang } = useTranslation("common"); // default namespace (optional)
  const { setTheme } = useTheme();

  const settings: Settings = GetSettings();
  const [barFg, setBarFg] = useState(settings.barcodeFg);
  const [barBg, setBarBg] = useState(settings.barcodeBg);
  const [qrFg, setQrFg] = useState(settings.qrFg);
  const [qrBg, setQrBg] = useState(settings.qrBg);

  let ver = "1.0";
  function isSettings(object: any): object is Settings {
    return (
      typeof object === "object" &&
      typeof object.barcodeType === "string" &&
      typeof object.barcodeBg === "string" &&
      typeof object.barcodeFg === "string" &&
      typeof object.qrBg === "string" &&
      typeof object.qrFg === "string"
    );
  }
  function Import(event: any) {
    if (!event.target) return;
    let file = event.target.files[0]; // get the selected file
    let reader = new FileReader(); // create a FileReader object
    reader.onload = function (event) {
      let text: string = event.target?.result as string; // get the file content as text
      let json: Settings = JSON.parse(text); // parse the text as JSON
      if (!isSettings(json)) {
        alert("Invalid file");
        return;
      }
      setBarFg(json.barcodeFg);
      setBarBg(json.barcodeBg);
      setQrFg(json.qrFg);
      setQrBg(json.qrBg);
      localStorage.setItem("qrix_settings", JSON.stringify(json)); // store the JSON in localstorage
    };
    reader.readAsText(file); // read the file as text
  }

  async function SelectChanged(val: string) {
    await setLanguage(val);
    const date = new Date();
    const expireMs = 100 * 24 * 60 * 60 * 1000; // 100 days
    date.setTime(date.getTime() + expireMs);
    document.cookie = `NEXT_LOCALE=${val};expires=${date.toUTCString()};path=/`;
  }

  return (
    <Layout>
      <Head>
        <title>Qrix</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContent page="settings">
        <div className="mb-2 flex items-center space-x-2">
          <Settings20Regular primaryFill="#8B2DF0" className="text-white" />

          <p className="ml-2 font-bold">{t("settings")}</p>
        </div>
        <div className="flex justify-center">
          <section
            id="about-section"
            className="m-2 flex flex-col items-center justify-center rounded-lg bg-white px-10 py-4 text-center shadow-lg dark:bg-slate-800"
          >
            <div className="m-3 flex items-center space-x-2">
              <h2 className="text-4xl font-bold">{t("title")}</h2>
              <span className="m-2 rounded-full bg-gradient-to-br from-[#8B2DF0] to-[#2153E0] px-2 font-bold text-white">
                {t("web")}
              </span>
            </div>
            <p className="text-sm">{`${t("version")} ${ver}`}</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="nav" variant="outline" className="mt-1 font-bold">
                  {t("see-licenses")}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white dark:bg-slate-900 border-0">
                <DialogHeader>
                  <DialogTitle>{t("licenses")}</DialogTitle>
                </DialogHeader>
                <p>
                  NextJS - MIT License - © 2023 Vercel, Inc.
                  <br></br>
                  RadixUI - MIT License - © 2022 WorkOS
                  <br></br>
                  shadcn/ui - MIT License - © 2023 shadcn
                  <br></br>
                  Fluent System Icons - MIT License - © 2020 Microsoft
                  Corporation
                  <br></br>
                  Qrix - MIT License - © 2023 Léo Corporation
                </p>
                <DialogFooter>
                  <DialogClose>
                    <Button size="nav" type="submit">
                      {t("ok")}
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </section>
        </div>
        <section id="settings-section">
          <Accordion type="single" collapsible>
            <AccordionItem value="theme">
              <AccordionTrigger>
                <div className="grid grid-cols-[auto,1fr] items-center">
                  <p className="icon my-2 mr-2 text-3xl font-normal">
                    {"\uF33C"}
                  </p>
                  <div>
                    <h4 className="text-left text-lg">{t("theme")}</h4>
                    <p className="text-left text-sm font-normal">
                      {t("change-theme")}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap">
                  <div
                    onClick={() => setTheme("light")}
                    className="m-2 flex cursor-pointer items-center space-x-2 overflow-hidden rounded-lg bg-slate-100 pr-2 dark:bg-slate-700"
                  >
                    <Image
                      src="/LightTheme.png"
                      height={50}
                      width={50}
                      alt="Light theme image"
                      className="object-cover"
                    />
                    <p className="m-2 font-bold">Light</p>
                  </div>
                  <div
                    onClick={() => setTheme("dark")}
                    className="m-2 flex cursor-pointer items-center space-x-2 overflow-hidden rounded-lg bg-slate-100 pr-2 dark:bg-slate-700"
                  >
                    <Image
                      src="/DarkTheme.png"
                      height={50}
                      width={50}
                      alt="Dark theme image"
                      className="object-cover"
                    />
                    <p className="m-2 font-bold">Dark</p>
                  </div>
                  <div
                    onClick={() => setTheme("system")}
                    className="m-2 flex cursor-pointer items-center space-x-2 overflow-hidden rounded-lg bg-slate-100 pr-2 dark:bg-slate-700"
                  >
                    <Image
                      src="/SystemTheme.png"
                      height={50}
                      width={50}
                      alt="System theme image"
                      className="object-cover"
                    />
                    <p className="m-2 font-bold">System</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <div className="mx-2 mt-2 grid grid-cols-1 items-center rounded-lg bg-slate-100 p-4 font-bold dark:bg-slate-800 sm:grid-cols-2 ">
              <div className="grid grid-cols-[auto,1fr] items-center">
                <p className="icon my-2 mr-2 text-3xl font-normal">
                  {"\uF4F4"}
                </p>
                <div>
                  <h4 className="text-left text-lg">{t("language")}</h4>
                  <p className="text-left text-sm font-normal">
                    {t("change-language")}
                  </p>
                </div>
              </div>
              <Select defaultValue={lang} onValueChange={SelectChanged}>
                <SelectTrigger className="mx-1 h-auto w-[200px] px-2 py-1 sm:justify-self-end">
                  <SelectValue placeholder={t("language")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem defaultChecked={true} value="en">
                    English (United States)
                  </SelectItem>
                  <SelectItem value="fr">Français (France)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <AccordionItem value="barcode">
              <AccordionTrigger>
                <div className="grid grid-cols-[auto,1fr] items-center">
                  <p className="icon my-2 mr-2 text-3xl font-normal">
                    {"\uF20F"}
                  </p>
                  <div>
                    <h4 className="text-left text-lg">{t("barcode")}</h4>
                    <p className="text-left text-sm font-normal">
                      {t("barcode-settings")}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <section className="space-y-2">
                  <div className="flex space-x-2 items-center">
                    <p>{t("foreground-color")}</p>
                    <input
                      defaultValue={barFg}
                      className="border-0 rounded-full h-8 w-8 outline-0 colorpicker"
                      type="color"
                      name="fg"
                      id="foreground-color"
                      onChange={(e) => {
                        settings.barcodeFg = e.target.value;
                        SetSettings(settings);
                        setBarFg(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex space-x-2 items-center">
                    <p>{t("background-color")}</p>
                    <input
                      defaultValue={barBg}
                      className="border-0 rounded-full h-8 w-8 outline-0 colorpicker"
                      type="color"
                      name="bg"
                      id="background-color"
                      onChange={(e) => {
                        settings.barcodeBg = e.target.value;
                        SetSettings(settings);
                        setBarBg(e.target.value);
                      }}
                    />
                  </div>
                </section>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="qrcode">
              <AccordionTrigger>
                <div className="grid grid-cols-[auto,1fr] items-center">
                  <p className="icon my-2 mr-2 text-3xl font-normal">
                    {"\uF635"}
                  </p>
                  <div>
                    <h4 className="text-left text-lg">{t("qrcode")}</h4>
                    <p className="text-left text-sm font-normal">
                      {t("qrcode-settings")}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <section className="space-y-2">
                  <div className="flex space-x-2 items-center">
                    <p>{t("foreground-color")}</p>
                    <input
                      defaultValue={qrFg}
                      className="border-0 rounded-full h-8 w-8 outline-0 colorpicker"
                      type="color"
                      name="qrfg"
                      id="qr-foreground-color"
                      onChange={(e) => {
                        settings.qrFg = e.target.value;
                        SetSettings(settings);
                        setQrBg(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex space-x-2 items-center">
                    <p>{t("background-color")}</p>
                    <input
                      defaultValue={qrBg}
                      className="border-0 rounded-full h-8 w-8 outline-0 colorpicker"
                      type="color"
                      name="qrbg"
                      id="qr-background-color"
                      onChange={(e) => {
                        settings.qrBg = e.target.value;
                        SetSettings(settings);
                        setQrFg(e.target.value);
                      }}
                    />
                  </div>
                </section>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="data">
              <AccordionTrigger>
                <div className="grid grid-cols-[auto,1fr] items-center">
                  <p className="icon my-2 mr-2 text-3xl font-normal">
                    {"\uF4AB"}
                  </p>
                  <div>
                    <h4 className="text-left text-lg">{t("data")}</h4>
                    <p className="text-left text-sm font-normal">
                      {t("manage-data")}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex space-x-2">
                  <Link
                    className={buttonVariants({
                      variant: "default",
                      size: "nav",
                      className: "text-center",
                    })}
                    href={
                      "data:text/plain;charset=UTF-8," +
                      encodeURIComponent(
                        typeof window !== "undefined"
                          ? localStorage.getItem("qrix_settings") || "{}"
                          : "{}"
                      )
                    }
                    download={"settings.json"}
                  >
                    {t("export-settings")}
                  </Link>
                  <Button
                    variant="outline"
                    size="nav"
                    onClick={() =>
                      (
                        document.getElementById(
                          "FileSelector"
                        ) as HTMLInputElement
                      ).click()
                    }
                  >
                    {t("import-settings")}
                  </Button>
                  <Input
                    type="file"
                    id="FileSelector"
                    accept="application/json"
                    className="hidden"
                    onChange={Import}
                  ></Input>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        className="h-auto px-2 py-1 font-bold"
                        variant="destructiveghost"
                      >
                        {t("reset-settings")}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          {t("reset-settings")}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {t("reset-settings-msg")}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogAction
                          onClick={() => {
                            setTheme("system");
                            localStorage.setItem(
                              "qrix_settings",
                              JSON.stringify({})
                            );
                          }}
                        >
                          {t("continue")}
                        </AlertDialogAction>
                        <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </PageContent>
    </Layout>
  );
}

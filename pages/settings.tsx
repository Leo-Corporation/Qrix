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
import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Check20Regular,
  Checkmark16Regular,
  ChevronDown16Regular,
} from "@fluentui/react-icons";
import { barcodeTypes } from "@/lib/barcodeTypes";
import { TextXAlign } from "@/types/text-x-align";
import { TextYAlign } from "@/types/text-y-align";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { qrCodeTypes } from "@/lib/qrCodeTypes";
export default function SettingsPage() {
  const { t, lang } = useTranslation("common"); // default namespace (optional)
  const { setTheme } = useTheme();

  const settings: Settings = GetSettings();
  if (settings.textsize === undefined) settings.textsize = 8;
  if (settings.textxalign === undefined) settings.textxalign = "center";
  if (settings.textyalign === undefined) settings.textyalign = "below";
  if (settings.qrTextsize === undefined) settings.qrTextsize = 8;
  if (settings.qrTextxalign === undefined) settings.qrTextxalign = "center";
  if (settings.qrTextyalign === undefined) settings.qrTextyalign = "below";
  if (settings.qrShowText === undefined) settings.qrShowText = false;
  if (settings.qrType === undefined) settings.qrType = "qrcode";

  const [barFg, setBarFg] = useState(settings.barcodeFg);
  const [barBg, setBarBg] = useState(settings.barcodeBg);
  const [qrFg, setQrFg] = useState(settings.qrFg);
  const [qrBg, setQrBg] = useState(settings.qrBg);
  const [type, setType] = useState(settings.barcodeType);
  const [qrType, setQrType] = useState(settings.qrType);
  const [format, setFormat] = useState(settings.format);
  const [xalign, setXAlign] = useState<TextXAlign>(settings.textxalign);
  const [yalign, setYAlign] = useState<TextYAlign>(settings.textyalign);
  const [fontSize, setFontSize] = useState(settings.textsize);
  const [qrXAlign, setQrXAlign] = useState<TextXAlign>(settings.qrTextxalign);
  const [qrYAlign, setQrYAlign] = useState<TextYAlign>(settings.qrTextyalign);
  const [qrFontSize, setQrFontSize] = useState(settings.qrTextsize);
  const [qrShowText, setQrShowText] = useState(settings.qrShowText);
  const [open, setOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  const ver = "1.6.0.2402";
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
      setType(json.barcodeType);
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
  const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setFontSize(newValue);
    settings.textsize = newValue;
    SetSettings(settings);
  };
  const handleQrFontSizeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = Number(event.target.value);
    setQrFontSize(newValue);
    settings.qrTextsize = newValue;
    SetSettings(settings);
  };
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
              <span className="m-2 rounded-full bg-gradient-to-br from-accent-color to-[#2153E0] px-2 font-bold text-white">
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
              <DialogContent className="border-0 bg-white dark:bg-slate-900 sm:max-w-[425px]">
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
                  Qrix - MIT License - © 2023-2024 Léo Corporation
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
            <div className="mx-2 mt-2 grid grid-cols-1 items-center rounded-lg bg-slate-100 p-4 font-bold dark:bg-slate-800 sm:grid-cols-2 ">
              <div className="grid grid-cols-[auto,1fr] items-center">
                <p className="icon my-2 mr-2 text-3xl font-normal">
                  {"\uF680"}
                </p>
                <div>
                  <h4 className="text-left text-lg">{t("save-option")}</h4>
                  <p className="text-left text-sm font-normal">
                    {t("default-format")}
                  </p>
                </div>
              </div>
              <Select
                defaultValue={format}
                onValueChange={(e: "png" | "jpg" | "jpeg" | "bmp") => {
                  setFormat(e);
                  settings.format = e;
                  SetSettings(settings);
                }}
              >
                <SelectTrigger className="mx-1 h-auto w-[200px] px-2 py-1 sm:justify-self-end">
                  <SelectValue placeholder={"PNG"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bmp">BMP</SelectItem>
                  <SelectItem value="jpg">JPG</SelectItem>
                  <SelectItem value="jpeg">JPEG</SelectItem>
                  <SelectItem value="png">PNG</SelectItem>
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
                <section className="grid grid-cols-[auto,1fr] grid-rows-6 items-center gap-2">
                  <p>{t("barcode-default")}</p>
                  <div className="border-0.5 rounded-md border-slate-200 dark:border-slate-700">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="h-auto justify-between px-2 py-1 sm:w-[180px]"
                        >
                          {type
                            ? barcodeTypes.find((code) => code.value === type)
                                ?.label
                            : "Select code..."}
                          <ChevronDown16Regular className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[180px] border-slate-200 p-0 dark:border-slate-700">
                        <Command>
                          <CommandInput placeholder={t("search-barcode")} />
                          <CommandEmpty>{t("no-barcode-found")}</CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-[190px]">
                              {barcodeTypes.map((code) => (
                                <CommandItem
                                  key={code.value}
                                  onSelect={(currentValue) => {
                                    currentValue = currentValue.replace(
                                      "-",
                                      "",
                                    );
                                    switch (currentValue) {
                                      case "code25":
                                        currentValue = "code2of5";
                                        break;
                                      case "code39 extended":
                                        currentValue = "code39ext";
                                        break;
                                      case "code93 extended":
                                        currentValue = "code93ext";
                                        break;
                                      case "telepen":
                                        currentValue = "telepen";
                                        break;
                                      case "telepen numeric":
                                        currentValue = "telepennumeric";
                                        break;
                                      default:
                                        break;
                                    }
                                    setType(
                                      currentValue === type ? "" : currentValue,
                                    );
                                    setOpen(false);
                                    settings.barcodeType = currentValue;
                                    SetSettings(settings);
                                  }}
                                >
                                  <Checkmark16Regular
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      type === code.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {code.label}
                                </CommandItem>
                              ))}
                            </ScrollArea>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <p>{t("foreground-color")}</p>
                  <input
                    defaultValue={barFg}
                    className="colorpicker h-8 w-8 rounded-full border-0 outline-0"
                    type="color"
                    name="fg"
                    id="foreground-color"
                    onChange={(e) => {
                      settings.barcodeFg = e.target.value;
                      SetSettings(settings);
                      setBarFg(e.target.value);
                    }}
                  />
                  <p>{t("background-color")}</p>
                  <input
                    defaultValue={barBg}
                    className="colorpicker h-8 w-8 rounded-full border-0 outline-0"
                    type="color"
                    name="bg"
                    id="background-color"
                    onChange={(e) => {
                      settings.barcodeBg = e.target.value;
                      SetSettings(settings);
                      setBarBg(e.target.value);
                    }}
                  />
                  <p>{t("text-x-align")}</p>
                  <Select
                    defaultValue={xalign}
                    onValueChange={(e) => {
                      settings.textxalign = toTextAlign(e);
                      SetSettings(settings);
                      setXAlign(toTextAlign(e));
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
                    defaultValue={yalign}
                    onValueChange={(e) => {
                      settings.textyalign = toTextYAlign(e);
                      SetSettings(settings);
                      setYAlign(toTextYAlign(e));
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
                  <Input
                    defaultValue={fontSize}
                    onChange={handleFontSizeChange}
                    min={1}
                    max={120}
                    className="h-[28px] w-[50px] border border-slate-200 p-2 dark:border-slate-700"
                    type="number"
                  />
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
                <section className="grid grid-cols-[auto,1fr] grid-rows-6 items-center gap-2">
                  <p>{t("barcode-default")}</p>
                  <div className="rounded-md">
                    <Popover open={qrOpen} onOpenChange={setQrOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={qrOpen}
                          className="h-auto w-full justify-between border border-slate-200 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-800 sm:w-[180px]"
                        >
                          {qrType
                            ? qrCodeTypes.find((code) => code.value === qrType)
                                ?.label
                            : "Select code..."}
                          <ChevronDown16Regular className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full border-slate-200 p-0 dark:border-slate-700 sm:w-[180px]">
                        <Command>
                          <CommandInput placeholder={t("search-barcode")} />
                          <CommandEmpty>{t("no-barcode-found")}</CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-auto">
                              {qrCodeTypes.map((code) => (
                                <CommandItem
                                  key={code.value}
                                  value={code.value}
                                  onSelect={(currentValue) => {
                                    currentValue = currentValue.replace(
                                      "-",
                                      "",
                                    );

                                    setQrType(
                                      currentValue === qrType
                                        ? ""
                                        : currentValue,
                                    );
                                    setQrOpen(false);
                                    settings.qrType = currentValue;
                                    SetSettings(settings);
                                  }}
                                >
                                  <Checkmark16Regular
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      qrType === code.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {code.label}
                                </CommandItem>
                              ))}
                            </ScrollArea>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <p>{t("foreground-color")}</p>
                  <input
                    defaultValue={qrFg}
                    className="colorpicker h-8 w-8 rounded-full border-0 outline-0"
                    type="color"
                    name="qrfg"
                    id="qr-foreground-color"
                    onChange={(e) => {
                      settings.qrFg = e.target.value;
                      SetSettings(settings);
                      setQrBg(e.target.value);
                    }}
                  />
                  <p>{t("background-color")}</p>
                  <input
                    defaultValue={qrBg}
                    className="colorpicker h-8 w-8 rounded-full border-0 outline-0"
                    type="color"
                    name="qrbg"
                    id="qr-background-color"
                    onChange={(e) => {
                      settings.qrBg = e.target.value;
                      SetSettings(settings);
                      setQrFg(e.target.value);
                    }}
                  />
                  <Label htmlFor="show-text">{t("show-text")}</Label>
                  <Switch
                    id="show-text"
                    defaultChecked={qrShowText}
                    onCheckedChange={(v) => {
                      settings.qrShowText = v;
                      SetSettings(settings);
                      setQrShowText(v);
                    }}
                  ></Switch>

                  <p>{t("text-x-align")}</p>
                  <Select
                    defaultValue={qrXAlign}
                    onValueChange={(e) => {
                      settings.qrTextxalign = toTextAlign(e);
                      SetSettings(settings);
                      setQrXAlign(toTextAlign(e));
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
                    defaultValue={qrYAlign}
                    onValueChange={(e) => {
                      settings.qrTextyalign = toTextYAlign(e);
                      SetSettings(settings);
                      setQrYAlign(toTextYAlign(e));
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
                  <Input
                    defaultValue={qrFontSize}
                    onChange={handleQrFontSizeChange}
                    min={1}
                    max={120}
                    className="h-[28px] w-[50px] border border-slate-200 p-2 dark:border-slate-700"
                    type="number"
                  />
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
                          : "{}",
                      )
                    }
                    download={"settings.json"}
                  >
                    {t("export-settings")}
                  </Link>
                  <Button
                    variant="outline"
                    size="nav"
                    className="font-bold"
                    onClick={() =>
                      (
                        document.getElementById(
                          "FileSelector",
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
                              JSON.stringify({}),
                            );
                            setBarFg("#000000");
                            setBarBg("#FFFFFF");
                            setQrFg("#000000");
                            setQrBg("#FFFFFF");
                            setType("code128");
                            setFormat("png");
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

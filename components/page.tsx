import Link from "next/link";
import {
  Calendar3Day20Regular,
  History20Filled,
  Home20Filled,
  LockClosed20Regular,
  Navigation24Regular,
  QrCode20Regular,
  Settings20Filled,
  Shield20Regular,
  Translate20Regular,
} from "@fluentui/react-icons";
import useTranslation from "next-translate/useTranslation";

import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import InstallSection from "./install-app";

export interface PageProps {
  children: React.ReactNode;
  page: string;
}

export function PageContent({ children, page }: PageProps) {
  const { t } = useTranslation("common");

  function GetWelcomeMessage(): string {
    let hour = new Date().getHours(); // Get the current hour
    if (hour >= 21 || hour < 7) {
      // If between 9PM & 7AM
      return t("night"); // Return the correct value
    } else if (hour >= 7 && hour <= 12) {
      // If between 7AM - 12PM
      return t("hello"); // Return the correct value
    } else if (hour >= 12 && hour <= 17) {
      // If between 12PM - 5PM
      return t("afternoon"); // Return the correct value
    } else if (hour >= 17 && hour <= 21) {
      // If between 5PM - 9PM
      return t("evening"); // Return the correct value
    }
    return t("hello");
  }

  function SetHeight() {
    if (typeof document !== "undefined") {
      let header = document.querySelector("header");
      if (!header) return;

      let headerHeight = header.clientHeight;
      let height = document.documentElement.clientHeight;
      document.documentElement.style.setProperty(
        "--content-h",
        `${height - headerHeight}px`,
      );
    }
  }
  SetHeight();

  if (typeof document !== "undefined") {
    onresize = () => {
      SetHeight();
    };
  }

  return (
    <div className="h-screen overflow-hidden">
      <header className="flex space-x-2 border-b border-slate-200 p-2 py-5 shadow-xs md:hidden dark:border-slate-700">
        <Sheet>
          <SheetTrigger>
            <Button className="md:hidden" variant="ghost">
              <Navigation24Regular />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="border-0 bg-white dark:bg-slate-900"
          >
            <nav>
              <h3 className="m-2 mt-0 text-xs font-bold">{t("pinned")}</h3>
              <Link
                className={buttonVariants({
                  size: "sm",
                  variant: page == "home" ? "navselect" : "nav",
                  className:
                    "mx-2 my-1 h-auto w-full pr-3 pl-0 text-black dark:text-white",
                })}
                href={"/"}
              >
                <div className="rounded-md bg-linear-to-br from-[#422EEF] to-[#E92EEF] p-[5px]">
                  <Home20Filled className="text-white" />
                </div>
                <p className="ml-2 font-bold">{t("home")}</p>
              </Link>
              <Link
                className={buttonVariants({
                  size: "sm",
                  variant: page == "history" ? "navselect" : "nav",
                  className:
                    "mx-2 my-1 h-auto w-full pr-3 pl-0 text-black dark:text-white",
                })}
                href={"/history"}
              >
                <div className="rounded-md bg-linear-to-br from-[#6F00FF] to-[#9A21E0] p-[5px]">
                  <History20Filled className="text-white" />
                </div>
                <p className="ml-2 font-bold">{t("history")}</p>
              </Link>
              <Link
                className={buttonVariants({
                  size: "sm",
                  variant: page == "settings" ? "navselect" : "nav",
                  className:
                    "mx-2 my-1 h-auto w-full pr-3 pl-0 text-black dark:text-white",
                })}
                href={"/settings"}
              >
                <div className="rounded-md bg-linear-to-br from-[#B1B1B1] to-[#343C51] p-[5px]">
                  <Settings20Filled className="text-white" />
                </div>
                <p className="ml-2 font-bold">{t("settings")}</p>
              </Link>
              <h3 className="m-2 text-xs font-bold">{t("tools")}</h3>
              <Link
                className={buttonVariants({
                  size: "nav",
                  variant: page == "barcode" ? "navselect2" : "nav2",
                  className: "text-accent-color mx-2 my-1 w-full",
                })}
                href={"/barcode"}
              >
                <Calendar3Day20Regular />
                <p className="ml-2 font-bold">{t("barcode")}</p>
              </Link>
              <Link
                className={buttonVariants({
                  size: "nav",
                  variant: page == "qrcode" ? "navselect2" : "nav2",
                  className: "text-accent-color mx-2 my-1 w-full",
                })}
                href={"/qrcode"}
              >
                <QrCode20Regular />
                <p className="ml-2 font-bold">{t("qrcode")}</p>
              </Link>
              <InstallSection />
            </nav>
          </SheetContent>
        </Sheet>
        <div>
          <h1 className="text-4xl font-bold">{t("title")}</h1>
          <p className="font-bold">{GetWelcomeMessage()}</p>
        </div>
      </header>

      <section className="grid grid-cols-4 xl:grid-cols-6">
        <ScrollArea className="md:h-scroll border-r border-slate-200 bg-slate-100 shadow-xs dark:border-slate-700 dark:bg-slate-900">
          <div className="hidden border-b border-slate-200 p-4 pb-2 md:block dark:border-slate-700">
            <h1 className="text-3xl font-bold">{t("title")}</h1>
            <p className="text-sm font-semibold">{GetWelcomeMessage()}</p>
          </div>
          <nav className="hidden flex-col p-2 md:flex">
            <h3 className="m-2 mt-0 text-xs font-bold">{t("pinned")}</h3>
            <Link
              className={buttonVariants({
                size: "sm",
                variant: page == "home" ? "navselect" : "nav",
                className:
                  "mx-2 my-1 h-auto pr-3 pl-0 text-black dark:text-white",
              })}
              href={"/"}
            >
              <div className="rounded-md bg-linear-to-br from-[#422EEF] to-[#E92EEF] p-[5px]">
                <Home20Filled className="text-white" />
              </div>
              <p className="ml-2 font-bold">{t("home")}</p>
            </Link>
            <Link
              className={buttonVariants({
                size: "sm",
                variant: page == "history" ? "navselect" : "nav",
                className:
                  "mx-2 my-1 h-auto pr-3 pl-0 text-black dark:text-white",
              })}
              href={"/history"}
            >
              <div className="rounded-md bg-linear-to-br from-[#6F00FF] to-[#9A21E0] p-[5px]">
                <History20Filled className="text-white" />
              </div>
              <p className="ml-2 font-bold">{t("history")}</p>
            </Link>
            <Link
              className={buttonVariants({
                size: "sm",
                variant: page == "settings" ? "navselect" : "nav",
                className:
                  "mx-2 my-1 h-auto pr-3 pl-0 text-black dark:text-white",
              })}
              href={"/settings"}
            >
              <div className="rounded-md bg-linear-to-br from-[#B1B1B1] to-[#343C51] p-[5px]">
                <Settings20Filled className="text-white" />
              </div>
              <p className="ml-2 font-bold">{t("settings")}</p>
            </Link>
            <h3 className="m-2 text-xs font-bold">{t("tools")}</h3>
            <Link
              className={buttonVariants({
                size: "nav",
                variant: page == "barcode" ? "navselect2" : "nav2",
                className: "text-accent-color mx-2 my-1",
              })}
              href={"/barcode"}
            >
              <Calendar3Day20Regular />
              <p className="ml-2 font-bold">{t("barcode")}</p>
            </Link>
            <Link
              className={buttonVariants({
                size: "nav",
                variant: page == "qrcode" ? "navselect2" : "nav2",
                className: "text-accent-color mx-2 my-1",
              })}
              href={"/qrcode"}
            >
              <QrCode20Regular />
              <p className="ml-2 font-bold">{t("qrcode")}</p>
            </Link>
            <InstallSection />
          </nav>
        </ScrollArea>
        <ScrollArea className="h-scroll col-span-5 p-2 md:col-start-2">
          {children}
        </ScrollArea>
      </section>
    </div>
  );
}

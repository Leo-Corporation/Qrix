import Head from "next/head";
import { Layout } from "@/components/layout";
import { PageContent } from "@/components/page";
import { History20Regular } from "@fluentui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useTranslation from "next-translate/useTranslation";
import { GetHistory, RemoveHistoryItem } from "@/lib/browser-storage";
import HistoryCard from "@/components/history-card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Router } from "next/dist/client/router";
import { ItemType } from "@/types/history";

export default function HistoryPage() {
  const { t } = useTranslation("common");
  let h = GetHistory();
  const [barCodes, setBarCodes] = useState(h.barCodes);
  const [qrCodes, setQrCodes] = useState(h.qrCodes);

  function RemoveHistory() {
    localStorage.removeItem("history");
    Router.prototype.reload();
  }

  function deleteItem(i: number, type: ItemType) {
    RemoveHistoryItem(i, type);
    h = GetHistory();
    setBarCodes(h.barCodes);
    setQrCodes(h.qrCodes);
  }
  return (
    <Layout>
      <Head>
        <title>Qrix</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContent page="history">
        <div className="mb-2 flex items-center space-x-2">
          <History20Regular primaryFill="#8B2DF0" className="text-white" />

          <p className="ml-2 font-bold">{t("history")}</p>
        </div>
        <Tabs defaultValue="barcode">
          <TabsList className="bg-slate-200 dark:bg-slate-900">
            <TabsTrigger value="barcode">{t("barcode")}</TabsTrigger>
            <TabsTrigger value="qrcode">{t("qrcode")}</TabsTrigger>
            {(barCodes.length > 0 || qrCodes.length > 0) && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="h-auto px-2 py-1 font-bold"
                    variant="destructiveghost"
                  >
                    {t("history-delete")}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="border-0">
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t("history")}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {t("history-delete-confirm")}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction onClick={RemoveHistory}>
                      {t("yes")}
                    </AlertDialogAction>
                    <AlertDialogCancel className="border-0">
                      {t("cancel")}
                    </AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </TabsList>
          <TabsContent value="barcode">
            <div className={barCodes.length > 0 ? "flex flex-wrap" : ""}>
              {barCodes.length > 0 ? (
                barCodes.map((item, i) => (
                  <HistoryCard
                    index={i}
                    key={item.text + i}
                    item={item}
                    deleteEvent={deleteItem}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center py-16">
                  <p className="icon my-2 mr-2 text-6xl font-normal">
                    {"\uF47F"}
                  </p>
                  <h2 className="text-center text-xl font-bold">
                    {t("history-empty")}
                  </h2>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="qrcode">
            <div className={qrCodes.length > 0 ? "flex flex-wrap" : ""}>
              {qrCodes.length > 0 ? (
                qrCodes.map((item, i) => (
                  <HistoryCard
                    index={i}
                    key={item.text + i}
                    item={item}
                    deleteEvent={deleteItem}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center py-16">
                  <p className="icon my-2 mr-2 text-6xl font-normal">
                    {"\uF47F"}
                  </p>
                  <h2 className="text-center text-xl font-bold">
                    {t("history-empty")}
                  </h2>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </PageContent>
    </Layout>
  );
}

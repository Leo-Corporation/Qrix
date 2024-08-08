import Head from "next/head";
import {
  ArrowRight16Regular,
  BarcodeScanner24Regular,
  Calendar3Day20Regular,
  History24Regular,
  Home20Regular,
  Lightbulb20Regular,
  QrCode20Regular,
  QrCode24Regular,
} from "@fluentui/react-icons";
import useTranslation from "next-translate/useTranslation";
import { Layout } from "@/components/layout";
import { PageContent } from "@/components/page";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetHistory } from "@/lib/browser-storage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HistoryCard from "@/components/history-card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";

export default function Home() {
  const { t, lang } = useTranslation("common");

  const history = GetHistory();
  return (
    <Layout>
      <Head>
        <title>Qrix</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContent page={"home"}>
        <div className="mb-2 flex items-center space-x-2">
          <Home20Regular primaryFill="#8B2DF0" className="text-white" />

          <p className="ml-2 font-bold">{t("home")}</p>
        </div>
        <div className="py-4">
          <h2 className="text-4xl font-bold">{t("welcome")}</h2>
          <p>{t("welcome-msg")}</p>
          <div className="flex space-x-2 py-2">
            <Link href="./qrcode">
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1 border-accent-color"
              >
                <QrCode24Regular color="#8B2DF0" className="h-4 w-4" />
                <span>{t("gen-qrcode")}</span>
              </Button>
            </Link>
            <Link href="./barcode">
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1 border-accent-color"
              >
                <BarcodeScanner24Regular color="#8B2DF0" className="h-4 w-4" />
                <span>{t("gen-barcode")}</span>
              </Button>
            </Link>
          </div>
        </div>
        <div className="mb-2 flex items-center space-x-2">
          <Lightbulb20Regular primaryFill="#8B2DF0" className="text-white" />

          <p className="ml-2 font-bold">{t("overview")}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("total")}
              </CardTitle>
              <QrCode24Regular className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {history.qrCodes.length + history.barCodes.length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("total-qrcodes")}
              </CardTitle>
              <QrCode24Regular className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{history.qrCodes.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("total-barcodes")}
              </CardTitle>
              <BarcodeScanner24Regular className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{history.barCodes.length}</p>
            </CardContent>
          </Card>
        </div>
        <div className="my-2 mt-4 flex items-center space-x-2">
          <History24Regular primaryFill="#8B2DF0" className="text-white" />

          <p className="ml-2 font-bold">{t("recent")}</p>
        </div>
        <div>
          <Tabs defaultValue="barcode">
            <TabsList>
              <TabsTrigger value="barcode">
                <span className="grid grid-cols-[1fr,auto] gap-2">
                  <Calendar3Day20Regular />
                  <span>{t("barcode")}</span>
                </span>
              </TabsTrigger>
              <TabsTrigger value="qrcode">
                <span className="grid grid-cols-[1fr,auto] gap-2">
                  <QrCode20Regular />
                  <span>{t("qrcode")}</span>
                </span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="barcode">
              {history.barCodes.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("barcode")}</TableHead>
                      <TableHead>{t("barcode-type")}</TableHead>
                      <TableHead>{t("content")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {history.barCodes.map((item, i) => {
                      if (i > 2) return;
                      return (
                        <HistoryCard
                          index={i}
                          home
                          key={item.text + i}
                          item={item}
                          deleteEvent={() => {}}
                        />
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center py-16">
                  <p className="icon my-2 mr-2 text-6xl font-normal">
                    {"\uF47F"}
                  </p>
                  <h2 className="text-center text-lg font-semibold">
                    {t("history-empty")}
                  </h2>
                </div>
              )}
            </TabsContent>
            <TabsContent value="qrcode">
              {history.qrCodes.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("qrcode")}</TableHead>
                      <TableHead>{t("content")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {history.qrCodes.map((item, i) => {
                      if (i > 2) return;
                      return (
                        <HistoryCard
                          index={i}
                          key={item.text + i}
                          item={item}
                          home
                          deleteEvent={() => {}}
                        />
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center py-16">
                  <p className="icon my-2 mr-2 text-6xl font-normal">
                    {"\uF47F"}
                  </p>
                  <h2 className="text-center text-lg font-semibold">
                    {t("history-empty")}
                  </h2>
                </div>
              )}
            </TabsContent>
          </Tabs>
          {(history.barCodes.length > 0 || history.qrCodes.length > 0) && (
            <Link href="./history">
              <Button variant="link" className="space-x-2 px-2">
                <p>{t("see-more")}</p>
                <ArrowRight16Regular />
              </Button>
            </Link>
          )}
        </div>
      </PageContent>
    </Layout>
  );
}

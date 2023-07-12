import Image from "next/image";
import { Inter } from "next/font/google";
import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";
import { Layout } from "@/components/layout";
import Head from "next/head";
import { PageContent } from "@/components/page";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { t, lang } = useTranslation("common");
  return (
    <Layout>
      <Head>
        <title>Qrix</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContent page={"home"}>h1</PageContent>
    </Layout>
  );
}

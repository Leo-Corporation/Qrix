import Head from "next/head";
import { Home20Regular, Lightbulb20Regular } from "@fluentui/react-icons";
import useTranslation from "next-translate/useTranslation";
import DashboardCard, { CardProps } from "@/components/card";
import { Layout } from "@/components/layout";
import { PageContent } from "@/components/page";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { t, lang } = useTranslation("common");

  const cards: CardProps[] = [
    {
      title: t("barcode"),
      description: t("generate-barcode"),
      icon: "\uF20F",
      link: "./barcode",
    },
    {
      title: t("qrcode"),
      description: t("generate-qrcode"),
      icon: "\uF63F",
      link: "./qrcode",
    },
  ];

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
        <div className="m-4 text-center">
          <h2 className="text-4xl font-bold">{t("welcome")}</h2>
          <p>{t("welcome-msg")}</p>
        </div>
        <div className="mb-2 flex items-center space-x-2">
          <Lightbulb20Regular primaryFill="#8B2DF0" className="text-white" />

          <p className="ml-2 mt-2 font-bold">{t("recommended")}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center md:justify-start">
          {cards.map((el, i) => {
            return (
              <DashboardCard
                key={i}
                link={el.link}
                title={el.title}
                description={el.description}
                icon={el.icon}
              />
            );
          })}
        </div>
      </PageContent>
    </Layout>
  );
}

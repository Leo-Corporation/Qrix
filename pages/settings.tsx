import Head from "next/head";
import { Layout } from "@/components/layout";
import { PageContent } from "@/components/page";

export default function SettingsPage() {
  return (
    <Layout>
      <Head>
        <title>Passliss</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContent page="settings">Settings</PageContent>
    </Layout>
  );
}

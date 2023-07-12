import Image from "next/image";
import { Inter } from "next/font/google";
import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { t, lang } = useTranslation("common");
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1>{t("hello")}</h1>
    </main>
  );
}

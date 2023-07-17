import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="application-name" content="Qrix" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Qrix" />
        <meta
          name="description"
          content="A simple web app that lets you create and customize bar codes and QR codes in various formats and colors."
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#000014"
          media="(prefers-color-scheme: dark)"
        />

        <link rel="apple-touch-icon" href="/images/icons/icon-512x512.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/images/icons/icon-152x152.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="qrix.leocorporation.dev" />
        <meta name="twitter:title" content="Qrix" />
        <meta
          name="twitter:description"
          content="A simple web app that lets you create and customize bar codes and QR codes in various formats and colors."
        />
        <meta name="twitter:image" content="/images/social.png" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Qrix" />
        <meta
          property="og:description"
          content="A simple web app that lets you create and customize bar codes and QR codes in various formats and colors."
        />
        <meta property="og:site_name" content="Qrix" />
        <meta property="og:url" content="qrix.leocorporation.dev" />
        <meta property="og:image" content="/images/social.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

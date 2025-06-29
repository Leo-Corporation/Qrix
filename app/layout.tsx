import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { getLocale } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider } from 'next-intl';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Qrix',
    description: 'Qrix is a powerful QR Code and Barcode generator.',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocale();
    return (
        <html lang={locale}>
            <head>
                <link rel='manifest' href='/manifest.json' />
                <link rel='apple-touch-icon' href='/images/icon-512x512.png' />
                <meta
                    name='theme-color'
                    content='#ffffff'
                    media='(prefers-color-scheme: light)'
                />
                <meta
                    name='theme-color'
                    content='#000014'
                    media='(prefers-color-scheme: dark)'
                />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute='class'
                    defaultTheme='system'
                    enableSystem
                >
                    <NextIntlClientProvider>{children}</NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}

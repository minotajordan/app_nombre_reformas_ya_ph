import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "App Nombres + Reformas Ya! ",
  description: "Genera ahora tu apoyo digital a las reformas y compartela en tus redes, unidos somo mas fuertes #ReformasYa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">

    <Head>
        {/* Código ya existente */}
        <title>Apoyo Digital a las Reformas Sociales</title>
        <meta name="description" content="Crea ahora tu apoyo digital y súbelo a las redes #ReformasYa." />
        <meta name="author" content="Jordan Minota" />
        <meta name="keywords" content="Reformas sociales, Apoyo digital, Colombia, ReformasYa, Herramientas digitales" />
        <meta property="og:title" content="Apoyo Digital a las Reformas Sociales" />
        <meta property="og:description" content="Crea ahora tu apoyo digital y súbelo a las redes #ReformasYa." />
        <meta property="og:image" content="https://example.com/path-to-your-image.png" />
        <meta property="og:url" content="https://example.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Apoyo Digital a las Reformas Sociales" />
        <meta name="twitter:description" content="Crea ahora tu apoyo digital y súbelo a las redes #ReformasYa." />
        <meta name="twitter:image" content="https://example.com/path-to-your-image.png" />

        {/* Google Tag Manager */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PTCK5SJX9E"></script>
        <script>
            {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-PTCK5SJX9E');`}
        </script>
    </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

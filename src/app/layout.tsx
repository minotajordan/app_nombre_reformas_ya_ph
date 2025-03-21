import Head from "next/head";
import Script from "next/script"; // Importamos el componente Script
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next"

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
    description: "Genera ahora tu apoyo digital a las reformas y compartela en tus redes, unidos somos más fuertes #ReformasYa",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
        <Head>
            <title>Apoyo digital a las Reformas Sociales</title>
            <meta
                name="description"
                content="Crea ahora tu apoyo digital y súbelo a las redes #ReformasYa."
            />
            <meta name="author" content="Jordan Minota" />
            <meta
                name="keywords"
                content="reformas sociales, apoyo digital, colombia, reformas ya, herramientas digitales, apoyo social"
            />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="canonical" href="https://reformaya.pactohistorico.co" />
            <meta name="robots" content="index, follow" />

            {/* Open Graph / Facebook Meta Tags */}
            <meta property="og:title" content="Apoyo Digital a las Reformas Sociales" />
            <meta
                property="og:description"
                content="Crea ahora tu apoyo digital y súbelo a las redes #ReformasYa."
            />
            <meta
                property="og:image"
                content="https://reformaya.pactohistorico.co/images/mapa-reformas-sociales.png"
            />
            <meta property="og:image:alt" content="Mapa digital de apoyo a reformas sociales" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:url" content="https://reformaya.pactohistorico.co" />
            <meta property="og:type" content="website" />

            {/* Google Rich Snippets */}
            <meta itemProp="name" content="Apoyo Digital a las Reformas Sociales" />
            <meta
                itemProp="description"
                content="Crea ahora tu apoyo digital y súbelo a las redes #ReformasYa."
            />
            <meta
                itemProp="image"
                content="https://reformaya.pactohistorico.co/images/mapa-reformas-sociales.png"
            />

            {/* Twitter Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Apoyo Digital a las Reformas Sociales" />
            <meta
                name="twitter:description"
                content="Crea ahora tu apoyo digital y súbelo a las redes #ReformasYa."
            />
            <meta
                name="twitter:image"
                content="https://reformaya.pactohistorico.co/images/mapa-reformas-sociales.png"
            />
            <meta name="twitter:image:alt" content="Mapa digital de apoyo a reformas sociales" />
            <meta name="twitter:image:src" content="https://reformaya.pactohistorico.co/images/mapa-reformas-sociales.png" />
            <meta name="twitter:image:width" content="1200" />
            <meta name="twitter:image:height" content="630" />
        </Head>
        {/* Google Analytics */}
        <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-PTCK5SJX9E`}
        />
        <Script id="google-analytics">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-PTCK5SJX9E');
        `}
        </Script>

        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
            {children}
            <SpeedInsights />
        </body>
        </html>
    );
}
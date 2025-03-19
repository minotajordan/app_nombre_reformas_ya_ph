"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";

export default function Home() {
  const [inputText, setInputText] = useState<string>("");
  const [imageData, setImageData] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [textColor, setTextColor] = useState<string>("#003366");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toUpperCase();
    setInputText(value);
    generateImage(value);
  };


  const generateImage = async (text: string) => {
    if (!text) {
      setImageData(null);
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (ctx) {
      canvas.width = 1080;
      canvas.height = 1080;

      const colors = [
        "rgba(254, 174, 51, 0.7)",
        "rgba(52, 53, 152, 0.7)",
        "rgba(248, 40, 12, 0.7)",
        "rgba(3, 173, 67, 0.7)",
        "rgba(143, 50, 146, 0.7)",
      ];

      const backgroundImage = new window.Image();
      backgroundImage.src = "/images/b4.png";

      backgroundImage.onload = async () => {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        await document.fonts.load('85px "LemonMilkBold"');

        ctx.font = "900 90px LemonMilkBold";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 0;

        const maxWidth = 900;
        const lines = breakTextIntoLines(ctx, text, maxWidth);
        const lineHeight = 90;
        const startY = canvas.height / 2 - (lines.length - 1) * (lineHeight / 2) - 120;

        lines.forEach((line, index) => {
          const y = startY + index * lineHeight;
          let x = canvas.width / 2 - ctx.measureText(line).width / 2 + 70;

          for (let i = 0; i < line.length; i++) {
            const letter = line[i];
            const colorIndex = i % colors.length;
            ctx.fillStyle = colors[colorIndex];

            if (letter.toLowerCase() === "i") {
              ctx.fillText(letter, x - 25, y);
            } else if (letter.toLowerCase() === "v") {
              ctx.fillText(letter, x - 10, y);
            } else if (letter.toLowerCase() === "w") {
              ctx.fillText(letter, x + 10, y);
            } else if (letter.toLowerCase() === "l") {
              ctx.fillText(letter, x - 10, y);
            } else if (letter.toLowerCase() === "u") {
              ctx.fillText(letter, x + 10, y);
            } else if (letter.toLowerCase() === "t") {
              ctx.fillText(letter, x - 10, y);
            } else if (letter.toLowerCase() === "s") {
              ctx.fillText(letter, x - 12, y);
            } else if (letter.toLowerCase() === "a") {
              ctx.fillText(letter, x, y);
            } else if (letter.toLowerCase() === "e") {
              ctx.fillText(letter, x - 10, y);
            } else {
              ctx.fillText(letter, x, y);
            }
            x += ctx.measureText(letter).width;
          }
        });

        const imageUrl = canvas.toDataURL("image/png");
        setImageData(imageUrl);
      };
    }
  };


  useEffect(() => {
    // Comprobar si ya existe el SDK, para evitar duplicados.
    if (!document.getElementById("facebook-jssdk")) {
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.src =
          "https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v22.0&appId=1425234881047230";
      document.body.appendChild(script);

      const fbRoot = document.createElement("div");
      fbRoot.id = "fb-root";
      document.body.insertBefore(fbRoot, document.body.firstChild);
    }
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const x = (window.innerWidth / 2 - event.clientX) / 50;
    const y = (window.innerHeight / 2 - event.clientY) / 50;
    setMousePosition({ x, y });
  };

  useEffect(() => {
    const textSectionY = window.innerHeight / 2 + mousePosition.y;
    const yellowThreshold = (window.innerHeight * 50) / 100;

    if (textSectionY <= yellowThreshold) {
      setTextColor("#4a4a4a");
    } else {
      setTextColor("#003366");
    }
  }, [mousePosition]);

  const breakTextIntoLines = (
      ctx: CanvasRenderingContext2D,
      text: string,
      maxWidth: number
  ) => {
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(`${currentLine} ${word}`).width;
      if (width < maxWidth) {
        currentLine += ` ${word}`;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  };

  const handleDownload = async () => {
    if (!imageData) return;

    const timestamp = new Date().toISOString();

    try {
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipResponse.json();
      const ip = ipData.ip;
      const text = inputText;

      await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ timestamp, ip, text }),
      });

      const link = document.createElement("a");
      link.href = imageData;
      link.download = inputText.replace(/[^a-zA-Z0-9]/g, '') + "_apoyo_reformas.png";
      link.click();
    } catch (error) {
      console.error("Error saving data or downloading image:", error);
    }
  };

  const texts = [
    "Portabilidad: Los colombianos podrán ser atendidos en cualquier lugar del país.",
    "Red hospitalaria: Se fortalecerá la red hospitalaria pública con más recursos y tecnología.",
    "Saneamiento fiscal: Se implementarán medidas para agilizar la liquidación de contratos y cobros.",
    "Libre escogencia: Los usuarios podrán elegir su asegurador con base en información pública.",
    "Centros de Atención Primaria: Se crearán Centros de Atención Primaria en Salud (CAPS).",
    "Redes integradas: Se implementarán redes integradas e integrales de servicio.",
    "Sistema de información: Se formulará un sistema de información público unificado e interoperable.",
    "Equidad: Se garantizará la equidad y la calidad en la prestación de los servicios.",
    "Participación ciudadana: Se mejorará la participación de la sociedad civil en la rendición de cuentas.",
    "Instituto de Evaluación Tecnológica: Se mantendrá la independencia del Instituto de Evaluación Tecnológica en Salud.",
    "Plan de recuperación: Se creará un plan de recuperación de la red pública.",
  ];

  return (
      <>

        {/* Metadatos para SEO y redes sociales */}
        <Head>
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
        </Head>


      <div
          className="relative flex flex-col items-center
          min-h-screen overflow-hidden
          p-18 pt-24 md:p-24
          "
          onMouseMove={handleMouseMove}
          style={{
            background: `linear-gradient(to bottom, 
          #FFDD00 0%, #FFDD00 50%, 
          #0072CE 50%, #0072CE 75%, 
          #CE1126 75%, #CE1126 100%)`,
            backgroundPosition: `${mousePosition.x}px ${mousePosition.y}px`,
            transition: "background-position 0.1s ease-out",
          }}
      >

        <div
            className="fixed top-0 left-0 w-full bg-gray-800 text-white text-sm font-medium py-2 px-4 shadow-md flex items-center justify-center z-50"
        >
          <p>
            Desarrollado con
            <span className="animate-beat inline-block pl-2 pr-0">❤️</span>
            <span className="font-bold ml-1 mr-4 mb-4">Jordan Minota</span>
            <div
                className="fb-like"
                data-href="https://www.facebook.com/Jordanminota/"
                data-width=""
                data-layout=""
                data-action="like"
                data-size="small"
                data-share="false"
            ></div>
          </p>
          {/* Aquí el botón de "me gusta" de Facebook */}

        </div>

        <div className="absolute inset-0 pointer-events-none"/>
        <h1
            className="text-3xl font-bold mb-6 justify-center"
            style={{
              color: textColor,
              transition: "color 0.3s ease",
              textShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)",
            }}
        >
          Apoyo digital a las Reformas Sociales!
        </h1>
        <div className="relative w-full max-w-md">
          <input
              id="userInput"
              type="text"
              value={inputText}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white text-gray-800 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-center"
              maxLength={40}
              placeholder="Escribe aquí tu nombre..."
          />
        </div>
        {imageData ? (
            <Image
                src={imageData}
                alt="Texto dinámico generado"
                width={400}
                height={400}
                className="my-6 max-w-none border border-gray-300 shadow-lg rounded-lg"
            />
        ) : (
            <p
                className="mt-6 text-sm text-black"
                style={{
                  transition: "color 0.3s ease",
                }}
            >
              🖊️ Escribe algo para generar tu imagen.
            </p>
        )}
        <button
            onClick={handleDownload}
            className=" shadow-lg border-2 border-gray-300
            mt-4 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={!imageData}
        >
          Descargar Imagen
        </button>
        <div
            className="hidden md:block text-black fixed bottom-12 right-4 bg-gray-300 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-lg flex flex-col items-center z-50"
            style={{animation: "fadeIn 1.5s ease-in-out",}}
        >
          <p className="text-black">
            Puedes reporta alguna falla o enviar mas diseños - Pensando en los que no pueden salir pero Apoyan al
            Gobierno del Cambio

            <a
                href="https://www.facebook.com/Jordanminota/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 bg-blue-600 mr-4 ml-4 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-lg transition-colors duration-300"
            >
              <span className="animate-beat inline-block pr-0">  ⚡️ </span> Mensaje
            </a>
          </p>
        </div>
        <footer className="w-full h-16 mt-auto overflow-hidden text-white hidden md:block">
          <div className="relative w-full h-full overflow-hidden">
            <div
                className="absolute flex whitespace-nowrap animate-slide text-sm items-center h-full"
                style={{gap: "1rem"}}
            >
              {texts.map((text, index) => (
                  <span key={index} className="px-4 text-lg">
                  {text}
                </span>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
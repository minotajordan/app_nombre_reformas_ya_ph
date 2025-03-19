import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    // Parsear el cuerpo del request
    const { timestamp, ip, text } = await request.json();

    if (!timestamp || !ip || !text) {
      return NextResponse.json({ message: "Bad Request: Missing fields" }, { status: 400 });
    }

    // Obtener información adicional del origen de la solicitud
    const userAgent = request.headers.get("user-agent") || "unknown";
    const referer = request.headers.get("referer") || "unknown";
    const host = request.headers.get("host") || "unknown";

    // También puedes capturar headers personalizados si los envías desde el cliente
    const customHeader = request.headers.get("x-custom-header") || "none";

    // Ruta al archivo JSON
    const filePath = path.join(process.cwd(), "data", "downloads.json");

    // Crear la carpeta "data" si no existe
    const directoryPath = path.join(process.cwd(), "data");
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }

    // Crear el archivo JSON si no existe, inicializarlo vacío
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]), "utf-8");
    }

    // Leer datos existentes
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const existingData = JSON.parse(fileContent);

    // Agregar el nuevo registro con la información adicional
    const newEntry = {
      timestamp,
      ip,
      text,
      userAgent,
      referer,
      host,
      customHeader,
    };
    existingData.push(newEntry);

    // Guardar el archivo JSON actualizado
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), "utf-8");

    return NextResponse.json({ message: "Generate successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
import fs from "fs/promises";
import path from "path";

export  async function POST(req) {
  try {
    const { name, product, price } = await req.json();
    const filePath = path.join(process.cwd(), "data", "orders.txt");

    const ordersData = `Name : ${name}, product : ${product}, price : ${price}\n`;

    const dirPath = path.dirname(filePath);
    await fs.mkdir(dirPath, { recursive: true });

    await fs.appendFile(filePath, ordersData);

    return new Response(
      JSON.stringify({ message: "User added successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ message: "Error saving data" }), {
      status: 500,
    });
  }
}



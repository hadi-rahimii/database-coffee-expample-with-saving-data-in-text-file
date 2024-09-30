import fs from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const { nameOfProduct, materials, price } = await req.json();
    const filePath = path.join(process.cwd(), "data", "products.txt");
    const productData = ` Product: ${nameOfProduct} , materials: ${materials} , price : ${price}\n`;
    const dirPath = path.dirname(filePath);
    await fs.mkdir(dirPath, { recursive: true });

    await fs.appendFile(filePath, productData);
    return new Response(
      JSON.stringify({ message: "User added successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ message: "Error saving data" }), {
      status: 500,
    });
  }
}


 export async function GET(req) {
  try {
    const filePath = path.join(process.cwd(),'data','products.txt')
    await fs.access(filePath)
    const data = await fs.readFile(filePath, 'utf-8');
    const products = data.split('\n').filter(line => line).map(line => {
      const [product, materialsPart,pricePart] = line?.split(', ');
    return {
      product: product.split(': ')[1],
      materials: materialsPart.split(': ')[1],
      price: pricePart.split(': ')[1],
    }
    })
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (err) {
    console.error('Error reading file:', err);
    return new Response(JSON.stringify({ message: 'Error reading products' }), { status: 500 });
  }
}
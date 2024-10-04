import fs from "fs/promises";
import path from "path";

export async function POST(req) {
  try {  
    const { materials,cost } = await req.json();
    const filePath = path.join(process.cwd(), "data", "materials.txt");
    const productData = `  materials: ${materials} , cost : ${cost}\n`;
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
    const filePath = path.join(process.cwd(),'data','materials.txt')
    await fs.access(filePath)
    const data = await fs.readFile(filePath, 'utf-8');
    const materials = data.split('\n').filter(line => line).map(line => {
      const [, materialsPart,costPart] = line?.split(', ');
    return {
      materials: materialsPart.split(': ')[1],    
      cost: costPart.split(': ')[1],
    }
    })
    return new Response(JSON.stringify(materials), { status: 200 });
  } catch (err) {
    console.error('Error reading file:', err);
    return new Response(JSON.stringify({ message: 'Error reading materials' }), { status: 500 });
  }
}
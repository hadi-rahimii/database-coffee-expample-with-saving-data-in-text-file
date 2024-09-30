
import fs from 'fs/promises'; 
import path from 'path';

export async function POST(req) {
  try {
    const { name, phone } = await req.json();

    const filePath = path.join(process.cwd(), 'data', 'users.txt');

    const userData = `Name: ${name}, Phone: ${phone}\n`;
    const dirPath = path.dirname(filePath);
    await fs.mkdir(dirPath, { recursive: true });

    await fs.appendFile(filePath, userData); 

    return new Response(JSON.stringify({ message: 'User added successfully' }), { status: 200 });
  } catch (err) {
    console.error('Error:', err);
    return new Response(JSON.stringify({ message: 'Error saving data' }), { status: 500 });
  }
}

export async function GET() {
  try {
    // Define the path for users.txt
    const filePath = path.join(process.cwd(), 'data', 'users.txt');

    // Check if the file exists
    await fs.access(filePath);

    // Read the contents of the file
    const data = await fs.readFile(filePath, 'utf-8');
    
    // Parse the data into an array of user objects
    const users = data?.split('\n')?.filter(line => line).map(line => {
      const [namePart, phonePart] = line?.split(', ');
      return {
        name: namePart.split(': ')[1],
        phone: phonePart.split(': ')[1],
      };
    });

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (err) {
    console.error('Error reading file:', err);
    return new Response(JSON.stringify({ message: 'Error reading users' }), { status: 500 });
  }
}
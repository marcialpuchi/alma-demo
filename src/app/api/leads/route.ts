import {z} from 'zod'
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
const schema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  linkedin: z.string(),
  visa_types: z.array(z.string()),
  how_to_help: z.string(),
}).required({
  first_name: true,
  last_name:true,
  email:true
});

export async function POST(request: Request) {
  const body = await request.json()

  try {
    schema.parse(body)

    const response = await sql`
      INSERT INTO leads 
        (firstname, lastname, email, linkedin, visas, description)
      VALUES (${body.first_name}, ${body.last_name}, ${body.email}, ${body.linkedin}, ${body.visa_types}, ${body.how_to_help});`;

    return NextResponse.json({ response }, { status: 200 });
  } catch(e) {
    return NextResponse.json({ error: e }, { status: 500 });  
  }
}

export async function GET(request: Request) {
  try {
    const response = await sql`SELECT * FROM leads ORDER BY date;`;

    return NextResponse.json({ response: response.rows }, { status: 200 });
  } catch(e) {
    return NextResponse.json({ error: e }, { status: 500 });  
  }
}

export async function PUT(request: Request) {
  const body = await request.json()
  try {
    
    const response = await sql`
    UPDATE leads
    SET contacted = ${body.contacted}
    WHERE id = ${body.id};
    `;

    return NextResponse.json({ response }, { status: 200 });
  } catch(e) {
    return NextResponse.json({ error: e }, { status: 500 });  
  }
}
import { leads } from '@/app/lib/placeholder-data';
import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
// const client = await db.connect();

// async function seedLeads() {
//   await client.sql`
//     CREATE TABLE leads 
//       ( 
//         id            serial PRIMARY KEY,
//         firstname     varchar(255) NOT NULL, 
//         lastname      varchar(255) NOT NULL, 
//         email         varchar(255) NOT NULL, 
//         linkedin      varchar(255),
//         cv            bytea,
//         visas         varchar(255)[],
//         description   text,
//         contacted     boolean DEFAULT FALSE,
//         date          timestamp WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//       );
//   `;

//   const insertedLeads = await Promise.all(
//     leads.map(
//       (lead) => client.sql`
//         INSERT INTO leads (firstname, lastname, email)
//         VALUES (${lead.firstname}, ${lead.lastname}, ${lead.email});
//       `,
//     ),
//   );

//   return insertedLeads;
// }

export async function GET(request: Request) {
  try {
    // await client.sql`BEGIN`;
    // await seedLeads();
    // await client.sql`COMMIT`;

    return NextResponse.json({ message: 'Database seeded successfully'}, { status: 200 });
  } catch (error) {
    // await client.sql`ROLLBACK`;
    return NextResponse.json({ error }, { status: 500 });
  }
}

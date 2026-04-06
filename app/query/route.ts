import postgres from 'postgres';

export async function GET() {
  try {
    const sql = postgres(process.env.POSTGRES_URL!, {
      ssl: 'require',
    });

    const data = await sql`
      SELECT invoices.amount, customers.name
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id;
    `;

    return Response.json({ data });
  } catch (error) {
    console.error('Database Error:', error);
    return Response.json({ error }, { status: 500 });
  }
}
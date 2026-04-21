import { Client } from "pg";

export async function POST(req: Request) {
  const { name, email } = await req.json();
  console.log("Received user data:", { name, email });

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();

  await client.query(
    "INSERT INTO users (name, email) VALUES ($1, $2)",
    [name, email]
  );

  await client.end();

  return Response.json({ message: "User saved successfully" });
}
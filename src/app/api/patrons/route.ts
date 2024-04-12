import { type NextRequest } from "next/server";
import { getPatrons } from "@/lib/data";

export async function GET(request: NextRequest) {
  const patrons = await getPatrons();

  return Response.json(patrons);
}

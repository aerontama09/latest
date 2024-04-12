import { type NextRequest } from "next/server";
import { getBookTotal } from "@/lib/data";

export async function GET(request: NextRequest) {
  const bookTotal = await getBookTotal();

  return Response.json(bookTotal);
}

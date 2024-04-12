import { type NextRequest } from "next/server";
import { getBook } from "@/lib/data";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: Number } }
) {
  const { id } = params;
  const patron = await getBook(id);

  return Response.json(patron);
}

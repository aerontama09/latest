import { type NextRequest } from "next/server";
import { getPatron } from "@/lib/data";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  // const user = await getPatron(Number(id));
  const patron = await getPatron(id);

  return Response.json(patron);
}

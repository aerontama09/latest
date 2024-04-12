import { type NextRequest } from "next/server";
import { getTransactions } from "@/lib/data";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const page = searchParams.get("page");
  const size = searchParams.get("size");

  const transactions = await getTransactions(Number(size), Number(page));

  return Response.json(transactions);
}

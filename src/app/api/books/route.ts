import { type NextRequest } from "next/server";
import { getBooks } from "@/lib/data";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const withAuthors = searchParams.get("withAuthors");

  const books = await getBooks(String(withAuthors));

  return Response.json(books);
}

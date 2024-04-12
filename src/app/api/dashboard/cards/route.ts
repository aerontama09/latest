import { type NextRequest } from "next/server";
import { getCardsData } from "@/lib/data";

export async function GET(request: NextRequest) {
  const cardsData = await getCardsData();

  return Response.json(cardsData);
}

import { NextRequest, NextResponse } from "next/server";

export default async function POST(req: NextRequest) {
  const { notes } = await req.json()
  
}
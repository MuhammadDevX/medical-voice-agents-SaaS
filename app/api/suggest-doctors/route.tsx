import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Everything working fine till here")
  return NextResponse.json(AIDoctorAgents)
}
import { openai } from "@/config/openaiModel";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { notes } = await req.json()
    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-exp:free',
      messages: [{ "role": "system", "content": JSON.stringify(AIDoctorAgents) },
      { role: 'user', content: 'User notes/symptomps' + notes + ", depending on user notes and symptoms please suggest list of doctors. Return Object in Json Only" },],
      response_format: { type: "json_object" }
    });

    const rawResponse = completion.choices[0].message.content?.trim()
    const rawJson = JSON.parse(rawResponse || "")
    return NextResponse.json(rawJson)
  } catch (error) {
    return NextResponse.json(error)
  }
}
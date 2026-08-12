import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ ok: true, service: "hanabel", timestamp: new Date().toISOString() });
}

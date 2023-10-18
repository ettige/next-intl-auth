import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {

    return NextResponse.json({ ip: req.headers.get("x-forwarded-for"), country: req.geo?.country })
}
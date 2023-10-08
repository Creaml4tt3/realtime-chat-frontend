import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

interface registerData extends NextApiRequest {
  email: string;
  password: string;
  name: string;
}

export async function POST(request: any) {
  const { email, password, name } = await request.json();
  return NextResponse.json({ email, password, name });
}

import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();
export const getDataFromToken =async  (request: NextRequest)=> {
  try {
    const token =request.cookies.get("token")?.value || "";
    const decodedtoken:any=jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedtoken.id;

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

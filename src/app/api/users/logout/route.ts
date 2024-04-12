import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function GET(request: NextRequest) {
  try {   
    const response = NextResponse.json(
      {
        message: "Logout success",
        success: true,
      },
      {
        status: 200,
      }
    );
    response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0),

    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { connect } from "@/dbconfig/dbconfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function GET(request: NextRequest) {
  try {
    //extract data from token
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");

    //
    return NextResponse.json(
      {
        message: "User Found",
        data: user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

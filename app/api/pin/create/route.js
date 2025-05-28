import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { title, description, type, content } = await req.json(); // in express req.body
    if (!title) {
      return new NextResponse("title in mandatory", { status: 400 });
    }
    if (!type) {
      return new NextResponse("type in required", { status: 400 });
    }
    if (!content) {
      return new NextResponse("content in required", { status: 400 });
    }

    const pin = await db.pin.create({
      data: {
        title,
        description,
        type,
        content,
      },
    });

    return NextResponse.json(
      { message: "Pin cereted succesfully", data: pin },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

import { connectMongoDB } from "../../../../utils/db";
import User from "../../../../models/users.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new NextResponse(JSON.stringify({ message: "Please fill in all the fields." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return new NextResponse(JSON.stringify({ message: "User with this email already exists." }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return new NextResponse(JSON.stringify({ message: "User registered successfully" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return new NextResponse("Something went wrong during registration.", {
      status: 500,
    });
  }
}
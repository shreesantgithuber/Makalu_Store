import { connectMongoDB } from "../../../../utils/db";
import User from "../../../../models/users.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import Trek from "@/models/trek.model";

export async function POST(req) {
  try {
    await connectMongoDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return new NextResponse("Please provide both email and password.", {
        status: 400,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse("Invalid credentials.", { status: 401 });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return new NextResponse("Invalid credentials.", { status: 401 });
    }
    const tokenPayload = {
      userId: user._id,
      email: user.email,
      name: user.name,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '1h',
    });
    cookies().set({
      name: 'authToken',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60,
    });

    return new NextResponse(
      JSON.stringify({ message: "Login successful" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Login failed:", error);
    return new NextResponse(
      JSON.stringify({ message: "Login failed.", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
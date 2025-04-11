import { connectMongoDB } from "@/utils/db";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import User from "../../../../models/users.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken')?.value;

    if (!token) {
      return new NextResponse(JSON.stringify({ user: null }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      const user = await User.findById(decodedToken.userId).select('-password').lean();

      if (user) {
        return new NextResponse(JSON.stringify({ user }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      } else {
        return new NextResponse(JSON.stringify({ user: null }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }
    } catch (error) {
      console.error("Invalid token:", error);
      return new NextResponse(JSON.stringify({ user: null }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
  } catch (error) {
    console.error("Error checking session:", error);
    return new NextResponse(JSON.stringify({ message: "Error checking session." }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
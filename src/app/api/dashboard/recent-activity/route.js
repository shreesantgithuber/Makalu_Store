
import { connectMongoDB } from "../../../../utils/db";
import ActivityLog from "../../../../models/ActivityLog.model"; 
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const recentActivity = await ActivityLog.find({})
      .sort({ date: -1 })
      .limit(10) 
      .populate('product', 'uniqueId productType');

    return new NextResponse(JSON.stringify(recentActivity), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to fetch recent activity." }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
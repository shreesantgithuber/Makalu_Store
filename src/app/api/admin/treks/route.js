import Trek from '../../../../models/trek.model';
import { connectMongoDB } from '../../../../utils/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectMongoDB();
    const reqBody = await req.json();
    const newTrek = await Trek.create(reqBody);

    return NextResponse.json({ success: true, data: newTrek }, { status: 201 });
  } catch (error) {
    console.error('Error creating trek:', error);
    let errorMessage = 'Failed to create trek';
    if (error.name === 'ValidationError') {
      errorMessage = Object.values(error.errors)
        .map((err) => err.message)
        .join(', ');
    }
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const treks = await Trek.find().sort({ startDate: 1 });
    return NextResponse.json({ success: true, data: treks }, { status: 200 });
  } catch (error) {
    console.error('Error fetching treks:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch treks' }, { status: 500 });
  }
}
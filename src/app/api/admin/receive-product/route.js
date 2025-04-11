
import { connectMongoDB } from "../../../../utils/db";
import Product from "../../../../models/products.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const body = await req.json();

    const { uniqueId, returnDate } = body;

    const product = await Product.findOne({ uniqueId });

    if (!product) {
      return new NextResponse(JSON.stringify({ message: "Product with this Unique ID not found." }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (product.status !== 'out on trek') {
      return new NextResponse(JSON.stringify({ message: "This product is not currently marked as 'out on trek'." }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    product.status = 'returned';
    product.returnDate = returnDate ? new Date(returnDate) : new Date();
    product.assignedTo = {
      trekId: null,
      groupName: null,
    };
    product.assignedDate = null;

    const updatedProduct = await product.save();

    return new NextResponse(JSON.stringify(updatedProduct), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error marking product as returned:", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to mark product as returned." }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
import { connectMongoDB } from "../../../../utils/db";
import Product from "../../../../models/products.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const body = await req.json();

    const { uniqueId, trekId, groupName, assignDate } = body;
    const product = await Product.findOne({ uniqueId });

    if (!product) {
      return new NextResponse(JSON.stringify({ message: "Product with this Unique ID not found." }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (product.status === 'out on trek') {
      return new NextResponse(JSON.stringify({ message: "This product is already out on a trek." }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Update the product status and assignment details
    product.status = 'out on trek';
    product.assignedTo = {
      trekId: trekId || null,
      groupName: groupName || null,
    };
    product.assignedDate = assignDate ? new Date(assignDate) : new Date();
    product.returnDate = null; // Reset return date

    const updatedProduct = await product.save();

    return new NextResponse(JSON.stringify(updatedProduct), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error assigning product:", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to assign product." }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
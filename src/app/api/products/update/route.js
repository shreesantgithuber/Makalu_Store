import { connectMongoDB } from "../../../../utils/db";
import Product from "../../../../models/products.model";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    await connectMongoDB();

    const { _id, ...updateData } = await req.json();

    if (!_id) {
      return new NextResponse("Product ID (_id) is required for updating.", {
        status: 400,
      });
    }

    const existingProduct = await Product.findById(_id);

    if (!existingProduct) {
      return new NextResponse(`Product with ID ${_id} not found.`, {
        status: 404,
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return new NextResponse(
        `Failed to update product with ID ${_id}.`,
        { status: 500 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "Product updated successfully",
        product: updatedProduct,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong while updating the product.",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
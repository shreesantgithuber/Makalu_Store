import { connectMongoDB } from "../../../../utils/db";
import Product from "../../../../models/products.model";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await connectMongoDB();

    const { _id } = await req.json();

    if (!_id) {
      return new NextResponse("Product ID (_id) is required for deletion.", {
        status: 400,
      });
    }

    const existingProduct = await Product.findById(_id);

    if (!existingProduct) {
      return new NextResponse(`Product with ID ${_id} not found.`, {
        status: 404,
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(_id);

    if (!deletedProduct) {
      return new NextResponse(
        `Failed to delete product with ID ${_id}.`,
        { status: 500 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Product deleted successfully", deletedId: _id }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong while deleting the product.",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
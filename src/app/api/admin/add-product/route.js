
import { connectMongoDB } from "../../../../utils/db";
import Product from "../../../../models/products.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const body = await req.json();

    const { productType, uniqueId } = body;
    const existingProduct = await Product.findOne({ uniqueId });
    if (existingProduct) {
      return new NextResponse(JSON.stringify({ message: "Product with this Unique ID already exists." }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const newProduct = new Product(body);
    const savedProduct = await newProduct.save();

    return new NextResponse(JSON.stringify(savedProduct), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error adding product:", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to add product." }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
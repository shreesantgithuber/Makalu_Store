import { connectMongoDB } from "../../../../utils/db";
import Product from "../../../../models/products.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();

    const {
      productType,
      uniqueId,
      capacity,
      cylinderSize,
      regulatorType,
    } = await req.json();

    if (!productType || !uniqueId) {
      return new NextResponse("Product type and unique ID are required.", {
        status: 400,
      });
    }

    const productExists = await Product.findOne({ uniqueId });

    if (productExists) {
      return new NextResponse("Product with this unique ID already exists.", {
        status: 409,
      });
    }

    const newProductData = {
      productType,
      uniqueId,
    };
    switch (productType.toLowerCase()) {
      case "tent":
        if (capacity) {
          newProductData.capacity = capacity;
        }
        break;
      case "oxygen":
        if (cylinderSize) {
          newProductData.cylinderSize = cylinderSize;
        }
        if (regulatorType) {
          newProductData.regulatorType = regulatorType;
        }
        break;
      case "box tent":
      case "dining tent":
      case "kitchen tent":
      case "shower tent":
      case "toilet tent":
      case "chair":
      case "table":
      case "max and regulator":
      case "radio set":
        break;
      default:
        return new NextResponse(`Invalid product type: ${productType}`, {
          status: 400,
        });
    }

    const newProduct = await Product.create(newProductData);

    return new NextResponse(
      JSON.stringify({ message: "Product created successfully", product: newProduct }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong while creating the product.",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
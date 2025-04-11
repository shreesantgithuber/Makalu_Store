
import { connectMongoDB } from "../../../../utils/db";
import Product from "../../../../models/products.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    const productSlugs = [
      'tents',
      'box-tents',
      'dining-tents',
      'kitchen-tents',
      'shower-tents',
      'toilet-tents',
      'chairs',
      'tables',
      'oxygen',
      'max-and-regulators',
      'radio-sets',
    ];

    const productCounts = {};

    const slugToProductTypeMap = {
      tents: 'tent',
      'box-tents': 'box-tent',
      'dining-tents': 'dining-tent',
      'kitchen-tents': 'kitchen-tent',
      'shower-tents': 'shower-tent',
      'toilet-tents': 'toilet-tent',
      chairs: 'chair',
      tables: 'table',
      oxygen: 'oxygen',
      'max-and-regulators': 'max-and-regulator', 
      'radio-sets': 'radio-set',               
    };

    for (const slug of productSlugs) {
      const productType = slugToProductTypeMap[slug];
      if (productType) {
        const total = await Product.countDocuments({ productType: productType });
        const available = await Product.countDocuments({ productType: productType, status: 'available' });
        const outOnTrek = await Product.countDocuments({ productType: productType, status: 'out on trek' });
        const returned = await Product.countDocuments({ productType: productType, status: 'returned' });

        productCounts[slug] = {
          total,
          available,
          outOnTrek,
          returned,
        };
      } else {
        productCounts[slug] = { total: 0, available: 0, outOnTrek: 0, returned: 0 };
      }
    }

    return new NextResponse(JSON.stringify(productCounts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error fetching product counts:", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to fetch product counts." }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
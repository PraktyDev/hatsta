import { NextResponse } from "next/server";
import { Product } from "../../../../models/Product";
import { ConnectToDB } from "../../../../utils/database";

export async function GET(request) {
  try {
    await ConnectToDB();

    const seedProducts = [
      {
        title: "Wide Brim Fedora",
        description: "Classic style with a modern twist",
        amount: "120",
        image: "https://images.unsplash.com/photo-1514327605112-b887c0e61c34?q=80&w=1000&auto=format&fit=crop",
        publicId: "seed_1"
      },
      {
        title: "Summer Straw Hat",
        description: "Perfect for beach days",
        amount: "85",
        image: "https://images.unsplash.com/photo-1572307480813-5db2eb2070e1?q=80&w=1000&auto=format&fit=crop",
        publicId: "seed_2"
      },
      {
        title: "Wool Beanie",
        description: "Warm and cozy for winter",
        amount: "45",
        image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=1000&auto=format&fit=crop",
        publicId: "seed_3"
      },
      {
        title: "Classic Panama",
        description: "Timeless elegance",
        amount: "150",
        image: "https://images.unsplash.com/photo-1533827432537-70133748f5c8?q=80&w=1000&auto=format&fit=crop",
        publicId: "seed_4"
      }
    ];

    // Optional: Clear existing products before seeding to avoid duplicates
    // await Product.deleteMany({}); 

    await Product.insertMany(seedProducts);

    return new NextResponse(JSON.stringify({ message: "Database seeded successfully", products: seedProducts }), { status: 200 });
  } catch (error) {
    return new NextResponse('Error Occured:' + error.message, { status: 500 });
  }
}

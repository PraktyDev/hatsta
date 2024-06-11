import { NextResponse } from "next/server";
import { Product } from "../../../../../models/Product";
import connectToDB from "../../../../../utils/database";


export const dynamic = "force-dynamic"

export async function GET (request, { params }){
    const productId = params.productId
    try {
        await connectToDB();
        const product = await Product.findById(productId)
        return new NextResponse(JSON.stringify(product), { status: 200 })
    } catch (error) {
        return new NextResponse('Error Occured:' + error.message, { status: 500 })
    }
}
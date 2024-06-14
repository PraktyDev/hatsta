import { NextResponse } from "next/server";
import { Product } from "../../../../models/Product";
import connectToDB from "../../../../utils/database";

export async function POST (request){
    
    const body = await request.json()
    const { title, description, amount, image, publicId } = body

    try {
        await connectToDB()
        const products = new Product({
            title: title,
            description: description,
            amount: amount,
            image: image,
            publicId: publicId,
        })
        const product = await products.save()
        return new NextResponse(JSON.stringify(product), { status: 200 })
    } catch (error) {
        return new NextResponse('Error Occured:' + error.message, { status: 500 })
    }
}


export async function GET (request){
    try {
        await connectToDB();
        const product = await Product.find()
        return new NextResponse(JSON.stringify(product), { status: 200 })
    } catch (error) {
        return new NextResponse('Error Occured:' + error.message, { status: 500 })
    }
}
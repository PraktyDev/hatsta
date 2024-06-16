import { NextResponse } from "next/server";
import { Product } from "../../../../models/Product";
import { ConnectToDB } from "../../../../utils/database";

export async function POST (request){
    const body = await request.json()
    const { title, description, amount, image, publicId } = body
    if(!image || !publicId){
        return new NextResponse({ message: 'Error Occured: image url and publicId required' }, { status: 400 })
    }
    try {
        await ConnectToDB()
        const products = new Product({
            title,
            description,
            amount,
            image,
            publicId,
        })
        const product = await products.save()
        return new NextResponse(JSON.stringify(product), { message: "Post Successfully"}, { status: 200 })
    } catch (error) {
        return new NextResponse('Error Occured:' + error.message, { status: 500 })
    }
}


export async function GET (request){
    try {
        await ConnectToDB();
        const product = await Product.find()
        return new NextResponse(JSON.stringify(product), { status: 200 })
    } catch (error) {
        return new NextResponse('Error Occured:' + error.message, { status: 500 })
    }
}

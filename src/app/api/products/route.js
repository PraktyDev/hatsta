// import { ConnectToDB } from "../../../../utils/database";
// import { Event } from "../../../../models/Event";

// export async function POST (req){
//     const body = await req.json()
//     try {
//         await ConnectToDB();
//         const event = await Event.create(body)
//         return Response.json(event)
//     } catch (error) {
//         return Response.json('Error Occured:', error.message)
//     }
// }



import { NextResponse } from "next/server";
import { Product } from "../../../../models/Product";
import { ConnectToDB } from "../../../../utils/database";

export async function POST (request){
    const body = await request.json()
    const { title, description, amount, image, publicId } = body
    if(!image || !publicId){
        return new NextResponse({ message: 'Error Occured: image url and publicId required' }, { status: 500 })
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
        console.log(product)
        return new NextResponse(JSON.stringify(product), { message: "Post Successfully"}, { status: 200 })
    } catch (error) {
        return new NextResponse('Error Occured:' + error.message, { status: 500 })
    }
}

// // export async function POST (req, res){
// //     const body = await req.json()
// //     try {
// //         await connectToDB();
// //         const product = await Product.create(body)
// //         return new Response(JSON.stringify(product))
// //     } catch (error) {
// //         return new Response.json('Error Occured:', error.message)
// //     }
// // }

// export async function POST(request) {
//     try {
//         const body = await request.formData();
//         const { title, description, amount } = body
//         console.log('Received payload:', body);
//         // Process the body here
//         await connectToDB();
//         const products = new Product({
//         title,
//         description,
//         amount,
//         })
//         const product = await products.save()
//         return new Response(JSON.stringify((product), { message: 'Post Successfully' }, { status: 200 }));
//     } catch (error) {
//         console.error('Error parsing JSON:', error);
//         return new Response(JSON.stringify({ error: 'Invalid JSON' }, { status: 500 }));
//     }
// }



export async function GET (request){
    try {
        await ConnectToDB();
        const product = await Product.find()
        return new NextResponse(JSON.stringify(product), { status: 200 })
    } catch (error) {
        return new NextResponse('Error Occured:' + error.message, { status: 500 })
    }
}

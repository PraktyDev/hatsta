import { NextResponse } from "next/server";
import { Product } from "../../../../models/Product";
import connectToDB from "../../../../utils/database";
import multer from 'multer';

// // Multer configuration
const storage = multer.diskStorage({
    //folder to store the uploaded image within our application
    destination: 'upload',
    //rename each file to have a unique name
    filename: (request, file, cb) => {
       return cb(null, `${Date.now()}${file.originalname}`);
    },
});

const upload = multer({ storage: storage }).single('image');

export const config = {
    api: {
        bodyParser: false,
    },
};


export async function POST (request){
    upload(request, null, async (err) => {
        if (err) {
            return new NextResponse('Error Occured:' + err.message, { status: 500 })
        }
    })

    // const image_filename = request.file
    
    const body = await request.json()
    const { title, description, amount, file } = body
    const image_filename = `${file.filename}`

    try {
        await connectToDB()
        const products = new Product({
            title: title,
            description: description,
            amount: amount,
            image: image_filename,
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
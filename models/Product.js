import { Schema, model, models } from 'mongoose'

const ProductSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please enter a product title"],
    },
    description: {
        type: String,
        required: [true, 'Enter product description']
    },
    amount: {
        type: String,
        required: [true, 'Enter product amount']
    },
    // image: {
    //     type: String,
    //     // required: [true, 'Enter product image']
    // },
},{ timestamps: true });

export const Product = models?.Product || model("Product", ProductSchema)
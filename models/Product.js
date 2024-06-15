import { Schema, model, models } from 'mongoose'

const ProductSchema = new Schema({
    title: { type: String },
    description: { type: String },
    amount: { type: String },
    image: { type: String },
    publicId: { type: String },
},{ timestamps: true });

export const Product = models?.Product || model("Product", ProductSchema)
import { Schema, model, models } from 'mongoose'

const EventSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter an event name"],
    },
    location: {
        type: String,
        required: [true, 'Please enter an event location'],
    },
    amount: {
        type: String,
        required: [true, 'Enter entry amount']
    },
    time: {
        type: String,
        required: [true, 'Enter time']
    },
    date: {
        type: String,
        required: [true, 'Enter a valid date']
    },
    description1: {
        type: String,
        required: [true, 'Enter description']
    },
    description2: {
        type: String,
        required: [true, 'Enter description']
    },
    description3: {
        type: String,
        required: [true, 'Enter description']
    },
    image: {
        type: String,
        required: [true, 'Enter image url']
    },
},{ timestamps: true });

// creating a model for the database
export const Event = models?.Event || model("Event", EventSchema)
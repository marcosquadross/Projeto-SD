import mongoose from "mongoose"
import { fileSchema } from "./File.js"

const { Schema } = mongoose

const messageSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    content: {
        type: String,
    },
    time: {
        type: Date,
        required: true,
    },
    recipients: {
        type: [mongoose.Types.ObjectId],
        required: true,
    },
    files: {
        type: [fileSchema]
    }, 
},
    { timestamps: true }
)

const Message = mongoose.model('Message', messageSchema)

export {
    Message
}

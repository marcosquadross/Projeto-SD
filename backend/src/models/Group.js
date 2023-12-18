import mongoose from "mongoose"
import { fileSchema } from "./File.js"

const { Schema } = mongoose

const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    members: {
        type: [mongoose.Types.ObjectId],
        required: true,
    }
},
    { timestamps: true }
)

const Group = mongoose.model('Group', groupSchema)

export {
    Group
}
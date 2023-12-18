import mongoose from "mongoose"

const { Schema, model } = mongoose

const fileSchema = new Schema({
    name: {
        type: String,
    },
    url: {
        type: String,
    },
},
    { timestamps: true } 
)

const File = mongoose.model('File', fileSchema)

export {
    File,
    fileSchema
}
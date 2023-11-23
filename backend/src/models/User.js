import mongoose from "mongoose"

const { Schema } = mongoose

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    telephone: {
        type: String,

    },
    password: {
        type: String,
        required: true,
    },
},
    { timestamps: true } // Salva a data de criação e a data de atualização
)

const User = mongoose.model('User', userSchema)

export {
    User,
    userSchema
}

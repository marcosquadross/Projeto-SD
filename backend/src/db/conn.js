import mongoose from "mongoose"

async function conn() {

    try {
        await mongoose.connect(
            "mongodb+srv://root:root@cluster0.9qurksu.mongodb.net/?retryWrites=true&w=majority"
        )
        console.log('Connected to MongoDB')
    } catch (error) {   
        console.error(`ERRO: ${error}`)
    }
}

export default conn
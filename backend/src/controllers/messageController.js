import { Message as MessageModel } from "../models/Message.js"

const messageController = {

    create: async (req, res) => {
        
        try {
            const message = {
                title: req.body.title,
                author: req.body.author,
                time: req.body.time,
                recipients: req.body.recipients,
                files: req.body.files,
            }

            const response = await MessageModel.create(message)
            res.status(201).json({response, msg: "Mensagem criada com sucesso!"})  
            
        } catch (error) {
            console.log(`ERRO: ${error}`)   
            console.log(error)
            res.status(500).json({ msg: "Ocorreu um erro ao criar o message." })
        }
    },

    getAll: async (req, res) => {
        try {
            const messages = await MessageModel.find()
            res.json(messages)
        } catch (error) {
            console.log(`ERRO: ${error}`)   
            res.status(500).json({ msg: "Ocorreu um erro ao buscar os messages." })
        }
    },

    getById: async (req, res) => {
        try {
            const message = await MessageModel.findById(req.params.id)

            if (!message) {
                res.status(404).json({ msg: "message não encontrado." })
                return
            }
            
            res.json(message)
        } catch (error) {
            console.log(`ERRO: ${error}`)   
            res.status(500).json({ msg: "Ocorreu um erro ao buscar o message." })
        }
    },

}

export { messageController }
import { Message as MessageModel } from "../models/Message.js"

const messageController = {

    create: async (req, res) => {
        
        try {
            const message = {
                title: req.body.title,
                author: req.body.author,
                content: req.body.content,
                time: req.body.time,
                recipients: req.body.recipients,
                files: req.body.files,
            }

            const response = await MessageModel.create(message)
            res.status(201).json({response, msg: "Mensagem criada com sucesso!"})  
            
        } catch (error) {
            console.log(`ERRO: ${error}`)   
            console.log(error)
            res.status(500).json({ msg: "Ocorreu um erro ao criar mensagem." })
        }
    },

    getById: async (req, res) => {
        try {
            const message = await MessageModel.findById(req.params.id)

            if (!message) {
                res.status(404).json({ msg: "Mensagem não encontrado." })
                return
            }
            
            res.json(message)
        } catch (error) {
            console.log(`ERRO: ${error}`)   
            res.status(500).json({ msg: "Ocorreu um erro ao buscar mensagem." })
        }
    },

    getByAuthor: async (req, res) => {
        try {
            const messages = await MessageModel.find({ author: req.params.id })

            if (!messages) {
                res.status(404).json({ msg: "Nenhuma mensagem encontrada" })
                return
            }

            res.json(messages)
        } catch (error) {
            console.log(`ERRO: ${error}`)   
            res.status(500).json({ msg: "Ocorreu um erro ao buscar as mensagens" })
        }
    },

    getByRecipient: async (req, res) => {
        try {
            const messages = await MessageModel.find({ recipients: req.params.id })

            if (!messages || messages.length === 0) {
                res.status(404).json({ msg: "Nenhuma mensagem encontrada" })
                return
            }

            res.json(messages)
        } catch (error) {
            console.log(`ERRO: ${error}`)   
            res.status(500).json({ msg: "Ocorreu um erro ao buscar as mensagens" })
        }
    },

    delete: async (req, res) => {
        try {
            const message = await MessageModel.findByIdAndDelete(req.params.id)

            if (!message) {
                res.status(404).json({ msg: "Mensagem não encontrada." })
                return
            }
            
            res.status(200).json({ message, msg: "Mensagem deletada com sucesso!" })
        } catch (error) {
            console.log(`ERRO: ${error}`)   
            res.status(500).json({ msg: "Ocorreu um erro ao deletar mensagem." })
        }
    },
}

export { messageController }
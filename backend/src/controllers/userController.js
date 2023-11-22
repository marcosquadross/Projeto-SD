import { User as UserModel } from "../models/User.js"

const userController = {

    create: async (req, res) => {
        
        try {
            const user = {
                username: req.body.username,
                name: req.body.name,
                telephone: req.body.telephone,
                email: req.body.email,
                password: req.body.password,
            }

            const response = await UserModel.create(user)
            res.status(201).json({response, msg: "Usuário criado com sucesso!"})  

        } catch (error) {
            console.log(`ERRO: ${error}`)   
            res.status(500).json({ msg: "Ocorreu um erro ao criar o usuário." })
        }
    },

    getAll: async (req, res) => {
        try {
            const users = await UserModel.find()
            res.json(users)
        } catch (error) {
            console.log(`ERRO: ${error}`)   
            res.status(500).json({ msg: "Ocorreu um erro ao buscar os usuários." })
        }
    },

    getById: async (req, res) => {
        try {
            const user = await UserModel.findById(req.params.id)

            if (!user) {
                res.status(404).json({ msg: "Usuário não encontrado." })
                return
            }
            
            res.json(user)
        } catch (error) {
            console.log(`ERRO: ${error}`)   
            res.status(500).json({ msg: "Ocorreu um erro ao buscar o usuário." })
        }
    },

    delete: async (req, res) => {
        try {
            const user = await UserModel.findByIdAndDelete(req.params.id)

            if (!user) {
                res.status(404).json({ msg: "Usuário não encontrado." })
                return
            }
            
            res.status(200).json({ user, msg: "Usuário deletado com sucesso!" })
        } catch (error) {
            console.log(`ERRO: ${error}`)   
            res.status(500).json({ msg: "Ocorreu um erro ao deletar o usuário." })
        }
    },

    update: async (req, res) => {
        try {
            const user = {
                username: req.body.username,
                name: req.body.name,
                telephone: req.body.telephone,
                email: req.body.email,
                password: req.body.password,
            }

            const userUpdated = await UserModel.findByIdAndUpdate(req.params.id, user) 
            
            if (!userUpdated) {
                res.status(404).json({ msg: "Usuário não encontrado." })
                return
            }

            res.status(200).json({ user, msg: "Usuário atualizado com sucesso!" })
        } catch (error) {
            console.log(`ERRO: ${error}`)  
            console.log(error) 
            res.status(500).json({ msg: "Ocorreu um erro ao atualizar o usuário." })
        }
    }

}

export { userController }


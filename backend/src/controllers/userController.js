import bcrypt from 'bcrypt'
import { generateToken } from '../auth.js'
import { User as UserModel } from "../models/User.js"
import { ObjectId } from 'mongodb';

const userController = {

    create: async (req, res) => {
        try {

            const salt = bcrypt.genSaltSync(12)
            const passwordHash = bcrypt.hashSync(req.body.password, salt)
            
            const user = {
                username: req.body.username,
                name: req.body.name,
                telephone: req.body.telephone,
                password: passwordHash,
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
            const author_id = new ObjectId(req.params.id)
            const user = await UserModel.findById(author_id)
            // const user = await UserModel.findById(req.params.id)

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
            const salt = bcrypt.genSaltSync(12)
            const passwordHash = bcrypt.hashSync(req.body.password, salt)

            const user = {
                username: req.body.username,
                name: req.body.name,
                telephone: req.body.telephone,
                password: passwordHash,
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
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body

            const user = await UserModel.findOne({ username })

            console.log(user)

            if (!user) {
                res.status(404).json({ msg: "Usuário não encontrado." })
                return
            }

            const isValidPassword = bcrypt.compareSync(password, user.password)

            if (!isValidPassword) {
                res.status(403).json({ msg: "Senha inválida." })
                return
            }

            const token = generateToken({ id: user._id, username: user.username })

            res.status(200).json({ user, token })
        } catch (error) {
            console.log(`ERRO: ${error}`)   
            res.status(500).json({ msg: "Ocorreu um erro ao fazer o login." })
        }
    },
}

export { userController }


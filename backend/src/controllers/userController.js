import { PrismaClient } from '@prisma/client'
import { generateToken } from '../auth.js'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

export default {

    async create(req, res) {

        try {
            const { username, name, phone, password, isEnable } = req.body

            
            let user = await prisma.user.findUnique({ where: { username } })

            if (user) {
                return res.json({ error: "Já existe um usuário com esse username!" })
            }

            const salt = bcrypt.genSaltSync(10)
            const hashedPassword = bcrypt.hashSync(password, salt)

            user = await prisma.user.create({
                data: {
                    name,
                    username,
                    phone,
                    password: hashedPassword,
                    isEnable
                },
            })

            return res.status(200).json({user, msg: "Usuário criado com sucesso!"})
        } catch (error) { 
            console.log(`Erro: ${error}`)
            return res.status(500).json({msg: error })
        }
    },

    async getAll(req, res) {
        try {
            const users = await prisma.user.findMany({})
            return res.json(users)
        } catch (error) {
            console.log(`Erro: ${error}`)
            return res.status(500).json({ msg: error })
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params

            const user = await prisma.user.findUnique({ where: { id: Number(id) } })

            if (!user) return res.status(404).json({ msg: "Usuário não cadastrado" })

            return res.json(user)
        } catch (error) {
            console.log(`Erro: ${error}`)
            return res.status(500).json({ msg: "Ocorreu um erro ao buscar o usuário." })
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params

            let user = await prisma.user.findUnique({ where: { id: Number(id) } })

            if (!user) return res.json({ error: "Usuário não cadastrado" })

            const salt = bcrypt.genSaltSync(10)
            const hashedPassword = bcrypt.hashSync(password, salt)

            user = await prisma.user.update({
                where: { id: Number(id) },
                data: { 
                    username: req.body.username, 
                    name: req.body.name, 
                    phone: req.body.phone, 
                    password: hashedPassword, 
                    isEnable: req.body.isEnable
                }
            })

            return res.status(200).json({user, msg: "Usuário atualizado com sucesso!"})
        } catch (error) {
            console.log(`Erro: ${error}`)
            return res.status(500).json({ msg: error })
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params

            const user = await prisma.user.findUnique({ where: { id: Number(id) } })

            if (!user) return res.status(404).json({ msg: "Usuário não cadastrado" })

            user = await prisma.user.delete({ where: { id: Number(id) } })

            res.status(200).json({ user, msg: "Usuário deletado com sucesso!" })

        } catch (error) {
            console.log(`Erro: ${error}`)
            return res.status(500).json({ msg: error })
        }
    },

    async login(req, res) {
        try {
            const { username, password } = req.body

            const user = await prisma.user.findUnique({ where: { username } })

            if (!user) return res.status(404).json({ msg: "Usuário não encontrado." })

            const isPasswordValid = bcrypt.compareSync(password, user.password)

            if (!isPasswordValid) return res.json({ error: "Senha inválida" })

            const token = generateToken({ id: user.id, username: user.username })

            res.status(200).json({ user, token })
            
        } catch (error) {
            console.log(`Erro: ${error}`)
            return res.status(500).json({ msg: "Ocorreu um erro ao fazer o login." })
        }

    }
}
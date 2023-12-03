import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

export default {

    async createUser(req, res) {

        try {
            const { username, name, phone, password, isEnable } = req.body

            // validação
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

            return res.json(user)
        } catch (error) { 
            console.log(`Erro: ${error}`)
            return res.json({ error })
        }
    },

    async findAllUsers(req, res) {
        try {
            const users = await prisma.user.findMany({
                select: {
                    name: true,
                    createdAt: true
                }
            })
            return res.json(users)
        } catch (error) {
            console.log(`Erro: ${error}`)
            return res.json({ error })
        }
    },

    async findUser(req, res) {
        try {
            const { id } = req.params

            const user = await prisma.user.findUnique({ where: { id: Number(id) } })

            if (!user) return res.json({ error: "Usuário não cadastrado" })

            return res.json(user)
        } catch (error) {
            console.log(`Erro: ${error}`)
            return res.json({ error })
        }
    },

    async updateUser(req, res) {
        try {
            const { id } = req.params
            const { username, name, phone, password, isEnable } = req.body

            let user = await prisma.user.findUnique({ where: { id: Number(id) } })

            if (!user) return res.json({ error: "Usuário não cadastrado" })

            const salt = bcrypt.genSaltSync(10)
            const hashedPassword = bcrypt.hashSync(password, salt)

            user = await prisma.user.update({
                where: { id: Number(id) },
                data: { username, name, phone, password: hashedPassword, isEnable }
            })

            return res.json(user)
        } catch (error) {
            console.log(`Erro: ${error}`)
            return res.json({ error })
        }
    },

    async deleteUser(req, res) {
        try {
            const { id } = req.params

            const user = await prisma.user.findUnique({ where: { id: Number(id) } })

            if (!user) return res.json({ error: "Usuário não cadastrado" })

            await prisma.user.delete({ where: { id: Number(id) } })

            return res.json({ mensage: "Usuário Deletado" })

        } catch (error) {
            console.log(`Erro: ${error}`)
            return res.json({ error })
        }
    },

    async login(req, res) {
        try {
            const { username, password } = req.body

            const user = await prisma.user.findUnique({ where: { username } })

            if (!user) return res.json({ error: "Usuário não cadastrado" })

            const isPasswordValid = bcrypt.compareSync(password, user.password)

            if (!isPasswordValid) return res.json({ error: "Senha inválida" })

            return res.status(200).json({ mensage: "Login realizado com sucesso" })
    
        } catch (error) {
            console.log(`Erro: ${error}`)
            return res.status(500).json({ mensage: "Erro interno" })
        }

    }
}
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {
    async createMessage(req, res) {
        try {
            const { title, authorId, receivers, content } = req.body

            // Verificar se o autor existe
            const authorExists = await prisma.user.findUnique({
                where: { id: authorId },
            })

            if (!authorExists) {
                return res.json({ error: "Autor não encontrado" })
            }

            // Criar a mensagem
            const message = await prisma.message.create({
                data: {
                    title,
                    authorId,
                    content,
                    receivers: {
                        connect: receivers.map((userId) => ({ id: userId })),
                    },
                },
            })

            return res.json(message)
        } catch (error) {
            return res.json({ error })
        }
    },

    async findAllMessages(req, res) {
        try {
            const messages = await prisma.message.findMany({
                select: {
                    title: true,
                    author: true,
                    receivers: true,
                },
            })
            return res.json(messages)
        } catch (error) {
            return res.json({ error })
        }
    },

    async findMessage(req, res) {
        try {
            const { id } = req.params

            const message = await prisma.message.findUnique({ where: { id: Number(id) }, select: { title: true, author: true, receivers: true } })

            if (!message) return res.json({ error: "Mensagem não encontrada" })

            return res.json(message)
        } catch (error) {
            return res.json({ error })
        }
    },

    async updateMessage(req, res) {
        try {
            const { id } = req.params
            const { title, authorId, receivers, content } = req.body

            let message = await prisma.message.findUnique({ where: { id: Number(id) } })

            if (!message) return res.json({ error: "Mensagem não encontrada" })

            message = await prisma.message.update({
                where: { id: Number(id) },
                data: {
                    title,
                    authorId,
                    content,
                    receivers: {
                        connect: receivers.map((userId) => ({ id: userId })),
                    },
                },
            })

            return res.json(message)
        } catch (error) {
            return res.json({ error })
        }
    },

    async deleteMessage(req, res) {
        try {
            const { id } = req.params

            const message = await prisma.message.delete({
                where: { id: Number(id) },
            })

            return res.json(message)
        } catch (error) {
            return res.json({ error })
        }
    },

    

}

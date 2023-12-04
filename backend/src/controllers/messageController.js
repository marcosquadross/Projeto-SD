import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {
    async create(req, res) {
        try {
            const { title, authorId, receivers, content } = req.body

            const authorExists = await prisma.user.findUnique({
                where: { id: authorId },
            })

            if (!authorExists) return res.json({ error: "Autor não encontrado" })
            

            const receiversExists = await prisma.user.findMany({
                where: { id: { in: receivers } },
            })

            if (receiversExists.length !== receivers.length) return res.json({ error: "Destinatário(s) não encontrado(s)" })

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

            return res.status(200).json({message, msg: "Mensagem criada com sucesso!"})
        } catch (error) {
            console.log(`Erro: ${error}`)
            return res.status(500).json({ msg: error })
        }
    },

    async getByAuthor(req, res) {
        try {
            const { id } = req.params

            const messages = await prisma.message.findMany({
                where: { authorId: Number(id) }
            })

            if (!messages) return res.json({ error: "Mensagem não encontrada" })

            return res.json(messages)
        } catch (error) {
            console.log(`Erro: ${error}`)
            return res.status(500).json({ msg: error })
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params

            const message = await prisma.message.findUnique({ where: { id: Number(id) }, select: { title: true, author: true, receivers: true } })

            if (!message) return res.json({ error: "Mensagem não encontrada" })

            return res.json(message)
        } catch (error) {
            console.log(`Erro: ${error}`)
            return res.status(500).json({ msg: error })
        }
    },

    async getByReceiver(req, res) {
        try {
            const { id } = req.params

            const messages = await prisma.message.findMany({
                where: { receivers: { some: { id: Number(id) } } },
            })

            if (!messages) return res.json({ error: "Mensagem não encontrada" })

            return res.json(messages)
        } catch (error) {
            console.log(`Erro: ${error}`)
            return res.status(500).json({ msg: error })
        }
    },

    async update(req, res) {
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

    async delete(req, res) {
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

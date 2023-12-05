import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function getUsersIdsByUsers(users) {

    let usersIds = []

    for (const user of users) {
        const userExists = await prisma.user.findUnique({
            where: { username: user },
        })

        if (!userExists) {
            return `Usuário ${user} não encontrado`
        }

        usersIds.push(userExists.id)
    }

    return usersIds
}

async function getUserNameById(id) {
    const user = await prisma.user.findUnique({
        where: { id: id },
    })

    return user.username
}

async function getRecipientsNamesByIds(users) {
    var dests = []
    for (const user of users) {
        dests.push(await getUserNameById(user.id))
    }
    return dests
}

export default {
    async createMessage(req, res) {
        try {

            const { title, authorId, receivers, content } = req.body

            // Verificar se o autor existe
            const authorExists = await prisma.user.findUnique({
                where: { id: authorId },
            })

            if (!authorExists) {
                return res.status(404).json({ msg: "Autor não encontrado" })
            }

            const recs = await getUsersIdsByUsers(receivers)

            if (typeof recs === 'string') {
                return res.status(404).json({ msg: recs })
            }

            // Criar a mensagem
            const message = await prisma.message.create({
                data: {
                    title,
                    authorId,
                    content,
                    receivers: {
                        connect: recs.map((userId) => ({ id: userId })),
                    },
                },
            })

            return res.status(201).json({ msg: "Mensagem criada com sucesso" })
        } catch (error) {
            return res.status(400).json({ msg: error.message })
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

    async findMessagesByAuthor(req, res) {
        try {
            const { id } = req.params

            let sentMessages = []

            const messages = await prisma.message.findMany({
                where: { authorId: Number(id) },
                select: {
                    id: true,
                    authorId: true,
                    title: true,
                    content: true,
                    createdAt: true,
                    receivers: true,
                },
            })

            for (const message of messages) {
                const author = await getUserNameById(message.authorId)
                const receiversNames = await getRecipientsNamesByIds(message.receivers)
                sentMessages.push({
                    id: message.id,
                    title: message.title,
                    content: message.content,
                    author,
                    recipients: receiversNames,
                    time: message.createdAt,
                })
            }

            if (!messages) return res.status(404).json({ error: "Mensagem não encontrada" })

            return res.json(sentMessages)
        }
        catch (error) {
            return res.json({ error })
        }
    },

    async findMessagesByReceiver(req, res) {

        try {
            const { id } = req.params

            let receivedMessages = []

            const messages = await prisma.message.findMany({
                where: { receivers: { some: { id: Number(id) } } },
                select: {
                    id: true,
                    authorId: true,
                    title: true,
                    content: true,
                    createdAt: true,
                    receivers: true,
                },
            })

            for (const message of messages) {
                const author = await getUserNameById(message.authorId)
                const receiversNames = await getRecipientsNamesByIds(message.receivers)
                receivedMessages.push({
                    id: message.id,
                    title: message.title,
                    content: message.content,
                    author,
                    recipients: receiversNames,
                    time: message.createdAt,
                })
            }

            if (!messages) return res.status(404).json({ error: "Mensagem não encontrada" })

            return res.json(receivedMessages)
        }

        catch (error) {
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

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getUsersIdsByUsername(users) {

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


export default {
    async create(req, res) {
        try {
            const { name, members } = req.body;

            const groupMembers = await getUsersIdsByUsername(members);

            const group = await prisma.group.create({
                data: {
                    name: name,
                    users: {
                        connect: groupMembers.map((userId) => ({ id: userId })),
                    },
                },
            });

            return res.status(201).json({msg: "Grupo criado com sucesso"});

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    async getAll(req, res) {
        try {
            const groups = await prisma.group.findMany({
                include: {
                    users: true,
                },
            });

            return res.status(200).json(groups);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;

            const group = await prisma.group.findUnique({
                where: { id: Number(id) },
                include: {
                    users: true,
                },
            });

            if (!group) {
                return res.status(404).json({ msg: "Grupo não encontrado" });
            }

            return res.status(200).json(group);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    async getByMember(req, res) {
        try {
            const { id } = req.params;

            const group = await prisma.group.findMany({
                where: { users: { some: { id: Number(id) } } },
                include: {
                    users: true,
                },
            });

            if (!group) {
                return res.status(404).json({ msg: "Grupo não encontrado" });
            }

            return res.status(200).json(group);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, member } = req.body;

            const groupMembers = await getUsersIdsByUsers(member);

            const group = await prisma.group.update({
                where: { id: Number(id) },
                data: {
                    name: name,
                    users: {
                        set: groupMembers.map((userId) => ({ id: userId })),
                    },
                },
            });

            return res.status(200).json({ msg: "Grupo atualizado com sucesso" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;

            const group = await prisma.group.delete({
                where: { id: Number(id) },
            });

            return res.status(200).json({ msg: "Grupo deletado com sucesso" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },


}
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function getUsersIdsByUsers(users) {
    try {
        const usersIds = await Promise.all(
            users.map(async (user) => {
                const userExists = await prisma.user.findUnique({
                    where: { username: user },
                })

                if (!userExists) {
                    throw new Error(`User not found: ${user}`);
                }

                return userExists.id;
            })
        );

        return usersIds;
    } finally {
        await prisma.$disconnect();
    }
}
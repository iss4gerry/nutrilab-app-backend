const prisma = require('../../prisma/index')

const getAllHistory = async () => {
    return prisma.history.findMany()
}

const getUserHistory = async(userId) => {
    return await prisma.history.findMany({
        where: {
            userId: userId
        }
    })
}

module.exports = {
    getAllHistory,
    getUserHistory
}
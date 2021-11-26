import prisma from 'helpers/prisma'

export const gameServerRepo = {
    findUnique,
    getAll,
    getById,
    create,
    update,
    toggleStatusCheck,
    delete: _delete
};

async function getAll() {
    const gameservers = await prisma.gameServer.findMany()
    return gameservers
}

async function getById(id) {
    if (!id) throw 'ID is required'

    const gameserver = await prisma.gameServer.findUnique({ 
        where: {
            id: parseInt(id)
        }
    })

    return gameserver;
}

async function findUnique(gs) {
    const gameServers = await prisma.gameServer.findUnique({
        where: gs,
    })

    console.log('gameServerRepo::findUnique', gameServers);

    return gameServers;
}

async function create(gameserver) {
    const newGameServer = await prisma.gameServer.create({
        data: {
            ...gameserver
        }
    })

    return newGameServer
}

async function update(id, params) {
    const gameserver = await prisma.gameServer.update({
        where: {
            id: parseInt(id),
        },
        data: {
            ...params
        }
    })

    return gameserver
}

async function toggleStatusCheck(id) {
    const gameserver = await getById(id)
    if (!gameserver) throw 'Game Server Not Found'

    gameserver.enableStatusCheck = !gameserver.enableStatusCheck

    const gs = await update(gameserver.id, gameserver);

    return gs;
}

async function _delete(id) {

    const deletedGameServer = await prisma.gameServer.delete({
        where: {
            id: parseInt(id)
        }
    })

    return deletedGameServer
}
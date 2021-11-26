import prisma from 'helpers/prisma'

export const usersRepo = {
    getAll,
    getById,
    getByUsername,
    create,
    update,
    delete: _delete
};

async function getAll() {
    const users = await prisma.user.findMany()
    return users
}

async function getByUsername(username) {
    if (!id) throw 'Username is required'
    const user = await prisma.user.findUnique({ 
        where: {
            username: username
        }
    })

    return user;
}

async function getById(id) {
    if (!id) throw 'ID is required'
    const user = await prisma.user.findUnique({ 
        where: {
            id: parseInt(id)
        }
    })

    return user;
}

async function create(user) {
    const newUser = await prisma.user.create({
        data: {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            hash: user.hash
        }
    })

    return newUser
}

async function update(id, params) {
    const user = await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            ...params
        }
    })

    return user
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
async function _delete(id) {

    const deletedUser = await prisma.user.delete({
        where: {
            id: parseInt(id)
        }
    })

    return deletedUser
}
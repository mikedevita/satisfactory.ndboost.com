import { apiHandler, gameServerRepo, } from 'helpers/api';
import prisma from 'helpers/prisma'

export default apiHandler({
    put: edit,
    get: getById
});

async function edit(req, res) {
    if (!req.query.id)  throw 'Game Server ID not provided';
    
    const gameServer = await gameServerRepo.update(req.query.id, req.body);

    return res.status(200).json(gameServer);
}

async function getById(req, res) {
    if (!req.query.id)  throw 'Game Server ID not provided';
    const gameServer = await gameServerRepo.getById(req.query.id);

    return res.json(gameServer);
}
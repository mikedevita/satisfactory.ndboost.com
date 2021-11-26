import { apiHandler, gameServerRepo, } from 'helpers/api';
import prisma from 'helpers/prisma'

export default apiHandler({
    put: togglestatuscheck
});

async function togglestatuscheck(req, res) {
    if (!req.query.id)  throw 'Game Server ID not provided';
    
    const gameServer = await gameServerRepo.toggleStatusCheck(req.query.id);

    return res.status(200).json(gameServer);
}

import { apiHandler, gameServerRepo, } from 'helpers/api'
import { fetchWrapper, } from 'helpers'
import { gameServerService } from 'services'

export default apiHandler({
    get: statuscheck
});

async function statuscheck(req, res) {
    if (!req.query.id)  throw 'Game Server ID not provided'

    const gs = await gameServerRepo.getById(req.query.id)
    if (!gs) throw 'Game Server not found'

    const { ipAddress, queryPort, id, } = gs
    const port = queryPort

    gameServerService
    .callStatusCheck({ ipAddress, port })
    .then(async function({ responseTimeInMsec, serverState, serverVersion }) {
        let gs = await gameServerRepo.update(id, {
          responseTimeInMsec,
          serverState,
          serverVersion
        })
        
        res.status(200).json(gs);
    })
}

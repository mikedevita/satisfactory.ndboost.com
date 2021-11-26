import { apiHandler, gameServerRepo, } from 'helpers/api';
import prisma from 'helpers/prisma'

export default apiHandler({
    post: create
});

async function create(req, res) {
    // split out password from user details 
    const { name, ipAddress, queryPort, beaconPort, gamePort, enableStatusCheck, ...gameserver} = req.body;
    console.log(req.body);

    // validate
    // const isUnique = await prisma.gameServer.findMany({ 
    //     where: {
    //         {ipAddress: ipAddress},
    //         OR: [
    //             {queryPort: queryPort},
    //             {beaconPort: beaconPort},
    //             {gamePort: gamePort},
    //         ]
    //     }
    // })

    // if (isUnique) {
    //     throw `That game server already exists`;
    // }

    const newGameServer = await gameServerRepo.create({
        name,
        ipAddress,
        queryPort,
        beaconPort,
        gamePort,
        enableStatusCheck,
    })

    return res.status(200).json(newGameServer);
}

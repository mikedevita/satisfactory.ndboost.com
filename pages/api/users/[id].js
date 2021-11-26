const bcrypt = require('bcryptjs');

import { apiHandler } from 'helpers/api';
import { usersRepo, omit } from 'helpers/api';
import prisma from 'helpers/prisma'

export default apiHandler({
    get: getById,
    put: update,
    delete: _delete
});

async function getById(req, res) {
    const user = await usersRepo.getById(req.query.id);

    if (!user) throw 'User Not Found';

    return res.status(200).json(omit(user, 'hash'));
}

async function update(req, res) {
    let user = await usersRepo.getById(req.query.id);

    if (!user) throw 'User Not Found';

    // split out password from user details 
    const { password, ...params } = req.body;

    // validate
    if (user.username !== params.username && usersRepo.find(x => x.username === params.username))
        throw `User with the username "${params.username}" already exists`;

    // only update hashed password if entered
    if (password) {
        user.hash = bcrypt.hashSync(password, 10);
    }

    let updated = await usersRepo.update(req.query.id, params);
    return res.status(200).json(updated);
}

async function _delete(req, res) {
    let deletedUser = await usersRepo.delete(req.query.id);
    return res.status(200).json(deletedUser);
}

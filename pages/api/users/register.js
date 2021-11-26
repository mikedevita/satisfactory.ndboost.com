const bcrypt = require('bcryptjs');

import { apiHandler } from 'helpers/api';
import prisma from 'helpers/prisma'

export default apiHandler({
    post: register
});

async function register(req, res) {
    // split out password from user details 
    const { username, password, ...user } = req.body;

    // validate
    const isNotUnique = await prisma.user.findUnique({ 
        where: {
            username: username
        }
    })

    if (isNotUnique) throw `User with the username "${username}" already exists`;
    
    // hash password
    user.hash = bcrypt.hashSync(password, 10);    

    const newUser = await prisma.user.create({
        data: {
            ...user,
        }
    })

    return res.status(200).json(newUser);
}

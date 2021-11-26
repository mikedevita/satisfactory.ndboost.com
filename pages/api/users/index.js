import { apiHandler, usersRepo, omit } from 'helpers/api';

export default apiHandler({
    get: getUsers
});

async function getUsers(req, res) {
    // return users without hashed passwords in the response
    const response = await usersRepo.getAll();
    return res.status(200).json(response);
}

import { apiHandler, gameServerRepo, } from 'helpers/api';

export default apiHandler({
    get: async function (req, res) {
        // return users without hashed passwords in the response
        const response = await gameServerRepo.getAll();
        return res.status(200).json(response);
    }
});

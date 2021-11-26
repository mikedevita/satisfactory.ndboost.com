import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/gameservers`;

export const gameServerService = {
    getAll,
    getById,
    update,
    toggleStatusCheck,
    checkStatus,
    callStatusCheck,
    create,
    delete: _delete
};


function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function callStatusCheck(server) {
    return fetchWrapper.post(`http://localhost:3010/statuscheck`, server)
}

function checkStatus(id) {
    return fetchWrapper.get(`${baseUrl}/${id}/statuscheck`)
}

function update(id, params) {
    const x = fetchWrapper.put(`${baseUrl}/${id}`, params);
    return x;
}

function toggleStatusCheck(id) {
    const x = fetchWrapper.put(`${baseUrl}/${id}/togglestatuscheck`);
    return x;
}

function create(gs) {
    const x = fetchWrapper.post(`${baseUrl}/create`, gs);
    return x;
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}

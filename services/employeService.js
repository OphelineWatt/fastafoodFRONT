import API from "./api";

export const enregistrement = (data) => API.post('/enregistrement', data);
export const connexion = (data) => API.post('/connexion', data);
import API from "./api";

export const enregistrement = (data) => API.post('/enregistrement', data);
export const connexion = (data) => API.post('/connexion', data);
export const employes = () => API.get('/employes');
export const suppressionEmploye = (idEmploye) => API.delete(`/profil/supression/${idEmploye}`);
export const majEmploye = (idEmploye, data) => API.put(`/profil/maj/${idEmploye}`,data);
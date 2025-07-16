import API from "./api";

export const produits = () => API.get('/produits');
export const categories = () => API.get('/categories');


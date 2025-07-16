import API from "./api";

export const produits = () => API.get('/produits');
export const categories = () => API.get('/categories');
export const supressionProduit = (idProduit) =>API.delete(`/produit/supression/${idProduit}`);
export const majProduit = (idProduit) => API.put(`/produit/maj/${idProduit}`);
export const ajoutProduit = (data) => API.post("/ajoutProduit",data);
import API from "./api";

export const produits = () => API.get('/produits');
export const categories = () => API.get('/categories');
export const supressionProduit = (idProduit) =>API.delete(`/produit/supression/${idProduit}`);
export const majProduit = (idProduit,data) => API.put(`/produit/maj/${idProduit}`,data);
export const ajoutProduit = (data) => API.post("/ajoutProduit",data);

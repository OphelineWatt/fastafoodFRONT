import { useEffect, useState } from "react";
import { produits } from "../services/produitService";
import ProduitCard from "../Components/ProduitCard";

const PageProduits = () => {
    const [produit, setProduit] = useState([]);

    const recuperationProduit = async () => {
        try {
          const reponse = await produits();

          setProduit(reponse.data);

        } catch (error) {
          console.error("Erreur récupération des produits:", error);
        }
      };
    
        useEffect(() => {
          recuperationProduit();
        }, []);

return (
  <div className="d-flex flex-column align-items-center justify-content-center ">
    <h1>Produits :</h1>
    <div className="d-flex flex-wrap justify-content-center align-content-center gap-5 col-8">
      {produit.map((pdt) => (
        <ProduitCard key={pdt.nom} produit={pdt} />
      ))}
    </div>
  </div>
);


}
 
export default PageProduits;
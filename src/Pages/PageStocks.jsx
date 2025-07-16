import { useEffect, useState } from "react";
import TableauStocks from "../Components/TableauStocks";
import { produits} from "../services/produitService";
import { jwtDecode } from "jwt-decode";
import { Button } from "react-bootstrap";
import AjoutProduitModal from "../Components/AjoutProduitModal";


const PageStocks = () => {
  const [produit, setProduits] = useState([]);
  const [showModalAjout, setShowModalAjout] = useState(false);

   const token = localStorage.getItem("token");
    const decodeToken = jwtDecode(token);
    const roleId = decodeToken.roleId;

    const recuperationProduit = async () => {
      try {
        const reponse = await produits();
  
        setProduits(reponse.data);
      } catch (error) {
        console.error("Erreur récupération des produits:", error);
      }
    };

    
    
      useEffect(() => {
    recuperationProduit();
  }, []);
  

  return ( 
      <div className="d-flex flex-column align-items-center gap-8">
    <h1>Stocks</h1>
      {roleId === 1 &&
<Button
  onClick={() => setShowModalAjout(true)}
  style={{
    backgroundColor: "#8d2915",
    color: "white",
    border: "none",
    fontWeight: "bold",
    padding: "8px 18px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
    marginBottom : "10px"
  }}
>
  <i className="bi bi-basket3"></i>
  Ajout d’un produit
</Button>
}
    <TableauStocks donnees={produit}/>

        <AjoutProduitModal
      show={showModalAjout}
      onHide={() => setShowModalAjout(false)}
      onUpdated={recuperationProduit}
    />
    </div>
   );
};

export default PageStocks;

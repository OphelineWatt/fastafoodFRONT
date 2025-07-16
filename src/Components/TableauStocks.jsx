

import { supressionProduit} from "../services/produitService";
import { Table, Button } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

const TableauStock = ({donnees}) => {
  

  const token = localStorage.getItem("token");
  const decodeToken = jwtDecode(token);
  const roleId = decodeToken.roleId;

  console.log(donnees);
  



  const gestionSuppression = async (idProduit) => {
      try {
        const confirmation = window.confirm("Confirmer la suppression ?");
        if (!confirmation) return;
  
        await supressionProduit(idProduit);
        alert("Produit supprimé");
  
        location.reload();
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        alert("Échec de la suppression");
      }
    };


  return (
    <Table responsive striped bordered hover className="table-personnalisee">
      <thead>
        <tr style={{ backgroundColor: "#DF9328", color: "#fff" }}>
          <th>Nom</th>
          <th>Quantité</th>
          <th>Unité</th>
          <th>Prix Unitaire</th>
          {/* tu as accès uniquement quand tu es admin  */}
          {roleId === 1 && <th>Gestion</th>}
        </tr>
      </thead>
      <tbody>
        {donnees.map((pdt, index) => (
          <tr
            key={index}
            style={{ backgroundColor: index % 2 === 0 ? "#FCEED6" : "#FFF5E8" }}
          >
            <td>{pdt.nom}</td>
            <td>{pdt.quantite}</td>
            <td> {pdt.unite}</td>
            <td>{pdt.PrixUnitaire}</td>

            {roleId === 1 && (
    <td>
    <div className="d-flex justify-content-center gap-2">
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => gestionSuppression(pdt.idProduit)}
        className="btn-poubelle d-flex align-items-center gap-1"
      >
        <i className="bi bi-trash"></i> Supprimer
      </Button>
    
      {/* <Button
        variant="outline-secondary"
        size="sm"
        onClick={() => gestionOuvertureModal(employe)}
        className="btn-modifier d-flex align-items-center gap-1"
      >
        <i className="bi bi-pencil-square"></i> Modifier 
      </Button> */}
    </div>
    
    </td>
    
            )} 
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableauStock;

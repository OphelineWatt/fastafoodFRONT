import { useEffect, useState } from 'react';
import { employes} from '../services/employeService';
import TableauEmployes from '../Components/TableauEmployes';
import AjoutModal from '../Components/AjoutModal';
import { Button } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';

const PageEmployes = () => {
  const [employe, setEmploye] = useState([]);
  const [showModalAjout, setShowModalAjout] = useState(false);

   const token = localStorage.getItem("token");
    const decodeToken = jwtDecode(token);
    const roleId = decodeToken.roleId;

  const recuperationEmployes = async () => {
    try {
      const reponse = await employes();
      setEmploye(reponse.data);
    } catch (error) {
      console.error("Erreur récupération des employés:", error);
    }
  };

  useEffect(() => {
    recuperationEmployes();
  }, []);

return (
  <div className="d-flex flex-column align-items-center gap-8">
    <h2 className="text-center mb-4">Liste des employés</h2>

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
  <i className="bi bi-person-plus-fill"></i>
  Ajout d’un employé
</Button>
}

    <TableauEmployes donnees={employe} />

    <AjoutModal
      show={showModalAjout}
      onHide={() => setShowModalAjout(false)}
      onUpdated={recuperationEmployes}
    />
  </div>
);

};

export default PageEmployes;

import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { suppressionEmploye } from "../services/employeService";
import MajModal from "./MajModal";


const TableauEmployes = ({ donnees }) => {
  const token = localStorage.getItem("token");
  const decodeToken = jwtDecode(token);
  const roleId = decodeToken.roleId;
  
  const [showModal, setShowModal] = useState(false);
  const [selectedEmploye, setSelectedEmploye] = useState(null);


  const gestionSuppression = async (idEmploye) => {
    try {
      const confirmation = window.confirm("Confirmer la suppression ?");
      if (!confirmation) return;

      await suppressionEmploye(idEmploye);
      alert("Employé supprimé");

      location.reload();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Échec de la suppression");
    }
  };
  const gestionOuvertureModal = (employe) => {
    setSelectedEmploye(employe);
    setShowModal(true);
  };

  const gestionFermetureModal = () => {
    setShowModal(false);
    setSelectedEmploye(null);
  };

  return <>

    <Table
responsive striped bordered hover className="table-personnalisee"
>
  <thead>
    <tr style={{ backgroundColor: "#DF9328", color: "#fff" }}>
      <th>Rôle</th>
      <th>Nom</th>
      <th>Prénom</th>
      <th>Email</th>
      {/* tu as accès uniquement quand tu es admin  */}
      {roleId === 1 && <th>Gestion</th>}
    </tr>
  </thead>
  <tbody>
    {donnees.map((employe, index) => (
      <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#FCEED6" : "#FFF5E8" }}>
 <td>{employe.libelle}</td>
<td >{employe.nom}</td>
<td >{employe.prenom}</td>
<td >{employe.email}</td>

        {roleId === 1 && (
<td>
<div className="d-flex justify-content-center gap-2">
  <Button
    variant="outline-danger"
    size="sm"
    onClick={() => gestionSuppression(employe.idEmploye)}
    className="btn-poubelle d-flex align-items-center gap-1"
  >
    <i className="bi bi-trash"></i> Supprimer
  </Button>

  <Button
    variant="outline-secondary"
    size="sm"
    onClick={() => gestionOuvertureModal(employe)}
    className="btn-modifier d-flex align-items-center gap-1"
  >
    <i className="bi bi-pencil-square"></i> Modifier 
  </Button>
</div>

</td>

        )}
      </tr>
    ))}
  </tbody>
</Table>

      <MajModal
        show={showModal}
        onHide={gestionFermetureModal}
        employe={selectedEmploye}
        onUpdated={() => window.location.reload()}
      />
    </>

};

export default TableauEmployes;

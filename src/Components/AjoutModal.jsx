import { enregistrement, roles } from "../services/employeService";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
const AjoutModal = ({ show, onHide, onUpdated }) => {
  const [donnees, setDonnees] = useState({
    nom: "",
    prenom: "",
    email: "",
    motDePasse:"",
    roleId: "",
  });

  const [donneesRoles, setDonneesRoles] = useState([]);

  const gestionAjout = async (e) => {
    e.preventDefault();

    try {
      await enregistrement(donnees);
      onUpdated(); // recharger ou rafraîchir la liste
      onHide(); // fermer la modal
    } catch (error) {
      console.error("Erreur ajoutEmploye :", error);
      alert("Échec de l'ajout");
    }
  };

  const rechercheRoles = async (e) => {
    try {
      const reponse = await roles();

      setDonneesRoles(reponse.data);
    } catch (error) {
      console.error("Erreur recupération :", error);
      alert("Échec de la récupération");
    }
  };

  useEffect(() => {
    rechercheRoles();
  }, []);

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={gestionAjout}>
        <Modal.Header closeButton>
          <Modal.Title>Ajout d'un employé</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label>Nom :</Form.Label>
            <Form.Control
              type="text"
              value={donnees.nom}
              onChange={(e) => setDonnees({ ...donnees, nom: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Prénom :</Form.Label>
            <Form.Control
              type="text"
              value={donnees.prenom}
              onChange={(e) =>
                setDonnees({ ...donnees, prenom: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Email :</Form.Label>
            <Form.Control
              type="email"
              value={donnees.email}
              onChange={(e) =>
                setDonnees({ ...donnees, email: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="motDePasse">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Entrez votre mot de passe"
              value={donnees.motDePasse}
              onChange={(e) =>
                setDonnees({
                  ...donnees,
                  motDePasse: e.target.value,
                })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Rôle</Form.Label>
            <Form.Select
              value={donnees.roleId}
              onChange={(e) =>
                setDonnees({ ...donnees, roleId: e.target.value })
              }
              required
            >
              <option value="">Sélectionner un rôle...</option>
              {donneesRoles.map((role) => (
                <option key={role.idRole} value={role.idRole}>
                  {role.libelle}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Annuler
          </Button>
          <Button type="submit" variant="primary">
            Enregistrer
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AjoutModal;

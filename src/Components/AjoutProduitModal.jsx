import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { categories } from "../services/produitService";
import { ajoutProduit } from "../services/produitService";

const AjoutProduitModal = ({ show, onHide, onUpdated }) => {
  const [donnees, setDonnees] = useState({
    nom: "",
    unite: "",
    quantite: "",
    seuilMini: "",
    prixUnitaire: "",
    categorieId: "",
  });

  const [donneesCategories, setDonneesCategories] = useState([]);

const gestionAjout = async (e) => {
  e.preventDefault();

  const donneesNettoyees = {
    ...donnees,
    quantite: parseInt(donnees.quantite, 10),
    seuilMini: parseInt(donnees.seuilMini, 10),
    prixUnitaire: parseFloat(donnees.prixUnitaire),
    categorieId: parseInt(donnees.categorieId, 10)
  };

  try {
    await ajoutProduit(donneesNettoyees);
    onUpdated(); // Rafraîchit la liste des produits
    onHide(); // Ferme la modal
  } catch (error) {
    console.error("Erreur ajout Produit :", error);
    alert("Échec de l'ajout");
  }
};


  const rechercheCategories = async (e) => {
    try {
      const reponse = await categories();

      setDonneesCategories(reponse.data);
    } catch (error) {
      console.error("Erreur recupération :", error);
      alert("Échec de la récupération");
    }
  };


  useEffect(() => {
    rechercheCategories();
  }, []);

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={gestionAjout}>
        <Modal.Header closeButton>
          <Modal.Title>Ajout d'un produit</Modal.Title>
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
            <Form.Label>Unité :</Form.Label>
            <Form.Control
              type="text"
              value={donnees.unite}
              onChange={(e) =>
                setDonnees({ ...donnees, unite: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Quantité :</Form.Label>
            <Form.Control
              type="text"
              value={donnees.quantite}
              onChange={(e) =>
                setDonnees({ ...donnees, quantite: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="motDePasse">
            <Form.Label>seuil Minimum :</Form.Label>
            <Form.Control
              type="text"
              value={donnees.seuilMini}
              onChange={(e) =>
                setDonnees({
                  ...donnees,
                  seuilMini: e.target.value,
                })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="motDePasse">
            <Form.Label>Prix unitaire :</Form.Label>
            <Form.Control
              type="text"
              value={donnees.prixUnitaire}
              onChange={(e) =>
                setDonnees({
                  ...donnees,
                  prixUnitaire: e.target.value,
                })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Catégories</Form.Label>
            <Form.Select
              value={donnees.categorieId}
              onChange={(e) =>
                setDonnees({ ...donnees, categorieId: e.target.value })
              }
              required
            >
              <option value="">Sélectionner une catégorie...</option>
              {donneesCategories.map((categorie) => (
                <option
                  key={categorie.idCategorie}
                  value={categorie.idCategorie}
                >
                  {categorie.libelle}
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

export default AjoutProduitModal;

import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { majProduit } from "../services/produitService";
import { categories } from "../services/produitService";

const MajProduitModal = ({ show, onHide, onUpdated, produit }) => {
  const [form, setForm] = useState({
    nom: "",
    unite: "",
    quantite: "",
    seuilMini: "",
    prixUnitaire: "",
    categorieId: ""
  });

  const [listeCategories, setListeCategories] = useState([]);

  // Pré-remplissage du formulaire à l’ouverture
  useEffect(() => {
    if (produit) {
      setForm({
        nom: produit.nom,
        unite: produit.unite || "",
        quantite: produit.quantite?.toString() || "",
        seuilMini: produit.seuilMini?.toString() || "",
        prixUnitaire: produit.prixUnitaire?.toString() || "",
        categorieId: produit.categorieId?.toString() || ""
      });
    }
  }, [produit]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const reponse = await categories();
        setListeCategories(reponse.data);
      } catch (error) {
        console.error("Erreur chargement catégories :", error);
      }
    };
    fetchCategories();
  }, []);

  const gestionMaj = async (e) => {
    e.preventDefault();

    const formNettoye = {
      ...form,
      quantite: parseInt(form.quantite, 10),
      seuilMini: parseInt(form.seuilMini, 10),
      prixUnitaire: parseFloat(form.prixUnitaire),
      categorieId: parseInt(form.categorieId, 10)
    };

    console.log("Produit envoyé au back :", formNettoye);

    try {
      await majProduit(produit.idProduit, formNettoye);
      onUpdated();
      onHide();
    } catch (error) {
      console.error("Erreur majProduit :", error);
      alert("Échec de la mise à jour du produit");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={gestionMaj}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier le produit</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label>Nom :</Form.Label>
            <Form.Control
              type="text"
              value={form.nom}
              onChange={(e) => setForm({ ...form, nom: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Unité :</Form.Label>
            <Form.Control
              type="text"
              value={form.unite}
              onChange={(e) => setForm({ ...form, unite: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Quantité :</Form.Label>
            <Form.Control
              type="number"
              value={form.quantite}
              onChange={(e) => setForm({ ...form, quantite: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Seuil Minimum :</Form.Label>
            <Form.Control
              type="number"
              value={form.seuilMini}
              onChange={(e) => setForm({ ...form, seuilMini: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Prix Unitaire :</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={form.prixUnitaire}
              onChange={(e) => setForm({ ...form, prixUnitaire: e.target.value })}
              required
            />
          </Form.Group>


        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Annuler
          </Button>
          <Button type="submit" variant="primary">
            Mettre à jour
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default MajProduitModal;
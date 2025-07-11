import React, { useState, useEffect } from "react";
import { Modal, Button, Form} from "react-bootstrap";
import { majEmploye } from "../services/employeService";

const MajModal = ({ show, onHide, employe, onUpdated }) => {
  const [form, setForm] = useState({ nom: "", prenom: "", email: "" });

  // Quand on reçoit un employé, on pré-remplit le formulaire
  useEffect(() => {
    if (employe) {
      setForm({
        nom: employe.nom,
        prenom: employe.prenom,
        email: employe.email,
      });
    }
  }, [employe]);

  const gestionMaj = async (e) => {
      e.preventDefault();
      console.log("Données envoyées au back:", form, "— id:", employe?.idEmploye);
    try {
      await majEmploye(employe.idEmploye, form);
      onUpdated();    // recharger ou rafraîchir la liste
      onHide();       // fermer la modal
    } catch (error) {
      console.error("Erreur majEmploye :", error);
      alert("Échec de la mise à jour");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={gestionMaj}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier les informations</Modal.Title>
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
            <Form.Label>Prénom :</Form.Label>
            <Form.Control
              type="text"
              value={form.prenom}
              onChange={(e) =>
                setForm({ ...form, prenom: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Email :</Form.Label>
            <Form.Control
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />
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

export default MajModal;


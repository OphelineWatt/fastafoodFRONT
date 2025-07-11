import React, { useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { connexion } from "../services/employeService";

const PageAccueil = () => {
  const [donneesEmploye, setDonneesEmploye] = useState({
    email: "",
    motDePasse: "",
  });

  const gestionEnvoi = async (e) => {
    e.preventDefault();
    try {
      const reponse = await connexion(donneesEmploye);
      localStorage.setItem("token", reponse.data.token);
      alert("Connexion OK");

      location.reload()
    } catch (error) {
      console.error("erreur connexion:", error);
      alert("Connexion Refusée.");
    }
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
    >
      <Row className="justify-content-center w-100">
        <Col xs={12} sm={10} md={8} lg={6} xl={4}>
          <Card className="shadow-lg mt-5">
            <Card.Body>
              <h2 className="text-center mb-4" style={{ color: "#8D2915" }}>
                Connexion
              </h2>
              <Form onSubmit={gestionEnvoi}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Entrez votre email"
                    value={donneesEmploye.email}
                    onChange={(e) =>
                      setDonneesEmploye({
                        ...donneesEmploye,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="motDePasse">
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Entrez votre mot de passe"
                    value={donneesEmploye.motDePasse}
                    onChange={(e) =>
                      setDonneesEmploye({
                        ...donneesEmploye,
                        motDePasse: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button type="submit" className="btn btn-orange">
                    Connexion
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PageAccueil;

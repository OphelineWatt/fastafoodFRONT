import { Navbar, Container, Nav} from "react-bootstrap";

const NavBar = () => {
    return (<Navbar className="navbar-orange" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <img
              alt="logo fastaFood"
              src="/images/logo_fastaFood.png"
              width="100"
              height="100"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
                    <Nav className="me-auto">
            <Nav.Link href="/employes">Les employés</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}
 
export default NavBar;
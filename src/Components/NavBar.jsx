import { jwtDecode } from "jwt-decode";
import { Navbar, Container, Nav} from "react-bootstrap";

const NavBar = () => {
    const token = localStorage.getItem("token");
    const decodeToken = jwtDecode(token);
    const roleId = decodeToken.roleId;
    
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
                  {(roleId === 1 || roleId === 2) && (
        <Nav.Link href="/employes">Employés</Nav.Link>
      )}
      <Nav.Link href="/stocks">Stocks</Nav.Link>
      <Nav.Link href="/produits">Produits</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}
 
export default NavBar;
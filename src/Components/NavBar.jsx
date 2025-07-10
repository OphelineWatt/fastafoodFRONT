import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
    return (<Navbar className="navbar-orange" variant="dark"
>
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="public/images/logo_fastaFood.png"
              width="100"
              height="100"
              className="d-inline-block align-top"
            />{' '}
            Fasta Food
          </Navbar.Brand>
        </Container>
      </Navbar>
  );
}
 
export default NavBar;
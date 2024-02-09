import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AREA_COMUN_CREATE_URL, AREA_COMUN_LIST_URL } from "../navigation/Constant";


const Menu = () => {
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" >
      <Container>

        <Navbar.Brand>COMMUNITY</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
  
              <NavDropdown title="Área Común" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => { navigate(AREA_COMUN_CREATE_URL) }} >Crear Área Común</NavDropdown.Item>
                <NavDropdown.Item onClick={() => { navigate(AREA_COMUN_LIST_URL) }} >Lista de Áreas Comunes</NavDropdown.Item>
              </NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Container>

    </Navbar>

  );
}

export default Menu;
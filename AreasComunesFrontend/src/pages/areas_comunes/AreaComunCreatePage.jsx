import axios from "axios";
import {
  Alert,
  Card,
  Container,
  Form,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import Menu from "../../components/Menu";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AREA_COMUN_LIST_URL } from "../../navigation/Constant";
import "../../styles/AreaComunCreatePage.css";

const AreaComunCreatePage = () => {
  const navigate = useNavigate();

  const [showAlertError, setShowAlertError] = useState(false);

  const [condominioId, setCondominioId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [capacidadMaxima, setCapacidadMaxima] = useState("");
  const [turnoId, setTurnoId] = useState("");
  const [listaTurnos, setListaTurnos] = useState([]);
  const [listaCondominios, setListaCondominios] = useState([]);
  const [estado, setEstado] = useState("");

  useEffect(() => {
    obtenerListaTurnos();
    obtenerListaCondominios();
  }, []);

  const obtenerListaTurnos = () => {
    const url = "https://localhost:7150/api/turno/";
    axios
      .get(url)
      .then((response) => {
        setListaTurnos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de turnos", error);
      });
  };

  const obtenerListaCondominios = () => {
    const url = "https://localhost:7150/api/condominio/";
    axios
      .get(url)
      .then((response) => {
        console.log("response", response.data);
        setListaCondominios(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de condominios", error);
      });
  };

  const crearAreaComun = () => {
    const url = "https://localhost:7150/api/areaComun/";
    const params = {
      condominioId: condominioId,
      nombre: nombre,
      descripcion: descripcion,
      capacidadMaxima: parseInt(capacidadMaxima),
      turnoId: turnoId,
      estado: estado,
    };
    axios
      .post(url, params)
      .then((response) => {
        navigate(AREA_COMUN_LIST_URL);
      })
      .catch((error) => {
        setShowAlertError(true);
      });
  };

  return (
    <>
      <Menu />
      <Container>
        <Card
          border="dark"
          className="mt-5"
          style={{ maxWidth: "700px", margin: "0 auto" }}
        >
          <Card.Body>
            <Card.Title>Formulario Crear Áreas Comunes</Card.Title>
            <div>
              {showAlertError && (
                <Alert variant="danger">
                  Error al enviar enviar datos, por favor ingrese datos válidos
                </Alert>
              )}

              <Form>
                <FormGroup className="mt-3">
                  <Form.Label>Condominio</Form.Label>
                  <Form.Control
                    as="select"
                    value={condominioId}
                    onChange={(e) => setCondominioId(e.target.value)}
                  >
                    <option value="">Seleccione un Condominio</option>
                    {listaCondominios.map((condominioId) => (
                      <option key={condominioId.id} value={condominioId.id}>
                        {condominioId.nombre}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Necesitas seleccionar un condominio
                  </Form.Control.Feedback>
                </FormGroup>

                <FormGroup className="mt-3">
                  <Form.Label>Nombre Área Común</Form.Label>
                  <FormControl
                    value={nombre}
                    required
                    onChange={(e) => setNombre(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Necesitas un nombre
                  </Form.Control.Feedback>
                </FormGroup>

                <FormGroup className="mt-3">
                  <Form.Label>Descripción</Form.Label>
                  <FormControl
                    value={descripcion}
                    required
                    onChange={(e) => setDescripcion(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Necesitas una descripcion
                  </Form.Control.Feedback>
                </FormGroup>

                <FormGroup className="mt-3">
                  <Form.Label>Capacidad Máxima</Form.Label>
                  <FormControl
                    value={capacidadMaxima}
                    required
                    onChange={(e) => setCapacidadMaxima(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Necesitas una capacidad máxima de personas
                  </Form.Control.Feedback>
                </FormGroup>

                <FormGroup className="mt-3">
                  <Form.Label>Turno</Form.Label>
                  <Form.Control
                    as="select"
                    value={turnoId}
                    onChange={(e) => setTurnoId(e.target.value)}
                  >
                    <option value="">Seleccione un Turno</option>
                    {listaTurnos.map((turnoId) => (
                      <option key={turnoId.id} value={turnoId.id}>
                        Turno - {turnoId.inicio} - {turnoId.fin}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Necesitas seleccionar un turno
                  </Form.Control.Feedback>
                </FormGroup>

                <FormGroup className="mt-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Control
                    as="select"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                  >
                    <option value="">Selecciona el Estado</option>
                    <option value="Disponible">Disponible</option>
                    <option value="Limpieza">Limpieza</option>
                    <option value="Refaccion">Refaccion</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Necesitas seleccionar un estado
                  </Form.Control.Feedback>
                </FormGroup>

                <div className="d-flex justify-content-center mt-3">
                  <Link
                    className="link-button"
                    onClick={() => crearAreaComun()}
                  >
                    CREAR ÁREA COMÚN
                  </Link>
                </div>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default AreaComunCreatePage;

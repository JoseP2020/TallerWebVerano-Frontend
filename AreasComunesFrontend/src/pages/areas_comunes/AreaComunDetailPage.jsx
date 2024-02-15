import axios from "axios";
import {
  Card,
  Container,
  Form,
  FormControl,
  FormGroup,
  Button,
} from "react-bootstrap";
import Menu from "../../components/Menu";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AREA_COMUN_LIST_URL } from "../../navigation/Constant";
import "../../styles/AreaComunDetailPage.css";

const AreaComunDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [listaTurnos, setListaTurnos] = useState([]);
  const [listaCondominios, setListaCondominios] = useState([]);

  const areaComunId = location.state ? location.state.areaComunId : null;
  const [areaComun, setAreaComun] = useState({
    areaComunId: "",
    condominioId: "",
    nombre: "",
    descripcion: "",
    capacidadMaxima: 0,
    turnoId: "", 
    estado: "",
  });

  useEffect(() => {
    if (areaComunId) {
      console.log("areaComunId:", areaComunId);
      setAreaComun({
        areaComunId: areaComunId.id,
        condominioId: areaComunId.condominioId,
        nombre: areaComunId.nombre,
        descripcion: areaComunId.descripcion,
        capacidadMaxima: areaComunId.capacidadMaxima,
        turnoId: "", 
        estado: areaComunId.estado,
      });
    }
    obtenerListaTurnos();
    obtenerListaCondominios();
  }, [areaComunId]);

  const obtenerListaTurnos = () => {
    const url = "https://localhost:7150/api/turno/";
    axios
      .get(url)
      .then((response) => {
        console.log("response", response.data);
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


  const guardarEdicion = () => {
    const url = "https://localhost:7150/api/areaComun/";
    const data = {
      areaComunId: areaComun.areaComunId,
      condominioId: areaComun.condominioId,
      turnoId: areaComun.turnoId,
      nombre: areaComun.nombre,
      descripcion: areaComun.descripcion,
      capacidadMaxima: parseInt(areaComun.capacidadMaxima),
      estado: areaComun.estado,
    };

    axios
      .put(url, data)
      .then((response) => {
        console.log("response", response.data);
        navigate(AREA_COMUN_LIST_URL);
      })
      .catch((error) => {
        console.error("Error al guardar la edición del área común", error);
      });
  };

  const cancelarEdicion = () => {
    navigate(AREA_COMUN_LIST_URL);
  };

  return (
    <>
      <Menu />
      <Container>
        <Card
          border="dark"
          className="mt-3"
          style={{ maxWidth: "700px", margin: "0 auto" }}
        >
          <Card.Body>
            <Card.Title>Editar Área Común</Card.Title>
            <Form>
            <FormGroup className="mt-3">
                <Form.Label>Condominio</Form.Label>
                <Form.Control
                  as="select"
                  value={areaComun.condominio}
                  onChange={(e) =>
                    setAreaComun(
                      { ...areaComun, condominioId: e.target.value },
                      console.log(e.target.value)
                    )
                  }
                >
                  <option value="">Seleccione un Condominio</option>
                  {listaCondominios.map((condominio) => (
                    <option key={condominio.id} value={condominio.id}>
                      {condominio.nombre}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Necesitas seleccionar un Condominio
                </Form.Control.Feedback>
              </FormGroup>

              <FormGroup className="mt-3">
                <Form.Label>Nombre Área Común</Form.Label>
                <FormControl
                  value={areaComun.nombre}
                  required
                  onChange={(e) =>
                    setAreaComun({ ...areaComun, nombre: e.target.value })
                  }
                />
              </FormGroup>

              <FormGroup className="mt-3">
                <Form.Label>Descripción</Form.Label>
                <FormControl
                  value={areaComun.descripcion}
                  required
                  onChange={(e) =>
                    setAreaComun({ ...areaComun, descripcion: e.target.value })
                  }
                />
              </FormGroup>

              <FormGroup className="mt-3">
                <Form.Label>Capacidad Máxima</Form.Label>
                <FormControl
                  value={areaComun.capacidadMaxima}
                  required
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setAreaComun({
                      ...areaComun,
                      capacidadMaxima: newValue !== undefined ? newValue : 0,
                    });
                  }}
                />
              </FormGroup>
              <FormGroup className="mt-3">
                <Form.Label>Turno</Form.Label>
                <Form.Control
                  as="select"
                  value={areaComun.turno}
                  onChange={(e) =>
                    setAreaComun(
                      { ...areaComun, turnoId: e.target.value },
                      console.log(e.target.value)
                    )
                  }
                >
                  <option value="">Seleccione un Turno</option>
                  {listaTurnos.map((turno) => (
                    <option key={turno.id} value={turno.id}>
                      Turno - {turno.inicio} - {turno.fin}
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
                    value={areaComun.estado}
                  onChange={(e) =>
                    setAreaComun(
                      { ...areaComun, estado: e.target.value },
                    )
                  }
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

            </Form>

            <div className="botones-container">
              <Button className="mt-3" onClick={guardarEdicion}>
                GUARDAR
              </Button>
              <Button
                className="mt-3"
                variant="secondary"
                onClick={cancelarEdicion}
              >
                CANCELAR
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default AreaComunDetailPage;

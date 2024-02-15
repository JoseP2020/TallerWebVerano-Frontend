import axios from "axios";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/AreaComunListPage.css";
import { AREA_COMUN_DETAIL_URL } from "../../navigation/Constant";

const AreaComunListPage = () => {
  const navigate = useNavigate();
  const [listaAreasComunes, setListaAreasComunes] = useState([]);

  useEffect(() => {
    getListaAreasComunes();
  }, []);

  const getListaAreasComunes = () => {
    const url = "https://localhost:7150/api/areaComun";
    axios
      .get(url)
      .then((response) => {
        console.log("response", response.data);
        setListaAreasComunes(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const eliminarAreaComun = (id) => {
    if (!window.confirm("¿Estás seguro que deseas eliminar esta Área Común?")) {
      return;
    }
    const url = "https://localhost:7150/api/areaComun/";
    const data = { areaComunId: id };
    axios
      .delete(url, { data })
      .then((response) => {
        console.log("response", response.data);
        console.log("Área Común eliminada con éxito");
        getListaAreasComunes();
      })
      .catch((error) => {
        console.error("Error al eliminar el Área Común", error);
      });
  };

  const filterByEstado = (estado) => {
    return listaAreasComunes.filter(
      (area_comun) => area_comun.estado === estado
    );
  };

  return (
    <div className="container-wrapper">
      <Menu />
      <Container>
        <div className="mt-3 text-center ">
          <div>
            <h3 className="lista-title">LISTADO DE ÁREAS COMUNES</h3>
          </div>
        </div>

        {/* Lista de Áreas Disponibles */}
        <Container>
          <h3 className="lista-title" style={{ color: "red" }}>
            ÁREAS DISPONIBLES
          </h3>
          <div className="col-8 offset-2 mt-5">
            {filterByEstado("Disponible").map((area_comun) => (
              <Card className="custom-card" key={area_comun.id}>
                <Row>
                  <Col className="my-auto col-12 card-content">
                    <Card.Title>
                      <strong>
                        {area_comun.condominio.nombre.toUpperCase()}
                      </strong>
                    </Card.Title>
                    <Card.Text>{area_comun.nombre.toUpperCase()}</Card.Text>
                    <Card.Text>
                      {area_comun.descripcion.toUpperCase()}
                    </Card.Text>
                    <Card.Text>
                      CAPACIDAD MAXIMA: {area_comun.capacidadMaxima}
                    </Card.Text>
                    <Card.Text>
                      TURNO INICIO: {area_comun.turno.inicio}
                    </Card.Text>
                    <Card.Text>TURNO FIN: {area_comun.turno.fin}</Card.Text>
                    <Card.Text>
                      ESTADO: {area_comun.estado.toUpperCase()}
                    </Card.Text>
                  </Col>
                </Row>
                <div className="botones-container">
                  <Button
                    className="editar-button btn btn-success mt-3 text-center d-flex"
                    key={area_comun.id}
                    onClick={() => {
                      navigate(AREA_COMUN_DETAIL_URL, {
                        state: { areaComunId: area_comun },
                      });
                    }}
                  >
                    EDITAR
                  </Button>
                  <Button
                    className="eliminar-button btn btn-danger mt-3 text-center d-flex"
                    key={area_comun.id}
                    onClick={() => {
                      eliminarAreaComun(area_comun.id);
                    }}
                  >
                    ELIMINAR
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>

        {/* Lista de Áreas en Limpieza */}
        <Container>
          <h3 className="lista-title" style={{ color: "red" }}>
            ÁREAS DE LIMPIEZA
          </h3>
          <div className="col-8 offset-2 mt-5">
            {filterByEstado("Limpieza").map((area_comun) => (
              <Card className="custom-card" key={area_comun.id}>
                <Row>
                  <Col className="my-auto col-12 card-content">
                    <Card.Title>
                      <strong>
                        {area_comun.condominio.nombre.toUpperCase()}
                      </strong>
                    </Card.Title>
                    <Card.Text>{area_comun.nombre.toUpperCase()}</Card.Text>
                    <Card.Text>
                      {area_comun.descripcion.toUpperCase()}
                    </Card.Text>
                    <Card.Text>
                      CAPACIDAD MAXIMA: {area_comun.capacidadMaxima}
                    </Card.Text>
                    <Card.Text>
                      TURNO INICIO: {area_comun.turno.inicio}
                    </Card.Text>
                    <Card.Text>TURNO FIN: {area_comun.turno.fin}</Card.Text>
                    <Card.Text>
                      ESTADO: {area_comun.estado.toUpperCase()}
                    </Card.Text>
                  </Col>
                </Row>
                <div className="botones-container">
                  <Button
                    className="editar-button btn btn-success mt-3 text-center d-flex"
                    key={area_comun.id}
                    onClick={() => {
                      navigate(AREA_COMUN_DETAIL_URL, {
                        state: { areaComunId: area_comun },
                      });
                    }}
                  >
                    EDITAR
                  </Button>
                  <Button
                    className="eliminar-button btn btn-danger mt-3 text-center d-flex"
                    key={area_comun.id}
                    onClick={() => {
                      eliminarAreaComun(area_comun.id);
                    }}
                  >
                    ELIMINAR
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>

        {/* Lista de Áreas en Refacción */}
        <Container>
          <h3 className="lista-title" style={{ color: "red" }}>
            ÁREAS EN REFACCIÓN
          </h3>
          <div className="col-8 offset-2 mt-5">
            {filterByEstado("Refaccion").map((area_comun) => (
              <Card className="custom-card" key={area_comun.id}>
                <Row>
                  <Col className="my-auto col-12 card-content">
                    <Card.Title>
                      <strong>
                        {area_comun.condominio.nombre.toUpperCase()}
                      </strong>
                    </Card.Title>
                    <Card.Text>{area_comun.nombre.toUpperCase()}</Card.Text>
                    <Card.Text>
                      {area_comun.descripcion.toUpperCase()}
                    </Card.Text>
                    <Card.Text>
                      CAPACIDAD MAXIMA: {area_comun.capacidadMaxima}
                    </Card.Text>
                    <Card.Text>
                      TURNO INICIO: {area_comun.turno.inicio}
                    </Card.Text>
                    <Card.Text>TURNO FIN: {area_comun.turno.fin}</Card.Text>
                    <Card.Text>
                      ESTADO: {area_comun.estado.toUpperCase()}
                    </Card.Text>
                  </Col>
                </Row>
                <div className="botones-container">
                  <Button
                    className="editar-button btn btn-success mt-3 text-center d-flex"
                    key={area_comun.id}
                    onClick={() => {
                      navigate(AREA_COMUN_DETAIL_URL, {
                        state: { areaComunId: area_comun },
                      });
                    }}
                  >
                    EDITAR
                  </Button>
                  <Button
                    className="eliminar-button btn btn-danger mt-3 text-center d-flex"
                    key={area_comun.id}
                    onClick={() => {
                      eliminarAreaComun(area_comun.id);
                    }}
                  >
                    ELIMINAR
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Container>
    </div>
  );
};
export default AreaComunListPage;

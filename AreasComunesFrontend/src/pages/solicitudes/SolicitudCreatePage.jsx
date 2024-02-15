import axios from "axios";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/SolicitudListPage.css";
import { SOLICITUD_DETAIL_URL } from "../../navigation/Constant";

const SolicitudListPage = () => {
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

    return (
        <div className="container-wrapper">
        <Menu />
        <Container>
            <div className="mt-3 text-center col-6">
            <div>
                <h3 className="lista-title">Lista de Áreas Comunes</h3>
            </div>
            </div>
            <div className="col-8 offset-2 mt-5">
            {listaAreasComunes.map((area_comun) => (
                <Card className="custom-card" key={area_comun.id}>
                <Row>
                    <Col className="my-auto col-12 card-content">
                    <Card.Title>
                        <strong>
                        {area_comun.condominio.nombre.toUpperCase()}
                        </strong>
                    </Card.Title>
                    <Card.Text>{area_comun.nombre.toUpperCase()}</Card.Text>
                    <Card.Text>{area_comun.descripcion.toUpperCase()}</Card.Text>
                    <Card.Text>
                        CAPACIDAD MAXIMA: {area_comun.capacidadMaxima}
                    </Card.Text>
                    <Card.Text>TURNO INICIO: {area_comun.turno.inicio}</Card.Text>
                    <Card.Text>TURNO FIN: {area_comun.turno.fin}</Card.Text>
                    </Col>
                </Row>
                <div className="botones-container">
                    <Button
                    className="editar-button btn btn-success mt-3 text-center d-flex"
                    key={area_comun.id}
                    onClick={() => {
                        navigate(SOLICITUD_DETAIL_URL, {
                        state: { areaComunId: area_comun },
                        });
                    }}
                    >
                    HACER RESERVA
                    </Button>
                </div>
                </Card>
            ))}
            </div>
        </Container>
        </div>
    );
};
export default SolicitudListPage;

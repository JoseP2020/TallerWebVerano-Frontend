import axios from "axios";
import { Card, Container, Form, FormControl, FormGroup, Button } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { AREA_COMUN_LIST_URL } from "../../navigation/Constant";
import "../../styles/AreaComunDetailPage.css";

const AreaComunDetailPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [turnoId, setTurnoId] = useState("");
    const [listaTurnos, setListaTurnos] = useState([]);

    const areaComunId = location.state ? location.state.areaComunId : null;
    const [areaComun, setAreaComun] = useState({
        nombre: "",
        descripcion: "",
        capacidadMaxima: "",
        turnoId: "",
    });

    useEffect(() => {
        if (areaComunId) {
            obtenerAreaComun(areaComunId);
        }
        obtenerListaTurnos();
    }, [areaComunId]);

    const obtenerAreaComun = (id) => {
        const url = `https://localhost:7150/api/areaComun/${id}`;
        axios
            .get(url)
            .then((response) => {
                console.log("response", response.data);
                setAreaComun(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener el área común", error);
            });
    }

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
    }

    const guardarEdicion = () => {
        const url = `https://localhost:7150/api/areaComun/${areaComunId}`;
        const data = {
            nombre: areaComun.nombre,
            descripcion: areaComun.descripcion,
            capacidadMaxima: areaComun.capacidadMaxima,
            turnoId: areaComun.turnoId
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
    }

    const cancelarEdicion = () => {
        navigate(AREA_COMUN_LIST_URL);
    };

    return (
        <>
            <Menu />
            <Container>
                <Card border="dark" className="mt-3" style={{ maxWidth: "700px", margin: "0 auto"}}>
                    <Card.Body>
                        <Card.Title>
                            Editar Área Común
                        </Card.Title>
                        <Form>
                            <FormGroup className="mt-3">
                                <Form.Label>Nombre Área Común</Form.Label>
                                <FormControl
                                    value={areaComun.nombre}
                                    required
                                    onChange={(e) => setAreaComun({ ...areaComun, nombre: e.target.value })}
                                />
                            </FormGroup>

                            <FormGroup className="mt-3">
                                <Form.Label>Descripción</Form.Label>
                                <FormControl
                                    value={areaComun.descripcion}
                                    required
                                    onChange={(e) => setAreaComun({ ...areaComun, descripcion: e.target.value })}
                                />
                            </FormGroup>

                            <FormGroup className="mt-3">
                                <Form.Label>Capacidad Máxima</Form.Label>
                                <FormControl
                                    value={areaComun.capacidadMaxima}
                                    required
                                    onChange={(e) => setAreaComun({ ...areaComun, capacidadMaxima: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className="mt-3">
                                <Form.Label>Turno</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={areaComun.turnoId}
                                    onChange={(e) => setAreaComun({ ...areaComun, turnoId: e.target.value })}
                                >
                                    <option value="">Seleccione un Turno</option>
                                    {listaTurnos.map((turno) => (
                                        <option key={turno.id} value={turno.id}>
                                            Turno - {turno.inicio} - {turno.fin}
                                        </option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">Necesitas seleccionar un turno</Form.Control.Feedback>
                            </FormGroup>
                        </Form>
                        
                        <div className="botones-container">
                            <Button
                                className="mt-3"
                                onClick={guardarEdicion}
                            >
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

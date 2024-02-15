import {createBrowserRouter} from "react-router-dom";
import {AREA_COMUN_CREATE_URL, AREA_COMUN_LIST_URL, AREA_COMUN_DETAIL_URL} from "./Constant";
// import {SOLICITUD_CREATE_URL, SOLICITUD_LIST_URL, SOLICITUD_DETAIL_URL} from "./Constant";
import AreaComunListPage from "../pages/areas_comunes/AreaComunListPage";
import AreaComunCreatePage from "../pages/areas_comunes/AreaComunCreatePage";
import AreaComunDetailPage from "../pages/areas_comunes/AreaComunDetailPage";
// import SolicitudListPage from "../pages/solicitudes/SolicitudListPage";
// import SolicitudCreatePage from "../pages/solicitudes/SolicitudCreatePage";
// import SolicitudDetailPage from "../pages/solicitudes/SolicitudDetailPage";


export const router = createBrowserRouter([
    {
        path: "",
        element: <AreaComunListPage />
    },
    // {
    //     path: LOGIN_URL,
    //     element: <LoginPage />
    // },
    // {
    //     path: REGISTER_URL,
    //     element: <RegistrarUsuarioPage />
    // },
    {
        path: AREA_COMUN_LIST_URL,
        element: <AreaComunListPage />
    },
    {
        path: AREA_COMUN_CREATE_URL,
        element: <AreaComunCreatePage />
    },
    {
        path: AREA_COMUN_DETAIL_URL,
        element: <AreaComunDetailPage />
    },
    // {
    //     path: SOLICITUD_LIST_URL,
    //     element: <SolicitudListPage />
        
    // },
    // {
    //     path: SOLICITUD_CREATE_URL,
    //     element: <SolicitudCreatePage />
    // },
    // {
    //     path: SOLICITUD_DETAIL_URL,
    //     element: <SolicitudDetailPage />
    // },
    
]);
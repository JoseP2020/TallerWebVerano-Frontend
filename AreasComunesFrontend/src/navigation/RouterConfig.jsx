import {createBrowserRouter} from "react-router-dom";
import {AREA_COMUN_CREATE_URL, AREA_COMUN_LIST_URL, AREA_COMUN_DETAIL_URL} from "./Constant";
import AreaComunListPage from "../pages/areas_comunes/AreaComunListPage";
import AreaComunCreatePage from "../pages/areas_comunes/AreaComunCreatePage";
import AreaComunDetailPage from "../pages/areas_comunes/AreaComunDetailPage";



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
]);
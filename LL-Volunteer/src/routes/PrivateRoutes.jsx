import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoutes() {
    let auth = {'token': false};
    return(
        auth.token ? <Outlet {...rest}/> : <Navigate to={"/Login"} replace/>
    )
}

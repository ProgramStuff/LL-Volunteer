import React from "react";
import { Navigate, useOutletContext, Outlet } from "react-router-dom";

export default function PrivateRoutes({role}) {
	const context = useOutletContext();
	if (!context.user || !context.user?.role.includes(role)) {
		return <Navigate to="/" replace />;
	}

	return <Outlet context={context}/>;
};

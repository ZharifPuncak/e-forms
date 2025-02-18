"use client";

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "@/paths";
import useAuth from "@/hooks/use-auth";


export function AuthorizeGuard({ children, permission }) {

	const { can } = useAuth();
	const navigate = useNavigate();

	React.useEffect(() => {

		if((!can(permission) && permission !== 'all')){
			navigate(paths.notAuthorized);
		}

	}, [permission]);

	if (!permission) {
		return null;
	}
	
	return <React.Fragment>{children}</React.Fragment>;
	
}

"use client";

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "@/paths";
import useAuth from "@/hooks/use-auth";


export function AuthGuard({ children }) {
	
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	React.useEffect(() => {

		if(!isAuthenticated ){
			navigate(paths.auth.signIn);
		}else if(isAuthenticated && window.history.length <= 1){
			navigate(paths.dashboard.overview);
		}

	}, [isAuthenticated]);

	if (!isAuthenticated) {
		return null;
	}

	return <React.Fragment>{children}</React.Fragment>;
}

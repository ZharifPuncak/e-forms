"use client";

import * as React from "react";
import { useNavigate } from "react-router-dom";

import { paths } from "@/paths";
import { logger } from "@/lib/default-logger";
import useAuth from "../../hooks/use-auth";

export function AuthGuard({ children }) {
	
	const { isAuthenticated, isLoading } = useAuth();
	const navigate = useNavigate();

	React.useEffect(() => {

	
		if(!isAuthenticated){

			logger.debug("[AuthGuard] User is not authenticated, redirecting to sign in");
			navigate(paths.auth.signIn);

		}else{


			if (window.history.length <= 1) {
				logger.debug("[AuthGuard] No previous route, redirecting to home page");
				navigate(paths.home); 
			  }
		}


	}, [isAuthenticated, isLoading, navigate]);

	if (isLoading || !isAuthenticated) {
		return null;
	}

	return <React.Fragment>{children}</React.Fragment>;
}

"use client";

import * as React from "react";
import { useNavigate } from "react-router-dom";

import { paths } from "@/paths";

import useAuth from "@/hooks/use-auth";
import useLocation from "@/hooks/use-location";

export function AuthGuard({ children }) {
	
	const { isAuthenticated, isLoading } = useAuth();
	const { state } = useLocation();
	const navigate = useNavigate();

	React.useEffect(() => {

	
		if(!isAuthenticated){

		
			navigate(paths.auth.signIn);

		}else{

	
			if (window.history.length <= 1) {
			
				navigate(paths.home); 
			 }else{
				navigate(state.from); 
			 }
		}


	}, [isAuthenticated, isLoading, navigate]);

	if (isLoading || !isAuthenticated) {
		return null;
	}

	return <React.Fragment>{children}</React.Fragment>;
}

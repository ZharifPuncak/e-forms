"use client";

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "@/paths";

import useAuth from "@/hooks/use-auth";
import useAxios  from "@/hooks/use-axios";

export function AuthorizeGuard({ children, permission }) {

	const { axiosGet } = useAxios();
	const {  data : userData, refetch , isLoading, isSuccess  }  = axiosGet({  id : 'user-data' , url : import.meta.env.VITE_API_BASE_URL + '/user' , enabled : false });
	const { can, logout } = useAuth();
	const navigate = useNavigate();

	const getUser = async () => {
		await refetch();
	}

	React.useEffect(() => {

		if((!can(permission) && permission !== 'all')){
			
			getUser();	
			if(!userData && isSuccess){
				return logout();
			}
			
			//Check if auth. Redirect if not authenticated
			navigate(paths.notAuthorized);
		}

	}, [permission, userData]);

	if (!permission) {
		return null;
	}
	
	return <React.Fragment>{children}</React.Fragment>;
	
}

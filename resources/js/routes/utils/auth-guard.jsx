"use client";

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "@/paths";
import useAuth from "@/hooks/use-auth";
import { useAppContext } from "@/contexts/app-context";
import { UpdateEmail } from "@/page-sections/dashboard/settings/profile/forms/update-email";
import _ from 'lodash';


export function AuthGuard({ children }) {
	
	const { isAuthenticated, user } = useAuth();
	const navigate = useNavigate();
	const appContext = useAppContext(); 


	//Check for authentication
	React.useEffect(() => {
		if(!isAuthenticated ) navigate(paths.auth.signIn);
	
	}, [isAuthenticated]);

	// Check for email
	const  isValidEmail = (email) => {
		return _.isString(email) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	  }
	

	// Check for user email
	React.useEffect(() => {
	
		if(!isValidEmail(user?.email) && isAuthenticated){
			 appContext.setParentDialog({ title : 'Alert', subtitle : 'Please update your email below to continue', isOpen : true, component : <UpdateEmail /> });
		}else{
			 appContext.setParentDialog({ title : null, subtitle : null, isOpen : false, component : false });
		}
		
	},[user?.email])


	if (!isAuthenticated) {
		return null;
	}

	return <React.Fragment>{children}</React.Fragment>;
}

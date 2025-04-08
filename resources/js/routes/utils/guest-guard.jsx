import { useEffect } from 'react';
import { Outlet  } from 'react-router-dom';
import { useAppContext } from "@/contexts/app-context";

import useAuth from '@/hooks/use-auth';


export default function GuestGuard({ children }) {

  const { isAuthenticated, is } = useAuth();
  const appContext = useAppContext(); 

  

  useEffect(() => {

      if(isAuthenticated ){
         window.location.href = is('Staff') ? window.location.origin + '/e-forms/dashboard/acknowledgements' : window.location.origin + '/e-forms/dashboard';
      }else{
        appContext.setParentDialog({ title : null, subtitle : null, isOpen : false, component : false });
      }

  },[isAuthenticated]);

  if (isAuthenticated) {
		return null;
	}

  return <>{children || <Outlet />}</>;
}

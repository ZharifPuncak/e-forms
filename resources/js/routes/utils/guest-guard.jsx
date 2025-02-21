import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import useAuth from '@/hooks/use-auth';
import { paths } from "@/paths"; // Ensure correct import path

export default function GuestGuard({ children }) {

  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

      if(isAuthenticated ){
            navigate(paths.dashboard.overview);
      }

  },[isAuthenticated]);

  if (isAuthenticated) {
		return null;
	}

  return <>{children || <Outlet />}</>;
}

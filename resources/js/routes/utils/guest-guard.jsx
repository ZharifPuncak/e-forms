import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import useAuth from '@/hooks/use-auth';
import { paths } from "@/paths"; // Ensure correct import path

export default function GuestGuard({ children }) {

  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

    if (isAuthenticated) {
      if (location.state?.from) {
        navigate(location.state.from);
      } else if (window.history.length > 1) {
        navigate(-1); 
      } else {
        navigate(paths.dashboard.home);
      }
    }

  },[isAuthenticated]);

  if (isAuthenticated) {
		return null;
	}

  return <>{children || <Outlet />}</>;
}

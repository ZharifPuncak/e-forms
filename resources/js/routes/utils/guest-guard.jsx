import { Fragment } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

import useAuth from '@/hooks/use-auth';
import useLocation from '@/hooks/use-location';

export default function GuestGuard({ children }) {

const { state } = useLocation();
const { isAuthenticated } = useAuth();
const navigate = useNavigate();


    React.useEffect(() => {

    
        if(!isAuthenticated){

        
            navigate(paths.auth.signIn);

        }else{


            if (window.history.length <= 1) {
            
                navigate(paths.home); 
             }else{
                return <>{children || <Outlet />}</>;
             }
        }


    }, [isAuthenticated, isLoading, navigate]);

}
import { createContext, useReducer } from "react";
import LoadingScreen from "@/components/loader/loading-screen";
import useLocalStorage from "@/hooks/use-local-storage";
import axios from "@/utils/axios";

let authStorage = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : undefined;

const initialState = {
  isAuthenticated: authStorage?.isAuthenticated || false,
  isInitialized: authStorage?.isInitialized || false,
  token: authStorage?.token || '',
  permissions: authStorage?.permissions || [],
  user: authStorage?.user || null,
};



const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      {
        return {
          isInitialized: true,
          user: action.payload.user,
          isAuthenticated: action.payload.isAuthenticated
        };
      }

    case "LOGIN":
      {
  
        return { ...state,
          user: action.payload.user,
          token: action.payload.token,
          permissions: action.payload.permissions,
        };
      }

    case "LOGOUT":
      {
        return { ...state,
          user: null,
          isAuthenticated: false,
          token : '',
          permissions : [],
        };
      }

    case "REGISTER":
      {
        return { ...state,
          isAuthenticated: true,
          user: action.payload.user,
          permissions : action.payload.permissions,
        };
      }

    case "PROFILE":{
      return { ...state,
        user: action.payload.user,
      };
    }

    default:
      {
        return state;
      }
  }
};

const AuthContext = createContext({ ...initialState,
  method: "JWT",
  can: () => {},
  is: () => {},
  logout: () => {},
  login: (email, password) => Promise.resolve(),
  register: (email, password, username) => Promise.resolve()
});




export const AuthProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data: auth, storeData: setUserAuth } = useLocalStorage("auth", state);
  
  const can = (permission) => { 
      let result = (auth?.permissions).find((p) =>  p === permission ) ? true : false;
      return result;
  }

  const cans = (permissions) => { 
      return permissions.some(item => auth?.permissions.includes(item));
  }

  const is = (role) => {
    let result = auth?.user?.role == role ? true : false;
    return result;
  }


  const profile = async (user) => {

    let payload = { user };

    dispatch({
      type: "PROFILE",
      payload: payload
    });

    setUserAuth({...initialState, user : payload.user});

  }


  const login = async (loginCred, password, role) => {

    let loadedData = {};

    const endpoint = role === "staff" ?  import.meta.env.VITE_API_BASE_URL + "/login" : import.meta.env.VITE_API_BASE_URL + "/login/admin";
    const payload = role === "staff" 
      ? { staff_ic_no: loginCred, password } 
      : { email: loginCred, password };
    
    const { data } = await axios.post(endpoint, payload);
    
    loadedData = data;
    

    //Payload
    let formattedData = {
      isAuthenticated: true,
      user: data.data.user,
      token: data.data.token,
      permissions : data.data.permissions,
    }

   
    dispatch({
      type: "LOGIN",
      payload: formattedData
    });

    setUserAuth(formattedData);


  };

  const register = async (name, email, password, confirm_password) => {
       
  const { data } = await axios.post(import.meta.env.VITE_API_BASE_URL + "/register", {
      email,
      name,
      password,
      confirm_password,
    }); 

    dispatch({
      type: "REGISTER",
      payload: {
        user: data.user
      }
    });
  };

  const logout = async () => {

      dispatch({
        type: "LOGOUT"
      });

      await localStorage.removeItem("auth");
      await axios.post(import.meta.env.VITE_API_BASE_URL + "/logout", {});

  };



  if(!state.isInitialized) { <LoadingScreen /> };
  return <AuthContext.Provider value={{ ...state,
    method: "JWT",
    login,
    register,
    logout,
    profile,
    can,
    cans,
    is
  }}>
      {children}
    </AuthContext.Provider>;
};
export default AuthContext;
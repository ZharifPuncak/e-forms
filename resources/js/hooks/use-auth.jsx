import AuthContext from "@/contexts/auth-context";
import { useContext } from "react";

const useAuth = () => useContext(AuthContext);

export default useAuth;
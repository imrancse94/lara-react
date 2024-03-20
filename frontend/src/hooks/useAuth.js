
import { useContext} from "react";
import AuthContext from "@/contexts/auth/AuthContext";
import { setToken,setUser } from "@/helpers";


const useAuth = () => {
   
   const ctx = useContext(AuthContext);

   const {auth} = ctx;
   
   if(auth?.access_token){
      setToken(auth?.access_token);
   }

   if(auth?.user){
      setUser(auth?.user);
   }

   return ctx;
}

export default useAuth;
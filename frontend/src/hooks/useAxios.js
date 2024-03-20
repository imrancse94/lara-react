import { useEffect } from "react";
import axios from 'axios';
import { api,API_BASE_URL } from "@/api";
import useAuth from "./useAuth";
import { removeAllCookie } from '@/helpers';


const useAxios = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    // Add a request interceptor
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.access_token;
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add a response interceptor
    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const response = await axios.post(`${API_BASE_URL}/refresh-token`,{},{
              headers:{
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + auth?.access_token
              }
            });
           
            const { data,status_code } = response.data;

            if(status_code == 900){
              setAuth({})
              removeAllCookie();
              return Promise.reject(error);
            }

            const token = data?.access_token

            setAuth({access_token: token,user:auth?.user});

            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          } catch (error) {
            throw error;
          }
        }

        
        
        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    }
  }, [auth?.access_token]);

  return {api};
};

export default useAxios;
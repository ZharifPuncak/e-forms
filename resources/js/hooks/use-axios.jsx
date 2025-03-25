import { useEffect } from "react";
import axios from "@/utils/axios";
import useAuth from "./use-auth";
import { useQuery, useMutation } from "react-query";
import { toast } from 'sonner';






const useAxios = () => {
  const { logout, isAuthenticated, token } = useAuth();
  
  const getAuthHeaders = (isFileUpload = false, isFileDownload = false) => {
    let headers = isAuthenticated ? { Authorization: `Bearer ${token}` } : {};
    headers["Accept"] = "application/json";
    headers["Content-Type"] = "application/json";
    if (isFileUpload) headers["Content-Type"] = "multipart/form-data";
    return isFileDownload ? { ...headers, responseType: "arraybuffer" } : headers;
  };

  const mutationFn = async ({ method, url, payload, isFileUpload, isFileDownload, onProgress }) => {
    const options = { headers: getAuthHeaders(isFileUpload, isFileDownload),  onUploadProgress: (progressEvent) => {
      if (onProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted); // Update progress in state
      }
  }};
    const response = await axios[method](url, payload, options);
   
    return response.data;
  };

  const axiosMutate = ({ id = null, method, url, payload = {}, isFileDownload = false, isFileUpload = false }) => {
    const { isLoading, isError, isSuccess, error, data, mutate } = useMutation(
      async () => {
       return mutationFn({ method, url, payload, isFileUpload, isFileDownload })
      },
      { cacheTime: Infinity, mutationKey: id },
      
    );

    useEffect(() => {
      if (!isFileDownload && isSuccess && data) {
          toast.success(data?.message || data?.status,{
            style: {
              background: 'green',
              color: 'white'
            },
          });
      }
    }, [isSuccess]);

    useEffect(() => {
      if (isError) {
        if (error?.message === "Unauthenticated.") return logout();
        if (error?.message || error?.status) {
          toast.error(error?.message || error?.status,{
            style: {
              background: 'red',
              color: 'white'
            },
          });
        }
      }
    }, [isError]);

    return { mutate, isLoading, isError, data, isSuccess };
  };

  const axiosGet = ({ id = null, url, staleTime, cacheTime, needUpdate, enabled = true, refetchOnMount = false }) => {
    const { isLoading, isError, isSuccess, dataUpdatedAt, error, data, refetch } = useQuery(
      id,
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 250));
        return axios.get(url, { headers: getAuthHeaders() });
      },
      { enabled, staleTime, retry: false, refetchOnMount, refetchOnWindowFocus: false, cacheTime }
    );

    useEffect(() => {
      if (needUpdate) refetch();
    }, [needUpdate]);

    useEffect(() => {
      if (isError && error?.message === "Unauthenticated.") logout();
      if(isError && error?.code == 404 ) window.location.href = window.location.origin + "/404"
  
    }, [isError]);

    return { data: data?.data, error: error?.message, isLoading, isSuccess, isError, refetch, dataUpdatedAt };
  };

  return { axiosGet, axiosMutate };
};

export default useAxios;

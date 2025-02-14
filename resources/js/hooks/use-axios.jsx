import { useEffect } from "react";
import axios from "@/utils/axios";
import useAuth from "./useAuth";
import { useQuery, useMutation } from "react-query";
import toast from "react-hot-toast";

const useAxios = () => {
  const { logout, isAuthenticated, token } = useAuth();
  
  const getAuthHeaders = (isFileUpload = false, isFileDownload = false) => {
    let headers = isAuthenticated ? { Authorization: `Bearer ${token}` } : {};
    if (isFileUpload) headers["Content-Type"] = "multipart/form-data";
    return isFileDownload ? { ...headers, responseType: "arraybuffer" } : headers;
  };

  const mutationFn = async ({ method, url, payload, isFileUpload, isFileDownload }) => {
    const options = { headers: getAuthHeaders(isFileUpload, isFileDownload) };
    const response = await axios[method](url, payload, options);
    return response.data;
  };

  const axiosMutate = ({ id = null, method, url, payload = {}, isFileDownload = false, isFileUpload = false }) => {
    const { isLoading, isError, isSuccess, error, data, mutate } = useMutation(
      () => mutationFn({ method, url, payload, isFileUpload, isFileDownload }),
      { cacheTime: Infinity, mutationKey: id }
    );

    useEffect(() => {
      if (!isFileDownload && isSuccess && data) {
        toast.success(data?.status, { duration: 2000, position: "top-center", style: { color: "black" } });
      }
    }, [isSuccess]);

    useEffect(() => {
      if (isError) {
        if (error?.message === "Unauthenticated.") return logout();
        if (error?.message || error?.status) {
          toast.error(error?.message || error?.status, { duration: 2000, position: "top-center", style: { color: "black" } });
        }
      }
    }, [isError]);

    return { mutate, isLoading, isError, data, isSuccess };
  };

  const axiosGet = ({ id = null, url, staleTime, cacheTime, needUpdate, enabled = true }) => {
    const { isLoading, isError, isSuccess, dataUpdatedAt, error, data, refetch } = useQuery(
      id,
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 250));
        return axios.get(url, { headers: getAuthHeaders() });
      },
      { enabled, staleTime, retry: false, refetchOnMount: false, refetchOnWindowFocus: false, cacheTime }
    );

    useEffect(() => {
      if (needUpdate) refetch();
    }, [needUpdate]);

    useEffect(() => {
      if (isError && error?.message === "Unauthenticated.") logout();
    }, [isError]);

    return { data: data?.data, error: error?.message, isLoading, isSuccess, isError, refetch, dataUpdatedAt };
  };

  return { axiosGet, axiosMutate };
};

export default useAxios;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./axios";
import { logoutUser, setUser } from "../redux/reducers/userReducer";

export const useAuth = () => {
  const dispatch = useDispatch();

  const { data, error, isLoading, isSuccess, status } = useQuery({
    queryKey: ["checkAuth"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Токен отсутствует");
      }
      const response = await api.get("http://localhost:4001/auth");

      return response.data;
    },

    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data]);

  useEffect(() => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      dispatch(logoutUser());
    }
  }, [error]);
  return { user: data, isError: !!error, isLoading, isSuccess, status };
};

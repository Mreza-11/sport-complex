// src/hooks/useLogin.ts
import { useMutation } from "react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice"; // Adjust the path if needed
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mutation = useMutation(
    async (credentials: { username: string; password: string }) => {
      const response = await axios.post(
        "http://localhost:3000/login",
        credentials
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        dispatch(login(data.baseData));
        navigate("/");
      },
      onError: (error) => {
        console.error("Login error:", error);
        alert("Login failed");
      },
    }
  );

  return mutation;
};

export default useLogin;

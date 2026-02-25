import { API_URL } from "@/config/env";
import axios from "@/utils/axios";

const url = `${API_URL}/auth`;

const AuthService = {
  signUp: async (email: string, password: string) => {
    await axios.post<void>(`${url}/signup`, {
      email,
      password,
    });
  },
  login: async (input: string, password: string) => {
    await axios.post<void>(`${url}/login`, {
      input,
      password,
    });
  },
  logout: async () => {
    await axios.delete<void>(`${url}/logout`);
  },
};

export default AuthService;

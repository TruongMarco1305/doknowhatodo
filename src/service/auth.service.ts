import axios from "@/utils/axios";

const AuthService = {
  signUp: async (email: string, password: string) => {
    await axios.post<void>(`/auth/signup`, {
      email,
      password,
    });
  },
  login: async (input: string, password: string) => {
    await axios.post<void>(`/auth/login`, {
      input,
      password,
    });
  },
  logout: async () => {
    await axios.delete<void>(`/auth/logout`);
  },
};

export default AuthService;

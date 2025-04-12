import axios from "./api";

const AuthService = {
  async userLogin(formData) {
    const { data } = await axios.post("/auth/signin", formData);
    return data;
  },
}

export default AuthService;
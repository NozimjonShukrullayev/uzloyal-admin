import axios from "./api";

const NewsService = {
  async postNews(formData) {
    const { data } = await axios.post("/news", formData);
    return data;
  },
  async getNews() {
    const { data } = await axios.get("/news");
    return data;
  },
}

export default NewsService;
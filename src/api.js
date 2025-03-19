import axios from "axios";

// Tạo một instance của axios với baseURL
const API = axios.create({
  baseURL: "https://shopqt-json-server.onrender.com", // API online của bạn
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;

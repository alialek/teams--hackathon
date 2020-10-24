import axios from "axios";
import store from "./store";
import router from "./router";
const instance = axios.create({
  baseURL: "http://10.5.2.55:8000/",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.defaults.timeout = 15000;

instance.interceptors.request.use(
  (config) => {
    store.commit("LOADING_START");
    let token = localStorage.getItem("user") || null;
    if (config.method == "get") {
      //delete config.headers.common["Content-Type"];
    } else {
      config.headers.common["Content-Type"] = "application/json";
    }
    if (token) {
      config.headers.common["authorization"] = `Token ${token}`;
    } else {
      delete config.headers.common["authorization"];
    }

    return config;
  },
  (error) => {
    store.commit("SET_ERROR");
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    store.commit("LOADING_STOP");
    return response;
  },
  async (error) => {
    store.commit("LOADING_STOP");
    console.log(error.response);
    console.log(error.toJSON());
    try {
      if (error.toJSON().message == "Network Error") {
        store.commit("SET_ERROR", "Ошибка подключения");
      } else if (error.toJSON().message.includes("timeout")) {
        store.commit("SET_ERROR", "Ошибка подключения");
      } else if (error.response.status === 401) {
        localStorage.removeItem("user");

        store.commit("SET_ERROR", "Вы не авторизованы");
        delete axios.defaults.headers.common["authorization"];
        router.push("/login");
      } else {
        store.commit("SET_ERROR", error.response.data.message);
      }
    } catch (err) {
      store.commit("SET_ERROR", err);
    }
    return Promise.reject(error);
  },
);

export default instance;

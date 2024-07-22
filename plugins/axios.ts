import { NuxtAxiosInstance } from "@nuxtjs/axios";

const axiosPlugin = ({ $axios }: any, inject: any) => {
  // Create a custom axios instance
  const api: NuxtAxiosInstance = $axios.create({
    headers: {
      common: {
        Accept: "text/plain, */*",
      },
    },
  });

  // Correct the baseURL
  api.setBaseURL("http://localhost:4000/");

  // Inject to context as $api
  inject("api", api);
};

export default axiosPlugin;

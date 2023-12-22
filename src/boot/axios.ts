import { boot } from 'quasar/wrappers';
import axios from 'axios';
import type { AxiosInstance } from 'axios'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const serverURL =
  process.env.NODE_ENV == 'production'
    ? 'https://proyectofrustosdelpaine-production.up.railway.app/api/v1'
    : 'http://localhost:5000/api/v1';

const authUrl =
  process.env.NODE_ENV == 'production'
    ? 'https://proyectofrustosdelpaine-production.up.railway.app/api/v1/auth'
    : 'http://localhost:5000/api/v1/auth';

const api = axios.create({ baseURL: serverURL });
const authApi = axios.create({ baseURL: authUrl })

const token = localStorage.getItem('token')

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api


  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file
  api.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    error => Promise.reject(error),
  )

  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api, authApi };

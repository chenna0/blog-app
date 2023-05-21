import axios from 'axios';
import constants from 'common/utils/constants';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = constants.HOST_URL;

axiosClient.defaults.headers.common = constants.headers;


axiosClient.interceptors.request.use(function (config) {
  if(JSON.parse(sessionStorage.getItem('blog_token'))?.token){
    axiosClient.defaults.headers.common['user-token'] = JSON.parse(sessionStorage.getItem('blog_token'))?.token;
  }
  return config;
}, null, { synchronous: true });


// To share cookies to cross site domain, change to true.
axiosClient.defaults.withCredentials = false;

export function getRequest(URL) {
  return axiosClient.get(`/${URL}`).then(response => response);
}

export function postRequest(URL, payload, headers) {
  return axiosClient.post(`/${URL}`, payload, headers).then(response => response);
}

export function patchRequest(URL, payload) {
  return axiosClient.put(`/${URL}`, payload).then(response => response);
}

export function deleteRequest(URL) {
  return axiosClient.delete(`/${URL}`).then(response => response);
}

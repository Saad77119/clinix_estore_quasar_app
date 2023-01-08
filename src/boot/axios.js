import Vue from "vue";
import axios from "axios";

Vue.prototype.$axios = axios;

const api = axios.create({
    baseURL: "http://167.86.111.249/clinixestoreapis/public/api"
});

Vue.prototype.$api = api;

api.interceptors.request.use(req => {
    return req;
});
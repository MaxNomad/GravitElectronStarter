import Axios from 'axios';

const Api = {
    getJava: () => Axios.get(`/checkJava`),
    getSystem: () => Axios.get(`/checkSystem`),
    getJavaFiles: () => Axios.get(`/startDownloadJava`),
    getJavaStats: () => Axios.get(`/startDownloadJava`)
};

export default Api;

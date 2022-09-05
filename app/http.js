const axios = require("axios");

/**
 * @desc Wrapper for HTTP request.
 * Pass method
 * @param method {string} - HTTP method (GET, POST, PUT, PATCH etc.)
 * @return {function} - function for making the HTTP request
 */
const httpMethod =
  (method) =>
  (url, payload = {}, headers = {}, cancelToken = null) => {
    const { params = {}, data = {} } = payload;

    return axios({
      method,
      url,
      params,
      data,
      headers,
      cancelToken,
    });
  };

/**
 * @desc Object with methods for making the HTTP requests.
 * @const
 * @type {object}
 */
const http = {
  get: httpMethod("get"),
  post: httpMethod("post"),
  put: httpMethod("put"),
  patch: httpMethod("patch"),
  delete: httpMethod("delete"),
};

export default http;
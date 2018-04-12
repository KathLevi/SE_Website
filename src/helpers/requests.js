import axios from "axios";

const request = (url, data, handleResponse = () => {}) => {
  axios
    .post(url, data)
    .then(response => {
      handleResponse(response);
    })
    .catch(error => {
      handleResponse(error);
    });
};

export { request };

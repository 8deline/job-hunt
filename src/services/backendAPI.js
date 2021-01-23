import axios from "axios";
import qs from "qs";

const baseUrl = "http://localhost:5000/api/v1";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});

const backendAPI = {
  login: (email, password) => {
    return axiosInstance.post(
      "/users/login",
      qs.stringify({
        email: email,
        password: password,
      })
    );
  },
  register: (firstname, lastname, email, password) => {
    return axiosInstance.post(
      "/users/register",
      qs.stringify({
        first_name: firstname,
        last_name: lastname,
        email: email,
        password: password,
      })
    );
  },
  getUserInfo: (token) => {
    return axiosInstance.post(
      "/users/getuserinfo",
      {},
      {
        headers: {
          auth_token: token,
        },
      }
    );
  },
  render: (useremail = "b@b.com") => {
    return axiosInstance.post(
      "/render",
      qs.stringify({
        useremail: useremail,
      }),
      {}
    );
  },
  updateJob: (_id,jobstatus) => {
    return axiosInstance.post(
      "/update/job",
      qs.stringify({
        _id: _id,
        jobstatus:jobstatus
      }),
      {}
    );
  },
};

export default backendAPI;

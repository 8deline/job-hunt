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
  render: (email) => {
    return axiosInstance.post(
      "/render",
      qs.stringify({
        email: email,
      }),
      {}
    );
  },
  updateJob: (
    drag,
    _id,
    jobstatus,
    order,
    companyname,
    jobname,
    preparation,
    interviewquestion,
    interviewexperience,
    salary
  ) => {
    return axiosInstance.post(
      "/update/job",
      qs.stringify({
        drag: drag,
        _id: _id,
        jobstatus: jobstatus,
        order: order,
        companyname: companyname,
        jobname: jobname,
        preparation: preparation,
        interviewquestion: interviewquestion,
        interviewexperience: interviewexperience,
        salary: salary,
      }),
      {}
    );
  },
  dragJob: (jobid, oldstatus, oldorder, newstatus, neworder) => {
    return axiosInstance.post(
      "/drag/job",
      qs.stringify({
        jobid: jobid,
        oldstatus: oldstatus,
        oldorder: oldorder,
        newstatus: newstatus,
        neworder: neworder,
      }),
      {}
    );
  },
};

export default backendAPI;

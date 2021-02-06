import axios from "axios";
import qs from "qs";

const baseUrl = "http://localhost:5000/api/v1";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});

const backendAPI = {
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  },
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
  render: () => {
    return axiosInstance.post(
      "/render",
      qs.stringify({
        email: JSON.parse(localStorage.getItem("user")).email,
      }),
      {}
    );
  },
  createStatus: (columnDetails) => {
    return axiosInstance.post(
      "/create/status",
      qs.stringify(columnDetails),
      {}
    );
  },
  createJob: (newCompany) => {
    return axiosInstance.post("/create/job", qs.stringify(newCompany), {});
  },

  updateStatus: (email, statusid, jobstatus, order) => {
    return axiosInstance.patch(
      "/update/status",
      qs.stringify({
        email: email,
        statusid: statusid,
        jobstatus: jobstatus,
        order: order,
      }),
      {}
    );
  },

  updateJob: (
    email,
    _id,
    index,
    companyname,
    jobname,
    preparation,
    interviewquestion,
    interviewexperience,
    salary
  ) => {
    return axiosInstance.patch(
      "/update/job",
      qs.stringify({
        email: email,
        _id: _id,
        index: index,
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
  dragStatus: (email, statusid, oldorder, neworder) => {
    return axiosInstance.patch(
      "/drag/status",
      qs.stringify({
        email: email,
        statusid: statusid,
        oldorder: oldorder,
        neworder: neworder,
      }),
      {}
    );
  },
  dragJob: (email, jobid, oldstatus, oldorder, newstatus, neworder) => {
    return axiosInstance.patch(
      "/drag/job",
      qs.stringify({
        email: email,
        jobid: jobid,
        oldstatus: oldstatus,
        oldorder: oldorder,
        newstatus: newstatus,
        neworder: neworder,
      }),
      {}
    );
  },
  deleteStatus: (email, id) => {
    const data = qs.stringify({
      email: email,
      _id: id,
    });
    return axiosInstance.delete("/delete/status", {
      data,
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
  },
  deleteJob: (email, statusid, jobid) => {
    return axiosInstance.patch(
      "/delete/job",
      qs.stringify({
        email: email,
        statusid: statusid,
        jobid: jobid,
      })
    );
  },
};

export default backendAPI;

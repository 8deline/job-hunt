import axios from "axios";
import qs from "qs";

const devurl = "http://localhost:5000/api/v1";
const produrl = "https://express-job-hunt.herokuapp.com/api/v1";

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? devurl : produrl,
  timeout: 5000,
});

const backendAPI = {
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  },
  getUserToken: () => {
    return JSON.parse(localStorage.getItem("token"));
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
      {
        headers: {
          auth_token: JSON.parse(localStorage.getItem("token")),
        },
      }
    );
  },
  createStatus: (columnDetails) => {
    return axiosInstance.post("/create/status", qs.stringify(columnDetails), {
      headers: {
        auth_token: JSON.parse(localStorage.getItem("token")),
      },
    });
  },
  createJob: (newCompany) => {
    return axiosInstance.post("/create/job", qs.stringify(newCompany), {
      headers: {
        auth_token: JSON.parse(localStorage.getItem("token")),
      },
    });
  },

  updateStatus: (email, statusid, jobstatus, oldjobstatus) => {
    return axiosInstance.patch(
      "/update/status",
      qs.stringify({
        email: email,
        statusid: statusid,
        jobstatus: jobstatus,
        oldjobstatus: oldjobstatus,
      }),
      {
        headers: {
          auth_token: JSON.parse(localStorage.getItem("token")),
        },
      }
    );
  },

  updateJob: (
    email,
    statusid,
    index,
    companyname,
    jobname,
    preparation,
    interviewquestion,
    interviewexperience,
    salary,
    oldCompanyName,
    oldJobName
  ) => {
    return axiosInstance.patch(
      "/update/job",
      qs.stringify({
        email: email,
        statusid: statusid,
        index: index,
        companyname: companyname,
        jobname: jobname,
        preparation: preparation,
        interviewquestion: interviewquestion,
        interviewexperience: interviewexperience,
        salary: salary,
        oldCompanyName: oldCompanyName,
        oldJobName: oldJobName,
      }),
      {
        headers: {
          auth_token: JSON.parse(localStorage.getItem("token")),
        },
      }
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
      {
        headers: {
          auth_token: JSON.parse(localStorage.getItem("token")),
        },
      }
    );
  },
  dragJob: (
    email,
    jobid,
    oldstatusid,
    oldorder,
    newstatusid,
    neworder,
    oldStatus,
    newStatus
  ) => {
    return axiosInstance.patch(
      "/drag/job",
      qs.stringify({
        email: email,
        jobid: jobid,
        oldstatusid: oldstatusid,
        oldorder: oldorder,
        newstatusid: newstatusid,
        neworder: neworder,
        oldStatus: oldStatus,
        newStatus: newStatus,
      }),
      {
        headers: {
          auth_token: JSON.parse(localStorage.getItem("token")),
        },
      }
    );
  },
  deleteStatus: (email, id, jobstatus) => {
    const data = qs.stringify({
      email: email,
      _id: id,
      jobstatus: jobstatus,
    });
    return axiosInstance.delete("/delete/status", {
      data,
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        auth_token: JSON.parse(localStorage.getItem("token")),
      },
    });
  },
  deleteJob: (email, statusid, jobid, companyname, jobname) => {
    return axiosInstance.patch(
      "/delete/job",
      qs.stringify({
        email: email,
        statusid: statusid,
        jobid: jobid,
        companyname: companyname,
        jobname: jobname,
      }),
      {
        headers: {
          auth_token: JSON.parse(localStorage.getItem("token")),
        },
      }
    );
  },
  notification: () => {
    return axiosInstance.post(
      "/notification",
      qs.stringify({
        email: JSON.parse(localStorage.getItem("user")).email,
      }),
      {
        headers: {
          auth_token: JSON.parse(localStorage.getItem("token")),
        },
      }
    );
  },
};

export default backendAPI;

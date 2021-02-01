import { useState } from "react";
import backendService from "../../services/backendAPI";

export default function Newcard({
  dropid,
  setNewCard,
  colns,
  setColns,
  getCurrentUser,
  setAllResult,
}) {
  let [newCompany, setNewCompany] = useState({
    companyname: "",
    jobname: "",
    jobstatus: dropid,
    email: getCurrentUser().email,
  });
  // let [newJobCard, setNewJobCard] = useState({companyname:"", jobname:""})
  //postential bug: if we dont return the updated data from backend, the companies length would not be updated
  const handleChange = ({ target }) => {
    setNewCompany((prev) => ({ ...prev, [target.name]: target.value }));

    // setNewJobCard(prev=>({...prev,
    // [target.name]: target.value
    // })
    // )
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    backendService
      .createJob(newCompany)
      .then((result) => {
        console.log(result);
        backendService
          .render(getCurrentUser().email)
          .then((newresult) => {
            setNewCard(false);
            setAllResult(newresult.data.allResult);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  // setNewCard(false)
  // console.log(colns)
  // let newArrayNewCard = Array.from(colns[dropid].jobs)
  // console.log(newArrayNewCard)
  // newArrayNewCard = [...newArrayNewCard, newJobCard]
  // let newColumn = {...colns[dropid], jobs: newArrayNewCard}
  // setColns(prev=>({
  //     ...prev,
  //     [dropid]: newColumn
  // })
  // )

  // .then //backend render set Colns(jobstatus1: {column_id: jobstatus1, job: [{company_id: }]})

  return (
    <div className="job-cards">
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          class="form-control form-control-sm"
          type="text"
          placeholder="Company name"
          aria-label=".form-control-sm example"
          name="companyname"
        />
        <input
          onChange={handleChange}
          class="form-control form-control-sm"
          type="text"
          placeholder="Position"
          aria-label=".form-control-sm example"
          name="jobname"
        />

        <button>Add new card</button>
      </form>
    </div>
  );
}

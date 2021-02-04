import { useState } from "react";
import backendService from "../../services/backendAPI";

export default function Newcolumn(props) {
  let [columnDetails, setColumnDetails] = useState({
    email: props.getCurrentUser().email,
    order: props.allresult.length,
    jobstatus: "",
  });

  // let [columnContext, setColumnContext] = useState()

  const handleChange = ({ target }) => {
    setColumnDetails((prev) => ({
      ...prev,
      jobstatus: target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!columnDetails.jobstatus) {
      alert("Please do not leave empty field");

      return;
    }

    backendService
      .createStatus(columnDetails)
      .then((result) => {
        console.log(result);
        props.setNewColumn(false);
        backendService
          .render(props.getCurrentUser().email)
          .then((newresult) => {
            console.log(newresult);
            props.setAllResult(newresult.data.allResult);
          })
          .catch((err) => console.log(err));
        // props.setColumnList(prev=>([...prev, columnDetails.jobstatus ]))
        // props.setColumnList(prev=> {prev.push(columnDetails.jobstatus)})
        //  let newColumnListArray = Array.from(props.columnList)
        //  newColumnListArray.push(columnDetails.jobstatus)
        // props.setColumnList(newColumnListArray)
        // console.log(props.columnList)
        // props.setColns(prev=>({
        //     ...prev,
        //     [columnDetails.jobstatus]: {column_id: columnDetails.jobstatus, jobs:[]}
        // })
        // )

        // props.setColns(prev=> {prev[columnDetails.jobstatus]={column_id: columnDetails.jobstatus, jobs:[]}})
        // console.log(props.colns)
        // props.setNewColumn(false)
      })

      .catch((err) => console.log(err));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          class="form-control form-control-sm"
          type="text"
          placeholder="New job status"
          aria-label=".form-control-sm example"
          name="jobstatus"
        />
        <button type="submit">Add</button>
      </form>
      <button onClick={() => props.setNewColumn(false)}>X</button>
    </>
  );
}

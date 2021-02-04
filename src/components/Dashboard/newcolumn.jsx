import { useState } from "react";
import backendService from "../../services/backendAPI";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Newcolumn(props) {
  const classes = useStyles();
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
      <form onSubmit={handleSubmit} className={classes.root}>
        <TextField
          onChange={handleChange}
          className="form-control form-control-sm"
          type="text"
          placeholder="New job status"
          aria-label=".form-control-sm example"
          name="jobstatus"
        />
        <Button variant="contained" color="primary" type="submit">
          <AddCircleIcon />
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => props.setNewColumn(false)}
        >
          <CancelIcon />
        </Button>
      </form>
    </>
  );
}

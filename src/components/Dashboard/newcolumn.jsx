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
  const { setShowNew, setModalInfo } = props;
  let [columnDetails, setColumnDetails] = useState({
    email: props.getCurrentUser().email,
    order: props.allresult.length,
    jobstatus: "",
  });

  const handleChange = ({ target }) => {
    setColumnDetails((prev) => ({
      ...prev,
      jobstatus: target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!columnDetails.jobstatus) {
      setShowNew(true);
      setModalInfo("Job Status");
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

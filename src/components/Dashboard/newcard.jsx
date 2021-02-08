import { useState } from "react";
import backendService from "../../services/backendAPI";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  addNewCard: {
    color: "green",
  },
  text: {
    fontSize: "0.8em",
  },
  icon: {
    fontSize: "1.2em",
  },
  smallerButton: {
    minWidth: "20px",
  },
  input: {
    marginBottom: "2px",
    marginLeft: "2%",
    width: "40%",
    fontSize: "0.9em",
  },
  form: {
    display: "inline-block",
    width: "280px",
  },
}));

export default function Newcard({
  dropid,
  setNewCard,
  colns,
  setColns,
  getCurrentUser,
  setAllResult,
  statusID,
}) {
  const classes = useStyles();
  let [newCompany, setNewCompany] = useState({
    companyname: "",
    jobname: "",
    statusid: statusID,
    email: getCurrentUser().email,
  });
  // let [newJobCard, setNewJobCard] = useState({companyname:"", jobname:""})
  //postential bug: if we dont return the updated data from backend, the companies length would not be updated
  const handleChange = ({ target }) => {
    setNewCompany((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newCompany.companyname || !newCompany.jobname) {
      alert("Please do not leave empty field");

      return;
    }
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

  return (
    <div className="job-cards">
      <form onSubmit={handleSubmit} className={classes.form}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Company name"
          name="companyname"
          className={classes.input}
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="Position"
          name="jobname"
          className={classes.input}
        />

        <Button type="submit" variant="text" className={classes.addNewCard}>
          <span className={classes.text}>Add Card</span>
        </Button>
        <Button
          onClick={() => {
            setNewCard(false);
          }}
          className={classes.smallerButton}
          color="secondary"
        >
          <CloseIcon className={classes.icon} />
        </Button>
      </form>
    </div>
  );
}

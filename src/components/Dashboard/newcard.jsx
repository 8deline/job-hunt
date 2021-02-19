import { useState, useEffect } from "react";
import backendService from "../../services/backendAPI";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgressWithLabel from "./Progress";

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

export default function Newcard(props) {
  const [progress, setProgress] = useState(10);
  const [progressStatus, setProgressStatus] = useState(false);

  const {
    setNewCard,
    getCurrentUser,
    setAllResult,
    statusID,
    dropid,
    setShowNew,
    setModalInfo,
  } = props;

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 10
      );
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [progressStatus]);

  const classes = useStyles();
  let [newCompany, setNewCompany] = useState({
    companyname: "",
    jobname: "",
    statusid: statusID,
    statusName: dropid,
    email: getCurrentUser().email,
  });
  const handleChange = ({ target }) => {
    setNewCompany((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newCompany.companyname || !newCompany.jobname) {
      setShowNew(true);
      setModalInfo("Company or Position");
      return;
    }
    setProgress(10);
    setProgressStatus(true);
    backendService
      .createJob(newCompany)
      .then((result) => {
        setProgress(100);
        backendService
          .render()
          .then((newresult) => {
            setProgressStatus(false);
            setProgress(10);
            setNewCard(false);
            setAllResult(newresult.data.allResult);
          })
          .catch((err) => {
            setProgressStatus(false);
            setProgress(10);
            console.log(err);
          });
      })
      .catch((err) => {
        setProgressStatus(false);
        setProgress(10);
        console.log(err);
      });
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
          disabled={progressStatus}
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="Position"
          name="jobname"
          className={classes.input}
          disabled={progressStatus}
        />

        <Button
          type="submit"
          variant="text"
          className={classes.addNewCard}
          disabled={progressStatus}
        >
          <span className={classes.text}>Add Card</span>
        </Button>
        <Button
          onClick={() => {
            setNewCard(false);
          }}
          className={classes.smallerButton}
          color="secondary"
          disabled={progressStatus}
        >
          <CloseIcon className={classes.icon} />
        </Button>
      </form>
      {progressStatus && <CircularProgressWithLabel value={progress} />}
    </div>
  );
}

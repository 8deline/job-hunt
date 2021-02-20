import { useState, useEffect } from "react";
import backendService from "../../services/backendAPI";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import CircularProgressWithLabel from "./Progress";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  jobColumn: {
    backgroundColor: "rgb(200,230,255,0.9)",
    padding: theme.spacing(1),
    borderWidth: "thin",
    border: "solid black",
    maxHeight: `calc(100vh - 132px)`,
    height: "fit-content",
    overflowY: "scroll",
    minWidth: "300px",
    borderRadius: "15px",
    margin: theme.spacing(1),
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));

export default function Newcolumn(props) {
  const classes = useStyles();
  const { setShowNew, setModalInfo, setAllResult, setNewColumn } = props;
  let [columnDetails, setColumnDetails] = useState({
    email: props.getCurrentUser().email,
    order: props.allresult.length,
    jobstatus: "",
  });
  const [progress, setProgress] = useState(10);
  const [progressStatus, setProgressStatus] = useState(false);
  const handleChange = ({ target }) => {
    setColumnDetails((prev) => ({
      ...prev,
      jobstatus: target.value,
    }));
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!columnDetails.jobstatus) {
      setShowNew(true);
      setModalInfo("Job Status");
      return;
    }
    setProgress(10);
    setProgressStatus(true);
    backendService
      .createStatus(columnDetails)
      .then((result) => {
        setProgress(100);

        backendService
          .render()
          .then((newresult) => {
            setProgressStatus(false);
            setProgress(10);
            setAllResult(newresult.data.allResult);
            setNewColumn(false);
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
    <div className={classes.jobColumn}>
      <form onSubmit={handleSubmit} className={classes.root}>
        <TextField
          onChange={handleChange}
          className="form-control form-control-sm"
          type="text"
          placeholder="New job status"
          aria-label=".form-control-sm example"
          name="jobstatus"
          disabled={progressStatus}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={progressStatus}
        >
          <AddCircleIcon />
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => props.setNewColumn(false)}
          disabled={progressStatus}
        >
          <CancelIcon />
        </Button>
      </form>
      {progressStatus && <CircularProgressWithLabel value={progress} />}
    </div>
  );
}

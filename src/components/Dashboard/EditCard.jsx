import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs";
import backendService from "../../services/backendAPI";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgressWithLabel from "./Progress";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    margin: "0 auto",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[10],
    padding: theme.spacing(1),
  },
  textField: {
    width: "100%",
    margin: theme.spacing(1),
  },
  form: {
    textAlign: "center",
    width: "80%",
    margin: "0 auto",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: theme.spacing(1),
    width: "50%",
  },
  button: {
    margin: "10px",
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const fieldName = {
  companyname: "Company Name",
  jobname: "Position",
  preparation: "Preparation",
  interviewquestion: "Interview Question",
  interviewexperience: "Interview Experience",
  salary: "Salary",
};

export default function EditCard(props) {
  const classes = useStyles();
  const { open, setOpen, info, setShowNew, setModalInfo } = props;
  const [progress, setProgress] = useState(10);
  const [progressStatus, setProgressStatus] = useState(false);
  const handleClose = () => {
    if (!progressStatus) {
      setOpen(false);
      backendService
        .render()
        .then((newresult) => {
          props.setAllResult(newresult.data.allResult);
        })
        .catch((err) => {
          setProgressStatus(false);
          setProgress(10);
          console.log(err);
        });
    }
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

  const statusID = info[0];
  const index = info[1];
  const jobDetails = info[2];
  const jobDisplay = [];
  const oldCompanyName = jobDetails?.companyname;
  const oldJobName = jobDetails?.jobname;

  if (jobDetails) {
    Object.keys(jobDetails).forEach((key) => {
      if (key === "companyname" || key === "jobname") {
        jobDisplay.push(
          <TextField
            id="spring-modal-description"
            defaultValue={jobDetails[key]}
            name={key}
            onChange={(e) => {
              jobDetails[key] = e.target.value;
            }}
            className={classes.textField}
            label={fieldName[key]}
            variant="outlined"
            disabled={progressStatus}
          />
        );
      } else if (key === "salary") {
        jobDisplay.push(
          <TextField
            id="spring-modal-description"
            defaultValue={jobDetails[key]}
            name={key}
            type="number"
            onChange={(e) => {
              jobDetails[key] = e.target.value;
            }}
            className={classes.textField}
            label={fieldName[key]}
            variant="outlined"
            disabled={progressStatus}
          />
        );
      } else if (key !== "_id") {
        jobDisplay.push(
          <TextField
            id="spring-modal-description"
            defaultValue={jobDetails[key]}
            name={key}
            onChange={(e) => {
              jobDetails[key] = e.target.value;
            }}
            multiline
            rows={3}
            variant="outlined"
            className={classes.textField}
            label={fieldName[key]}
            disabled={progressStatus}
          />
        );
      }
    });
  }

  function submitEdit(e) {
    e.preventDefault();
    if (!jobDetails.companyname || !jobDetails.jobname) {
      setShowNew(true);
      setModalInfo("Company or Position");
      return;
    }
    setProgress(10);
    setProgressStatus(true);
    backendService
      .updateJob(
        backendService.getCurrentUser().email,
        statusID,
        index,
        jobDetails?.companyname,
        jobDetails?.jobname,
        jobDetails?.preparation,
        jobDetails?.interviewquestion,
        jobDetails?.interviewexperience,
        jobDetails?.salary,
        oldCompanyName,
        oldJobName
      )
      .then((result) => {
        setProgress(100);
        backendService
          .render()
          .then((newresult) => {
            setProgressStatus(false);
            setProgress(10);
            props.setAllResult(newresult.data.allResult);
            setOpen(false);
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
  }
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {jobDisplay && (
            <div className={classes.paper}>
              <form onSubmit={submitEdit} className={classes.form}>
                {jobDisplay}
                <div className={classes.buttonWrapper}>
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    fullWidth
                    disabled={progressStatus}
                    className={classes.button}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleClose}
                    color="secondary"
                    fullWidth
                    disabled={progressStatus}
                    className={classes.button}
                  >
                    Cancel
                  </Button>
                  {progressStatus && (
                    <CircularProgressWithLabel value={progress} />
                  )}
                </div>
              </form>
            </div>
          )}
        </Fade>
      </Modal>
    </div>
  );
}

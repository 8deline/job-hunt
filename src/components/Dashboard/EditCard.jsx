import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs";
import backendService from "../../services/backendAPI";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
  jobname: "Job Name",
  preparation: "Preparation",
  interviewquestion: "Interview Question",
  interviewexperience: "Interview Experience",
  salary: "Salary",
};

export default function EditCard(props) {
  const classes = useStyles();
  const { open, setOpen, info } = props;
  const handleClose = () => {
    setOpen(false);
  };
  const statusID = info[0];
  const index = info[1];
  const jobDetails = info[2];
  const jobDisplay = [];

  if (jobDetails) {
    Object.keys(jobDetails).forEach((key) => {
      if (key === "companyname") {
        jobDisplay.push(
          <TextField
            defaultValue={jobDetails[key]}
            name="companyname"
            onChange={(e) => {
              jobDetails[key] = e.target.value;
            }}
            className={classes.textField}
            label="Company Name"
            variant="outlined"
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
          />
        );
      }
    });
  }

  function submitEdit(e) {
    e.preventDefault();
    setOpen(false);
    backendService
      .updateJob(
        statusID,
        index,
        jobDetails?.companyname,
        jobDetails?.jobname,
        jobDetails?.preparation,
        jobDetails?.interviewquestion,
        jobDetails?.interviewexperience,
        jobDetails?.salary
      )
      .then((result) => {
        console.log(result);
        backendService
          .render(props.getCurrentUser().email)
          .then((newresult) => {
            props.setAllResult(newresult.data.allResult);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
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
                    className={classes.button}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleClose}
                    color="secondary"
                    fullWidth
                    className={classes.button}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}
        </Fade>
      </Modal>
    </div>
  );
}

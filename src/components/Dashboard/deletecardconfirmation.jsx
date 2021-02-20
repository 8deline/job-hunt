import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs";
import backendService from "../../services/backendAPI";
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

export default function DeleteCardConfirmation(props) {
  const [progress, setProgress] = useState(10);
  const [progressStatus, setProgressStatus] = useState(false);

  const classes = useStyles();
  const {
    deleteCardConfirm,
    setDeleteCardConfirm,
    setAllResult,
    getCurrentUser,
    deleteCardInfo,
  } = props;
  const handleClose = () => {
    if (!progressStatus) {
      setDeleteCardConfirm(false);
    }
  };
  let statusBackendId = deleteCardInfo[1];
  let companyId = deleteCardInfo[2];
  let companyName = deleteCardInfo[3];
  let companyJobname = deleteCardInfo[4];

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

  function submitEdit(e) {
    e.preventDefault();
    setProgress(10);
    setProgressStatus(true);
    backendService
      .deleteJob(
        getCurrentUser().email,
        statusBackendId,
        companyId,
        companyName,
        companyJobname
      )
      .then((result) => {
        setProgress(100);
        backendService
          .render()
          .then((newresult) => {
            setProgressStatus(false);
            setProgress(10);
            setAllResult(newresult.data.allResult);
            setDeleteCardConfirm(false);
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
        open={deleteCardConfirm}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={deleteCardConfirm}>
          <div className={classes.paper}>
            <h2 id="spring-modal-title">Warning</h2>
            <p>
              Confirm delete job{" "}
              <strong>
                {companyName}, {companyJobname}
              </strong>
              ?
            </p>
            <form onSubmit={submitEdit} className={classes.form}>
              <div className={classes.buttonWrapper}>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  fullWidth
                  disabled={progressStatus}
                  className={classes.button}
                >
                  Confirm
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
        </Fade>
      </Modal>
    </div>
  );
}

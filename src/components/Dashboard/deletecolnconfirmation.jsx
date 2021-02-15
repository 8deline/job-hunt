import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs";
import backendService from "../../services/backendAPI";
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

export default function DeleteColumnConfirmation(props) {
  const classes = useStyles();
  const {
    columnBackendId,
    columnTitle,
    deleteColnConfirm,
    setDeleteColnConfirm,
  } = props;
  const handleClose = () => {
    setDeleteColnConfirm(false);
  };

  function submitEdit(e) {
    e.preventDefault();

    backendService
      .deleteStatus(props.getCurrentUser().email, columnBackendId)
      .then((result) => {
        console.log(result);
        backendService
          .render()
          .then((newresult) => {
            props.setAllResult(newresult.data.allResult);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    setDeleteColnConfirm(false);
  }
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={deleteColnConfirm}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={deleteColnConfirm}>
          <div className={classes.paper}>
            <h2 id="spring-modal-title">Warning</h2>
            <p>
              Confirm delete job status <strong>{columnTitle}</strong> and all
              of its jobs?
            </p>
            <form onSubmit={submitEdit} className={classes.form}>
              <div className={classes.buttonWrapper}>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  fullWidth
                  className={classes.button}
                >
                  Confirm
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
        </Fade>
      </Modal>
    </div>
  );
}

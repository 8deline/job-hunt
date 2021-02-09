import { Draggable } from "react-beautiful-dnd";
import NaturalDragAnimation from "natural-drag-animation-rbdnd";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import WorkIcon from "@material-ui/icons/Work";

const useStyles = makeStyles((theme) => ({
  cards: {
    fontSize: "1.1em",
    width: "100%",
  },
  cardDetails: {
    width: "100%",
    // display: "flex",
    alignItems: "center",
  },
  deleteCard: {
    marginLeft: "auto",
  },
  deleteCardButton: {
    minWidth: "20px",
  },
  deleteIcon: {
    fontSize: "1.3em",
  },
  cardWrapper: {
    display: "flex",
    alignItems: "center",
  },
  icons: {
    fontSize: "1.1em",
    marginRight: "2%",
  },
  smallerButton: {
    minWidth: "20px",
  },
}));

function Company(props) {
  const classes = useStyles();
  const company = props.company;
  const {
    companyEdit,
    index,
    backendID,
    setDeleteCardConfirm,
    setDeleteCardInfo,
  } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    setDeleteCardConfirm(true);
    setDeleteCardInfo([]);
    setDeleteCardInfo((prev) => [
      ...prev,
      props.getCurrentUser().email,
      props.allresult[props.coid]["_id"],
      props.company["_id"],
      props.company.companyname,
      props.company.jobname,
    ]);
  };
  const handleEdit = (e) => {
    if (e.target.className === "makeStyles-cards-32") {
      companyEdit(true, backendID, index, company);
    }
  };

  return (
    <Draggable draggableId={company["_id"]} index={props.index}>
      {(provided, snapshot) => (
        <NaturalDragAnimation
          style={provided.draggableProps.style}
          snapshot={snapshot}
        >
          {(style) => (
            <div
              onClick={(e) => handleEdit(e)}
              className={
                snapshot.draggingOver ? "job-cards-moving" : "job-cards"
              }
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={style}
            >
              <div className={classes.cardWrapper}>
                <div className={classes.cardDetails}>
                  <div className={classes.cards}>
                    <Button className={classes.smallerButton}>
                      <LocationCityIcon className={classes.icons} />
                    </Button>
                    {company.companyname}
                  </div>

                  <div className={classes.cards}>
                    <Button className={classes.smallerButton}>
                      <WorkIcon className={classes.icons} />
                    </Button>
                    {company.jobname}
                  </div>
                </div>

                <form className={classes.deleteCard} onSubmit={handleSubmit}>
                  <Button className={classes.deleteCardButton} type="submit">
                    <DeleteIcon className={classes.deleteIcon} />
                  </Button>
                </form>
              </div>
            </div>
          )}
        </NaturalDragAnimation>
      )}
    </Draggable>
  );
}

export default Company;

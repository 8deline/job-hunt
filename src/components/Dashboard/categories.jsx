import Company from "./companies";
import Newcard from "./newcard";
import { useState, useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import backendService from "../../services/backendAPI";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  editButton: {
    color: "green",
  },
  columnHeading: {
    display: "flex",
    alignItems: "center",
  },
  columnHeadingName: {
    fontWeight: "700",
    fontSize: "1.4em",
  },
  dot: {
    minWidth: "20px",
    marginLeft: "auto",
  },
  editColumnName: {
    fontSize: "1.4em",
    width: "60%",
  },
  smallerButton: {
    minWidth: "20px",
  },
  displayFlex: {
    display: "flex",
    marginBottom: theme.spacing(1),
    width: "280px",
    height: "30px",
  },
  buttons: {
    marginLeft: "auto",
  },
  addACardBtn: {
    fontSize: "1em",
  },
  text: {
    fontSize: "0.9em",
  },
}));

function CategoriesColumn(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const companiesList = props.companies;
  let [newcard, setNewCard] = useState(false);
  let [colnTitle, setColnTitle] = useState(props.title);
  let [editColn, setEditColn] = useState(false);
  const { columnEdit, setShowNew, setModalInfo } = props;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    console.log(colnTitle);
  }, [colnTitle]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let columnIndex = parseInt(props.index);
    let columnId = props.allresult[columnIndex]["_id"];
    //to confirm before delete the coln
    //upon clicking delete a modal will appear
    props.setDeleteColnConfirm(true);
    props.setColumnTitle(props.title);
    props.setColumnBackendId(columnId);

    // backendService
    //   .deleteStatus(columnId)
    //   .then((result) => {
    //     console.log(result);
    //     backendService
    //       .render(props.getCurrentUser().email)
    //       .then((newresult) => {
    //         props.setAllResult(newresult.data.allResult);
    //       })
    //       .catch((err) => console.log(err));
    //   })
    //   .catch((err) => console.log(err));
  };

  const EditColnTitle = (event) => {
    event.preventDefault();
    if (!colnTitle) {
      setShowNew(true);
      setModalInfo("Job Status");
      return;
    }
    backendService
      .updateStatus(
        props.getCurrentUser().email,
        props.statusID,
        colnTitle,
        props.index
      )
      .then((result) => {
        setEditColn(false);
        backendService
          .render()
          .then((newresult) => props.setAllResult(newresult.data.allResult))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    //   backendService
    //         .render()
    //         .then((result) => {
    //           setColnTitle(newresult.data.allResult[props.index].)
    //           props.setAllResult(newresult.data.allResult);
    //         })
    //         .catch((err) => console.log(err))
  };

  return (
    <Droppable
      key={props.statusID.toString()}
      droppableId={props.statusID.toString()}
      type="company"
    >
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {editColn ? (
            <>
              <form onSubmit={EditColnTitle} className={classes.displayFlex}>
                <input
                  onChange={(e) => setColnTitle(e.target.value)}
                  type="text"
                  className={classes.editColumnName}
                  value={colnTitle}
                />
                <span className={classes.buttons}>
                  <Button
                    className={classes.smallerButton}
                    color="primary"
                    type="submit"
                  >
                    <DoneIcon />
                  </Button>
                  <Button
                    className={classes.smallerButton}
                    onClick={() => setEditColn(false)}
                    color="secondary"
                  >
                    <CloseIcon />
                  </Button>
                </span>
              </form>
            </>
          ) : (
            <div className={classes.columnHeading}>
              <span className={classes.columnHeadingName}>{props.title}</span>

              {/* <form onSubmit={handleSubmit} className={classes.root}>
                <Button color="secondary" type="submit" variant="contained">
                  <DeleteForeverIcon />
                </Button>
              </form>
              <Button
                className={classes.editButton}
                onClick={() => setEditColn(true)}
              >
                <EditIcon />
              </Button> */}

              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className={classes.dot}
              >
                <MoreHorizIcon />
              </Button>

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    setEditColn(true);
                    setAnchorEl(null);
                  }}
                >
                  <Button className={classes.editButton} variant="text">
                    Change Column Name
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <form onSubmit={handleSubmit}>
                    <Button color="secondary" type="submit" variant="text">
                      Delete Entire Column
                    </Button>
                  </form>
                </MenuItem>
              </Menu>
            </div>
          )}

          {/* <div className="title">
            <h1>{props.title}</h1>
          </div> */}

          <div
            className={snapshot.isDraggingOver ? "columndrag" : "column-inside"}
          >
            {companiesList.map((company, index) => {
              return (
                <Company
                  statusid={props.dropid}
                  getCurrentUser={props.getCurrentUser}
                  setAllResult={props.setAllResult}
                  allresult={props.allresult}
                  key={company["_id"]}
                  company={company}
                  index={index}
                  coid={props.index}
                  companyEdit={columnEdit}
                  backendID={props.statusID}
                  setDeleteCardConfirm={props.setDeleteCardConfirm}
                  setDeleteCardInfo={props.setDeleteCardInfo}
                />
              );
            })}
            {newcard ? (
              <Newcard
                getCurrentUser={props.getCurrentUser}
                setNewCard={setNewCard}
                colns={props.colns}
                setColns={props.setColns}
                setColumnList={props.setColumnList}
                setAllResult={props.setAllResult}
                dropid={props.dropid}
                statusID={props.statusID}
                setShowNew={setShowNew}
                setModalInfo={setModalInfo}
              />
            ) : null}
          </div>
          {provided.placeholder}

          {!newcard ? (
            <Button onClick={() => setNewCard(true)} variant="text">
              <AddIcon className={classes.addACardBtn} />
              <span className={classes.text}>Add a Card</span>
            </Button>
          ) : null}
          {/* {newcard ? (
            <Button onClick={() => setNewCard(false)}>
              <CloseIcon className={classes.addACardBtn} />
            </Button>
          ) : null} */}
        </div>
      )}
    </Droppable>
  );
  // return (
  //     <Droppable droppableId={props.dropid}>
  //         {(provided)=>
  //             <div ref={provided.innerRef} {...provided.droppableProps}>
  //             <h1>{props.title}</h1>
  //             <Company companies={props.companies} />
  //             {provided.placeholder}
  //         </div>
  //         }
  //     </Droppable>

  // const categoriesList = props.categories
  // categoriesList.map(({category_id, category_name})=>{
  //     return(
  //         <li key={category_id}>
  //         <p>{category_name}</p>
  //     </li>
  //     )
}

export default CategoriesColumn;

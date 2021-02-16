import CategoriesColumn from "./categories";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import backendService from "../../services/backendAPI";
import Newcolumn from "./newcolumn";
import EditCard from "./EditCard";
import DeleteColumnConfirmation from "./deletecolnconfirmation";
import DeleteCardConfirmation from "./deletecardconfirmation";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import NewCompModal from "./NewCompModal";

const useStyles = makeStyles((theme) => ({
  entireContainer: {
    display: "flex",
  },
  addNewColumn: {
    margin: theme.spacing(1),
  },
  addNewColumnBtn: {
    backgroundColor: "#FFFFCC",
    color: "black",
    "&:hover": {
      color: "white",
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

export default function MainBoard() {
  const classes = useStyles();

  let [newColumn, setNewColumn] = useState(false);
  let [colns, setColns] = useState(null);
  let [allresult, setAllResult] = useState(null);
  let [columnList, setColumnList] = useState(null);
  let [show, setShow] = useState(false);
  let [info, setInfo] = useState([]);
  let [showNew, setShowNew] = useState(false);
  let [modalInfo, setModalInfo] = useState("");

  // job status delete modal
  let [deleteColnConfirm, setDeleteColnConfirm] = useState(false);
  let [columnTitle, setColumnTitle] = useState(null);
  let [columnBackendId, setColumnBackendId] = useState(null);

  //company delete modal
  let [deleteCardConfirm, setDeleteCardConfirm] = useState(false);
  let [deleteCardInfo, setDeleteCardInfo] = useState([]);

  function getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  useEffect(() => {
    backendService
      .render(getCurrentUser().email)
      .then((result) => {
        setAllResult(result.data.allResult);
      })

      .catch((err) => console.log(err));
  }, []);

  const dragEnd = (result) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    if (type === "company") {
      backendService
        .dragJob(
          getCurrentUser().email,
          draggableId,
          source.droppableId,
          source.index,
          destination.droppableId,
          destination.index
        )
        .then((result) => {
          backendService
            .render()
            .then((newresult) => {
              setAllResult(newresult.data.allResult);
            })
            .catch((err) => console.log(err));
        });
    } else {
      backendService
        .dragStatus(
          getCurrentUser().email,
          allresult[source.index]["_id"],
          source.index,
          destination.index
        )
        .then((result) => {
          backendService
            .render()
            .then((newresult) => {
              setAllResult(newresult.data.allResult);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  if (!allresult) {
    return null;
  }
  function editShow(value, ...statusAndCompany) {
    setInfo(statusAndCompany);
    setShow(value);
  }

  return (
    <DragDropContext onDragEnd={dragEnd}>
      <span className={classes.addNewColumn}>
        <Button
          variant="outlined"
          className={classes.addNewColumnBtn}
          onClick={() => setNewColumn(true)}
        >
          Add new column
        </Button>
      </span>
      <Grid container>
        <Droppable
          droppableId="all-columns"
          type="columns"
          direction="horizontal"
        >
          {(provided) => (
            <Grid
              className={classes.entireContainer}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {Array.isArray(allresult) && allresult.length !== 0 ? (
                <>
                  {" "}
                  {allresult.map((column, index) => {
                    return (
                      <Draggable
                        key={column._id}
                        draggableId={column._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={classes.jobColumn}
                          >
                            <CategoriesColumn
                              dropid={column.jobstatus}
                              title={column.jobstatus}
                              companies={column.joblist}
                              index={index}
                              setColns={setColns}
                              setColumnList={setColumnList}
                              colns={colns}
                              getCurrentUser={getCurrentUser}
                              setAllResult={setAllResult}
                              allresult={allresult}
                              statusID={column._id}
                              columnEdit={editShow}
                              setDeleteColnConfirm={setDeleteColnConfirm}
                              setColumnTitle={setColumnTitle}
                              setColumnBackendId={setColumnBackendId}
                              setDeleteCardConfirm={setDeleteCardConfirm}
                              setDeleteCardInfo={setDeleteCardInfo}
                              setShowNew={setShowNew}
                              setModalInfo={setModalInfo}
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                </>
              ) : (
                ""
              )}
              {provided.placeholder}
              {newColumn ? (
                <Newcolumn
                  setAllResult={setAllResult}
                  allresult={allresult}
                  getCurrentUser={getCurrentUser}
                  setNewColumn={setNewColumn}
                  setShowNew={setShowNew}
                  setModalInfo={setModalInfo}
                />
              ) : (
                ""
              )}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
        <NewCompModal
          showNew={showNew}
          setShowNew={setShowNew}
          modalInfo={modalInfo}
          setModalInfo={setModalInfo}
        />
        <EditCard
          open={show}
          setOpen={editShow}
          info={info}
          setAllResult={setAllResult}
          setShowNew={setShowNew}
          setModalInfo={setModalInfo}
        />
        <DeleteColumnConfirmation
          columnBackendId={columnBackendId}
          columnTitle={columnTitle}
          deleteColnConfirm={deleteColnConfirm}
          setDeleteColnConfirm={setDeleteColnConfirm}
          setAllResult={setAllResult}
          getCurrentUser={getCurrentUser}
        />
        <DeleteCardConfirmation
          deleteCardConfirm={deleteCardConfirm}
          setDeleteCardConfirm={setDeleteCardConfirm}
          setAllResult={setAllResult}
          getCurrentUser={getCurrentUser}
          deleteCardInfo={deleteCardInfo}
        />
      </Grid>
    </DragDropContext>
  );
}

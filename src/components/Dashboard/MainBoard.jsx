import "./MainBoard.css";
import CategoriesColumn from "./categories";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import backendService from "../../services/backendAPI";
import Newcolumn from "./newcolumn";
import EditCard from "./EditCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  entireContainer: {
    display: "flex",
  },
}));

export default function MainBoard() {
  const classes = useStyles();
  //  const companiesList = {
  //   'company_id_1': { company_id: 'company_id_1',
  //     company_name: 'Zendesk',
  //    position: 'Full-stack web developer'
  // },
  // 'company_id_2': {
  //  company_id: 'company_id_2',
  //  company_name: 'Ahrefs',
  //  position: 'Reasonml developer'
  // },

  // 'company_id_3': {company_id: 'company_id_3',
  // company_name: 'Thoughtworks',
  // position: "Full-stack web developer"
  // }
  //  }

  // const columnsList = {
  //   column_id_1: {
  //     column_id: "column_id_1",
  //     column_title: "Companies to apply to",
  //     jobs: [
  //       {
  //         company_id: "company_id_1",
  //         company_name: "Zendesk",
  //         position: "Full-stack web developer",
  //       },
  //       {
  //         company_id: "company_id_2",
  //         company_name: "Ahrefs",
  //         position: "Reasonml developer",
  //       },

  //       {
  //         company_id: "company_id_3",
  //         company_name: "Thoughtworks",
  //         position: "Full-stack web developer",
  //       },
  //     ],
  //   },
  //   column_id_2: {
  //     column_id: "column_id_2",
  //     column_title: "Resume sent",
  //     jobs: [
  //       {
  //         company_id: "company_id_4",
  //         company_name: "NinjaVan",
  //         position: "Full-stack web developer",
  //       },
  //     ],
  //   },

  //   column_id_3: {
  //     column_id: "column_id_3",
  //     column_title: "Interview attended",
  //     jobs: [],
  //   },
  //   column_id_4: {
  //     column_id: "column_id_4",
  //     column_title: "Job offers",
  //     jobs: [],
  //   },
  // };

  // const columns = ["column_id_1", "column_id_2", "column_id_3", "column_id_4"];

  let [newColumn, setNewColumn] = useState(false);
  let [colns, setColns] = useState(null);
  let [allresult, setAllResult] = useState(null);
  let [columnList, setColumnList] = useState(null);
  let [show, setShow] = useState(false);
  let [info, setInfo] = useState([]);

  function getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  useEffect(() => {
    backendService
      .render(getCurrentUser().email)
      .then((result) => {
        setAllResult(result.data.allResult);
        // console.log(result.data.allResult)
      })

      .catch((err) => console.log(err));
  }, []);

  //    const columns  = {};
  //    let columnlisting = [];
  //    for (let i=0; i < result.data.allResult.length; i++) {
  //      columns[result.data.allResult[i].jobstatus] = {column_id: result.data.allResult[i].jobstatus, jobs: result.data.allResult[i].joblist}
  //       columnlisting.push(result.data.allResult[i].jobstatus)
  //     }
  //    setColns(columns)
  //   setColumnList(columnlisting)

  //   })
  //     .catch((err) => console.log(err));
  // }, []);

  //instead of implementing frontend logic to just call the render backend

  //  const columns  = {};
  //  let columnlisting = [];
  //  for (let i=0; i < result.data.allResult.length; i++) {
  //    columns[result.data.allResult[i].status.jobstatus] = {column_id: result.data.allResult[i].status.jobstatus, jobs: result.data.allResult[i].joblist}
  //     columnlisting.push(result.data.allResult[i].status.jobstatus)
  //   }
  //  setColns(columns)
  // setColumnList(columnlisting)

  // setAllResult(result.data.allResult);
  //       console.log(result.data.allResult);
  //       const columns = {};
  //       let columnlisting = [];
  //       for (let i = 0; i < result.data.allResult.length; i++) {
  //         columns[result.data.allResult[i].jobstatus] = {
  //           column_id: result.data.allResult[i].jobstatus,
  //           jobs: result.data.allResult[i].joblist,
  //         };
  //         columnlisting.push(result.data.allResult[i].jobstatus);
  //       }
  //       setColns(columns);
  //       setColumnList(columnlisting);
  //     })

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
      // backendService.updateJob(true, draggableId, destination.droppableId, destination.index)
      backendService
        .dragJob(
          draggableId,
          source.droppableId,
          source.index,
          destination.droppableId,
          destination.index
        )
        .then((result) => {
          backendService
            .render(getCurrentUser().email)
            .then((newresult) => {
              setAllResult(newresult.data.allResult);
            })
            .catch((err) => console.log(err));
        });
    } else {
      backendService
        .dragStatus(
          allresult[source.index]["_id"],
          source.index,
          destination.index
        )
        .then((result) => {
          backendService
            .render(getCurrentUser().email)
            .then((newresult) => {
              setAllResult(newresult.data.allResult);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  // .then(result=>{

  //   const oldcolnewJobList = Array.from(colns[source.droppableId].jobs);
  //   let newcolnewJobList =  Array.from(colns[destination.droppableId].jobs);
  //   const dragItem =  oldcolnewJobList.splice(source.index, 1);

  //   if (source.droppableId === destination.droppableId) {
  //      newcolnewJobList = oldcolnewJobList;
  //    }

  // newcolnewJobList.splice(destination.index, 0, dragItem[0]);

  //   const newoldColumn = {
  //     ...colns[source.droppableId],
  //     jobs: oldcolnewJobList,
  //   };
  //   const newnewColumn = {
  //     ...colns[destination.droppableId],
  //     jobs: newcolnewJobList,
  //   };
  //   setColns((prev) => ({
  //     ...prev,
  //     [source.droppableId]: newoldColumn,
  //     [destination.droppableId]: newnewColumn,
  //   }));

  // })
  // .catch(err=> console.log(err))

  // backendService
  //   .dragJob(
  //     draggableId,
  //     source.droppableId,
  //     source.index,
  //     destination.droppableId,
  //     destination.index
  //   )

  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .then((result) => {
  //     const oldcolnewJobList = Array.from(colns[source.droppableId].jobs);
  //     let newcolnewJobList = Array.from(colns[destination.droppableId].jobs);
  //     const dragItem = oldcolnewJobList.splice(source.index, 1);

  //     if (source.droppableId === destination.droppableId) {
  //       newcolnewJobList = oldcolnewJobList;
  //     }

  //     newcolnewJobList.splice(destination.index, 0, dragItem[0]);

  //     const newoldColumn = {
  //       ...colns[source.droppableId],
  //       jobs: oldcolnewJobList,
  //     };
  //     const newnewColumn = {
  //       ...colns[destination.droppableId],
  //       jobs: newcolnewJobList,
  //     };
  //     setColns((prev) => ({
  //       ...prev,
  //       [source.droppableId]: newoldColumn,
  //       [destination.droppableId]: newnewColumn,
  //     }));
  //   })
  //   .catch((err) => console.log(err));

  if (!allresult) {
    return null;
  }
  function editShow(value, ...statusAndCompany) {
    setInfo(statusAndCompany);
    setShow(value);
  }

  return (
    <DragDropContext onDragEnd={dragEnd}>
      <span>
        <Button
          variant="outlined"
          color="primary"
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
                        key={column.jobstatus}
                        draggableId={column.jobstatus}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="job-column"
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
              {/* {newColumn ? (
                <Newcolumn
                  setAllResult={setAllResult}
                  allresult={allresult}
                  getCurrentUser={getCurrentUser}
                  setNewColumn={setNewColumn}
                />
              ) : (
                ""
              )} */}
              {provided.placeholder}
              {newColumn ? (
                <Newcolumn
                  setAllResult={setAllResult}
                  allresult={allresult}
                  getCurrentUser={getCurrentUser}
                  setNewColumn={setNewColumn}
                />
              ) : (
                ""
              )}

              {provided.placeholder}
            </Grid>
          )}
        </Droppable>

        <EditCard open={show} setOpen={editShow} info={info} />
      </Grid>
    </DragDropContext>
  );
}

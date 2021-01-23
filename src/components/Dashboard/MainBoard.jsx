import "./MainBoard.css";
import CategoriesColumn from "./categories";
import { DragDropContext } from "react-beautiful-dnd";
import { useEffect, useState } from "react";

import axios from "axios";

export default function MainBoard() {
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

  const columnsList = {
    column_id_1: {
      column_id: "column_id_1",
      column_title: "Companies to apply to",
      jobs: [
        {
          company_id: "company_id_1",
          company_name: "Zendesk",
          position: "Full-stack web developer",
        },
        {
          company_id: "company_id_2",
          company_name: "Ahrefs",
          position: "Reasonml developer",
        },

        {
          company_id: "company_id_3",
          company_name: "Thoughtworks",
          position: "Full-stack web developer",
        },
      ],
    },
    column_id_2: {
      column_id: "column_id_2",
      column_title: "Resume sent",
      jobs: [
        {
          company_id: "company_id_4",
          company_name: "NinjaVan",
          position: "Full-stack web developer",
        },
      ],
    },

    column_id_3: {
      column_id: "column_id_3",
      column_title: "Interview attended",
      jobs: [],
    },
    column_id_4: {
      column_id: "column_id_4",
      column_title: "Job offers",
      jobs: [],
    },
  };

  const columns = ["column_id_1", "column_id_2", "column_id_3", "column_id_4"];

  //  const [comList, setComList] = useState(companiesList)
  const [colnList, setColnList] = useState(columnsList);
  //  const [colns, setColns]= useState(columns)
  const [allresult, setAllResult] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/render")
      .then((result) => {
        setAllResult(result.data.allResult);
      })
      .catch((err) => console.log(err));
  });

  const dragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const oldcolnewJobList = Array.from(colnList[source.droppableId].jobs);
    let newcolnewJobList = Array.from(colnList[destination.droppableId].jobs);
    const dragItem = oldcolnewJobList.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      newcolnewJobList = oldcolnewJobList;
    }

    newcolnewJobList.splice(destination.index, 0, dragItem[0]);

    const newoldColumn = {
      ...colnList[source.droppableId],
      jobs: oldcolnewJobList,
    };
    const newnewColumn = {
      ...colnList[destination.droppableId],
      jobs: newcolnewJobList,
    };
    setColnList((prev) => ({
      ...prev,
      [source.droppableId]: newoldColumn,
      [destination.droppableId]: newnewColumn,
    }));

    //Make an api call to the backend to update when there is change in reordering
    //the data that I would be posting
    //  current job status : colnList[destination.droppableID].column_title
    //  company_name being dragged :
    //make an api call to the backend to obtain my columns, i.e. status model
    // retrieve all my total status and den display them using .map
    //also for each coln, need to obtain all the jobs that are with status 'column'
    //in addition we need to arrange the jobs based on the order id (using splice method)
    //for each coln I need a unique col id, title is the job status
    //and also the companies in the job status
  };

  if (!allresult) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={dragEnd}>
      <div className="entire-container">
        {allresult.map((column, index) => {
          return (
            <div key={column.status.jobstatus} className="job-column">
              <CategoriesColumn
                dropid={column.status.jobstatus}
                title={column.status.jobstatus}
                companies={column.joblist}
                index={index}
              />
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}
import "./MainBoard.css";
import CategoriesColumn from "./categories";
import { DragDropContext } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import backendService from "../../services/backendAPI";

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


  let [colns, setColns]= useState(null)
  let [allresult, setAllResult] = useState(null);
  let [columnList, setColumnList] = useState(null)

  useEffect(() => {
    backendService
      .render(getCurrentUser().email) //boon xian: please input user email
      .then((result) => {
         setAllResult(result.data.allResult);

     const columns  = {};
     let columnlisting = [];
     for (let i=0; i < result.data.allResult.length; i++) {
       columns[result.data.allResult[i].status.jobstatus] = {column_id: result.data.allResult[i].status.jobstatus, jobs: result.data.allResult[i].joblist}
        columnlisting.push(result.data.allResult[i].status.jobstatus)
      } 
     setColns(columns)
    setColumnList(columnlisting)
     
     
    })   
      .catch((err) => console.log(err));
  }, []);


   const dragEnd = (result) => {
        const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    backendService.updateJob(true, draggableId, destination.droppableId, destination.index)
    
    .then(result=> {console.log(result)
  
    })
    .then(result=>{
      
      const oldcolnewJobList = Array.from(colns[source.droppableId].jobs);
      let newcolnewJobList =  Array.from(colns[destination.droppableId].jobs);
      const dragItem =  oldcolnewJobList.splice(source.index, 1);

  
      if (source.droppableId === destination.droppableId) {
         newcolnewJobList = oldcolnewJobList;
       }
  
    newcolnewJobList.splice(destination.index, 0, dragItem[0]);
  
      const newoldColumn = {
        ...colns[source.droppableId],
        jobs: oldcolnewJobList,
      };
      const newnewColumn = {
        ...colns[destination.droppableId],
        jobs: newcolnewJobList,
      };
      setColns((prev) => ({
        ...prev,
        [source.droppableId]: newoldColumn,
        [destination.droppableId]: newnewColumn,
      }));
  
    })
    .catch(err=> console.log(err))
   }
  


  if (!columnList) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={dragEnd}>
      <div className="entire-container">
        {columnList.map((column, index) => {
          return (
            <div key={column} className="job-column">
              <CategoriesColumn
                dropid={colns[column].column_id}
                title={colns[column].column_id}
                companies={colns[column].jobs}
                index={index}
              />
              
            </div>
          );
        })}
      </div>
    </DragDropContext>
    
  );
}

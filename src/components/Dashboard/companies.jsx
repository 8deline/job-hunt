// import react from React
import { Draggable } from "react-beautiful-dnd";
import NaturalDragAnimation from "natural-drag-animation-rbdnd";
import axios from "axios";
import qs from "qs";
import backendAPI from "../../services/backendAPI";

function Company(props) {
  const company = props.company;
  // console.log(company)

  const handleSubmit = (e) => {
    e.preventDefault();
    // let columnIndex = parseInt(props.index);
    // let columnId = props.allresult[props.coid]["_id"];
    // console.log(props.company["_id"]);
    axios
      .post(
        "http://localhost:5000/api/v1/delete/job",
        qs.stringify({
          statusid: props.allresult[props.coid]["_id"],
          jobid: props.company["_id"],
        })
      )
      .then((result) => {
        // console.log(result);
        backendAPI
          .render(props.getCurrentUser().email)
          .then((newresult) => {
            // console.log(newresult);
            props.setAllResult(newresult.data.allResult);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
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
              className={
                snapshot.draggingOver ? "job-cards-moving" : "job-cards"
              }
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={style}
            >
              <p>{company.companyname}</p>
              <p>{company.jobname}</p>
              <form onSubmit={handleSubmit}>
                <button type="submit">X</button>
              </form>
            </div>
          )}
        </NaturalDragAnimation>
      )}
    </Draggable>
  );

  // return(
  //     <ul className="job-ul" >
  //         {companiesList.map(({company_name, position, company_id}, index)=>{
  //         return (
  //             <Draggable draggableId={company_id} index={index}>
  //                 {(provided)=>{
  //                     <div>
  //                         <li key={company_id} className="job-cards" ref={provided.innerRef} {...provided.draggableProps}{...provided.dragHandleProps}>
  //                     <p>{company_name}</p>
  //                     <p>{position}</p>
  //                     </li>
  //                     </div>

  //                 }}

  //             </Draggable>

  //         )
  //     }

  //     )}
  //     </ul>
  // )
}

export default Company;

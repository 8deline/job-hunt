// import react from React
import { Draggable } from "react-beautiful-dnd";
import NaturalDragAnimation from "natural-drag-animation-rbdnd";

function Company(props) {
  const company = props.company;
  // console.log(company)

  return (
    <Draggable draggableId={company["_id"]} index={props.index}>
      {(provided, snapshot) => (
        <NaturalDragAnimation
          style={provided.draggableProps.style}
          snapshot={snapshot}
        >
          {(style) =>
              <div
                className= {snapshot.draggingOver? "job-cards-moving" : "job-cards"}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={style}
              >
                <p>{company.companyname}</p>
                <p>{company.jobname}</p>
              </div>
            

          }
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

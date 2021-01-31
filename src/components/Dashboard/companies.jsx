import { Draggable } from "react-beautiful-dnd";
import NaturalDragAnimation from "natural-drag-animation-rbdnd";
import backendAPI from "../../services/backendAPI";

function Company(props) {
  const company = props.company;
  const { companyEdit, index, backendID } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    backendAPI
      .deleteJob(props.allresult[props.coid]["_id"], props.company["_id"])
      .then((result) => {
        backendAPI
          .render(props.getCurrentUser().email)
          .then((newresult) => {
            props.setAllResult(newresult.data.allResult);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  const handleEdit = (e) => {
    if (e.target.tagName !== "BUTTON") {
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

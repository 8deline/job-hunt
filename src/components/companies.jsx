// import react from React
import {Draggable} from 'react-beautiful-dnd'

function Company (props) {
    const company = props.company;
    return (
        <Draggable draggableId={company.company_id.toString()} index={props.index}>
            {(provided)=> (
                    <div className="job-cards" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <p>{company.company_name}</p>
                    <p>{company.position}</p>
                </div>
            )}
        
        </Draggable>
        
    )   

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

export default Company
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function App() {
 const companies = [
   {company_name: 'Zendesk',
    position: 'Full-stack web developer'
},
{
  company_name: 'Ahrefs',
  position: 'Reasonml developer'
}
 ]
 return (
   <DragDropContext>
     <Droppable droppableId="companies">
       {(provided)=>(
         <ul className="companies" {...provided.droppableProps} ref={provided.innerRef}>
         {companies.map(({company_name, position}, index)=>{
           return (
             <Draggable key={company_name} draggableId={company_name} index={index}>
               {(provided)=>(
                 <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                 <div className="cards">
                 <p>company_name</p>
                 <p>position</p>
                 </div>
                 
               </li>
               )}
             </Draggable>
             
           )
         })}
       </ul>
       )}
     
     </Droppable>
     
   </DragDropContext>
    )
}

export default App;

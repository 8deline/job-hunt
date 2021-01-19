import './App.css';
import CategoriesColumn from './components/categories'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function App() {
 const companiesList = [
   { company_id: 1,
     company_name: 'Zendesk',
    position: 'Full-stack web developer'
},
{
  company_id: 2,
  company_name: 'Ahrefs',
  position: 'Reasonml developer'
},

{company_id: 3,
company_name: 'Thoughtworks',
position: "Full-stack web developer"
}
 ]

 const columns = [
   {column_id: 1,
    column_title: 'Companies to apply to',
    jobs: [{
       company_id: 1,
        company_name: 'Zendesk',
       position: 'Full-stack web developer'
   },
   {
     company_id: 2,
     company_name: 'Ahrefs',
     position: 'Reasonml developer'
   },
   
   {company_id: 3,
   company_name: 'Thoughtworks',
   position: "Full-stack web developer"
   }
    ]

  },
  {
    column_id: 2,
    column_title: 'Resume sent',
    jobs: [ {company_id: 3,
      company_name: 'Thoughtworks',
      position: "Full-stack web developer"
      }]
  },
  {
    column_id: 3,
    column_title: 'Interview attended',
    jobs: []
  },
  {
    column_id: 4,
    column_title: 'Job offers',
    jobs: []
  }
 ]


//  columns.map((column)=>{
//    return (
//     <div>
//       {/* <p>{column.column_id}</p>
//      <p>{column.column_title}</p> */}
//      <p>test</p>
//     </div>
    
//    )
//  })
 
   return(
    
    <div className="entire-container">
     {columns.map((column)=>{
    
    return(
      <div className="job-column">
      <CategoriesColumn key={column.column_id} title={column.column_title} companies={column.jobs}  />
      </div>
      )
})}

</div>

   )
 


//  return (
//    <DragDropContext>
//      <Droppable droppableId="companies">
//        {(provided)=>(
//          <ul className="companies" {...provided.droppableProps} ref={provided.innerRef}>
//          {companies.map(({company_name, position}, index)=>{
//            return (
//              <Draggable key={company_name} draggableId={company_name} index={index}>
//                {(provided)=>(
//                  <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
//                  <div className="cards">
//                  <p>company_name</p>
//                  <p>position</p>
//                  </div>
                 
//                </li>
//                )}
//              </Draggable>
             
//            )
//          })}
//        </ul>
//        )}
     
//      </Droppable>
     
//    </DragDropContext>
    // )
}

export default App;

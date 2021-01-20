import './App.css';
import CategoriesColumn from './components/categories'
import { DragDropContext} from 'react-beautiful-dnd';
import {useState} from 'react';


function App() {
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
   column_id_1: 
    {column_id: 'column_id_1',
      column_title: 'Companies to apply to',
      jobs: [{
         company_id: 'company_id_1',
          company_name: 'Zendesk',
         position: 'Full-stack web developer'
     },
     {
       company_id: 'company_id_2',
       company_name: 'Ahrefs',
       position: 'Reasonml developer'
     },
     
     {company_id: 'company_id_3',
     company_name: 'Thoughtworks',
     position: "Full-stack web developer"
     }
      ]
    },
    column_id_2:
    {
      column_id: 'column_id_2',
      column_title: 'Resume sent',
      jobs: [ {company_id: 'company_id_4',
        company_name: 'NinjaVan',
        position: "Full-stack web developer"
        }]
    },

    column_id_3:{
      column_id: 'column_id_3',
      column_title: 'Interview attended',
      jobs: []
    },
    column_id_4: {
      column_id: 'column_id_4',
      column_title: 'Job offers',
      jobs: []
    }
   }
 
   
 const columns = ['column_id_1','column_id_2', 'column_id_3', 'column_id_4']

//  const [comList, setComList] = useState(companiesList)
 const [colnList, setColnList] = useState(columnsList)
//  const [colns, setColns]= useState(columns)

const dragEnd = (result)=>{
const {source, destination} = result

if (!destination) {
  return
}

if (source.droppableId === destination.droppableId && source.index === destination.index) {
  return
}

 const oldcolnewJobList = Array.from(colnList[source.droppableId].jobs)
 let newcolnewJobList = Array.from(colnList[destination.droppableId].jobs)
 const dragItem = oldcolnewJobList.splice(source.index,1) 

 if (source.droppableId === destination.droppableId) {
  newcolnewJobList = oldcolnewJobList
 }

 newcolnewJobList.splice(destination.index,0, dragItem[0])

 const newoldColumn = {...colnList[source.droppableId], jobs: oldcolnewJobList}
 const newnewColumn = {...colnList[destination.droppableId], jobs: newcolnewJobList }
 setColnList(prev=>({
   ...prev,
   [source.droppableId]: newoldColumn,
   [destination.droppableId]: newnewColumn

 }))

}

  
 
   return(
    <DragDropContext onDragEnd={dragEnd}>
    <div className="entire-container">
     {columns.map((column)=>{
    
    return(
        <div key={column} className="job-column">
      <CategoriesColumn dropid={column} title={colnList[column].column_title} companies={colnList[column].jobs}  />
      </div>
      
      )
})}

</div>
</DragDropContext>

   )
 
}

export default App;

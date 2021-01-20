import './App.css';
import CategoriesColumn from './components/categories'
import { DragDropContext} from 'react-beautiful-dnd';
import {useState} from 'react';


function App() {
 const companiesList = {
  'company_id_1': { company_id: 'company_id_1',
    company_name: 'Zendesk',
   position: 'Full-stack web developer'
},
'company_id_2': {
 company_id: 'company_id_2',
 company_name: 'Ahrefs',
 position: 'Reasonml developer'
},

'company_id_3': {company_id: 'company_id_3',
company_name: 'Thoughtworks',
position: "Full-stack web developer"
}
 }

 const columnsList = {
   column_id_1: 
    {column_id: 'column_id_1',
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
    column_id_2:
    {
      column_id: 'column_id_2',
      column_title: 'Resume sent',
      jobs: [ {company_id: 3,
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

const dragEnd = (result)=>{

}
 const [comList, setComList] = useState(companiesList)
 
   return(
    <DragDropContext onDragEnd={dragEnd}>
    <div className="entire-container">
     {columns.map((column)=>{
    
    return(
        <div key={column} className="job-column">
      <CategoriesColumn dropid={column} title={columnsList[column].column_title} companies={columnsList[column].jobs}  />
      </div>
      
      )
})}

</div>
</DragDropContext>

   )
 
}

export default App;

import './App.css';
import CategoriesColumn from './components/categories'
import { DragDropContext} from 'react-beautiful-dnd';

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
      company_name: 'NinjaVan',
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
 
   return(
    <DragDropContext>
    <div className="entire-container">
     {columns.map((column)=>{
    
    return(
        <div key={column.column_id} className="job-column">
      <CategoriesColumn dropid={column.column_id} title={column.column_title} companies={column.jobs}  />
      </div>
      
      )
})}

</div>
</DragDropContext>

   )
 
}

export default App;

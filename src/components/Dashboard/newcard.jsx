 import {useState} from 'react'
 import axios from 'axios'
 import qs from 'qs'

 export default function Newcard({dropid, setNewCard, colns, setColns, getCurrentUser}) {
    let [newCompany, setNewCompany] = useState({companyname:"", jobname:"", jobstatus:dropid, email: getCurrentUser().email})
    let [newJobCard, setNewJobCard] = useState({companyname:"", jobname:""})
    //postential bug: if we dont return the updated data from backend, the companies length would not be updated
    const handleChange = ({target})=>{
        setNewCompany(prev=>({...prev,
            [target.name]: target.value
        })
        )

        
            setNewJobCard(prev=>({...prev,
            [target.name]: target.value
            })
            )
    }

    const handleSubmit = (event)=>{
        event.preventDefault()
        axios.post("http://localhost:5000/api/v1/create/job", qs.stringify(newCompany))
    .then(result=> {console.log(result)
        setNewCard(false)
        console.log(colns)
        let newArrayNewCard = Array.from(colns[dropid].jobs)
        console.log(newArrayNewCard)
        newArrayNewCard = [...newArrayNewCard, newJobCard]
        let newColumn = {...colns[dropid], jobs: newArrayNewCard}
        setColns(prev=>({
            ...prev,
            [dropid]: newColumn
        })
        )
    })
    
    .catch(err=> console.log(err))
    }   

    
     return (
        <div className="job-cards">
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} class="form-control form-control-sm" type="text" placeholder="Company name" aria-label=".form-control-sm example" name="companyname"/>
          <input onChange={handleChange} class="form-control form-control-sm" type="text" placeholder="Position" aria-label=".form-control-sm example" name="jobname" />

          <button>Add new card</button>
        </form>
          
          

        
      </div>
    
     )
        
     
 }
import {useState} from 'react'
import axios from 'axios'
import qs from 'qs'

export default function Newcolumn (props) {


    let [columnDetails, setColumnDetails] = useState({email: props.getCurrentUser().email, order: props.columnList.length, jobstatus:""})
    // let [columnContext, setColumnContext] = useState()
    
    const handleChange = ({target})=>{
        setColumnDetails(prev=>({
            ...prev,
            jobstatus: target.value
        }))
    }

    const handleSubmit = (event)=>{
        event.preventDefault()
        axios.post("http://localhost:5000/api/v1/create/status", qs.stringify(columnDetails))
    .then(result=> {console.log(result)
    
        props.setColumnList(prev=>([...prev, columnDetails.jobstatus ]))
        
        // let newColumn = {...colns[dropid], jobs: newArrayNewCard}
        // setColns(prev=>({
        //     ...prev,
        //     [dropid]: newColumn
        // })
        // )
    })
    
    .catch(err=> console.log(err))
    }   

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} class="form-control form-control-sm" type="text" placeholder="New job status" aria-label=".form-control-sm example" name="jobstatus"/>
            </form>
             <button onClick={()=>props.setNewColumn(false)}>X</button>
        </>
        
    )
    
}
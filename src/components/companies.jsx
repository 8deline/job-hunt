// import react from React

function Company (props) {
    const companiesList = props.companies;
    return(
        <ul className="job-ul" >
            {companiesList.map(({company_name, position, company_id})=>{
            return (
                <li key={company_id} className="job-cards">
                <p>{company_name}</p>
                <p>{position}</p>
            </li>
            )
        }

        )}   
        </ul>
    )
 
    
}

export default Company
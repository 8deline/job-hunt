// import react from React

function Company (props) {
    const companiesList = props.companies;
        companiesList.map(({company_name, position, company_id})=>{
            return (
                <li key={company_id}>
                <p>{company_name}</p>
                <p>{position}</p>
            </li>
            )
        }

        )    
    
}

export default Company
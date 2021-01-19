import Company from './companies' 

function CategoriesColumn(props) {

    return (
        <div>
            <h1>{props.title}</h1>
            <Company companies={props.companies} />
        </div>
        
        // <p>test</p>
    )

    // const categoriesList = props.categories
    // categoriesList.map(({category_id, category_name})=>{
    //     return(
    //         <li key={category_id}>
    //         <p>{category_name}</p>
    //     </li>
    //     )
        
    
}

export default CategoriesColumn;
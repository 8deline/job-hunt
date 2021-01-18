import Company from './companies' 

function CategoriesColumn(props) {

    return (
        <Company companies="test" />
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
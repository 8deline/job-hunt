import Company from "./companies";
import { Droppable } from "react-beautiful-dnd";

function CategoriesColumn(props) {
  const companiesList = props.companies;
  const coindex = props.index;

  return (
    <Droppable droppableId={props.dropid.toString()}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <div className="title">
            <h1>{props.title}</h1>
          </div>
          <div
            className={snapshot.isDraggingOver ? "columndrag" : "column-inside"}
          >
            {companiesList.map((company, index) => {
              return (
                <Company
                  key={company.company_id}
                  company={company}
                  index={index}
                />
              );
            })}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
  // return (
  //     <Droppable droppableId={props.dropid}>
  //         {(provided)=>
  //             <div ref={provided.innerRef} {...provided.droppableProps}>
  //             <h1>{props.title}</h1>
  //             <Company companies={props.companies} />
  //             {provided.placeholder}
  //         </div>
  //         }

  //     </Droppable>

  // <p>test</p>

  // const categoriesList = props.categories
  // categoriesList.map(({category_id, category_name})=>{
  //     return(
  //         <li key={category_id}>
  //         <p>{category_name}</p>
  //     </li>
  //     )
}

export default CategoriesColumn;

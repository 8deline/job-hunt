import Company from "./companies";
import Newcard from "./newcard";
import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import backendService from "../../services/backendAPI";

function CategoriesColumn(props) {
  const companiesList = props.companies;
  let [newcard, setNewCard] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    let columnIndex = parseInt(props.index);

    let columnId = props.allresult[columnIndex]["_id"];

    backendService
      .deleteStatus(columnId)
      .then((result) => {
        console.log("working");
        console.log(result);

        backendService
          .render(props.getCurrentUser().email)
          .then((newresult) => {
            props.setAllResult(newresult.data.allResult);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <Droppable droppableId={props.dropid.toString()} type="company">
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <form onSubmit={handleSubmit}>
            <button type="submit">Delete column</button>
          </form>

          <div className="title">
            <h1>{props.title}</h1>
          </div>
          <div
            className={snapshot.isDraggingOver ? "columndrag" : "column-inside"}
          >
            {companiesList.map((company, index) => {
              return (
                <Company key={company["_id"]} company={company} index={index} />
              );
            })}
            {newcard ? (
              <Newcard
                getCurrentUser={props.getCurrentUser}
                setNewCard={setNewCard}
                colns={props.colns}
                setColns={props.setColns}
                setColumnList={props.setColumnList}
                setAllResult={props.setAllResult}
                dropid={props.dropid}
              />
            ) : null}
          </div>
          {provided.placeholder}

          <button onClick={() => setNewCard(true)}>+</button>
          {newcard ? (
            <button onClick={() => setNewCard(false)}>X</button>
          ) : null}
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

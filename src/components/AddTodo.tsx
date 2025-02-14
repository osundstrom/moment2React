import { useState } from "react";
import "../AddTodo.css";

const AddTodo = ({atNewTodo}: {atNewTodo: Function}) => { 

    const [error, setError] = useState<string| null> (null);
    
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [status, setStatus] = useState<string>("");
//-------------------------------------------------------------------------------------------------//

    const atTitleForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    } 

    const atDescriptionForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const atStatusForm = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(event.target.value);
    }


//-------------------------------------------------------------------------------------------------//


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

   
    

    const newTodo = {
        title: title,
        description: description,
        status: status
    };

    if(!newTodo.title || !newTodo.description || newTodo.status == "" ) {
        setError("Samtliga fält måste fyllas i.");
        return;
    }

   
    try {
        const response = await fetch("http://localhost:3000/todo/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTodo)
            
        });


        if (!response.ok) {
            throw new Error("Error vid post");
        }


        const data = await response.json();

        if(!data.title || !data.description || data.status === "välj:" ) {
            setError("Samtliga fält måste fyllas i.");
        }
        console.log( data.title);

        setDescription("");
        setStatus("");
        setTitle("");
        
        setError(null);
        atNewTodo();
    }catch (error) {
        setError("Error vid post"+ error);
    }
}


    
return (
    <section id="sectionForm">
         {error && <p>{error}</p>}

    <form onSubmit={handleSubmit}>
        <label htmlFor="title">Titel:</label>
        <input onChange={atTitleForm} value={title}  id="title" type="text" className="form-control" placeholder="Uppgiftens namn" />


        <label htmlFor="description">Beskrivning:</label>
        <input onChange={atDescriptionForm} value={description}  id="description" type="text" className="form-control" placeholder="Kort beskrivning"  />

        <label htmlFor="status">Status:</label>
        <select onChange={atStatusForm} value={status} id="status" className="form-select" aria-label="Default select example" >
        <option defaultValue={""} value={""}>Välj:</option>
        <option value="Ej påbörjad">Ej påbörja</option>
        <option value="Pågående">Pågående</option>
        <option value="Avklarad">Avklarad</option>
        </select>

        <button type="submit" className="btn btn-primary">Lägg till</button>
        
    </form>
    </section>
    
    )
}



export default AddTodo;
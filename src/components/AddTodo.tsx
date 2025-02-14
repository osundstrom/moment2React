import { useState } from "react";
import "../AddTodo.css";

const AddTodo = ({atNewTodo}: {atNewTodo: Function}) => { 

    const [error, setError] = useState<string| null> (null);
    
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [status, setStatus] = useState<string>("");
//-------------------------------------------------------------------------------------------------//

    const atTitleForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        const titelValue = event.target.value
        setTitle(titelValue);
        if (titelValue.length < 3) {
            setError("Titel måste vara minst 3 tecken");
        } else {
            setError(null)
        }
    } 

    const atDescriptionForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        const discValue = event.target.value
        setDescription(discValue);
        if (discValue.length < 1) {
            setError("Beskrivning får ej vara tom");
        } else if (discValue.length > 200){
            setError("Beskrivning får max vara 200 tecken");
        }else {
            setError(null);
        }
    }

    const atStatusForm = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const statusValue = event.target.value;
    setStatus(statusValue)
    if (!statusValue) {
      setError("Du måste välja en status");
    } else {
      setError(null);
    }
    }


//-------------------------------------------------------------------------------------------------//


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();


    const newTodo = {
        title: title,
        description: description,
        status: status
    };
   
    try {
        const response = await fetch("http://localhost:3000/todo/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTodo)
            
        });

        if(!title || !description || status === "") {
            setError("Samtliga fält måste fyllas i.");
            return;
        }

        if (!response.ok) {
            throw new Error("Error vid post");
        }


        const data = await response.json();

       
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
         {error && <div className="alert alert-danger">{error}</div>}

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
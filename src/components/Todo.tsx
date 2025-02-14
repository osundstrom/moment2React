import { useState } from "react";

const Todo = ({todo, atStatUpdate, atDeleteTodo}: {todo: any, atStatUpdate: Function, atDeleteTodo: Function}) => {

    const statusTextColor = todo.status === "Avklarad" ? "green" : 
    todo.status === "Pågående" ? "orange" : "red";

    const [error, setError] = useState<string| null> (null);


//-----------------------------------------------------------------------------------------//
    const changeStat = async (event:any) => { 
        let updatedStatus = event.target.value;

        const updatedTodo = {...Todo, status: updatedStatus};

        try {
            const response = await fetch("http://localhost:3000/todo/" + todo._id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedTodo)
                
            });
            //const data = await response.json();

            if (!response.ok) {
                throw new Error("Error vid uppdatering av status");
            }

            atStatUpdate();
            
        }catch (error) {
            setError("Error vid ändring"+ error);
        }
    }

//-----------------------------------------------------------------------------------------//


const deleteTodo = async () => {
    try {
        const response = await fetch("http://localhost:3000/todo/" + todo._id, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Error vid radering av todo");
        }

        atDeleteTodo();

    } catch (error) {
        setError("Error vid radering:" + error);
    }
}





//-----------------------------------------------------------------------------------------//
    return (
        <div className="col-lg-4 col-md-6 col-sm-12 p-2" id="todoDiv">
            <h2>{todo.title}</h2>
            <p id="todoDesc">{todo.description}</p>
            <p style={{color: statusTextColor}}>{todo.status}</p>
            <hr />
            {error && <p>{error}</p>}
            <form className="mb-3 form-group">
                <label htmlFor="status">Ändra status:</label>
                <select name="status" id="status"  defaultValue={todo.status} onChange={changeStat}>
                    <option value="Avklarad">Avklarad</option>
                    <option value="Pågående">Pågående</option>
                    <option value="Ej påbörjad">Ej påbörjad</option>
                </select>
            </form>
            <button onClick={deleteTodo} className="btn btn-danger">Radera</button>
        </div>
        

    )
}

export default Todo
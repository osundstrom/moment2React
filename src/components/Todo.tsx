import { useState } from "react";

const Todo = ({ todo, atStatUpdate, atDeleteTodo }: { todo: any, atStatUpdate: Function, atDeleteTodo: Function }) => {

    // Sätter färgen på status
    const statusTextColor = todo.status === "Avklarad" ? "green" :
        todo.status === "Pågående" ? "orange" : "red";

    //state för error
    const [error, setError] = useState<string | null>(null);


    //-------------------------------------changeStatus----------------------------------------------------//

    const changeStat = async (event: any) => {
        let updatedStatus = event.target.value;

        //tar emot prop med nya status
        const updatedTodo = { ...todo, status: updatedStatus };

        //PUT förfrågan
        try {
            const response = await fetch("http://localhost:3000/todo/" + todo._id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedTodo)

            });
            //const data = await response.json();

            //Om response ej är ok
            if (!response.ok) {
                throw new Error("Error vid uppdatering av status");
            }

            //Uppdaterar listan via fetchTodos i föreldrakomponent
            atStatUpdate();

        } catch (error) {
            //felmmedelande
            setError("Error vid ändring" + error);
        }
    }

    //--------------------------------------DELETE---------------------------------------------------//


    const deleteTodo = async () => {
        //DELETE förfrågan
        try {
            const response = await fetch("http://localhost:3000/todo/" + todo._id, {
                method: "DELETE",
            });

            //Om respons ej är ok
            if (!response.ok) {
                throw new Error("Error vid radering av todo");
            }

            //Uppdaterar listan via fetchTodos i föreldrakomponent
            atDeleteTodo();

        } catch (error) {
            setError("Error vid radering:" + error);
        }
    }





    //-------------------------------------RETURN----------------------------------------------------//
    return (
        <div className="col-lg-4 col-md-6 col-sm-12 p-2" id="todoDiv">
            {/*Titel, beskrivning och status som ändrar färg*/}
            <h2>{todo.title}</h2>
            <p id="todoDesc">{todo.description}</p>
            <p style={{ color: statusTextColor }}>{todo.status}</p>
            <hr />
            {error && <p>{error}</p>}

            {/* Formulär för att ändra status */}
            <form className="mb-3 form-group">
                <label htmlFor="status">Ändra status:</label>
                <select name="status" id="status" defaultValue={todo.status} onChange={changeStat}>
                    <option value="Avklarad">Avklarad</option>
                    <option value="Pågående">Pågående</option>
                    <option value="Ej påbörjad">Ej påbörjad</option>
                </select>
            </form>
            {/* Kör deleteTodod vid klick*/}
            <button onClick={deleteTodo} className="btn btn-danger">Radera</button>
        </div>


    )
}

export default Todo
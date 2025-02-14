import { useState } from "react";
import "../AddTodo.css";

const AddTodo = ({ atNewTodo }: { atNewTodo: Function }) => {

    //-------------------------------------------State------------------------------------------------------//

    const [error, setError] = useState<string | null>(null);//state för error

    //state för alla inputs  
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [status, setStatus] = useState<string>("");

    //-------------------------------------------Validering------------------------------------------------------//

    //Validering för titel
    const atTitleForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        const titelValue = event.target.value
        setTitle(titelValue);
        if (titelValue.length < 3) { //title har minst 3 tecken
            setError("Titel måste vara minst 3 tecken");
        } else {
            setError(null)
        }
    }
    //Validering för description
    const atDescriptionForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        const discValue = event.target.value
        setDescription(discValue);
        if (discValue.length < 1) {
            setError("Beskrivning får ej vara tom");
        } else if (discValue.length > 200) { //under 200 tecken
            setError("Beskrivning får max vara 200 tecken");
        } else {
            setError(null);
        }
    }
    //Validering för status
    const atStatusForm = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const statusValue = event.target.value;
        setStatus(statusValue)
        if (!statusValue) { //om de har valts
            setError("Du måste välja en status");
        } else {
            setError(null);
        }
    }


    //----------------------------------------------Post/handle---------------------------------------------------//

    //när man klickar på submit(knappen)
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); //hindrar default

        //nytt objekt
        const newTodo = {
            title: title,
            description: description,
            status: status
        };

        //Validering efter klick på knapp, så alla fält är ifyllda.
        if (!title || !description || status === "") {
            setError("Samtliga fält måste fyllas i.");
            return;
        }

        //POST förfrågan
        try {
            const response = await fetch("https://backreact2.onrender.com/todo/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTodo)

            });

            //om response inte är ok
            if (!response.ok) {
                throw new Error("Error vid post"); //error
            }

            const data = await response.json();
            console.log(data)

            //Rensar formulär
            setDescription("");
            setStatus("");
            setTitle("");

            //rensa error
            setError(null);

            //uppdaterar listan
            atNewTodo();

        } catch (error) {
            setError("Error vid post" + error);
        }
    }

    //-------------------------------------------Retur------------------------------------------------------//


    return (
        <section id="sectionForm">
            {/* Visar felmeddelande*/}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* form som vid submit kör handleSubmit*/}
            <form onSubmit={handleSubmit}>

                {/* Input titel med onChange*/}
                <label htmlFor="title">Titel:</label>
                <input onChange={atTitleForm} value={title} id="title" type="text" className="form-control" placeholder="Uppgiftens namn" />

                {/* Input beskrivning med onChange*/}
                <label htmlFor="description">Beskrivning:</label>
                <input onChange={atDescriptionForm} value={description} id="description" type="text" className="form-control" placeholder="Kort beskrivning" />

                {/* select status med onChange*/}
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
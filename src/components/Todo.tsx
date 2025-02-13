
const Todo = ({todo}: {todo: any}) => {

    const statusTextColor = todo.status === "Avklarad" ? "green" : 
    todo.status === "Pågående" ? "yellow" : "red";


    return (
        <section className="todoSection">
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            <p style={{color: statusTextColor}}>{todo.status}</p>
            
            <form>
                <label htmlFor="status">Uppdatera status:</label>
                <select name="status" id="status" defaultValue={todo.status}>
                    <option value="Avklarad">Avklarad</option>
                    <option value="Pågående">Pågående</option>
                    <option value="Ej påbörjad">Ej påbörjad</option>
                </select>
            </form>
        </section>
    )
}

export default Todo
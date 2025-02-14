
const Todo = ({todo}: {todo: any}) => {

    const statusTextColor = todo.status === "Avklarad" ? "green" : 
    todo.status === "Pågående" ? "yellow" : "red";


    return (
        <div className="col-lg-4 col-md-6 col-sm-12 p-2" id="todoDiv">
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            <p style={{color: statusTextColor}}>{todo.status}</p>
            <hr />
            <form className="mb-3 form-group">
                <label htmlFor="status">Ändra status:</label>
                <select name="status" id="status"  defaultValue={todo.status}>
                    <option value="Avklarad">Avklarad</option>
                    <option value="Pågående">Pågående</option>
                    <option value="Ej påbörjad">Ej påbörjad</option>
                </select>
            </form>
        </div>
        

    )
}

export default Todo
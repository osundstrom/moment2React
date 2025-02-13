import { useState, useEffect } from "react";
import Todo from "./components/Todo";

interface oneTodo {
  id: string;
  title: string;
  description: string;
  status: string;
}


function App() {
 
  const [todos, setTodos] = useState<oneTodo[] | []> ([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string| null> (null);

  useEffect(() => {
    fetchTodos();
  }, []);

  //-------------------------------------------------------------------------//

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/todo");
      const data = await response.json();

      if (!response.ok) {
        throw new Error("fel:" + response.status);
      }

      setTodos(data);

    } catch (error) {

      setError("Fel vid hämtning av todos");
    }
    finally {
      setLoading(false);
    }
  }

  //-------------------------------------------------------------------------//

  return (
    <>
    <main>
    <h1>Todos</h1>

    {loading && <p>Läser in data...</p>}


    {error && <p>{error}</p>}

    <div className="todosDiv">
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </div>
    
    </main>
    </>
  )
}

export default App

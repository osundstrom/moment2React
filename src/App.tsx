import { useState, useEffect } from "react";
import Todo from "./components/Todo";
import Header from "./components/Head";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";


interface oneTodo {
  _id: string;
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
    <Header headline="Todos"/>
    <main className="container text-center mainFull">

    {loading && <p>Läser in data...</p>}


    {error && <p>{error}</p>}


    <div className="container text-start">
    <div className="row g-4 m-3">
 
      {todos.map((todo) => (
        <Todo todo={todo} key={todo._id} />
      ))}
    
  </div>
</div>

    
    </main>
    <Footer/>
    </>
  )
}

export default App

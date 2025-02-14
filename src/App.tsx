import { useState, useEffect } from "react";
import Todo from "./components/Todo";
import Header from "./components/Head";
import Footer from "./components/Footer";
import AddTodo from "./components/AddTodo";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

//Interface för en todo
interface oneTodo {
  _id: string;
  title: string;
  description: string;
  status: string;
}


function App() {

  //----------------------------------States------------------------------------------//
  const [todos, setTodos] = useState<oneTodo[] | []>([]); //state för todos
  const [loading, setLoading] = useState<boolean>(false); //state för ladda
  const [error, setError] = useState<string | null>(null); //state för error

  //Hämta all todos vid start av sidan
  useEffect(() => {
    fetchTodos();
  }, []);

  //--------------------------------Fetchtodos-----------------------------------------//

  const fetchTodos = async () => {
    //Fetch data från backend
    try {
      setLoading(true); //startar laddning/texten för laddning visas.

      const response = await fetch("http://localhost:3000/todo");
      const data = await response.json();

      //Om reposne ej är ok
      if (!response.ok) {
        throw new Error("fel:" + response.status);
      }

      //uppdaterar todo state med datan
      setTodos(data);

    } catch (error) {
      //vid fel
      setError("Fel vid hämtning av todos");
    }
    finally { //stoppar laddning, texten för visa att de laddas
      setLoading(false);
    }
  }

  //------------------------------Return-------------------------------------------//

  return (
    <>
      {/* Header komponent*/}
      <Header headline="Todos" />

      <main className="container text-center mainFull">

        {/* AddTodo komponent, med formulär*/}
        <AddTodo atNewTodo={fetchTodos} />

        {loading && <p>Läser in data...</p>}
        {error && <p>{error}</p>}

        <div className="container text-start">
          <div className="row g-4 m-3">

            {/* Loopar igenom och renderar alla todos*/}
            {todos.map((todo) => (
              <Todo todo={todo} key={todo._id} atStatUpdate={fetchTodos} atDeleteTodo={fetchTodos} />
            ))}

          </div>
        </div>


      </main>
      <Footer />
    </>
  )
}

export default App

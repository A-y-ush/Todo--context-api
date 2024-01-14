import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { TodoProvider } from "./context";
import { TodoForm } from "./components";
import { TodoItem } from "./components";

function App() {
  const [todos, setTodos] = useState([]); //todos is an array of objects
  const addTodo = (todo) => {
    //add todo to todos array
  setTodos((prevTodos) => [...prevTodos, {id:Date.now(),...todo}]);
  };

  const updateTodo = (id,updatedTodo) => {
    setTodos((prevTodos) => prevTodos.map((todo) => todo.id === id ? updatedTodo : todo));
  }
  const deleteTodo = (id) => {
    //delete todo from todos array
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }
  const toggleComplete = (id) => {
    //toggle todo complete
    setTodos((prevTodos) => prevTodos.map((todo) => todo.id === id ? {...todo,completed: !todo.completed} : todo));
  } 

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if(todos) {
      setTodos(todos);
    }
  },[]);

  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos));
  }, [todos]);


  return (
    <TodoProvider value={{todos,addTodo,deleteTodo,updateTodo,toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
            </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
              <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;

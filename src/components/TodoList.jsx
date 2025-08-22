import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleTodo, deleteTodo, clearTodos } from "../features/todos/todosSlice";
import { useState } from "react";

export default function TodoList() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [filter, setFilter] = useState('All');

  const filteredTodos = todos.filter(todo => {
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
    return true;
  })

  return (
    <section className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Create your Todo list</h2>
      <section className="flex mb-4">
        <input
          className="flex-grow border border-gray-200 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a todo item"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          onClick={() => {
            if (text.trim()) {
              dispatch(addTodo(text));
              setText("");
            }
          }}
        >
          Add
        </button>
      </section>
      <ul className="space-y-2">
        {filteredTodos.map((todo) => (
          <li
            className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded shadow-sm"
            key={todo.id}
          >
            <span
              onClick={() => dispatch(toggleTodo(todo.id))}
              className={`cursor-pointer ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.text}
            </span>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => dispatch(deleteTodo(todo.id))}
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <section className="border-t mt-4 rounded-b-lg bg-gray-50 px-6 py-3 flex flex-col shadow-md justify-center items-center mb-4">
        <section className="flex gap-2">
          <button
            onClick={() => setFilter("All")}
            className={`hover:cursor-pointer px-3 py-1 rounded ${
              filter === "All" ? "bg-blue-400 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("Active")}
            className={`hover:cursor-pointer px-3 py-1 rounded ${
              filter === "Active" ? "bg-yellow-400 text-white" : "bg-gray-200"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("Completed")}
            className={`hover:cursor-pointer px-3 py-1 rounded ${
              filter === "Completed" ? "bg-green-400 text-white" : "bg-gray-200"
            }`}
          >
            Completed
          </button>
        </section>
        <button
          onClick={() => dispatch(clearTodos())}
          className="text-sm bg-red-400 text-white hover:cursor-pointer rounded mt-3 px-3 py-1 hover:bg-red-600"
        >
          Clear All
        </button>
      </section>
    </section>
  );
}

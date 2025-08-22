import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  clearTodos,
} from "../features/todos/todosSlice";
import { useState } from "react";
import { IoClose } from 'react-icons/io5'

export default function TodoList() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "Active") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true;
  });

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
        {todos.length === 0 ? (
          // Entire todo list is empty
          <li className="bg-gray-100 text-center text-gray-500 italic px-4 py-6 rounded-lg shadow-md">
            <p className="text-sm">
              You currently have nothing on your todo list.
            </p>
            <p className="text-xs mt-1">
              Add a todo item to your list to get started ✅
            </p>
          </li>
        ) : filteredTodos.length === 0 && filter === "Completed" ? (
          <li className="bg-gray-100 text-center text-gray-500 italic px-4 py-6 rounded-lg shadow-md">
            <p className="text-sm">You have not completed any todo item yet.</p>
          </li>
        ) : filteredTodos.length === 0 && filter === "Active" ? (
          <li className="bg-gray-100 text-center text-gray-500 italic px-4 py-6 rounded-lg shadow-md">
            <p className="text-sm">🎉 You've completed all your todos!</p>
          </li>
        ) : (
          filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={`flex justify-between items-center bg-gray-50 px-3 py-2 rounded shadow-sm cursor-pointer transition-all duration-300 ${
                todo.completed ? "opacity-60" : "opacity-100"
              }`}
            >
              <span
                className={`flex-grow transition-opacity duration-300 ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.text}
              </span>

              <section className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch(toggleTodo(todo.id))}
                  title="Mark as completed"
                  className="w-5 h-5 rounded border-gray-300 accent-green-500 focus:ring-green-400 cursor-pointer"
                />
                <button
                  onClick={() => dispatch(deleteTodo(todo.id))}
                  title="Delete todo"
                  className="text-red-500 hover:text-red-700 hover:cursor-pointer text-lg"
                >
                  <IoClose />
                </button>
              </section>
            </li>
          ))
        )}
      </ul>

      {todos.length > 0 && (
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
                filter === "Completed"
                  ? "bg-green-400 text-white"
                  : "bg-gray-200"
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
      )}
    </section>
  );
}

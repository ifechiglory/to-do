import TodoList from "./components/TodoList";

export default function App() {
  return (
    <>
          <section className="min-h-screen bg-yellow-200 p-6">
              <h2 className="font-bold text-center underline uppercase mb-4 p-4 text-3xl">
                  To-dos
              </h2>
        <TodoList/>
      </section>
    </>
  );
}

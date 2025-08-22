import Footer from "./components/Footer";
import TodoList from "./components/TodoList";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-yellow-200">
      <main className="flex flex-1 justify-center items-center p-4 sm:p-6">
        <section className="w-full max-w-md">
          <h2 className="font-bold text-center underline uppercase mb-4 p-4 text-3xl">
            To-dos
          </h2>
          <TodoList />
        </section>
      </main>
      <Footer />
    </div>
  );
}

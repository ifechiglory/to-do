import Footer from "./components/Footer";
import TodoList from "./components/TodoList";

export default function App() {
  return (
    <section className="flex flex-col bg-yellow-200 min-h-screen">
      <main className="flex flex-col justify-center items-center flex-grow p-6">
        <h2 className="font-bold text-center underline uppercase mb-4 p-4 text-3xl">
          To-dos
        </h2>
        <TodoList />
      </main>
      <Footer />
    </section>
  );
}

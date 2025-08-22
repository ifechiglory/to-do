export default function Footer() {
  return (
    <footer className="mt-8 p-4 text-center text-sm text-gray-600 border-t">
      <p>
        Looking for the original version?{" "}
        <a
          href="https://github.com/ifechiglory/Todo-list"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-700 hover:underline"
        >
          View Todo App v1
        </a>
      </p>
      <p className="mt-2 text-xs text-gray-500">
        © 2025 • Built with ❤️ using React, Redux Toolkit & Tailwind
      </p>
    </footer>
  );
}

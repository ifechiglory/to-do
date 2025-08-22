import { createSlice, nanoid } from "@reduxjs/toolkit";

const loadTodos = () => {
    try {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

    const saveTodos = (todos) => {
        localStorage.setItem('todos', JSON.stringify(todos));
}
    
const todosSlice = createSlice({
    name: 'todos',
    initialState: loadTodos(),
    reducers: {
        addTodo: {
            reducer: (state, action) => {
                state.push(action.payload);
            },
            prepare: (text) => ({
                payload: {
                    id: nanoid(),
                    text,
                    completed: false,
                }
            })
        },
        toggleTodo: (state, action) => {
            const todo = state.find((t) => t.id === action.payload);
            if (todo) todo.completed = !todo.completed;
            saveTodos(state);
        },
        deleteTodo: (state, action) => {
            const newState = state.filter((t) => t.id !== action.payload);
            saveTodos(newState);
            return newState;
        },
        clearTodos: () => {
            localStorage.removeItem('todos');
            return [];
        }
    },
});

export const { addTodo, toggleTodo, deleteTodo, clearTodos } = todosSlice.actions;
export default todosSlice.reducer;
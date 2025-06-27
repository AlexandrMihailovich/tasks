import { STATUSES_DICTIONARY } from '@/entities/task/lib/statuses';
import { arrayMove } from '@dnd-kit/sortable';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MoveTaskPayload {
    taskId: string;
    newCategoryId: string;
    newIndex?: number;
}

export interface Task {
    id: string;
    categoryId: string;
    title: string;
    description: string;
    status: keyof typeof STATUSES_DICTIONARY;
    createdAt: string;
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState: [] as Task[],
    reducers: {
        moveTask: (state, action) => {
            const { taskId, newCategoryId, activeIndex, overIndex } = action.payload;
            const tasks = state.map(t => t.id === taskId ? { ...t, categoryId: newCategoryId } : t);
            return arrayMove(tasks, activeIndex, overIndex)
        },
        addTask: (state, action) => {
            return [action.payload, ...state];
        },
        changeTask: (state, action) => {
            return state.map(task => task.id === action.payload.id ? action.payload : task);
        },
        deleteTask: (state, action) => {
            return state.filter(task => task.id !== action.payload.id);
        }
        // ... другие редьюсеры
    }
});

export const { moveTask, addTask, changeTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
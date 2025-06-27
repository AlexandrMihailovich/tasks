import { arrayMove } from '@dnd-kit/sortable';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MoveTaskPayload {
    taskId: string;
    newCategoryId: string;
    newIndex?: number;
}

export interface Category {
    id: string;
    name: string
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState: [] as Category[],
    reducers: {
        // moveCat: (state, action: PayloadAction<MoveTaskPayload>) => {
        //     const { taskId, newCategoryId, newIndex } = action.payload;
        //     const taskIndex = state.findIndex(t => t.id === taskId);

        //     if (taskIndex === -1) return;

        //     const task = state[taskIndex];

        //     // Обновляем категорию
        //     const updatedTask = { ...task, categoryId: newCategoryId };

        //     // Удаляем задачу из текущей позиции
        //     state.splice(taskIndex, 1);

        //     // Вставляем на новую позицию
        //     if (newIndex !== undefined) {
        //         state.splice(newIndex, 0, updatedTask);
        //     } else {
        //         state.push(updatedTask);
        //     }
        // },
        moveCat: (state, action) => {
            const { сategoryId, activeIndex, overIndex } = action.payload;
            // const tasks = state.map(t => t.id === taskId ? { ...t, categoryId: newCategoryId } : t);
            return arrayMove(state, activeIndex, overIndex)
        },
        addCat: (state, action) => {
            return [action.payload, ...state];
        },
        changeCat: (state, action) => {
            return state.map(cat => cat.id === action.payload.id ? action.payload : cat);
        },
        deleteCat: (state, action) => {
            return state.filter(cat => cat.id !== action.payload.id);
        }
    }
});

export const { moveCat, addCat, changeCat, deleteCat } = taskSlice.actions;
export default taskSlice.reducer;
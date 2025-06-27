import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tasksReducer from '@/redux/slices/taskSlice';
import categoriesReducer from '@/redux/slices/categorySlice';
import { loadState, saveState } from '@/redux/localStorage';

// Определяем корневой тип состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    categories: categoriesReducer,
});

// Загружаем состояние из localStorage
const preloadedState = loadState();

export const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Игнорируем эти пути в состоянии (для Date объектов)
                ignoredPaths: ['tasks.createdAt']
            }
        })
});

// Сохраняем состояние в localStorage при изменениях
store.subscribe(() => {
    saveState(store.getState());
});

// Экспортируем типы для работы с хранилищем
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
import { useRef, useCallback } from 'react';

/**
 * Хук, который создает стабильную callback-функцию,
 * которая никогда не вызывает обновление компонента,
 * так как не создает новой функции при каждом рендере.
 * 
 * @template T - Тип функции
 * @param {T} fn - Исходная функция
 * @returns {T} - Стабильная версия функции
 */
export const useRefCallback = <T extends (...args: any[]) => any>(fn: T): T => {
    const callbackRef = useRef(fn);

    // Обновляем ref при каждом изменении функции
    callbackRef.current = fn;

    // Возвращаем стабильную callback-функцию
    return useCallback((...args: Parameters<T>): ReturnType<T> => {
        return callbackRef.current(...args);
    }, []) as T;
};
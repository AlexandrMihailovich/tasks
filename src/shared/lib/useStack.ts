import { useState } from 'react';

export function useStack<T>(initialStack: T[] = []) {
    const [stack, setStack] = useState<T[]>(initialStack);

    const push = (item: T): void => {
        setStack(prevStack => [...prevStack, item]);
    };

    const pop = (): T | undefined => {
        let poppedItem: T | undefined;
        if (stack.length > 0) {
            const newStack = [...stack];
            poppedItem = newStack.pop();
            setStack(newStack);
        }
        return poppedItem;
    };

    const peek = (): T | undefined => {
        return stack.length > 0 ? stack[stack.length - 1] : undefined;
    };

    const clear = (): void => {
        setStack([]);
    };

    const isEmpty = (): boolean => {
        return stack.length === 0;
    };

    const size = (): number => {
        return stack.length;
    };

    return {
        stack,
        push,
        pop,
        peek,
        clear,
        isEmpty,
        size,
    };
}

// Типы для возвращаемого значения
export type UseStackReturnType<T> = {
    stack: T[];
    push: (item: T) => void;
    pop: () => T | undefined;
    peek: () => T | undefined;
    clear: () => void;
    isEmpty: () => boolean;
    size: () => number;
};
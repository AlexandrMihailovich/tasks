import { RootState } from "./store";

export const loadState = () => {
  try {
    const serialized = localStorage.getItem('reduxState');
    return serialized ? JSON.parse(serialized) : undefined;
  } catch (e) {
    return undefined;
  }
};

export const saveState = (state: RootState) => {
  try {
    localStorage.setItem('reduxState', JSON.stringify(state));
  } catch (e) {
    console.error('LocalStorage save failed:', e);
  }
};

// redux/store.ts
const persistedState = loadState();


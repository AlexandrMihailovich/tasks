'use client' // Важно: помечаем как клиентский компонент

import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { ModalProvider } from '@/shared/lib/useModal';



export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <ModalProvider>
                {children}
            </ModalProvider>
        </Provider>
    )
}
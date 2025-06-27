import {
    createContext,
    useContext,
    useState,
    useMemo,
    useEffect,
    useCallback,
    ReactNode,
    ComponentType,
    FC,
    PropsWithChildren
} from 'react';
import { useStack } from './useStack';
import { useRefCallback } from './useRefCallback';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full shadow-xl">
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

interface DialogProps {
    fullWidth?: boolean;
    scroll?: 'body' | 'paper';
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | false;
}

export interface BaseModalProps {
    handleClose: (result?: any) => void;
}

interface RenderProps<T = any> {
    Component: ComponentType<T>;
    props: T;
    resolve: (result?: any) => void;
    reject: (reason?: any) => void;
    DialogProps: DialogProps;
}

interface ModalContextType {
    handleOpen: <T>(props?: Partial<T>, Component?: ComponentType<T>) => Promise<any>;
    handleClose: (result?: any) => void;
    open: boolean;
    render: RenderProps;
    setRender: (render: RenderProps) => void;
}

const DefaultComponent: FC = () => null;

const defaultContext: ModalContextType = {
    handleOpen: async () => { },
    handleClose: () => { },
    open: false,
    render: {
        Component: DefaultComponent,
        props: {},
        resolve: () => { },
        reject: () => { },
        DialogProps: {
            fullWidth: true,
            scroll: 'body',
            maxWidth: 'sm',
        }
    },
    setRender: () => { }
};

const ModalContext = createContext<ModalContextType>(defaultContext);

interface UseModalOptions<T = any> {
    Component?: ComponentType<T>;
    props?: T;
    DialogProps?: DialogProps;
}

export const useModal = <T extends object = {}>(
    { Component = DefaultComponent, props = {} as T, DialogProps = {} }: UseModalOptions<T> = {},
    deps: any[] = []
) => {
    const context = useContext(ModalContext);
    const [current, setCurrent] = useState<UseModalOptions<T> | undefined>({
        ...context.render,
        Component,
        props: {
            ...context.render.props,
            ...props,
        },
        DialogProps: {
            ...context.render.DialogProps,
            ...DialogProps
        }
    });

    useEffect(() => {
        setCurrent({
            ...context.render,
            Component,
            props: {
                ...context.render.props,
                ...props,
            },
            DialogProps: {
                ...context.render.DialogProps,
                ...DialogProps
            }
        });
    }, [...deps, Component]);

    const handleOpen = useRefCallback((p?: Partial<T>, Comp?: ComponentType<T>) => {
        return context.handleOpen({
            ...context.render,
            current,
            Component: Comp || Component,
            props: {
                ...context.render.props,
                ...props,
                ...p
            }
        });
    });

    return {
        ...context,
        handleOpen
    };
};

interface ModalProviderProps extends PropsWithChildren {
    [key: string]: any;
}

export const ModalProvider: FC<ModalProviderProps> = ({ children, ...props }) => {
    const { stack, peek, pop, push: setRender, isEmpty, clear } = useStack<RenderProps>([]);
    const render = peek();
    const open = !isEmpty();

    const setClose = useRefCallback((result?: any) => {
        const poppedItem = pop();
        
        if (poppedItem) {
            poppedItem.resolve(result);
        }
    });

    const context = useMemo(() => ({
        ...defaultContext,
        open,
        handleOpen: <T extends object>(current?: UseModalOptions<T>) => {
            return new Promise((resolve, reject) => {
                setRender({
                    ...defaultContext.render,
                    ...current,
                    resolve,
                    reject,
                    props: {
                        ...defaultContext.render.props,
                        ...(current?.props || {}),
                        handleClose: (result?: any) => {
                            setClose(result);
                        }
                    },
                    DialogProps: {
                        ...defaultContext.render.DialogProps,
                        ...current?.DialogProps,
                    }
                });
            });
        },
        setRender: () => {
            setClose(false);
        }
    }), [open, setClose, render]);

    return (
        <ModalContext.Provider {...props} value={context}>
            {children}
            {stack.map((render, i) => (
                <Modal
                    key={i}
                    isOpen={open}
                    onClose={() => setClose(false)}
                    {...(render?.DialogProps || {})}
                >
                    {!!render && (() => {
                        const { Component, props: renderProps, DialogProps } = render;
                        return <Component
                            {...{
                                ...renderProps,
                                handleClose: (result?: any) => {
                                    setClose(result);
                                },
                            }}
                        />;
                    })()}
                </Modal>
            ))}
        </ModalContext.Provider>
    );
};
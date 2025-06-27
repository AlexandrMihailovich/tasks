import { EditTask } from '@/features/edit-task/ui/EditTask';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addCat } from '@/redux/slices/categorySlice';
import { addTask, Task } from '@/redux/slices/taskSlice';
import { BaseModalProps } from '@/shared/lib/useModal';
import { Button } from '@/shared/ui';
import { SelectMenu } from '@/shared/ui/SelectMenu';
import { TextInput } from '@/shared/ui/TextInput';
import { useState } from 'react';

interface CreateTaskProps extends BaseModalProps {
    categoryId?: string
}

export const CreateTask = ({
    handleClose,
    categoryId = ''
}: CreateTaskProps) => {
    const [state, setState] = useState<Partial<Task>>({
        title: 'New Task',
        description: 'Description',
        status: 'process',
        categoryId,
    })
    const dispatch = useAppDispatch();

    const handleAdd = () => {
        dispatch(addTask({
            ...state,
            id: crypto.randomUUID(),
            createdAt: (new Date).toISOString()
            // categoryId: categoryId,
        }))
        handleClose()
    }

    return (
        <>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Создать задачу</h3>

            <EditTask
                task={state}
                onChange={setState}
            />



            <div className="flex justify-end space-x-3">
                <Button
                    variant="secondary"
                    onClick={() => handleClose()}
                    className="px-4 py-2"
                >
                    Отмена
                </Button>
                <Button
                    variant="primary"
                    onClick={handleAdd}
                    className="px-4 py-2"
                >
                    Создать
                </Button>
            </div>
        </>
    );
};
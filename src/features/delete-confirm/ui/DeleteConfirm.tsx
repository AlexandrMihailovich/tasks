import { EditTask } from '@/features/edit-task/ui/EditTask';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addCat } from '@/redux/slices/categorySlice';
import { addTask, Task } from '@/redux/slices/taskSlice';
import { BaseModalProps } from '@/shared/lib/useModal';
import { Button } from '@/shared/ui';
import { SelectMenu } from '@/shared/ui/SelectMenu';
import { TextInput } from '@/shared/ui/TextInput';
import { useState } from 'react';

export interface DeleteConfirmProps {
    title?: string
    message?: string
    handler: () => void
    handleClose?: (result?: any) => void;
}

export const DeleteConfirm = ({
    handleClose,
    title = '',
    message = '',
    handler

}: DeleteConfirmProps) => {

    const handleDelete = () => {
        handler()
        handleClose!(true)
    }

    return (
        <div className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 mb-6">{message}</p>

            <div className="flex justify-end space-x-3">
                <Button
                    variant="secondary"
                    onClick={() => handleClose!(false)}
                    className="px-4 py-2"
                >
                    Отмена
                </Button>
                <Button
                    variant="danger"
                    onClick={handleDelete}
                    className="px-4 py-2"
                >
                    Удалить
                </Button>
            </div>
        </div>
    );
};
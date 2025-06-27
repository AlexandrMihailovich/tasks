import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addCat } from '@/redux/slices/categorySlice';
import { addTask, Task } from '@/redux/slices/taskSlice';
import { BaseModalProps } from '@/shared/lib/useModal';
import { Button } from '@/shared/ui';
import { SelectMenu } from '@/shared/ui/SelectMenu';
import { TextInput } from '@/shared/ui/TextInput';
import { Dispatch, SetStateAction } from 'react';

interface CreateTaskProps {
    task: Partial<Task>
    onChange: Dispatch<SetStateAction<Partial<Task>>>
}

export const EditTask = ({
    task,
    onChange
}: CreateTaskProps) => {

    const { categories } = useAppSelector(state => ({
        categories: state.categories
    }));

    const catOptions = [{ label: 'Все', value: '' }, ...categories.map(n => ({ label: n.name, value: n.id }))]
    return (
        <div className="text-gray-600 mb-6">
            <TextInput
                label='Заголовок'
                value={task.title} onChange={e => onChange((p) => ({ ...p, title: e.target.value }))}
                className="mb-4"
            />
            <TextInput
                label='Описание'
                value={task.description} onChange={e => onChange((p) => ({ ...p, description: e.target.value }))}
                className="mb-4"
            />

            <SelectMenu
                label='Категория'
                options={catOptions}
                value={task.categoryId}
                onChange={(categoryId) => onChange((p) => ({ ...p, categoryId: categoryId! }))}
                placeholder="Категория"
                className="mb-4"
            />

            <SelectMenu
                label='Статус'
                options={[{ label: 'Выплонено', value: 'completed' }, { label: 'В работе', value: 'process' }]}
                value={task.status}
                onChange={(status) => onChange((p) => ({ ...p, status: status as Task['status'] }))}
                placeholder="Категория"
                className="mb-4"
            />
        </div>

    );
};
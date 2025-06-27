
'use client'
import { useCreateCategory } from '@/features/create-category/lib/useCreateCategory';
import { useCreateTask } from '@/features/create-task/lib/useCreateTask';
import { useAppSelector } from '@/redux/hooks';
import { Button } from '@/shared/ui';
import { SelectMenu } from '@/shared/ui/SelectMenu';
import { useState } from 'react';
import { sortTasks, SortOption } from '../lib/sortTasks';
import { TaskListItem } from './TaskLIstItem';


interface TaskListProps {

}

const ORDERS: { value: SortOption, label: string; }[] = [
    { value: 'date-asc', label: 'Сначала новые' },
    { value: 'date-desc', label: 'Сначала старые' },
    { value: 'title', label: 'По названию' },
    { value: 'status', label: 'По статусу' },
]

export const TaskList = ({

}: TaskListProps) => {

    const { tasks } = useAppSelector(state => ({
        tasks: state.tasks,
    }));
    const [order, setOrder] = useState<SortOption>(ORDERS[0].value)
    const { handleOpen } = useCreateCategory()
    const { handleOpen: createTask } = useCreateTask()

    return (
        <>
            <div className="mb-4 flex gap-2">

                <SelectMenu
                    options={ORDERS}
                    value={order}
                    onChange={(v) => setOrder(v as SortOption)}
                    placeholder="Сортировка"
                />
                <Button onClick={() => handleOpen()}>Создать категорию</Button>
                <Button onClick={() => createTask()}>Создать задачу</Button>
            </div>

            <div className="flex gap-2 flex-col">
                {sortTasks(tasks, order).map((value) => {
                    return (
                        <TaskListItem
                            task={value}
                            key={value.id}
                        />
                    );
                })}
            </div>
        </>
    );
};
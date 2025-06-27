
'use client'
import { TaskCard } from '@/entities/task/ui/TaskCard';
import { Button } from '@/shared/ui';
import Link from 'next/link';
import { Edit, Trash } from 'lucide-react';
import { useDeleteTask } from '@/features/delete-confirm/lib/useDeleteTask';
import { Task } from '@/redux/slices/taskSlice';


export const TaskListItem = ({
    task
}: { task: Task }) => {

    const { handleOpen: deleteTask } = useDeleteTask(task.id)
    return (

        <TaskCard
            createdAt={task.createdAt}
            title={task.title}
            status={task.status}
            actions={<>
                <Link
                    href={`/task/${task.id}`}
                    className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                    aria-label="Редактировать задачу"
                >
                    <Edit />
                </Link>
                <Button size='icon' variant='danger' onClick={() => deleteTask()}><Trash size={12} /></Button>

            </>}
        />

    );
};
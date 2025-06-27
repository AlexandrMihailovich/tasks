
'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskCard } from '@/entities/task/ui/TaskCard';
import { Task } from '@/redux/slices/taskSlice';
import { useDeleteTask } from '@/features/delete-confirm/lib/useDeleteTask';
import { Edit, Trash } from 'lucide-react'
import { Button } from '@/shared/ui';

export interface DragTaskCardProps {
    task: Task;
    id: string;
    categoryId: string;
    onDelete?: () => void;
}

export const DragTaskCard = ({
    task,
    id, categoryId,
}: DragTaskCardProps) => {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id, data: { categoryId } });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const { handleOpen: deleteTask } = useDeleteTask(id)

    return <TaskCard
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
        title={task.title}
        createdAt={task.createdAt}
        status={task.status}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
    />
};
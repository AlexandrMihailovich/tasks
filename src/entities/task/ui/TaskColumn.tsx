
'use client'
import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { AnimateLayoutChanges, defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Category } from '@/redux/slices/categorySlice';
import { Button } from '@/shared/ui';
import { Plus, GripVertical, Edit, Trash } from 'lucide-react'
import { useCreateTask } from '@/features/create-task/lib/useCreateTask';
import { useEditCategory } from '@/features/edit-category/lib/useEditCategory';
import { useDeleteCat } from '@/features/delete-confirm/lib/useDeleteCat';

export interface TaskColumnProps {
    children: React.ReactNode;

    style?: React.CSSProperties;



    ref?: any

    categoryId: string;
    category: Category
    taskCount: number
}

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true });
export const TaskColumn = ({
    categoryId,
    category,
    taskCount,
    children,



    ref,
    ...props
}: TaskColumnProps) => {


    const {
        active,
        attributes,
        isDragging,
        listeners,
        over,
        setNodeRef,
        transition,
        transform,
    } = useSortable({
        id: categoryId,
        data: {
            type: 'container',
            categoryId
        },
        animateLayoutChanges,
    });
    // const isOverContainer = over ? (categoryId === over.id && active?.data.current?.type !== 'container') : false

    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : undefined,
        zIndex: isDragging ? 10 : 0
    }

    const { handleOpen: createTask } = useCreateTask()

    const handleAddTask = (categoryId: string) => () => {
        createTask({
            categoryId
        })
    }

    const { handleOpen: editCat } = useEditCategory()

    const { handleOpen: deleteCat } = useDeleteCat(category.id)

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="h-full bg-gray-50 p-4 rounded-lg min-w-[300px] w-full max-w-md flex flex-col"
        >
            <div className='flex justify-between items-center mb-3'>
                <span {...attributes} {...listeners} className="text-gray-400 ml-1 font-normal">
                    <GripVertical />
                </span>
                <h3 className="font-bold text-gray-700 sticky top-0 bg-gray-50 py-2">
                    {category.name} <span className="text-gray-400 ml-1 font-normal">
                        ({taskCount})
                    </span>
                </h3>
                <div className='flex gap-2'>
                    <Button size='icon' onClick={handleAddTask(category.id)}><Plus size={12} /></Button>
                    <Button size='icon' onClick={() => editCat({ category })}><Edit size={12} /></Button>
                    <Button size='icon' variant='danger' onClick={() => deleteCat()}><Trash size={12} /></Button>
                </div>
            </div>
            <div className="flex-1 min-h-100">
                {children}
            </div>

        </div>
    );
};
'use client'
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import {
    DndContext,
    DragOverlay,
    DropAnimation,
    getFirstCollision,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    Modifiers,
    useDroppable,
    UniqueIdentifier,
    useSensors,
    useSensor,
    MeasuringStrategy,
    KeyboardCoordinateGetter,
    defaultDropAnimationSideEffects,
    DraggableSyntheticListeners,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    AnimateLayoutChanges,
    SortableContext,
    useSortable,
    arrayMove,
    defaultAnimateLayoutChanges,
    verticalListSortingStrategy,
    SortingStrategy,
    horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
    closestCorners,
    KeyboardCode,
    DroppableContainer as SrCo,
} from '@dnd-kit/core';
import { TaskColumn } from '@/entities/task/ui/TaskColumn';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { moveTask } from '@/redux/slices/taskSlice';
import { DragTaskCard } from './DragTaskCard';
const directions: string[] = [
    KeyboardCode.Down,
    KeyboardCode.Right,
    KeyboardCode.Up,
    KeyboardCode.Left,
];

const multipleContainersCoordinateGetter: KeyboardCoordinateGetter = (
    event,
    { context: { active, droppableRects, droppableContainers, collisionRect } }
) => {
    if (directions.includes(event.code)) {
        event.preventDefault();

        if (!active || !collisionRect) {
            return;
        }

        const filteredContainers: SrCo[] = [];

        droppableContainers.getEnabled().forEach((entry) => {
            if (!entry || entry?.disabled) {
                return;
            }

            const rect = droppableRects.get(entry.id);

            if (!rect) {
                return;
            }

            const data = entry.data.current;

            if (data) {
                const { type, children } = data;

                if (type === 'container' && children?.length > 0) {
                    if (active.data.current?.type !== 'container') {
                        return;
                    }
                }
            }

            switch (event.code) {
                case KeyboardCode.Down:
                    if (collisionRect.top < rect.top) {
                        filteredContainers.push(entry);
                    }
                    break;
                case KeyboardCode.Up:
                    if (collisionRect.top > rect.top) {
                        filteredContainers.push(entry);
                    }
                    break;
                case KeyboardCode.Left:
                    if (collisionRect.left >= rect.left + rect.width) {
                        filteredContainers.push(entry);
                    }
                    break;
                case KeyboardCode.Right:
                    if (collisionRect.left + collisionRect.width <= rect.left) {
                        filteredContainers.push(entry);
                    }
                    break;
            }
        });

        const collisions = closestCorners({
            active,
            collisionRect: collisionRect,
            droppableRects,
            droppableContainers: filteredContainers,
            pointerCoordinates: null,
        });
        const closestId = getFirstCollision(collisions, 'id');

        if (closestId != null) {
            const newDroppable = droppableContainers.get(closestId);
            const newNode = newDroppable?.node.current;
            const newRect = newDroppable?.rect.current;

            if (newNode && newRect) {
                if (newDroppable.id === 'placeholder') {
                    return {
                        x: newRect.left + (newRect.width - collisionRect.width) / 2,
                        y: newRect.top + (newRect.height - collisionRect.height) / 2,
                    };
                }

                if (newDroppable.data.current?.type === 'container') {
                    return {
                        x: newRect.left + 20,
                        y: newRect.top + 74,
                    };
                }

                return {
                    x: newRect.left,
                    y: newRect.top,
                };
            }
        }
    }

    return undefined;
};








const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: {
                opacity: '0.5',
            },
        },
    }),
};


interface Props {

}



export function TaskKanban({

}: Props) {


    const { tasks, categories } = useAppSelector(state => ({
        tasks: state.tasks,
        categories: state.categories
    }));
    const dispatch = useAppDispatch();


    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: multipleContainersCoordinateGetter,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const activeIndex = tasks.findIndex(item => item.id === active.id);
            const overIndex = tasks.findIndex(item => item.id === over.id);
            dispatch(moveTask({
                taskId: active.id.toString(),
                newCategoryId: over.data.current?.categoryId,
                activeIndex,
                overIndex
            }))
        }
        setActiveId(null);
    }

    const handleDragStart = ({ active }: DragEndEvent) => {
        setActiveId(active?.id);
    };

    const getActiveCard = () => {
        if (!activeId) return null;

        return tasks.find(item => item.id === activeId);
    };

    const activeCard = getActiveCard();
    return (
        <DndContext
            sensors={sensors}
            measuring={{
                droppable: {
                    strategy: MeasuringStrategy.Always,
                },
            }}
            onDragOver={({ active, over }) => {
                const overId = over?.data?.current?.categoryId;
                const activeId = active?.data?.current?.categoryId;

                if (overId == null) {
                    return;
                }

                const overContainer = categories.find(c => c.id === overId);
                const activeContainer = categories.find(c => c.id === activeId);

                if (!overContainer || !activeContainer) {
                    return;
                }

                if (activeContainer !== overContainer) {

                    const activeIndex = tasks.findIndex(item => item.id === active.id);
                    const overIndex = tasks.findIndex(item => item.id === overId);

                    dispatch(moveTask({
                        taskId: active.id.toString(),
                        newCategoryId: over?.data.current?.categoryId,
                        activeIndex,
                        overIndex
                    }))
                }
            }}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
        >
            <div
                style={{
                    display: 'inline-grid',
                    boxSizing: 'border-box',
                    padding: 20,
                    gridAutoFlow: 'column',
                }}
                className='h-full w-full gap-4'
            >
                <SortableContext
                    items={categories}
                    strategy={horizontalListSortingStrategy}
                >
                    {categories.map((category) => (
                        <TaskColumn
                            key={category.id}
                            category={category}
                            categoryId={category.id}
                            taskCount={tasks.filter(t => t.categoryId === category.id).length}



                        >
                            <SortableContext
                                // items={items[containerId]}
                                id={category.id}
                                items={tasks.filter(t => t.categoryId === category.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                {tasks
                                    .filter(task => task.categoryId === category.id).map((value, index) => {
                                        return (
                                            <DragTaskCard
                                                key={value.id}
                                                categoryId={category.id}
                                                id={value.id}
                                                task={value}
                                            />
                                        );
                                    })}
                            </SortableContext>
                        </TaskColumn>
                    ))}

                </SortableContext>
            </div>

            <DragOverlay dropAnimation={dropAnimation}>
                {activeCard && <DragTaskCard task={activeCard} id={activeCard.id} categoryId={''} onDelete={() => { }} />}
            </DragOverlay>

        </DndContext>
    );


}


'use client'
import { useDeleteTask } from "@/features/delete-confirm/lib/useDeleteTask";
import { EditTask } from "@/features/edit-task/ui/EditTask";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { changeTask } from "@/redux/slices/taskSlice";
import { Button } from "@/shared/ui";
import { useRouter } from "next/navigation";
import { use } from "react";

interface PageProps {
    params: Promise<{ id: string }>;
}
export default function Edit({ params }: PageProps) {
    const { id } = use(params);
    const router = useRouter();
    const { task } = useAppSelector(state => ({
        task: state.tasks.find(task => task.id === id)
    }));
    const dispatch = useAppDispatch();
    const { handleOpen: deleteTask } = useDeleteTask(id)


    if (!task) {
        return '404'
    }
    const onChange = (state: any) => {
        dispatch(changeTask(state(task)))
    }
    return <>
        <EditTask
            task={task}
            onChange={onChange}
        />

        <Button variant="danger" onClick={async () => {
            try {
                console.log('t')
                const result = await deleteTask()
                console.log('res', result)
                if (result) {
                    router.push('/');
                }
            } catch (error) {
                console.log('error', error)
            }
        }}>Удалить</Button>
    </>
}
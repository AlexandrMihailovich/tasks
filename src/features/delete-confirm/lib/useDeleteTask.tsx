import { useModal } from "@/shared/lib/useModal"
import { DeleteConfirm } from "../ui/DeleteConfirm"
import { useAppDispatch } from "@/redux/hooks";
import { deleteTask } from "@/redux/slices/taskSlice";


export const useDeleteTask = (taskId: string) => {
    const dispatch = useAppDispatch();

    return useModal({
        Component: DeleteConfirm,
        props: {
            handler: () => dispatch(deleteTask({ id: taskId })),
            message: 'Удалить задачу',
            title: 'Подтверждение',
        }
    })
}

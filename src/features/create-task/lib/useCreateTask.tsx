import { useModal } from "@/shared/lib/useModal"
import { CreateTask } from "../ui/CreateTask"


export const useCreateTask = () => {
    return useModal({
        Component: CreateTask,
    })
}
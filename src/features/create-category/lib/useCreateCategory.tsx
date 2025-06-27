import { useModal } from "@/shared/lib/useModal"
import { CreateCategoty } from "../ui/CreateCategoty"


export const useCreateCategory = () => {
    return useModal({
        Component: CreateCategoty,
    })
}
import { useModal } from "@/shared/lib/useModal"
import { EditCategory } from "../ui/EditCategory"


export const useEditCategory = () => {
    return useModal({
        Component: EditCategory,
    })
}
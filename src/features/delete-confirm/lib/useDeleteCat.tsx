import { useModal } from "@/shared/lib/useModal"
import { DeleteConfirm } from "../ui/DeleteConfirm"
import { useAppDispatch } from "@/redux/hooks";
import { deleteCat } from "@/redux/slices/categorySlice";


export const useDeleteCat = (catId: string) => {
    const dispatch = useAppDispatch();

    return useModal({
        Component: DeleteConfirm,
        props: {
            handler: () => dispatch(deleteCat({ id: catId })),
            message: 'Удалить категорию',
            title: 'Подтверждение',
        }
    })
}
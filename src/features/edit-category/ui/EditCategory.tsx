import { useAppDispatch } from '@/redux/hooks';
import { Category, changeCat } from '@/redux/slices/categorySlice';

import { BaseModalProps } from '@/shared/lib/useModal';
import { Button } from '@/shared/ui';
import { TextInput } from '@/shared/ui/TextInput';
import { useState } from 'react';

interface EditCategoryProps extends BaseModalProps {
    category: Category
}

export const EditCategory = ({
    handleClose,
    category
}: EditCategoryProps) => {
    const [name, setName] = useState(category.name)
    const dispatch = useAppDispatch();

    const handleAddCat = () => {
        dispatch(changeCat({
            id: category.id,
            name
        }))
        handleClose()
    }
    return (
        <>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Редактировать категорию</h3>
            <div className="text-gray-600 mb-6">
                <TextInput
                    label='Название'
                    value={name} onChange={e => setName(e.target.value)}
                    className="mb-4"
                />
            </div>

            <div className="flex justify-end space-x-3">
                <Button
                    variant="secondary"
                    onClick={() => handleClose()}
                    className="px-4 py-2"
                >
                    Отмена
                </Button>
                <Button
                    variant="primary"
                    onClick={handleAddCat}
                    className="px-4 py-2"
                >
                    Сохранить
                </Button>
            </div>
        </>
    );
};
'use client'
import Link from 'next/link'


interface ViewSwitcherProps {

}

export const ViewSwitcher = ({

}: ViewSwitcherProps) => {
    return (
        <div className={'flex items-center rounded-md bg-muted p-1'}>
            <Link
                href={`/list`}
                className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
            >
                list
            </Link>

            <Link
                href={`/`}
                className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
            >
                kanban
            </Link>
        </div>
    )
}
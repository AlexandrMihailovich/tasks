import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { STATUSES_DICTIONARY } from '../lib/statuses';

export interface TaskCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    ref?: any
    status?: keyof typeof STATUSES_DICTIONARY
    createdAt?: string
    title: string
    actions: ReactNode
    onToggleStatus?: () => void
}

export const TaskCard = ({
    status,
    onToggleStatus,
    title,
    actions,
    ref,
    createdAt,
    ...props
}: TaskCardProps) => {


    return (
        <div
            ref={ref}
            className={`
          bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3
          transition-all duration-200 hover:shadow-md
          ${status === 'completed' ? 'opacity-75' : 'opacity-100'}
        `}
        >
            <div className="flex items-start justify-between gap-2">
                <div {...props} className="flex items-start flex-1 min-w-0">


                    <div className="ml-3 flex-1 min-w-0">
                        <h3 className={`
                font-medium text-gray-800 break-words
                ${status === 'completed' ? 'line-through text-gray-500' : ''}
              `}>
                            {title}
                        </h3>

                        <div className="flex flex-wrap items-center mt-2 text-xs gap-2">
                            <span className={`px-2 py-1 rounded-full ${status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                {status && STATUSES_DICTIONARY[status]}
                            </span>
                            {createdAt && <span className={`px-2 py-1 rounded-full bg-green-100 text-green-800`}>
                                {new Date(createdAt).toLocaleDateString('ru-RU', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric'
                                })}
                            </span>}
                        </div>
                    </div>
                </div>

                <div className="flex space-x-1 ml-2">
                    {actions}
                </div>
            </div>
        </div>
    );
};
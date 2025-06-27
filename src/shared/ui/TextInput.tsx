'use client'
import { InputHTMLAttributes } from 'react'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    containerClassName?: string
    labelClassName?: string
    errorClassName?: string
}

export const TextInput = (
    {
        label,
        error,
        className = '',
        containerClassName = '',
        labelClassName = '',
        errorClassName = '',
        ...props
    }: TextInputProps
) => {
    return (
        <div className={`w-full ${containerClassName}`}>
            {label && (
                <label
                    htmlFor={props.id}
                    className={`block text-sm font-medium mb-1 text-gray-700 ${labelClassName}`}
                >
                    {label}
                </label>
            )}
            <input
                className={`
            w-full px-3 py-2 border rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:border-blue-500
            transition-colors duration-200
            ${error
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    }
            ${className}
          `}
                {...props}
            />
            {error && (
                <p
                    className={`mt-1 text-sm text-red-600 ${errorClassName}`}
                >
                    {error}
                </p>
            )}
        </div>
    )
}

TextInput.displayName = 'TextInput'
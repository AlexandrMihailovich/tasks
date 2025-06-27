'use client'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'

interface SelectMenuOption {
    value?: string | null
    label: string
    disabled?: boolean
}

interface SelectMenuProps {
    options: SelectMenuOption[]
    value?: string | null
    defaultValue?: string
    onChange?: (value?: string | null) => void
    placeholder?: string
    className?: string
    disabled?: boolean
    label?: string
    id?: string
}

export const SelectMenu = ({
    options,
    value,
    defaultValue,
    onChange,
    placeholder = 'Select...',
    className = '',
    disabled = false,
    label,
    id
}: SelectMenuProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState<string | null | undefined>(defaultValue || value || '')
    const selectRef = useRef<HTMLDivElement>(null)

    const selectedOption = options.find(opt => opt.value === selectedValue) || null

    useEffect(() => {
        if (value !== undefined) {
            setSelectedValue(value)
        }
    }, [value])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleSelect = (value?: string | null) => {
        if (onChange) {
            onChange(value)
        }
        setSelectedValue(value)
        setIsOpen(false)
    }

    const toggleMenu = () => {
        if (!disabled) {
            setIsOpen(!isOpen)
        }
    }

    return (
        <div
            ref={selectRef}
            className={`relative w-full ${className}`}
        >
            {label && (
                <label
                    htmlFor={id}
                    className={`block text-sm font-medium mb-1 text-gray-700`}
                >
                    {label}
                </label>
            )}
            <button
                id={id}
                type="button"
                onClick={toggleMenu}
                disabled={disabled}
                className={`
          w-full flex items-center justify-between px-4 py-2
          bg-white border border-gray-300 rounded-md shadow-sm
          text-left focus:outline-none focus:ring-2 focus:ring-blue-500
          ${disabled ? 'cursor-not-allowed bg-gray-100 opacity-70' : 'cursor-pointer hover:border-gray-400'}
        `}
            >
                <span className="truncate text-gray-800">
                    {selectedOption?.label || placeholder}
                </span>
                <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''
                        }`}
                />
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-auto">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => !option.disabled && handleSelect(option.value)}
                            disabled={option.disabled}
                            className={`
                w-full flex items-center justify-between px-4 py-2 text-left
                ${option.disabled ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer hover:bg-gray-100'}
                ${option.value === selectedValue ? 'bg-blue-50 text-blue-600' : 'text-gray-900'}
              `}
                        >
                            <span>{option.label}</span>
                            {option.value === selectedValue && (
                                <Check className="h-5 w-5 text-blue-600" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
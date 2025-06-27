import React, { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'danger'
    | 'success'
    | 'link';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    fullWidth?: boolean;
}

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    className = '',
    ...props
}: ButtonProps) => {

    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";


    const variantStyles: Record<ButtonVariant, string> = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500",
        outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-blue-500",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
        link: "bg-transparent text-blue-600 hover:text-blue-800 hover:underline focus:ring-blue-500 p-0"
    };


    const sizeStyles: Record<ButtonSize, string> = {
        sm: "text-xs py-1.5 px-3",
        md: "text-sm py-2 px-4",
        lg: "text-base py-2.5 px-6",
        icon: "p-2"
    };


    const buttonStyles = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${fullWidth ? 'w-full' : ''}
    ${variant !== 'link' ? 'shadow-sm hover:shadow-md' : ''}
    ${className}
  `;

    return (
        <button
            className={buttonStyles}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <Spinner className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />
                    {children && <span className="ml-2">{children}</span>}
                </>
            ) : (
                <>
                    {leftIcon && <span className="mr-2">{leftIcon}</span>}
                    {children}
                    {rightIcon && <span className="ml-2">{rightIcon}</span>}
                </>
            )}
        </button>
    );
};


const Spinner = ({ className }: { className?: string }) => (
    <svg
        className={`animate-spin ${className}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
    >
        <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
        ></circle>
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
    </svg>
);
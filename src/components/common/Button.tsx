import  { forwardRef, type ButtonHTMLAttributes,type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    loading?: boolean;
    icon?: ReactNode;
    children?: ReactNode;
    className?: string;
}

/**
 * Simple, accessible Button component
 * - variant: primary | secondary | ghost
 * - size: sm | md | lg
 * - supports loading state and optional icon
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    {
        variant = "primary",
        size = "md",
        loading = false,
        icon,
        children,
        disabled,
        className = "",
        ...rest
    },
    ref
) {
    const isDisabled = disabled || loading;

    const base =
        "inline-flex items-center justify-center gap-2 font-medium rounded focus:outline-none transition";
    const variants: Record<Variant, string> = {
        primary:
            "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400",
        secondary:
            "bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:bg-gray-50",
        ghost:
            "bg-transparent text-blue-600 hover:bg-blue-50 disabled:text-blue-200",
    };
    const sizes: Record<Size, string> = {
        sm: "px-2.5 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-3 text-lg",
    };

    const classes = [base, variants[variant], sizes[size], isDisabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer", className]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            ref={ref}
            className={classes}
            disabled={isDisabled}
            aria-busy={loading || undefined}
            {...rest}
        >
            {loading && (
                <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                </svg>
            )}
            {!loading && icon}
            {children}
        </button>
    );
});

export default Button;
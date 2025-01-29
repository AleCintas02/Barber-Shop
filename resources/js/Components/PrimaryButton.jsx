

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className="boton-primario"
            disabled={disabled}
        >
            {children}
        </button>
    );
}

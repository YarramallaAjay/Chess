interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}

export const Button = (props:ButtonProps) => {
    const { onClick ,children} = { ...props };
    return (
        <button onClick={onClick} className="px-8 py-4 bg-green-500 hover:bg-green-700 text-white font-bold
                      rounded text-2xl">{children}</button>
    )
}
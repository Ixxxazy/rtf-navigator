import React from 'react';

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    children?: React.ReactNode
};
const Button = ({children, ...props}: Props) => {
    return (
        <button {...props}
                className={`block m-1 p-3 bg-blue-700 hover:bg-blue-600 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-black rounded-xl align-top transition-colors font-semibold text-lg ${props.className}`}>
            {children}
        </button>
    );
};

export default Button;
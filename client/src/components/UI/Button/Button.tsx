import React from 'react';
type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    children?: React.ReactNode
};
const Button = ({children, ...props}: Props) =>  {
    return (
        <button {...props} className={`${props?.className} p-3 bg-blue-700 hover:bg-blue-600 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-black rounded-xl align-top transition-colors`} >
            <span className={'align-top font-semibold text-lg'}>{children}</span>
        </button>
    );
};

export default Button;
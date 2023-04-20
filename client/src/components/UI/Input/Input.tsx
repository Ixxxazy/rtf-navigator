import React from 'react';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label?: string
};
const Input = ({...props}: Props) => {
    let colors: string = 'bg-neutral-200 hover:bg-white focus:bg-white dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 transition-colors'
    return (
        <input {...props} className={`h-12 font-semibold min-w-0 grow p-3 transition-colors rounded-r-xl ${colors} ${props?.className}`}>
        </input>
    )
};

export default Input;
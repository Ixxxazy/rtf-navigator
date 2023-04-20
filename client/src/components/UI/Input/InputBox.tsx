import React from 'react';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    label?: string
    children?: React.ReactNode
};
const InputBox = ({label, children, ...props}: Props) => {
    return (
        <label className={`flex items-center h-full shadow bg-neutral-50 dark:bg-neutral-800 rounded-xl m-1 ${props?.className}`}>
            <span className={`mx-3 min-w-fit font-semibold text-center`}>{label}</span>
            {children}
        </label>
    );
};

export default InputBox;
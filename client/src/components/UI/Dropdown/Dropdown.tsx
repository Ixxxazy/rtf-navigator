import React from 'react';

type Props = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
    options: string[]
};
const Dropdown = ({options, ...props}: Props) => {
    let colors: string = 'bg-neutral-200 hover:bg-white focus:bg-white dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 transition-colors'
    return (
        <select {...props}
                className={`h-12 font-semibold block p-3 transition-colors rounded-r-xl ${colors} ${props?.className}`}>
            {options.map(p => <option key={p}>{p}</option>)}
        </select>
    )


};

export default Dropdown;
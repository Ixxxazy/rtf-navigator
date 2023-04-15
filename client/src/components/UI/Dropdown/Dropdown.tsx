import React from 'react';

type Props =  React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
    label?: string
    options: string[]
};
const Dropdown = ({options, label, ...props}: Props) => {
    let colors: string = 'bg-neutral-200 hover:bg-white focus:bg-white dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600 transition-colors'
    if (label)
    {
        return (
            <label className={`shadow block bg-neutral-50 dark:bg-neutral-800 rounded-xl ${props?.className}`}>
                <span className={'mx-3 font-medium'}>{label}</span>
                <select {...props} className={`font-semibold p-3 rounded-r-xl ${colors}`}>
                    {options.map(p =>
                        <option key={p}>{p}</option>
                    )}
                </select>
            </label>
        );
    }
    else
    {
        return (
            <select {...props} className={`font-semibold block p-3 transition-colors rounded-xl ${colors} ${props?.className}`}>
                {options.map(p =>
                    <option key={p}>{p}</option>
                )}
            </select>
        )
    }

};

export default Dropdown;
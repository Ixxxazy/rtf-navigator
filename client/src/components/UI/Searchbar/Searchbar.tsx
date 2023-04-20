import React from 'react';
import SearchIcon from '@mui/icons-material/Search'

type Props = React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> & {
    placeholder?: string
};
const Searchbar = ({placeholder, ...props}: Props) => {
    return (
        <label {...props}
             className={`flex rounded-full bg-neutral-100 hover:bg-white divide-x dark:divide-neutral-600 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors ${props?.className}`}>
            <SearchIcon className={'text-gray-500 m-3'}/><span className='hidden'>Поиск</span>
            <input type='search' placeholder={placeholder ? placeholder : 'Поиск'}
                   className={'w-full p-3 bg-transparent focus:outline-none'}/>
        </label>
    );
};

export default Searchbar;
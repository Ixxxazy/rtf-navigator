import React from 'react';
import SearchIcon from '@mui/icons-material/Search'
type Props =  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    placeholder?: string
};
const Searchbar = ({placeholder, ...props}: Props) => {
    return (
        <div {...props} className={`flex p-3 rounded-full bg-neutral-100 hover:bg-white divide-x gap-3 dark:divide-neutral-600 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors ${props?.className}`}>
            <SearchIcon className={'text-gray-500'}/>
            <div className={'px-3 w-full'}>
                <input type='search' placeholder={placeholder ? placeholder : 'Поиск'} className={'bg-transparent focus:outline-none'}/>
            </div>
        </div>
    );
};

export default Searchbar;
import React from 'react';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: React.ReactNode
};


function InfoCard({children, ...props}: Props) {
    return (
        <div className={'m-3'}>
            <div {...props} className={`p-3 bg-white dark:bg-neutral-700 rounded-xl h-min shadow ${props?.className}`}>
                {children}
            </div>
        </div>
    );
}

export default InfoCard;
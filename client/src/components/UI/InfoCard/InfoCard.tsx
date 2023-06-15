import React from 'react';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: React.ReactNode
};


function InfoCard({children, ...props}: Props) {
    return (
            <div {...props} className={`p-3 ${props?.className ?? ''}`}>
                <div className={'p-3 bg-white dark:bg-neutral-700 rounded-xl h-full shadow'}>
                    {children}
                </div>
            </div>
    );
}

export default InfoCard;
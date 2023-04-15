import React from 'react';
type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    children?: React.ReactNode
};
const HeaderButton = ({children, ...props}: Props) =>  {
    return (
        <button {...props} className={`${props?.className}`} >
            {children}
        </button>
    );
};

export default HeaderButton;
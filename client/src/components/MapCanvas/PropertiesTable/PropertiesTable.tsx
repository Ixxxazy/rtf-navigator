import React from 'react';

type Props = React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement> & {
    children?: React.ReactNode
}
const PropertiesTable = ({children, ...props}: Props) => {
    return (
        <table className={`border h-fit bg-white text-black`} {...props}>
            {children}
        </table>
    );
};

export default PropertiesTable;
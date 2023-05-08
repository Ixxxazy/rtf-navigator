import React from 'react';

type Props = React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement> & {
    children?: React.ReactNode
}
const PropertiesTable = ({children, ...props}: Props) => {
    return (
        <table className={`border h-fit w-full max-w-xl`} {...props}>
            {children}
        </table>
    );
};

export default PropertiesTable;
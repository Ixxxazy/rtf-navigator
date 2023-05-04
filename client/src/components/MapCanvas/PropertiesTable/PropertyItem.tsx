import React, {useState} from 'react';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement> & {
    name: string,
    value?: string | number,
    children?: React.ReactNode
}
const PropertyItem = ({name, value, children, ...props}: Props) => {
    const [minimized, setMinimized] = useState(true)
    return (
        <tr className={`border align-text-top`} {...props}>
            <th scope='row' onClick={() => setMinimized(!minimized)}>{name}</th>
            <td className={`block overflow-scroll ${minimized && ' max-h-16'}`}>{value}{children}</td>
        </tr>
    );
};

export default PropertyItem;
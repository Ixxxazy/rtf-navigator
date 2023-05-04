import React, {useState} from 'react';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement> & {
    children?: React.ReactNode
    label?: string
}

const PropertiesTableSection = ({children, label, ...props}: Props) => {
    const [hidden, setHidden] = useState(false);
    return (
        <tbody {...props}>
            <tr>
                <th colSpan={2} onClick={() => setHidden(!hidden)}>
                    {label}
                </th>
            </tr>
        {!hidden && children}
        </tbody>
    );
};

export default PropertiesTableSection;
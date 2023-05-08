import React, {useState} from 'react';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement> & {
    children?: React.ReactNode
    label?: string
    hiddenByDefault?: boolean
}

const PropertiesTableSection = ({children, label, hiddenByDefault, ...props}: Props) => {
    const [hidden, setHidden] = useState(hiddenByDefault ?? false);
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
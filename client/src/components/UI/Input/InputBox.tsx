import React from 'react';
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {SvgIconTypeMap} from "@mui/material";

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    label?: string
    Icon?:  OverridableComponent<SvgIconTypeMap> & { muiName: string }
    children?: React.ReactNode
};
const InputBox = ({label, Icon, children, ...props}: Props) => {
    return (
        <label className={`flex items-center h-full shadow bg-neutral-50 dark:bg-neutral-800 rounded-xl m-1 ${props?.className}`}>
            <span className={`mx-3 min-w-fit font-semibold text-center ${Icon ? 'hidden' : ''}`}>{label}</span>
            {Icon && <Icon className={`mx-3 min-w-fit font-semibold text-center`}/>}
            {children}
        </label>
    );
};

export default InputBox;
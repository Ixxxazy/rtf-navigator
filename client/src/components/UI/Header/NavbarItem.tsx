import React from 'react';
import {Link} from "react-router-dom";
type Props =  React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> & {
    link?: string
};
const NavbarItem = ({link, children, ...props}: Props) => {
    /*TODO: fix props*/
    return (
        <li {...props} className={'font-semibold px-3'}>
            <Link to={link ? link : '#'}>{children}</Link>
        </li>
    );
};

export default NavbarItem;
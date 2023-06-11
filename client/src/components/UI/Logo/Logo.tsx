import React from 'react';
import logo from './logo.svg'

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
const Logo = ({...props}: Props) => {
    return (
        <img src={logo} {...props} alt='Логотип'/>
    );
};

export default Logo;
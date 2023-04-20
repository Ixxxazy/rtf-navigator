import React from 'react';
import packageJson from '../../../../package.json'
const Footer = () => {
    return (
        <footer className={'py-3 mx-auto text-center text-neutral-500'}>
            RTF-Navigator {packageJson.version}, UrFU-Maps
        </footer>
    );
};

export default Footer;
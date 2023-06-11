import React from 'react';
import Logo from "../components/UI/Logo/Logo";

const About = () => {
    return (
        <article
            className='dark:text-white flex flex-col md:flex-row items-center md:items-start md:justify-center gap-5'>
            <div className='bg-white rounded-full w-1/4 shadow aspect-square flex justify-center items-center'>
                <Logo className={'w-2/3 h-2/3'}></Logo>
            </div>
            <article>
                <h1 className={'text-3xl'}>RTF-Navigator</h1>
                <p>
                    Карты и навигация внутри некоторых корпусов УрФУ.<br/>
                    Сделано с 💖 в команде <strong>UrFU-Maps</strong><br/>
                    Github: <a target='_blank' rel="noopener noreferrer"
                               href='https://github.com/Kexogg/rtf-navigator'>Kexogg/rtf-navigator</a>
                </p>
            </article>
        </article>
    );
};

export default About;
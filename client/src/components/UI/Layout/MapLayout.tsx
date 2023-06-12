import React from 'react';
import Header from "../Header/Header";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div className={'bg-neutral-100 dark:bg-neutral-950 dark:text-white min-h-screen flex flex-col'}>
            <Header/>
            <main className='grow flex'>
                <Outlet/>
            </main>
        </div>
    );
};

export default Layout;
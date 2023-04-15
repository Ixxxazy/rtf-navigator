import React from 'react';
import Header from "../Header/Header";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div className={'bg-neutral-100 dark:bg-neutral-950 dark:text-white min-h-screen'}>
            <Header/>
            <main className={'container mx-auto mt-3 px-1'}>
                <Outlet/>
            </main>
        </div>
    );
};

export default Layout;
import React from 'react';
import {Link} from "react-router-dom";

const Admin = () => {
    return (
        <section>
            <h1>Панель администрирования RTF-Navigator</h1>
            <Link to='editMap'>Редактировать карту</Link>
        </section>
    );
};

export default Admin;
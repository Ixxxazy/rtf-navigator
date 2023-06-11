import React from 'react';
import {Link} from "react-router-dom";
import Button from "../../components/UI/Button/Button";

const Admin = () => {
    return (
        <section className='flex flex-col'>
            <h1 className='text-2xl'>Панель администрирования RTF-Navigator</h1>
            <Button><Link to='editMap'>Редактировать карту</Link></Button>
            <Button>Редактировать институты</Button>
            <Button>Редактировать пользователей</Button>
        </section>
    );
};

export default Admin;
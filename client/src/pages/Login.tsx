import React from 'react';
import InputBox from "../components/UI/Input/InputBox";
import Input from "../components/UI/Input/Input";
import Button from "../components/UI/Button/Button";
import {Link} from "react-router-dom";

const Login = () => {
    return (
        <form action="" method="get" className='max-w-md p-3 mx-auto flex flex-col'>
            <InputBox label='Логин' className='grid grid-cols-3'><Input className='col-span-2' type='text' /></InputBox>
            <InputBox label='Пароль' className='grid grid-cols-3'><Input className='col-span-2' type='password' /></InputBox>
            <Button className='w-auto' type='button'><Link to='/admin'>Войти</Link> </Button>
        </form>
    );
};

export default Login;
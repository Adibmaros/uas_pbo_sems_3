import React from 'react';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import { useAtom } from 'jotai';
import { loginAtom } from '../utils/atoms';

const Register = () => {
    const [user,] = useAtom(loginAtom);

    return (
        <div>
            {user ? <RegisterForm user={user.role} /> : <LoginForm />}
        </div>
    );
};

export default Register;

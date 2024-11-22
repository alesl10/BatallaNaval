import { useForm } from 'react-hook-form'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { signin, error, isAuthenticated } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (values) => signin(values));

    useEffect(() => {
        if (isAuthenticated) navigate("/Home");
    }, [isAuthenticated]);

    return (
        <div className="max-w-md m-auto my-10">
            <h2 className=" text-blue-700 font-bold text-2xl mb-2">Batalla Naval 1.0</h2>

            <div className="border-2 border-[#f9b000] bg-blue-200 p-10 rounded-lg">
                <div className=" bg-red-600 text-white">
                    <p>{error}</p>
                </div>

                <form className=' items-center ' onSubmit={onSubmit}>
                    <input
                        placeholder="email"
                        type="text"
                        {...register("email", { required: true })}
                        className="w-full px-4 py-2 mb-2 bg-blue-500 text-yellow-300 rounded-md"
                    />
                    {errors.username && <p>Email is required</p>}
                    <button type='submit' className=" px-4  font-semibold bg-blue-500 text-yellow-300 rounded-md">
                        Login
                    </button>
                </form>
                <div>
                    <span>No tienes un usuario? </span>
                    <button onClick={()=> navigate("/register")} className=" px-4 font-semibold bg-blue-500 text-yellow-300 rounded-md">Registrate</button>
                </div>
            </div>
        </div>
    );
}

export default Login
import React, { useContext, useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../../utils/context'
import axios from 'axios'
import { setToken } from '../../../utils/helper'

const Login = () => {
    const navigate = useNavigate()
    const { handleUser } = useContext(Context)

    const [input, setInput] = useState({
        email: '',
        password: '',
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const handleInput = (e) => {
        const { name, value } = e.target
        setInput({
            ...input,
            [name]: value,
        })
    }

    const onFinish = async (values) => {
        setIsLoading(true);
        try {
            const requestData = {
                identifier: values.email,
                password: values.password
            }

            const response = await axios.post(`${process.env.REACT_APP_DEV_URL}/api/auth/local`, requestData, {
                headers: {
                    'Content-Type': 'application/json' 
                }
            })  
            
            const data = response.data;

            if(data?.error) {
                throw data?.error
            } else {
                //Set the token
                setToken(data.jwt)

                //Set the user
                handleUser(data.user)

                navigate('/', { replace: true})
            }
        } catch (error) {
            console.error(error.response); // Log the response
            setError(error.response?.data?.message ?? 'Something went wrong!');
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className='main-container'>
        <h2 className='heading'>Welcome Back</h2>
        <form onSubmit={(e) => {
                e.preventDefault();
                onFinish(input)
            }} 
            className='input-container'>
            <label htmlFor='email'>Email</label>
            <input
                type='text'
                name='email'
                placeholder='Email'
                value={input.email}
                onChange={handleInput}
            />
            <label htmlFor='password'>Password</label>
            <input
                type='password'
                name='password'
                placeholder='Password'
                value={input.password}
                onChange={handleInput}
            />
            <div className='ctas'>
                <button type='submit'>
                    {isLoading ? "Loading.." : "Login"}
                </button>
            </div>
        </form>
        {error && <p className='error-message'>{error}</p>}
        <p>Not a member? <span onClick={() => navigate("/signup")}>Sign Up</span></p>
    </div>
  )
}

export default Login

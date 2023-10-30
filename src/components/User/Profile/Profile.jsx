import React, { useContext, useEffect, useState } from 'react'
import './Profile.scss'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../../utils/context'
import axios from 'axios'
import { getToken, removeToken } from '../../../utils/helper'

const Profile = () => {
    const navigate = useNavigate()
    const { userData, handleUser } = useContext(Context)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    })

    useEffect(() => {
        setFormData({
            username: userData?.username,
            email: userData?.email,
            password: userData?.password
        })
    }, [userData])

    const handleProfileUpdate = async () => {
        setLoading(true)
        try {
            const response = await axios.put(`${process.env.REACT_APP_DEV_URL}/users/${userData.id}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`
                }
            })
            const responseData = response.data
            handleUser(responseData)
        } catch (error) {
            console.error(error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        removeToken();
        navigate("/signin", { replace: true });
      };

  return (
    <div className='main-container'>
        <h2 className='heading'>View Profile</h2>
        <form onSubmit={handleProfileUpdate}
            className='input-container'>
            <label htmlFor='username'>Username</label>
            <input
                type='text'
                name='username'
                placeholder='Username'
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
            <label htmlFor='email'>Email</label>
            <input
                type='text'
                name='email'
                placeholder='Email'
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <label htmlFor='password'>Password</label>
            <input
                type='password'
                name='password'
                placeholder='Password'
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <div className='ctas'>
                <button type='submit' className='update-btn'>
                    {loading ? "Saving.." : "Save"}
                    {navigate('/')}
                </button>
                <button onClick={handleLogout} className='logout-btn'>Log Out</button>
            </div>
        </form>
        {error && <p className='error-message'>{error}</p>}
    </div>
  )
}

export default Profile
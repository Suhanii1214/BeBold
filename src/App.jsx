import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import Category from './components/Category/Category'
import SingleProduct from './components/SingleProduct/SingleProduct'
import Newsletter from './components/Footer/Newsletter/Newsletter'
import AppContext from './utils/context'
import Login from './components/User/Login/Login'
import SignUp from './components/User/SignUp/SignUp'
import Profile from './components/User/Profile/Profile'
import { getToken } from './utils/helper'

function App() {
    return <BrowserRouter>
        <AppContext>
        <Header/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/category/:id' element={<Category/>}/>
            <Route path='/product/:id' element={<SingleProduct/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element = {<SignUp/>}/>
            <Route path='/profile' element={getToken() ? <Profile/> : <Navigate to="/login"/>}/>
        </Routes>
        <Newsletter/>
        <Footer/>
        </AppContext>
    </BrowserRouter>;
}

export default App;

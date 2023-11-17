import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getToken } from "./helper";
import axios from "axios";

export const Context = createContext();

const AppContext = ({children}) => {
    const [categories, setCategories] = useState()
    const [products, setProducts] = useState([])
    const [luxeBrands, setLuxeBrands] = useState()
    const [brandsPopover, setBrandsPopover] = useState()
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartSubtotal, setCartSubtotal] = useState(0)
    const [userData, setUserData] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const authToken = getToken();

    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0,0)
    }, [location])

    useEffect(() => {
        if(authToken) {
            fetchLoggedInUser(authToken);
        }
    }, [authToken])

    useEffect(() => {
        let count = 0;
        cartItems?.map((item) => (count += item.attributes.quantity))
        setCartCount(count)

        let subTotal = 0;
        cartItems.map((item) => (subTotal += item.attributes.price * item.attributes.quantity))
        setCartSubtotal(subTotal)
    }, [cartItems])

    const handleAddToCart = (product, quantity) => {
        let items = [...cartItems]
        let index = items?.findIndex(p => p.id === product?.id)
        if(index !== -1) {
            items[index].attributes.quantity += quantity
        } else {
            product.attributes.quantity = quantity
            items = [...items, product]
        }
        setCartItems(items);
    }
    const handleRemoveFromCart = (product) => {
        let items = [...cartItems]
        items = items?.filter((p) => p.id !== product?.id)
        setCartItems(items);
    }
    const handleCartProductQuantity= (type, product) => {
        let items = [...cartItems]
        let index = items?.findIndex((p) => p.id === product?.id)
        if(type === "inc") {
            items[index].attributes.quantity +=1
        } else if (type === "dec"){
            if(items[index].attributes.quantity ===1) return;
            items[index].attributes.quantity -= 1
        }
        setCartItems(items);
    }

    const fetchLoggedInUser = async (token) => {
        setIsLoading(true);
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_DEV_URL}/api/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUserData(data)
        } catch (error) {
            console.log(error);
            return error;
        } finally {
            setIsLoading(false)
        }
    }

    const handleUser = (user) => {
        setUserData(user)
    }

    return (
        <Context.Provider
            value={{
                categories,
                setCategories,
                products,
                setProducts,
                luxeBrands, 
                setLuxeBrands,
                brandsPopover, 
                setBrandsPopover,
                cartItems,
                setCartItems,
                showCart,
                setShowCart,
                cartCount,
                setCartCount,
                cartSubtotal,
                setCartSubtotal,
                userData,
                isLoading,
                handleUser,
                handleAddToCart,
                handleRemoveFromCart,
                handleCartProductQuantity 
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default AppContext;
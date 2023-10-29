import {MdClose} from 'react-icons/md'
import { BsCartX} from 'react-icons/bs'
import CartItem from './CartItem/CartItem';
import { useContext } from 'react';
import { makePaymentRequest } from '../../utils/api';
import {loadStripe} from '@stripe/stripe-js'
import "./Cart.scss";
import { Context } from '../../utils/context';

const Cart = () => {

    const {cartItems, setShowCart, cartSubtotal} = useContext(Context)

    const stripPromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

    const handlePayment = async () => {
        try {
            const stripe = await stripPromise
            const res = await makePaymentRequest.post("/api/orders", {
            products: cartItems,
            })

            await stripe.redirectToCheckout({
                sessionId: res.data.stripeSession.id
            })
        } catch (error) {
            console.log(error);
        }
    }

    return <div className='cart-panel'>
        <div className='opac-layer' onClick={() => setShowCart(false)}></div>
        <div className='cart-content'>
            <div className='cart-header'>
                <span className='heading'>Shopping Cart</span>
                <span className='close-btn' onClick={() => setShowCart(false)}>
                    <MdClose/>
                    <span className='text'>Close</span>
                </span>
            </div>

            {!cartItems?.length && <div className='empty-cart'>
                <BsCartX/>
                <span>No products in the Cart</span>
                <button className='return-cta'>RETURN TO SHOP</button>
            </div>}

            {!!cartItems?.length && (
                <>
               <CartItem/> 
               <div className='cart-footer'>
                    <div className='subtotal'>
                        <span className='text'>Subtotal:</span>
                        <span className='text total'>&#8377;{cartSubtotal}</span>
                    </div>
                    <div className='button'>
                        <button className='checkout-cta' onClick={handlePayment}>Checkout</button>
                    </div>
               </div>
            </>
            )}
        </div>
    </div>;
};

export default Cart;

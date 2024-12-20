import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";



// Initial state for the cart
const initialState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id)
            // check availableInStock quantity
            const availableInStock = action.payload.availableInStock;
            if (itemIndex >= 0) {
                if (state.cartItems[itemIndex].cartQuantity < availableInStock) {
                    state.cartItems[itemIndex].cartQuantity += 1;
                    toast.info(`Increased ${state.cartItems[itemIndex].title} quantity`);
                } else {
                    toast.error(`Cannot add more than ${availableInStock} of ${state.cartItems[itemIndex].title}`);
                }
            } else {
                if (availableInStock > 0) {
                    const tempProduct = { ...action.payload, cartQuantity: 1 };
                    state.cartItems.push(tempProduct);
                    const toastId = toast.loading('Adding');
                    toast.success(`${action.payload.title} added to cart`, { id: toastId, duration: 2000 });
                } else {
                    toast.error(`${action.payload.title} is out of stock`);
                }
            }
            // this.getTotal(state);
        },
        removeFromCart: (state, action) => {
            const nextCartItems = state.cartItems.filter((cartItem) => cartItem._id !== action.payload._id)
            state.cartItems = nextCartItems
        },
        decreaseCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id)

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;

                toast.info(`Decreased ${action.payload.title} quantity`)
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter((cartItem) => cartItem._id !== action.payload._id)
                state.cartItems = nextCartItems

                toast.error(`${action.payload.title} removed from cart`)
            }
        },
        resetCart: (state) => {
            state.cartItems = [];
            state.cartTotalQuantity = 0;
            // state.cartTotalAmount = 0;
        },
        getTotal: (state) => {
            const { total, quantity } = state.cartItems.reduce((cartTotal, cartItem) => {
                const { price, cartQuantity } = cartItem
                const itemTotal = price * cartQuantity

                cartTotal.total += itemTotal
                cartTotal.quantity += cartQuantity

                return cartTotal
            }, {
                total: 0,
                quantity: 0
            })

            state.cartTotalQuantity = quantity
            state.cartTotalAmount = total
        }
    }
})

export const { addToCart, removeFromCart, decreaseCart, getTotal, resetCart } = cartSlice.actions
export default cartSlice.reducer
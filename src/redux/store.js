import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import { baseApi } from './api/baseApi'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(baseApi.middleware),
})


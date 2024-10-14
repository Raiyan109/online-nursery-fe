import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import { baseApi } from './api/baseApi'
import saveForLaterReducer from './features/saveForLater/saveForLater'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        saveForLater: saveForLaterReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(baseApi.middleware),
})


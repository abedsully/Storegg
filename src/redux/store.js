const { configureStore } = require("@reduxjs/toolkit");

import ProductReducer from './slices/ProductSlice'

export const store = configureStore({
    reducer: {
        product: ProductReducer,
    }
})